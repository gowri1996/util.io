import { extendTheme } from "@chakra-ui/react";

import breakpoints from "./breakpoint";
import button from "./components/button";
import input from "./components/input";
import link from "./components/link";
import modal from "./components/modal";
import select from "./components/select";
import spinner from "./components/spinner";
import textarea from "./components/textarea";
import { global } from "./styles";

export default extendTheme({
  breakpoints,
  styles: {
    global,
  },
  components: {
    Spinner: spinner,
    Link: link,
    Input: input,
    NumberInput: input,
    Button: button,
    Modal: modal,
    Textarea: textarea,
    Select: select,
  },
  config: { useSystemColorMode: false, initialColorMode: "light" },
});
