import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useCycle, useMotionValue, useTransform } from 'framer-motion';
import {
  VStack, useDisclosure, Button, Text, HStack, Select, Input, Box, Portal,
  MenuButton, Menu, Flex, MenuItem, MenuList, Image, Grid, Icon, chakra,
  Accordion,AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
  Center, FormLabel, Switch, FormControl, Tooltip, ListItem, UnorderedList,
  useToken, useOutsideClick
} from '@chakra-ui/react';
// import { useWeb3React } from "@web3-react/core";
import {
  ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon,
  CheckCircleIcon, CloseIcon,
  MinusIcon,
  PlusSquareIcon,
  WarningIcon
} from '@chakra-ui/icons';
import { networkParams } from "./networks.js";
import { connectors } from "./connectors.js";
import { toHex, truncateAddress } from "helpers/math/utils.js";
import { useUserStore, useW3Store } from 'services/index.js';
import { first4, last4, surr4s } from '../../helpers/math/zmath.mjs';
import LogoCoinbaseWallet from './assets/LogoCoinbaseWallet.png';
import LogoWalletConnect from './assets/LogoWalletConnect.png';
import LogoMetaMask from './assets/LogoMetaMask.png';
import {
  MdAdminPanelSettings,
  MdOutlineHistory,
  MdOutlinePrivateConnectivity
} from 'react-icons/md';
import { FaEllipsisV, FaEthereum, FaNetworkWired } from 'react-icons/fa';
import { GrConnect } from 'react-icons/gr';
import { TbNetwork } from 'react-icons/tb';
import { isFirefox } from 'react-device-detect';
// import BoxSignSetVerify from './BoxSignSetVerify.js';
import {
  HFlex,HFlexCC,HFlexSC,S,TextXs,VFlex,VFlexCC,VFlexCS
} from '../../views/common/UtilityTags.js';
import { GiGearHammer } from 'react-icons/gi';
import { useAppStore } from '../../services/useAppStore.js';
import { ConnectWalletNavButton } from './ConnectWalletNavButton.js';
import { useWalletStore } from '../useWalletStore.js';
import { SvgIcon } from './SvgIcon.js';
import { chainsMeta } from '../core/chainsMeta.js';
import { abs } from '../../views/common/cssHelpers.js';
import MessageNoInjectedFound from './MessageNoInjectedFound.js';
const sxBase = { backgroundColor: isFirefox?'rgba(0,0,0,.9)':'rgba(0,0,0,0)',
  backdropFilter:"brightness(40%) saturate(300%) blur(3px)", width:'275px', overflow:'hidden', };

const HistoryButton=()=>(<Center id="HistoryIcon" __css={{ color: 'global.bg', bgColor: 'bog.850',
      h: '2rem', w: '2rem', p: '3px', borderRadius: '7px', _hover:{ bgColor: 'bog.700', },
    }}><MdOutlineHistory size={23}/></Center>)

/** STORE FUNCTIONS **/
const getWalletByName=(name)=>useWalletStore.getState().wallets.find(v=>v.name===name)

const disconnect = () => {};

const wallet_watchAsset = (walletName) => {
  (useWalletStore.getState().wallets.find(v=>v.name===walletName)).request.eth_requestAccounts()
};
const eth_chainId = (walletName) => {
  (useWalletStore.getState().wallets.find(v=>v.name===walletName)).request.eth_requestAccounts()
};
const eth_requestAccounts = (walletName) => {
  (useWalletStore.getState().wallets.find(v=>v.name===walletName)).request.eth_requestAccounts()
};
const eth_accounts = (walletName) => {
  (useWalletStore.getState().wallets.find(v=>v.name===walletName)).request.eth_requestAccounts()
};
const wallet_switchEthereumChain = (walletName, chainId) => {
  getWalletByName(walletName).request.wallet_switchEthereumChain(chainId)
};

