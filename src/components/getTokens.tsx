//import axios, { type AxiosRequestConfig } from "axios"

//// Wallet address
//const address = "0x23874afc3E1992215f08d16ea7490DD8bE56b518" // Replace with your desired address

//// Alchemy URL with your API key
//const baseURL = `https://eth-mainnet.g.alchemy.com/v2/vBwEupHTfqXRo7CLn6GOVIy6g2oZ8i5H` // Replace with your Alchemy API key

//// Data for making the request to query token balances
//const data = {
//  jsonrpc: "2.0",
//  method: "alchemy_getTokenBalances",
//  headers: {
//    "Content-Type": "application/json",
//  },
//  params: [`${address}`],
//  id: 42,
//}

//// Config object for making a request with axios
//const config: AxiosRequestConfig = {
//  method: "post",
//  url: baseURL,
//  headers: {
//    "Content-Type": "application/json",
//  },
//  data: JSON.stringify(data),
//}

//async function getTokens() {
//  // Fetching the token balances
//  let response = await axios(config)
//  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//  response = response.data

//  // Getting balances from the response
//  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//  const balances = response.result

//  // Remove tokens with zero balance
//  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
//  const nonZeroBalances = await balances.tokenBalances.filter(
//    (token: { tokenBalance: number }) => {
//      return token.tokenBalance !== 0
//    },
//  )

//  const tokensData = []

//  // Loop through all tokens with non-zero balance
//  for (const token of nonZeroBalances) {
//    // Get balance of token
//    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
//    let balance = token.tokenBalance

//    // Options for making a request to get the token metadata
//    const options: AxiosRequestConfig = {
//      method: "POST",
//      url: baseURL,
//      headers: {
//        accept: "application/json",
//        "content-type": "application/json",
//      },
//      data: {
//        id: 1,
//        jsonrpc: "2.0",
//        method: "alchemy_getTokenMetadata",
//        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//        params: [token.contractAddress],
//      },
//    }

//    // Getting the token metadata
//    const metadata = await axios.request(options)

//    // Compute token balance in human-readable format
//    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
//    balance = balance / Math.pow(10, metadata.data.result.decimals)
//    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
//    balance = balance.toFixed(2)

//    // Add token data to the result
//    tokensData.push({
//      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
//      name: metadata.data.result.name,
//      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
//      balance: `${balance} ${metadata.data.result.symbol}`,
//    })
//  }

//  return tokensData
//}

//export default getTokens
