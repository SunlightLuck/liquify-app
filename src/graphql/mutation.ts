import {gql} from '@apollo/client'

const mutation = {
  signup: gql`
    mutation ($userInput: UserInput!) {
      signup(userInput: $userInput) {
        _id
        firstName
        lastName
        email
        phone
        addresses
      }
    }
  `,
  addAddress: gql`
    mutation ($addressInput: AddressInput!) {
      addAddress(addressInput: $addressInput) 
    }
  `
}

export default mutation;