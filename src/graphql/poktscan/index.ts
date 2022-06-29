import {GraphQLClient, } from 'graphql-request'
import axios from 'axios'

const delay = (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
}

const enhancedFetch = (args) => (fetch as any)(...args).then(async (res) => {
    if(res.status !== 200) {
      await delay(res.headers.get('x-ratelimit-retry-after') * 1000);
      return enhancedFetch(args)
    }
    return res;
  })
const graphQLClient = new GraphQLClient('/', {
  headers: {
    authorization: "7e769ebc-ddb0-4c8d-a222-78f9f2ef61b5", 
  },
  mode: 'cors',
  credentials: 'include',
  fetch: (...args) => enhancedFetch(args)
})

const dateToString = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;

export const getRewardsReport = async (before, period, addresses) => {
  const curTime = new Date();
  let query = `
    query ($from: String!, $to: String!, $addresses: [String!]) {
      getRewardsReport(from: $from, to: $to, addresses: $addresses) {
        total_fee
        total_relays
        total_rewards
        total_net_tokens
        total_producers
        total_producer_tokens
      }
    }
  `
  const variables = {
    from: dateToString(new Date(curTime.getTime() - before)),
    to: period === -1 ? dateToString(curTime) : dateToString(new Date(curTime.getTime() - before + period)),
    addresses: addresses,
  }
  let data = await graphQLClient.request(query, variables)
  return data.getRewardsReport;
}

export const getNodeRunnerSummary = async (addresses) => {
  let query = `
    query ($addresses: [String!]) {
      getNodeRunnerSummary(addresses: $addresses, domain: "poktscan.net") {
        total_last_48_hours
        total_last_24_hours
        total_last_6_hours
        avg_last_48_hours
        avg_last_24_hours
        avg_last_6_hours
      }
    }
  `
  const variables = {
    addresses: addresses
  }
  let data = await graphQLClient.request(query, variables)
  return data.getNodeRunnerSummary;
}

export const getNode = async (address) => {
  let query = `
    query ($address: ID!) {
      getNode(address: $address) {
        balance
        tokens
      }
    }
  `
  const variables = {
    address
  }
  let data = await graphQLClient.request(query, variables);
  return data.getNode;
}

export const getPrice = async () => {
  const data = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=pocket-network&vs_currencies=usd');
  return data.data['pocket-network'].usd;
}
