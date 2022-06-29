import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./style/Global";
import store from "./store/";
import { Provider } from "react-redux";
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "http://localhost:2046/graphql",
  }),
  // headers: {
  //   authorization: localStorage.getItem('token') || ''
  // }
});

ReactDOM.render(
  <>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