export default function WalletMenu() {
  // const [error, setError] = useState("");
  const enableLS = useUserStore(s=>s.global.enableLS)
  const wallets = useWalletStore(s=>s.wallets)


  useEffect(() => {
  }, []);

  const openExternalWalletConfigurator = () => {};

  return (
    <Menu id='ConnectWalletMenu'>
      <MenuButton onClick={()=>useAppStore.getState().set_wcModalIsOpen(true)} id='WCButton'>
        <ConnectWalletNavButton/>
      </MenuButton>
      <MenuList p="16px 8px" sx={sxBase}>
        {/* <MenuItem borderRadius="8px" mb="10px"></MenuItem> */}
        {wallets.length
          ? (
            <VStack>
              {wallets.map((wallet, i) => (<WalletWidget wallet={wallet} key={i}/>))}
            </VStack>
          )
          : ( <MessageNoInjectedFound/> )
        }
        <Button size="xs" fontSize='10px' fontWeight='400' onClick={() => openExternalWalletConfigurator()}>
          <Box mr="6px"><PlusSquareIcon boxSize='1.3em'/></Box>
          Add External Wallet
        </Button>

        <Box justifyContent="center" alignItems="center" mt={4} opacity='1'
             backgroundColor= 'rgba(12,21,34,.8)' borderRadius='12px' overflow='hidden'>
          {(
            <Box justifyContent="flex-start" alignItems="center" borderRadius='12px'>
              <Accordion allowToggle colorScheme='green'>

                <AccordionItem opacity='0.7' >
                  {({ isExpanded }) => (<>
                    <h2>
                      <AccordionButton _expanded={{ bgColor: 'bog.500' }}>
                        <HFlexCC gap={4} flex='1' fontSize={13}>
                          <MdAdminPanelSettings size={30}/>
                          <S>Settings</S>
                        </HFlexCC>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel bgColor={isExpanded?'bog.700':'inherit'} pb={4}>
                      <FormControl as={HStack} mb={2} justify='space-between'>
                        <FormLabel htmlFor='email-alerts' mb='0' fontSize='.8rem'>
                          Enable Local Persistence?
                        </FormLabel>
                        <Switch
                          isChecked={!!enableLS}
                          onChange={e=>useUserStore.getState().setGlobalEnableLS(e.target.checked)}
                        />
                      </FormControl>
                      <Button bgColor='blue.800' _hover={{bgColor:'blue.600'}} size={'xs'}  mb={2}
                              onClick={()=>{useUserStore.getState().clearLS()}}>
                        Clear Local Persistence
                      </Button>
                    </AccordionPanel>
                  </>)}
                </AccordionItem>

                <AccordionItem borderBottomWidth='0!important' opacity='0.7' >
                  {({ isExpanded }) => (<>
                    <h2>
                      <AccordionButton _expanded={{ bgColor: 'bog.500' }}>
                        <HFlexCC gap={4} flex='1' fontSize={13}>
                          <MdAdminPanelSettings size={30}/>
                          <S w='min-content'>Centralized Enhancement</S>
                        </HFlexCC>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel bgColor={isExpanded?'bog.700':'inherit'} pb={4}>
                      <Button bgColor='green.600' _hover={{bgColor:'green.500'}} width={'100%'} size={'lg'}  mb={2}>
                        Login <S fontSize={10} fontStyle='italic' fontWeight={200} ml={3}>Centralized<br/>Enhancement</S>
                      </Button>
                      <FormControl as={HStack} mb={2} justify='space-between'>
                        <FormLabel htmlFor='email-alerts' mb='0' fontSize='.8rem'>
                          Enable Login Persistence?
                        </FormLabel>
                        <Switch id='email-alerts' />
                      </FormControl>
                      {/* <BoxSignSetVerify/> */}
                    </AccordionPanel>
                  </>)}
                </AccordionItem>
              </Accordion>
            </Box>
          )}
          {/* <Text maxW='150px' color='#A00'>{error ? error.message : null}</Text> */}
        </Box>

        <WalletContextDrawer/>
      </MenuList>
    </Menu>
  );
}

