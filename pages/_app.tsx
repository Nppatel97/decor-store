import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CartContextProvider, StateContextProvider } from "../utils/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <StateContextProvider>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </StateContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
