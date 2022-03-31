import React, { useEffect, useState } from "react";
import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box,
  Portal,
  MenuButton,
  Menu,
  Flex,
  MenuItem,
  MenuList,
  Image,
  Grid,
  Icon,
  AccordionItem,
  Accordion, AccordionButton, AccordionIcon, AccordionPanel, Center
} from '@chakra-ui/react';
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./networks.js";
import { connectors } from "./connectors.js";
import { toHex, truncateAddress } from "helpers/math/utils.js";
import { useW3Store, wcModalIsOpenAtom } from '../../../services/atoms.js';
import { useAtom } from 'jotai';
import LogoCoinbaseWallet from './assets/LogoCoinbaseWallet.png';
import LogoWalletConnect from './assets/LogoWalletConnect.png';
import LogoMetaMask from './assets/LogoMetaMask.png';
import { MdOutlinePrivateConnectivity } from 'react-icons/md';
import { GrConnect } from 'react-icons/gr';
import { first4, last4, surr4s } from '../../../helpers/math/zmath.mjs';
import { FaEthereum } from 'react-icons/fa';
import BoxSignSetVerify from './BoxSignSetVerify.js';
import { BtnBrandIcon, BtnConnectWallet, ConnectWalletNavButton } from '../bits/UtilityTags.js';
import { mont } from '../../../theme/foundations/fonts.js';

export default function W3RApp() {
  const {
    u_library,
    u_chainId,
    u_account,
    u_activate,
    u_deactivate,
    u_active
  } = useW3Store();
  const [error, setError] = useState("");
  const [userDesiredChainId, set_userDesiredChainId] = useState(undefined);
  const [wcModalIsOpen, set_wcModalIsOpen] = useAtom(wcModalIsOpenAtom);


  const handle_userDesiredChainId = (e) => {
    const id = e.target.value;
    set_userDesiredChainId(Number(id));
  };
  const switch_userDesiredChainId = async () => {
    await u_library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(u_chainId) }]
    }).then((switchSuccess)=>{})
    .catch(async (switchError)=>{
      if (switchError.code === 4902) {
        await u_library.provider.request({
          method: "wallet_addEthereumChain",
          params: [networkParams[toHex(u_chainId)]]
        }).then((addSuccess)=>{})
        .catch((addError)=>{setError(addError);});
      }
    });
  };
  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
    set_userDesiredChainId("");
  };

  const disconnect = () => {
    refreshState();
    u_deactivate();
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    // if (provider) u_activate(connectors[provider]); //auto-activate onload
  }, []);

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  const onClickWCBrand = (brand)=>{
    if(brand==='WC'){
      u_activate(connectors.walletConnect);
      setProvider("walletConnect");
      set_wcModalIsOpen(false)
    }
    if(brand==='MM'){
      u_activate(connectors.injected);
      setProvider("injected");
      set_wcModalIsOpen(false)
    }
    if(brand==='CBW'){
      u_activate(connectors.coinbaseWallet);
      setProvider("coinbaseWallet");
      set_wcModalIsOpen(false)
    }
  }

  return (
    <Menu id='ConnectWalletMenu' backgroundColor="transparent">
      <MenuButton onClick={()=>set_wcModalIsOpen(true)} id='WCButton'>
        <ConnectWalletNavButton/>
      </MenuButton>
      <MenuList p="16px 8px" opacity='0.7'>
        {/* <MenuItem borderRadius="8px" mb="10px"></MenuItem> */}

        <VStack opacity='0.7'>
          {u_active
            ?(<Button onClick={()=>disconnect()}>Disconnect</Button>)
            :(<><Button variant="outline" w="100%"
                         onClick={() => onClickWCBrand('CBW')}>
                <Image src={LogoCoinbaseWallet} boxSize={26} mr={2}/>
                <Text>Coinbase Wallet</Text>
              </Button>
                <Button variant="outline" w="100%"
                        onClick={() => onClickWCBrand('WC')}>
                  <Image src={LogoWalletConnect} boxSize={26} mr={2}/>
                  <Text>Wallet Connect</Text>
                </Button>
                <Button variant="outline" w="100%"
                        onClick={() => onClickWCBrand('MM')}>
                  <Image src={LogoMetaMask} boxSize={26} mr={2}/>
                  <Text>Metamask</Text>
                </Button></>
              )}
        </VStack>

        <Box justifyContent="center" alignItems="center" mt={4} opacity='0.7'>
          {u_active && (
            <Box justifyContent="flex-start" alignItems="center">
              <Accordion allowToggle colorScheme='green'>
                <AccordionItem opacity='0.7'>
                  <h2>
                    <AccordionButton _expanded={{ bgColor: 'blue.400' }} _focus={{ boxShadow: "none" }}>
                      <Box flex='1' fontSize={13}>
                        Connection Details
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <HStack>
                      <Text fontSize='xs'>Connection Status:</Text>
                      {u_active ? (<CheckCircleIcon color="green"/>):(<WarningIcon color="red"/>)}
                    </HStack>
                    <Text>Account:</Text>
                    <Text color={'#00ff00'}>{u_account&&surr4s(u_account)}</Text>
                    <Text>{`Network ID: ${u_chainId ? u_chainId : "No Network"}`}</Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem opacity='0.7'>
                  <h2>
                    <AccordionButton _expanded={{ bgColor: 'blue.400' }}
                                     _focus={{ boxShadow: "none" }} opacity='0.7'>
                      <Box flex='1' textAlign='left'>
                        Switch Network
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}  justifyContent="space-evenly">
                    <HStack>
                      <Button h={100} onClick={switch_userDesiredChainId}><FaEthereum as={Icon}/>&nbsp;Mainnet</Button>
                      <VStack>
                        <Button size='xs' onClick={switch_userDesiredChainId}><FaEthereum as={Icon}/>&nbsp;Ropsten</Button>
                        <Button size='xs' onClick={switch_userDesiredChainId}><FaEthereum as={Icon}/>&nbsp;Rinkeby</Button>
                        <Button size='xs' onClick={switch_userDesiredChainId}><FaEthereum as={Icon}/>&nbsp;Kovan</Button>
                      </VStack>
                    </HStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem opacity='0.7'>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton _expanded={{ bgColor: 'blue.400' }} _focus={{ boxShadow: "none" }}>
                          <Box flex="1" textAlign="left">
                            Sign, Set, Verify Message
                          </Box>
                          <AccordionIcon/>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel sx={{
                        border:isExpanded ? '1px' : 'none',
                        borderColor:isExpanded ? 'green' : 'transparent',
                      }} pb={4} justifyContent="space-evenly">
                        <BoxSignSetVerify/>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </Box>
          )}
          <Text maxW='150px' color='#A00'>{error ? error.message : null}</Text>
        </Box>
      </MenuList>
    </Menu>
  );
}
