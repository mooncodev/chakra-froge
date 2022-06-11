import React from "react";
import { Button, Center, Flex, } from '@chakra-ui/react';
import WalletMenu from '../wallet/WalletMenu.js';
import { useDeviceMode } from '../../../theme/foundations/breakpoints.js';
import HistoryWidget from '../wallet/HistoryWidget.js';
import { CISVG_FrogeNavBack } from '../../../assets/FrogeBrand.js';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useAppStore } from '../../../services/useAppStore.js';


export default function AppNavControls(props) {
  const [isMobile, isDesktop] = useDeviceMode()

  return (
    <Flex id='FCB-AppNavbarLinks'
      pe={{ sm: "0px", md: "16px" }} w={{ sm: "100%", md: "auto" }}
      alignItems="center" flexDirection="row" gap={isMobile?'1.2rem':'.8rem'}
    >


      <WalletMenu/>

      <HistoryWidget/>
      {isMobile && (
        <Center id="AppMenuIcon"
                onClick={() => useAppStore.getState().set_appNavDrawerOpen(!useAppStore.getState().appNavDrawerOpen)}
                cursor='pointer'
                __css={{
                  color: 'global.bg',
                  bgColor: 'brand.green',
                  h: '2rem',
                  w: '2rem',
                  borderRadius: '7px',
                  _hover:{ bgColor: 'brand.ltgreen', },
                }}>
          <HamburgerIcon boxSize={5}/>
        </Center>
      )}
    </Flex>
  );
}

