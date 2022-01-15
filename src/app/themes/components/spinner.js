import ThemeConstants from '../../../constants/ThemeConstants';
import { mode } from '@chakra-ui/theme-tools';

const spinner = {
  baseStyle: (props) => {
    const color = mode(
      ThemeConstants.LIGHT_THEME_PRIMARY_COLOR,
      ThemeConstants.DARK_THEME_PRIMARY_COLOR
    )(props);
    return {
      emptyColor: 'gray.200',
      color,
    };
  },
};

export default spinner;
