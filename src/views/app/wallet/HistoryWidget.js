import React, { useEffect, useState } from "react";
import {
  VStack,
  Button,
  Text,
  Input,
  Box, Menu, MenuButton, MenuList, Flex, MenuItem, Center,
} from '@chakra-ui/react';
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { toHex, truncateAddress } from "helpers/math/utils.js";
import { wcModalIsOpenAtom } from '../../../services/atoms.js';
import { useAtom } from 'jotai';
import { BtnBrandIcon } from '../bits/UtilityTags.js';
import { ItemContent } from '../../../components/Menu/ItemContent.js';
import avatar1 from '../../../assets/img/avatars/avatar1.png';
import avatar2 from '../../../assets/img/avatars/avatar2.png';
import avatar3 from '../../../assets/img/avatars/avatar3.png';
import { MdOutlineHistory } from 'react-icons/md';

export default function HistoryWidget() {
  const {
    library:u_library,
    chainId:u_chainId,
    account:u_account,
    activate:u_activate,
    deactivate:u_deactivate,
    active:u_active
  } = useWeb3React();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  const [wcModalIsOpen, set_wcModalIsOpen] = useAtom(wcModalIsOpenAtom);

  const resetState = () => {
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    // if (provider) activate(connectors[provider]); //auto-activate onload
  }, []);

  useEffect(() => {
    if(wcModalIsOpen)resetState()
  }, [wcModalIsOpen]);

  return (
    <Menu id='NotifsMenu'>
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
          <MenuItem borderRadius="8px" mb="10px">
            <ItemContent
              time="13 minutes ago" info="from Alicia"
              boldInfo="New Message" aName="Alicia" aSrc={avatar1}
            />
          </MenuItem>
          <MenuItem borderRadius="8px" mb="10px">
            <ItemContent
              time="2 days ago" info="by Josh Henry"
              boldInfo="New Album" aName="Josh Henry" aSrc={avatar2}
            />
          </MenuItem>
          <MenuItem borderRadius="8px">
            <ItemContent
              time="3 days ago" info="Payment succesfully completed!"
              boldInfo="" aName="Kara" aSrc={avatar3}
            />
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
}
