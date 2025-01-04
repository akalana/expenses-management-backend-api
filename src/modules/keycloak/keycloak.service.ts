import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CONFIG_NAMESPACES } from '@shared/constants';
import { IKeycloakConfig } from '@shared/interfaces';

import { IPatTokenResponse, IUser } from './interfaces';

@Injectable()
export class KeycloakService {
    private readonly axios: AxiosInstance;
    private readonly kcConfig: IKeycloakConfig;

    constructor(config: ConfigService) {
        this.kcConfig = config.get<IKeycloakConfig>(CONFIG_NAMESPACES.KEYCLOAK);
        this.axios = axios.create({
            baseURL: this.kcConfig.kcBaseUrl,
        });
    }

    /**
     * Retrieves the PAT (Personal Access Token) from Keycloak.
     *
     * This function makes a POST request to the Keycloak token endpoint to obtain a Personal Access Token
     * using client credentials. The token is then used for authentication in subsequent API requests.
     *
     * @returns A promise that resolves to an IPatTokenResponse object containing the PAT and other details.
     * @throws InternalServerErrorException if the request fails or the response is not as expected.
     */
    private async getPAT(): Promise<string> {
        // Define the URL for the Keycloak token endpoint
        const url = `/realms/${this.kcConfig.kcRealm}/protocol/openid-connect/token`;

        // Prepare the parameters required for the token request
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials'); // Grant type for obtaining the token
        params.append('client_id', this.kcConfig.kcWebClientId); // Client ID for authentication
        params.append('client_secret', this.kcConfig.kcWebClientSecret); // Client secret for authentication
        try {
            // Make the POST request to the Keycloak token endpoint
            const axiosRes: AxiosResponse<IPatTokenResponse> =
                await this.axios.post(url, params);

            // Return the response data containing the PAT
            return axiosRes.data.access_token;
        } catch (error) {
            // Handle any errors that occur during the request
            throw new InternalServerErrorException(
                `Failed to retrieve PAT: ${error.message}`,
            );
        }
    }

    /**
     * Fetches a user by their username from Keycloak.
     *
     * @param userName - The username of the user to retrieve.
     * @returns A promise that resolves to the user object if found.
     * @throws InternalServerErrorException if the API request fails.
     */
    async getUser(userName: string): Promise<IUser | undefined> {
        // Construct the URL to fetch the user by email
        const url = `/admin/realms/${this.kcConfig.kcRealm}/users?username=${encodeURIComponent(userName)}`;

        // Retrieve the Personal Access Token (PAT) for authentication
        const pat = await this.getPAT();
        // Define the headers for the API request
        const headers = {
            'Content-Type': 'application/json', // Specifies JSON content type
            Authorization: `Bearer ${pat}`, // PAT for authorization
        };

        try {
            // Make a GET request to the Keycloak API to retrieve the user
            const axiosRes: AxiosResponse<IUser[]> = await this.axios.get(url, {
                headers, // Attach headers to the request
            });

            // Extract the user data from the response
            const users = axiosRes.data;

            // Return the first user from the response data, if available
            // Handle cases where no user is found or the array is empty
            return users.length > 0 ? users[0] : undefined;
        } catch (error) {
            throw new InternalServerErrorException(
                `Failed to get the user: ${error.message}`, // Error message for debugging
            );
        }
    }
}
