import "./index.css";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./app/store";
import theme from "./app/themes";
import reportWebVitals from "./reportWebVitals";

/* eslint-disable react/no-deprecated*/
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={"light"} />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);

reportWebVitals();
