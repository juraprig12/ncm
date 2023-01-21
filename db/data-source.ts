import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'admin',
    database: 'nest_crud_migration_base',
    //entities: [UserEntity],
    entities: ['dist/**/*.entity.js'],
    //synchronize: true,
    migrations: ['dist/db/migrations/*.js'],
}; 

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;