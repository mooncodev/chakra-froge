import React, { useCallback, useEffect, useState } from 'react';
import {
  VStack,chakra,
  Button,
  Text,
  Input,
  Box, Menu, MenuButton, MenuList, Flex, MenuItem, Center, Icon,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { toHex, truncateAddress } from "helpers/math/utils.js";
import { useAtom } from 'jotai';
import { BtnBrandIcon } from '../bits/UtilityTags.js';
import { HistoryItem } from './HistoryItem.js';
import { MdOutlineHistory } from 'react-icons/md';
import { GrTransaction } from 'react-icons/gr';
import { CITxStatusGreen, CITxStatusYellow, CITxStatusRed } from 'assets/FrogeBrand.js';
import { wcModalIsOpenAtom, useUserStore, useW3Store } from 'services';

const sxStatusIcon = {
  color:'bog.150',
  mr:'.8rem',
  bgColor:'bog.800',
  borderRadius:'8rem',
  p:'.4rem', w:'2rem', h:'2rem',
  '& path':{stroke:'bog.300'},
}
const H_SUCCESS='Transaction Succeeded';
const H_CANCELLED='Transaction Cancelled';
const H_FAILED='Transaction Failed';
const TxStatusGreen = ()=>(<CITxStatusGreen sx={sxStatusIcon}/>)
const TxStatusYellow = ()=>(<CITxStatusRed sx={sxStatusIcon}/>)
const TxStatusRed = ()=>(<CITxStatusYellow sx={sxStatusIcon}/>)
const mockHistory = [
  {msg:H_SUCCESS,icon:TxStatusGreen,time:'5 hours ago'},
  {msg:H_CANCELLED,icon:TxStatusRed,time:'2 days ago'},
  {msg:H_FAILED,icon:TxStatusYellow,time:'4 days ago'},
]

export default function HistoryWidget() {
  const u_chainId= useW3Store(s=>s.u_chainId);
  const u_account= useW3Store(s=>s.u_account);
  const u_active= useW3Store(s=>s.u_active);

  const history = useUserStore(useCallback(s=>s.users[u_account]?s.users[u_account].history:{}, [u_account]))

  const resetState = () => {
  };

  useEffect(async () => {
    if(u_active){
      // await useUserStore.getState().syncHistory()
    }
  }, [u_account])


  return (
    <Menu id='NotifsMenu' colorScheme={'green'}>
      <MenuButton id='NotifsButton'>
        <Center id="BtnBrandIcon"
                __css={{
                  color: 'global.bg',
                  bgColor: 'brand.green',
                  h: '2rem', w: '2rem', p: '3px',
                  borderRadius: '7px',
                }} ><MdOutlineHistory size={25}/></Center>
      </MenuButton>
      <MenuList p="16px 8px">
        <Flex flexDirection="column">
          {Object.values(history).sort((a,b)=>{ a.t_created - b.t_created}).map((v,i)=>
            <MenuItem key={i} borderRadius="8px" mb="10px">
              <HistoryItem
                msg={v.msg} time={v.time} icon={v.icon}
              />
            </MenuItem>
          )}
        </Flex>
      </MenuList>
    </Menu>
  );
}
