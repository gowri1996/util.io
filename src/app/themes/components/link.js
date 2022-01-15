import { mode } from '@chakra-ui/theme-tools';

const link = {
  baseStyle: (props) => {
    const color = mode('blue.700', 'blue.500')(props);
    return {
      color,
    };
  },
};

export default link;
