import { getColor, mode } from '@chakra-ui/theme-tools';

import ThemeConstants from '../../../constants/ThemeConstants';

const input = {
  variants: {
    outline: (props) => {
      const color = mode(
        ThemeConstants.LIGHT_THEME_PRIMARY_COLOR,
        ThemeConstants.DARK_THEME_PRIMARY_COLOR
      )(props);
      const rawColor = getColor(props.theme, color);
      return {
        field: {
          _focus: {
            zIndex: 1,
            borderColor: color,
            boxShadow: `0 0 0 1.5px ${rawColor}`,
          },
          _active: {
            zIndex: 1,
            borderColor: color,
            boxShadow: `0 0 0 1.5px ${rawColor}`,
          },
        },
      };
    },
  },
};

export default input;
