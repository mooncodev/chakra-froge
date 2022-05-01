import React from "react";
import { Button, Center, Flex, } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import WalletMenu from '../wallet/WalletMenu.js';
import { useDeviceMode } from '../../../theme/foundations/breakpoints.js';
import HistoryWidget from '../wallet/HistoryWidget.js';
import { appNavDrawerOpenAtom } from '../../../services/atoms.js';
import { CISVG_FrogeNavBack } from '../../../assets/FrogeBrand.js';
import { HamburgerIcon } from '@chakra-ui/icons';


export default function AppNavControls(props) {
  const [isMobile, isDesktop] = useDeviceMode()
  const [get_appNavDrawerOpen, set_appNavDrawerOpen] = useAtom(appNavDrawerOpenAtom)

  return (
    <Flex id='FCB-AppNavbarLinks'
      pe={{ sm: "0px", md: "16px" }} w={{ sm: "100%", md: "auto" }}
      alignItems="center" flexDirection="row" gap={isMobile?'1.2rem':'.8rem'}
    >


      <WalletMenu/>

      <HistoryWidget/>
      {isMobile && (
        <Center id="AppMenuIcon"
                onClick={() => set_appNavDrawerOpen(!get_appNavDrawerOpen)}
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

