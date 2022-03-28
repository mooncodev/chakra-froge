import { Box, extendTheme, useStyleConfig } from '@chakra-ui/react';
import { MainPanelComponent } from '../../../theme/additions/layout/MainPanel.js';

const _Pond = {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    p: "22px",
    minWidth: "0px",
    wordWrap: "break-word",
    backgroundClip: "border-box",
    overflow:'hidden',
  },
  variants: {
    panel: (props) => ({
      bg: props.colorMode === "dark" ? "gray.800" : "white",
      width: "100%",
      boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
      borderRadius: "15px",
    }),
  },
  defaultProps: {
    variant: "panel",
  },
};
const _PondHeader = {
  baseStyle: {
    display: "flex",
    width: "100%"
  },
};
const _PondBody = {
  baseStyle: {
    display: "flex",
    width: "100%",
  },
};

export function Pond(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Pond", { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export function PondHeader(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("PondHeader", { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export function PondBody(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("PondBody", { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export const PondComponent = {
  components: {
    Pond: _Pond,
    PondHeader: _PondHeader,
    PondBody: _PondBody,
  },
};


