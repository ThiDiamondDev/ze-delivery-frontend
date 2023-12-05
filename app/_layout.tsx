//import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Slot, useRouter } from "expo-router";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { usePathname } from "expo-router";
import React from "react";
import { AddressContextProvider } from "../providers/AddressProvider";
import { ProductsProvider as ProductsContextProvider } from "../providers/ProductsProvider";

const client = new ApolloClient({
  uri: "https://frontend-code-challenge-api.ze.delivery/graphql",
  cache: new InMemoryCache(),
});

export default function Layout() {
  const pathname = usePathname();
  return (
    <AddressContextProvider>
      <ApolloProvider client={client}>
        {pathname === "/" || pathname === "" ? (
          <Slot />
        ) : (
          <ProductsContextProvider>
            <Slot />
          </ProductsContextProvider>
        )}
      </ApolloProvider>
    </AddressContextProvider>
  );
}
