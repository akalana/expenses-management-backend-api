/**
 * @fileoverview This interface representing the base repository for performing CRUD operations.
 * @template T The type of the entity.
 * @template K The type of the entity for creation and updates.
 */
export interface IBaseRepository<T, K = Partial<T>> {
    /**
     * Insert a new entity.
     * @param {K} entity The entity to be created.
     * @returns {Promise<T>} A promise that resolves to the created entity.
     */
    create?(entity: K): Promise<T>;

    /**
     * Getting all entities without pagination. // TODO: For here needs to add the pagination.
     * @param {object | null} filters Filters to apply to the query (optional).
     * @returns {Promise<T>} A promise that resolves to a without paginated query result containing entities.
     */
    findAll?(filters: object | null): Promise<T[]>;

    /**
     * Retrieves an entity by using its ID.
     * @param {string} id The ID of the entity to be retrieved.
     * @returns {Promise<T>} A promise that resolves to the entity with the specified ID.
     */
    findOne?(id: string): Promise<T>;

    /**
     * Updates an existing entity using ID.
     * @param {string} id The ID of the entity to be updated.
     * @param {K} entity The entity containing the updated details.
     * @returns {Promise<T>} A promise that resolves to the updated entity.
     */
    update?(id: string, entity: K): Promise<T>;

    /**
     * Removes an entity by using its ID.
     * @param {string} id The ID of the entity to be removed.
     * @returns {Promise<T>} A promise that resolves to the removed entity.
     */
    remove?(id: string | string[]): Promise<T | T[]>;
}
