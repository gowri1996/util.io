import { mode } from '@chakra-ui/theme-tools';

export const global = (props) => {
  return {
    body: {
      bg: mode('#EDEEEF', '#121212')(props),
      color: mode('#121212', '#D3D3D3')(props),
      overflowX: 'hidden',
    },
  };
};
