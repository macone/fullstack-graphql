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

  enum TypeEnum {
    DOG
    CAT
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
    type: TypeEnum
    owner: User
    img: String
  }

  # union Pet2 = Cat | Dog

  type Dog implements Pet {
    id: ID!
    createdAt: String!
    name: String
    type: TypeEnum
    race: String
    tricksLevel: Int
    owner: User
    img: String
  }

  type Cat implements Pet {
    id: ID!
    createdAt: String!
    name: String
    type: TypeEnum
    race: String
    fur: FurEnum
    owner: User
    img: String
  }

  input PetInput {
    id: ID
    name: String
    type: TypeEnum
    race: String
    owner: Int
    img:String
  }

  input NewPetInput {
    name: String!
    type: TypeEnum!
    race: String
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
