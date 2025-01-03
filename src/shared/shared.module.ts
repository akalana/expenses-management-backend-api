import { Module } from '@nestjs/common';

@Module({
    imports: [],
    /**
     * The providers array specifies the services and utilities that are registered
     * as providers within this module. These services can be utilized in
     * other components of the application.
     */
    providers: [],
    /**
     * The exports array allows the listed providers to be accessible
     * in other modules. When another module imports SharedModule,
     * it can utilize these services.
     */
    exports: [], // Export ObjectHelper to ensure its availability in other modules
})
export class SharedModule {}
