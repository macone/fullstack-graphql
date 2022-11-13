const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User!]!
  }
  type Query {
    me: User!
  }

`

const resolvers = {
  Query: {
    me() {
      return {
        email: 'Maciek@checkme.pl',
        avatar: 'htttp://checkme.pl/somepicture.png',
        friends: []
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(4321)
console.log('server is up on 4321 port')