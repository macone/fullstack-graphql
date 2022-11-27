/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

// const { inputCSS } = require("react-select/dist/chunk-4ceb843c.cjs.prod")

module.exports = {
  Query: {
    pets(_, { input }, ctx) {
      console.log("Query => Pets")
      if (input?.id) {
        return ctx.models.Pet.findMany((el => el.id === input.id))
      } else if (input?.name) {
        return ctx.models.Pet.findMany((el => el.name === input.name))
      } else if (input?.type) {
        return ctx.models.Pet.findMany((el => el.type === input.type))
      } else {
        return result = ctx.models.Pet.findMany()
      }

    },
    pet(_, { input }, ctx) {
      if (input?.id) {
        return ctx.models.Pet.findOne(el => el.id === input.id)
      } else if (input.name) {
        return ctx.models.Pet.findOne(el => el.name === input.name)
      }

    },
    user(_, { input }, ctx) {
      if (input?.id) {
        return ctx.models.User.findOne(el => el.id === input.id)
      } else if (input.name) {
        return ctx.models.User.findOne(el => el.username === input.username)
      }
    }
  },

  Mutation: {
    newPet(_, { input }, { models, user }) {
      const result = models.Pet.create({ ...input, user: user?.id })
      return result
    }

  },
  Pet: {
    __resolveType(pet) {
      if (pet.type === "CAT") { return "Cat" } else { return "Dog" }
    }
  },
  Cat: {
    owner(cat, _, ctx) {
      console.log("cat => OWNER")
      return ctx.models.User.findOne(el => el.id === cat.user)
    },
    img() {
      return 'http://placekitten.com/300/300?r'
    },
  },
  Dog: {
    owner(dog, _, ctx) {
      console.log("dog => OWNER")
      return ctx.models.User.findOne(el => el.id === dog.user)
    },
    img() {
      return 'https://placedog.net/300/300?random'
    },
  },
  User: {
    pets(user, _, ctx) {
      console.log("user => pets")
      console.log(user.petslist)
      let result = []
      user.petslist.forEach(el => {
        const onePet = ctx.models.Pet.findOne(e => e.id === el)
        console.log({ onePet })
        result.push(onePet)
      });
      console.log(result)
      return result
      // return [{ name: "test" }]
    }
  }




  // Mutation: {

  // },
  // Pet: {
  //   img(pet) {
  //     return pet.type === 'DOG'
  //       ? 'https://placedog.net/300/300'
  //       : 'http://placekitten.com/300/300'
  //   }
  // },
  // User: {

}
