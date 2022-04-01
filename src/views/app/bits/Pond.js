import {
  Box, Center,
  StylesProvider,
  useMultiStyleConfig,
  useStyles, chakra, Button
} from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { usePondLinkStore } from '../../../services/usePondLinkStore.js';

const PondStyleConfig = {
  parts: ['Pond','PondHeader','PondBody'],
  baseStyle: {
    Pond:{
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "fit-content",
      height: 'fit-content',
      px: "1.2rem",
      pt: "0",
      pb: "1.2rem",
      minWidth: "150px",
      maxWidth: "380px",
      wordWrap: "break-word",
      backgroundColor: 'global.panel',
      borderRadius:'panelsRadius',
      backgroundClip: "border-box",
      overflow:'hidden',
      justifySelf:'center',
    },
    PondHeader:{
      mt: '5px',
      fontFamily: 'rale',
      fontSize: '1.3rem',
      fontWeight: 'rale.heavy',
    },
    PondBody:{
      display: "flex",
      width: "100%",
      fontFamily: 'mont',
      fontSize: '0.9rem',
      fontWeight: 'mont.medium',
    },
  },
  sizes: {
    sm: {
      Pond:{},
      PondHeader:{fontSize: '1.4rem',},
      PondBody:{fontSize: '0.875rem',},
    },
    md: {
      Pond:{},
      PondHeader:{},
      PondBody:{},
    },
  },
  variants: {
    alignCenter: {
      Pond:{
        alignItems: 'center',
        justifyContent: 'center',
      },
      PondHeader:{
        alignItems: 'center',
        justifyContent: 'center',
      },
      PondBody:{
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  defaultProps: {
  },
};

export function Pond(props) {
  const { size,variant, children,pondLink, ...rest } = props;
  const styles = useMultiStyleConfig("Pond", { size,variant });
  const [pageName,pondName] = pondLink;
  // const pondTag = usePondLinkStore(s => {
  //   return s[pageName].tags[pondName];
  // });
  const pondTag = usePondLinkStore(useCallback(
    s => s[pageName].tags[pondName], [pageName,pondName])
  )

  const minBarStyle = {
    w:'100%', h:'1rem', bgColor:'bog.500', opacity:'.4',borderRadius:'0 0 5px 5px'
  }
  const minBStyle = {
    background: 'linear-gradient(to top left, #fff0 calc(50% - 1px), #aaa, #fff0 calc(50% + 1px) )',
    width: '7px',
    height: '10px'
  }
  const minHr = {
    position:'relative',
    // _hover:{bgColor:'#fff'},
    w:'70%',
    ':before': {
      content: '" "', display: 'block', position: 'absolute',
      background: 'linear-gradient(to top right, #fff0 calc(50% - 1px), #aaa6, #fff0 calc(50% + 1px) )',
      w: '12px', h: '12px', left: '-12px', bottom: '-6px'
    },
    ':after': {
      content: '" "', display: 'block', position: 'absolute',
      background: 'linear-gradient(to top left, #fff0 calc(50% - 1px), #aaa6, #fff0 calc(50% + 1px) )',
      w: '12px', h: '12px', right: '-12px', top: '-6px'
    }
  }
  const minimize=()=>{usePondLinkStore.getState().plinkMinimize(pageName,pondName)}
  return (!pondTag||!pondTag.plinkify) &&
    (<Box __css={styles.Pond} {...rest}>
        <Center as={Button} {...minBarStyle} onClick={minimize}>
          <chakra.hr sx={minHr}/>
        </Center>
      <StylesProvider value={styles}>
        {children}
      </StylesProvider>
    </Box>);
}

export function PondHeader(props) {
  const styles = useStyles();
  return <Box __css={styles.PondHeader} {...props}/>;
}
export function PondBody(props) {
  const styles = useStyles();
  return <Box __css={styles.PondBody} {...props}/>;
}

export const PondComponent = {
  components: {
    Pond: PondStyleConfig,
  },
};


