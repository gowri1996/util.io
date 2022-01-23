import { mode } from '@chakra-ui/theme-tools';

const spinner = {
  baseStyle: (props) => {
    const color = mode('green.200', 'green.900')(props);
    return {
      emptyColor: 'gray.200',
      color,
    };
  },
};

export default spinner;
