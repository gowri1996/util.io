import { mode } from "@chakra-ui/theme-tools";

const modal = {
  baseStyle: (props) => {
    const bg = mode("#FCFCFC", "#181818")(props);
    return {
      dialog: {
        bg,
        borderRadius: "md",
        zIndex: "modal",
        width: {
          xs: "85%",
          sm: "100%",
        },
      },
      closeButton: {
        _active: {
          borderColor: bg,
        },
        _focus: {
          borderColor: bg,
        },
        color: "red",
      },
    };
  },
};

export default modal;