export function WalletWidget({wallet, ukey}) {
  const ref = React.useRef()

  const openWalletContextDrawer = (wallet) => {
    useWalletStore.getState().set_walletContext(wallet)
    useWalletStore.getState().set_walletContextDrawerIsOpen(true)
  };

  const [isWalletActionsOpen, setIsWalletActionsOpen] = useState(false);
  const colorGreen600 = useToken('colors','green.600')
  useOutsideClick({
    ref: ref,
    handler: () => setIsWalletActionsOpen(false),
  })

  return (
    <chakra.div ref={ref} style={{width:'100%'}}>
      <VFlex key={ukey} sx={{
        borderRadius:'6px', w: '100%', justifyContent:'space-between',
        backgroundColor:'bog.600',position:'relative',
      }}>
        <chakra.div style={{cursor:'pointer',width: '100%'}}
                    onClick={()=>{setIsWalletActionsOpen(!isWalletActionsOpen)}}>
          <HFlex sx={{w:'100%'}}>
            <WalletBrand wallet={wallet} fontSize='14px'/>
            <FaEllipsisV style={{...abs(12,3)}}/>
          </HFlex>
          <HFlex gap={1} width='fit-content'>
            <TbNetwork as={Icon} width={6} height={4} style={{color:colorGreen600}}/>
            <Box flexGrow='1' fontSize={11} fontWeight={200} color='green.400'>{wallet.currentChainLabel}</Box>
            <Image src={wallet.currentChainIcon} boxSize='1rem'/>
          </HFlex>
        </chakra.div>
        <AnimatePresence>
          {isWalletActionsOpen && (
            <motion.div
              className='WalletActions' key={wallet.label}
              style={{  }}
              initial={{ height:0,opacity:0 }} animate={{ height:30,opacity:1,pathLength: 1 }}
              exit={{ height:0,opacity:0 }} transition={{ type:'linear', }}
            >
              <HStack mt={1}>
                <Button size="xs" fontSize='10px' fontWeight='400' onClick={() => useWalletStore.getState().disconnect(wallet)}>
                  <Box sx={{ '& path': { stroke: 'white' } }} mr="6px"><GrConnect/></Box>
                  Disconnect
                </Button>
                <Button size="xs" fontSize='10px' fontWeight='400' onClick={() => eth_requestAccounts(wallet.name)}>
                  <Box mr="6px" boxSize='1.6em'><PlusSquareIcon /></Box>
                  Add Account
                </Button>
                <Button size="xs" fontSize='10px' fontWeight='400' onClick={() => openWalletContextDrawer(wallet)}>
                  <Box mr="6px" boxSize='1.1em'><TbNetwork /></Box>
                  Chain
                </Button>
              </HStack>
            </motion.div>
          )}
        </AnimatePresence>

        { (wallet.accounts &&
          wallet.accounts.length)
          ? (
            wallet.accounts.map((account, ii) => {
              return (
                <HFlexSC key={ii} sx={{
                  borderRadius:'6px', w: '100%',  h:'30px', justifyContent:'space-between',
                  backgroundColor:'bog.800',
                }}>
                  <Box sx={{
                    fontSize:'13px',ml:'5px',px:'4px',backgroundColor:'green.400',borderRadius:'4px',color:'black'
                  }}>
                    {account&&surr4s(account)}
                  </Box>
                  <VFlexCC as={Button} size='xs' style={{ borderRadius:'6px', w: '10px', cursor:'pointer'}}
                           onClick={() => eth_requestAccounts(wallet.name)}>
                    <FaEllipsisV/>
                  </VFlexCC>

                </HFlexSC>
              );
            })
          )
          : (
            <TextXs ml={2}>No accounts connected</TextXs>
          )
        }
        {/*
                    {wallet.accounts || wallet.accounts.length &&
                      wallet.accounts.map((account, ii) => {
                      return (
                        <HFlexSC key={ii} sx={{
                          borderRadius:'6px', w: '100%',  h:'30px', justifyContent:'space-between',
                          backgroundColor:'bog.800',
                        }}>
                          <Box sx={{
                            fontSize:'13px',ml:'5px',
                          }}>{account&&surr4s(account)}</Box>
                          <VFlexCC as={Button} size='xs' style={{ borderRadius:'6px', w: '10px', cursor:'pointer'}}>
                            <MinusIcon h='85%' m='0 auto' onClick={() => eth_requestAccounts(wallet.name)}/>
                          </VFlexCC>

                        </HFlexSC>
                      );
                    })}
*/}

      </VFlex>
    </chakra.div>
  );
}


export const WalletContextDrawer = () => {

  const walletContextDrawerIsOpen = useWalletStore(s=>s.walletContextDrawerIsOpen)
  const walletContext = useWalletStore(s=>s.walletContext) //todo: impl useCallback here
  const ref = React.useRef()

  const onClose = ()=>{useWalletStore.getState().set_walletContextDrawerIsOpen(false)}
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  })
  return (
    <AnimatePresence>
      {walletContextDrawerIsOpen && (
        <motion.div
          ref={ref}
          className='WalletContextDrawer' key={walletContext.label}
          style={{ ...abs(0,0,0,0), display:'flex', justifyContent:'right',
            backgroundColor:'rgba(0,0,0,.8)', overflow:'hidden' }}
          initial={{ x:275 }} animate={{ x:0,pathLength: 1 }}
          exit={{ x:275 }} transition={{ ease: [0.1, 0.97, .1, 0.97], }}
        >
          <VStack width='260px' sx={{bgColor:'bog.800'}} ml={1}>
            <HFlex>
              <WalletBrand wallet={walletContext}/>
              <Flex alignSelf='end' mr={1} mt={1}>
                <Button boxSize='2rem' onClick={onClose}><CloseIcon/></Button>
              </Flex>
            </HFlex>
            <TextXs textAlign='center'>Switch Chain: </TextXs>
            <VFlex style={{overflowY:'scroll'}} gap={1.5} w='100%'>
              {chainsMeta.map((v,i)=> {
                return (
                  v.chainId!=='0x0'&&(
                      <Button key={i} p="3px" w='100%' onClick={() => {
                        wallet_switchEthereumChain(walletContext.name, v.chainId)
                      }} fontSize="12px" fontWeight="400">
                        <ChainBrand chain={v}/>
                      </Button>
                  )
                );
              })}
            </VFlex>
          </VStack>
        </motion.div>
      )}
    </AnimatePresence>
  )
};

export const WalletBrand = ({ wallet, fontSize }) => (
  <HFlexCC>
    <SvgIcon svg={wallet.icon}/>
    <Box maxW='max-content' ml='0.3rem' fontSize={fontSize}>{wallet.label}</Box>
  </HFlexCC>
);
export const ChainBrand = ({ chain }) => (
  <HFlexCC>
    <SvgIcon svg={chain.icon}/>
    <Box maxW='max-content' ml='0.3rem'>{chain.label}</Box>
  </HFlexCC>
);
