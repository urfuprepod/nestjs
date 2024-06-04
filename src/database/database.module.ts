import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { User } from "src/users/users.model";


export const databaseModule = SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5435,
    username: 'admin',
    password: 'admin',
    define: {
        timestamps: false,
    },
    database: 'nestoslav',
    models: [User, Role, UserRoles, Post],
    autoLoadModels: true
})