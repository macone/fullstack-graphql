const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`

  enum FurEnum {
    LONG
    SHORT
    NONE
  }

  type User {
    id: ID!
    username: String
    pets: [Pet]
  }

  interface Pet {
    id: ID!
    createdAt: String!
    name: String
    type: String
    owner: User
  }

  # union Pet2 = Cat | Dog

  type Dog implements Pet {
    id: ID!
    createdAt: String!
    name: String
    type: String
    race: String
    tricksLevel: Int
    owner: User
  }

  type Cat implements Pet {
    id: ID!
    createdAt: String!
    name: String
    type: String
    race: String
    fur: FurEnum
    owner: User
  }

  input PetInput {
    id: ID
    name: String
    type: String
    race: String
    owner: Int
  }

  input NewPetInput {
    name: String!
    type: String!
    race: String!
    tricksLevel: Int
    fur: FurEnum
    owner: Int
  }

  type Query {
    users: [User]!
    pets(input: PetInput): [Pet]!
    user: User! 
    pet(input: PetInput): Pet!  
  }

  type Mutation {
    newPet(input: NewPetInput): Pet!
  }
`;

module.exports = typeDefs
