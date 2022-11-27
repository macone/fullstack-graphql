import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

const typeDefs = gql`
  extend type Pet {
    vaccinated: Boolean!
  }
  extend type Dog {
    vaccinated: Boolean!
  }
  extend type Cat {
    vaccinated: Boolean!
  }
`

const resolvers = {
  Pet: {
    vaccinated() {
      return true
    }
  },
  Dog: {
    vaccinated() {
      return true
    }
  },
  Cat: {
    vaccinated() {
      return true
    }
  }

}

const link = new HttpLink({ uri: 'http://localhost:4000/' })
// const link = new HttpLink({ uri: 'https://rickandmortyapi.com/graphql' })

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs
})



export default client
