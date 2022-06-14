const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World'
        },
        test: () => {
            return "Test Graphql data"
        }
    }
}

module.exports = resolvers;