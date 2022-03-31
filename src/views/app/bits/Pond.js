import {
  Box,
  StylesProvider,
  useMultiStyleConfig,
  useStyles
} from '@chakra-ui/react';

const PondStyleConfig = {
  parts: ['Pond','PondHeader','PondBody'],
  baseStyle: {
    Pond:{
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "fit-content",
      height: 'fit-content',
      p: "1.2rem",
      minWidth: "0px",
      wordWrap: "break-word",
      backgroundColor: 'global.panel',
      borderRadius:'panelsRadius',
      backgroundClip: "border-box",
      overflow:'hidden',
      justifySelf:[ 'center','center','unset','unset'],
    },
    PondHeader:{
      width: "100%",
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
      Pond:{p: "10px",justifySelf: 'center', },
      PondHeader:{fontSize: '1.4rem',bgColor:'unset'},
      PondBody:{fontSize: '0.875rem',},
    },
    md: {
      Pond:{p: "22px",justifySelf: 'center',},
      PondHeader:{},
      PondBody:{},
    },
  },
  variants: {
    alignCenter: {
      Pond:{
        textAlign:'center',
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
  const { size,variant, children, ...rest } = props;
  const styles = useMultiStyleConfig("Pond", { size,variant });
  return (
    <Box __css={styles.Pond} {...rest}>
      <StylesProvider value={styles}>
        {children}
      </StylesProvider>
    </Box>
  );
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


