import {gql} from '@apollo/client'

const queries = {
  getTest: gql`
    query ($str: String!) {
      getTest(str: $str) {
        _id
        lastName
      }
    }
  `,
  signin: gql`
    query ($email: String!, $password: String!) {
      signin(email: $email, password: $password) {
        _id
        firstName
        lastName
        email
        phone
        addresses
      }
    }
  `,
  googleSignin: gql`
    query ($email: String!) {
      googleSignin(email: $email) {
        _id
        firstName
        lastName
        email
        phone
        addresses
      }
    }
  `
}

export default queries;