import { mode } from '@chakra-ui/theme-tools';

const select = {
  baseStyle: (props) => {
    return {
      field: {
        bg: 'transparent',
        borderWidth: 2,
        borderStyle: 'solid',
        _active: {
          zIndex: 1,
          borderColor: mode('#339933', '#0BCBBB')(props),
        },
        _hover: {
          zIndex: 1,
          borderColor: mode('#339933', '#0BCBBB')(props),
        },
        _focus: {
          zIndex: 1,
          borderColor: mode('#339933', '#0BCBBB')(props),
        },
      },
    };
  },
  defaultProps: {
    variant: null, // null here
  },
};

export default select;
