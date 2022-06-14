import express, {Express, Request, Response} from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();

const resolvers = require('./src/resolvers');
const typeDefs = require('./src/typeDefs');

const port = process.env.PORT;

// const typeDefs = gql`
//     type Query{
//         hello: String
//     }
// `;

// const resolvers = {
//     Query: {
//         hello: () => {
//             return 'Hello World';
//         }
//     }
// }


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

    app.listen(port, () => {
        console.log(`Server Running on port ${port}`);
    });
}

startServer();


