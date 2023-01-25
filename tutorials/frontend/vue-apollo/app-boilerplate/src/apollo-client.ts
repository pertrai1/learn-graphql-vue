import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core"
import { getMainDefinition } from "@apollo/client/utilities"
import { onError } from "@apollo/client/link/error"
import { logErrorMessages } from "@vue/apollo-util"

function getHeaders() {
  const headers = {}
  const token = window.localStorage.getItem("apollo-token")
  if (token) {
    headers["authorization"] = `Bearer ${token}`
  }
  return headers
}

const httpLink = new HttpLink({
  uri: "https://hasura.io/learn/graphq",
  fetch: (uri: RequestInfo, options: RequestInit) => {
    options.headers = getHeaders()
    return fetch(uri, options)
  }
})

const errorLink = onError((error) => {
  if (process.env.NODE_ENV !== "production") {
    logErrorMessages(error)
  }
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(httpLink)
})
