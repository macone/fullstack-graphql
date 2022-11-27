import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const PETS_FIELDS = gql`
  fragment PetsFields on Pet {
    name
    id
    type
    img
    vaccinated @client
  }
`

const ALL_PETS = gql`
  query AllPets {
    pets {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`

const CREATE_PET = gql`
  mutation CreateAPet($input: NewPetInput!) {
    newPet(input: $input) {
      ...PetsFields
    } 
  }
  ${PETS_FIELDS}
`

export default function Pets() {
  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(ALL_PETS)
  const [createPet, newPet] = useMutation(CREATE_PET, {
    update(cache, { data: { newPet } }) {
      const existingPets = cache.readQuery({ query: ALL_PETS });
      const newPetsList = [newPet, ...existingPets.pets]
      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: newPetsList }
      });
    }

  })


  const onSubmit = input => {
    console.log({ input })
    setModal(false)
    createPet({
      variables: { input: input },
      optimisticResponse: {
        newPet: {
          id: "123resdf343",
          __typename: "Pet",
          type: input.type,
          name: input.name,
          img: "https://picsum.photos/300/300",
        },
        __typename: "Mutation"
      }
    })
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  if (loading) {
    return <Loader />
  }

  if (error || newPet.error) {
    return <p>Error</p>
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}