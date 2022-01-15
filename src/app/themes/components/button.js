import ThemeConstants from '../../../constants/ThemeConstants';
import { mode } from '@chakra-ui/theme-tools';

const button = {
  variants: {
    solid: (props) => {
      const bg = mode(
        ThemeConstants.LIGHT_THEME_PRIMARY_COLOR,
        ThemeConstants.DARK_THEME_PRIMARY_COLOR
      )(props);
      const hoverBg = mode(
        ThemeConstants.LIGHT_THEME_PRIMARY_HOVER_COLOR,
        ThemeConstants.DARK_THEME_PRIMARY_HOVER_COLOR
      )(props);
      const color = mode('#121212', '#F8F8F8')(props);
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
      const color = mode('#121212', '#F8F8F8')(props);
      const bg = mode(
        ThemeConstants.LIGHT_THEME_DANGER_COLOR,
        ThemeConstants.DARK_THEME_DANGER_COLOR
      )(props);
      const hoverBg = mode(
        ThemeConstants.LIGHT_THEME_DANGER_HOVER_COLOR,
        ThemeConstants.DARK_THEME_DANGER_HOVER_COLOR
      )(props);
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
  },
};

export default button;
