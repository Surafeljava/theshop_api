import express, {Express, Request, Response} from 'express';
import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();

const mongoose = require('mongoose');

const resolvers = require('./src/resolvers');
const typeDefs = require('./src/typeDefs');

const port = process.env.PORT;

async function startServer() {
    const app: Express = express();
    const apolloServer: ApolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app: app});

    app.use('/', (req: Request, res: Response) => {
        res.json({
            message: "Hello World"
        });
    });

    await mongoose.connect('mongodb://localhost:27017/post_db');
    console.log('Mongodb Connected!'); 

    app.listen(port, () => {
        console.log(`Server Running on port ${port}`);
    });
}

startServer();


