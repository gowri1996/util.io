import { mode } from "@chakra-ui/theme-tools";

const button = {
  variants: {
    solid: (props) => {
      const bg = mode("#15847B", "#0BCBBB")(props);
      const hoverBg = mode("#0A423E", "#9EFAF2")(props);
      const color = mode("#FFFFFF", "#083532")(props);
      return {
        bg,
        _active: {
          bg,
          borderColor: color,
        },
        _focus: {
          bg,
          borderColor: color,
          boxShadow: `0 0 0 1px ${color}`,
        },
        _hover: {
          bg: hoverBg,
          _disabled: {
            bg,
            opacity: 0.5,
          },
        },
        _disabled: {
          bg,
          opacity: 0.5,
        },
        color,
      };
    },
    danger: (props) => {
      const bg = mode("#DE3737", "#E84F4F")(props);
      const hoverBg = mode("#611D1D", "#EB7F7F")(props);
      const color = mode("#FFFFFF", "#083532")(props);
      return {
        bg,
        _active: {
          bg,
          borderColor: color,
        },
        _focus: {
          bg,
          borderColor: color,
          boxShadow: `0 0 0 1px ${color}`,
        },
        _hover: {
          bg: hoverBg,
          _disabled: {
            bg,
            opacity: 0.5,
          },
        },
        _disabled: {
          bg,
          opacity: 0.5,
        },
        color,
      };
    },
    icon: () => {
      return {
        bg: "transparent",
        _focus: {
          borderColor: "transparent",
          boxShadow: "0 0 0 1px transparent",
        },
      };
    },
    "header-menu-icon": () => {
      return {
        bg: "transparent",
        _focus: {
          borderColor: "transparent",
          boxShadow: "0 0 0 1px transparent",
        },
        color: "#FFFFFF",
      };
    },
  },
};

export default button;
