import React from 'react'
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client'
// import {createHttpLink} from 'apollo-link-http'
import { setContext } from '@apollo/client/link/context'
import App from './App.js'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

