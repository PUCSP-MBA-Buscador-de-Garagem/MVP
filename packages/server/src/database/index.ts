import "reflect-metadata";

import { DataSource } from "typeorm"
import { User } from "../entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "database_igarage",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})


// AppDataSource.initialize().then(async () => {

//   const userRepository = AppDataSource.getRepository(User);
//   const user = userRepository.create({ name: 'Cal Kestis', email: 'calkestis@jedi.com', password: '789456' });
//   const result = await userRepository.save(user);

//   console.log(result);


//   // console.log("Inserting a new user into the database...")
//   // const user = new User()
//   // user.name = 'admin'
//   // user.email = 'admin@admin.com.br'
//   // user.password = '123456'

//   // await AppDataSource.manager.save(user)
//   // console.log("Saved a new user with id: " + user.id)

//   // console.log("Loading users from the database...")
//   // const users = await AppDataSource.manager.find(User)
//   // console.log("Loaded users: ", users)

//   // console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
