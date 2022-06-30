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
  `,
  setMonthlyRewards: gql`
    mutation ($email: String!, $monthlyRewards: [DailyRewardInput!]) {
      setMonthlyRewards(email: $email, monthlyRewards: $monthlyRewards)
    }
  `
}

export default mutation;