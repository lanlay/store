const express = require('express');

const mongoose = require('mongoose');

const bodyparser = require('body-parser');

require('dotenv').config({ path: '.env' });

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})


mongoose
    .connect(process.env.MONGO_URI, {
        dbName: 'dbWineWine', 
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
     })
    .then(() => console.log(`Db connected.`))
    .catch((err) => console.error(err));

const app = express();


// Create GraphiQl configuration
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

// Connect graphql 
app.use('/graphql',
    bodyparser.json(),
    graphqlExpress({
        schema,
        context: {
            Recipe,
            User
        }
    })
)

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listiening on PORT ${PORT}`);
});