import { mode } from '@chakra-ui/theme-tools';

const link = {
  baseStyle: (props) => {
    const color = mode('#15847B', '#00C7B6')(props);
    return {
      color,
    };
  },
};

export default link;
