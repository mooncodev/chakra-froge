import { useUserStore, useW3Store } from '../../services/index.js';
import { mont } from '../../theme/foundations/fonts.js';
import { Center, Icon, Text, VStack } from '@chakra-ui/react';
import { last4, sIs0 } from '../../helpers/math/zmath.mjs';
import { FaEthereum } from 'react-icons/fa';
import { GrConnect } from 'react-icons/gr';
import { MdOutlinePrivateConnectivity } from 'react-icons/md';
import React from 'react';
import { S } from '../../views/common/UtilityTags.js';

export const ConnectWalletNavButton = ({
  active,
  children,
  ...rest
}) => {
  const u_chainId = useW3Store(s => s.u_chainId);
  const u_account = useW3Store(s => s.u_account);
  const u_active = useW3Store(s => s.u_active);
  const ethBal = useUserStore(s => {
    return s.users[u_account] ? s.users[u_account].ethBal : ['', '', ''];
  });
  const buttonStyle = {
    color: 'global.bg',
    bgColor: 'brand.green',
    h: '1.8rem',
    w: 'auto',
    py: '0',
    px: '8px',
    borderRadius: '25px',
    boxShadow: `hsl(73deg 100% 53%) 1px 1px 5px 0px inset, hsl(83deg 45% 18%) -1px -1px 5px 0px inset`,
    ...mont.hv.md
  };
  const statusIconStyle = {
    backgroundColor: 'brand.green',
    borderRadius: '7px',
    w: '26px',
    h: '23px',
    mx: '4px',
    boxShadow: 'hsl(76deg 100% 61%) 1px 1px 2px 0px, hsl(93deg 28% 27%) -1px -1px 8px 0px inset'
  };
  const ethBalStyle = {
    ...mont.bd.sm,
    px: '5px'
  };
  return (
    <Center id="CWButton" __css={buttonStyle}>
      {!sIs0(ethBal[0]) && u_active && (
        <FaEthereum as={Icon}/>
      )}
      {!sIs0(ethBal[0]) && u_active && (
        <VStack __css={ethBalStyle}>
          <S lineHeight="12px" {...mont.bd.sm}>{ethBal[1]}</S>
          <S lineHeight="11px" {...mont.md.xs}>${ethBal[2]}</S>
        </VStack>
      )}
      <Center id="BtnStatusIcon" __css={statusIconStyle}>
        {!u_active ? (<GrConnect size="20px"/>) : (<MdOutlinePrivateConnectivity size="20px"/>)}
      </Center>
      {!u_active ? (
        <Text userSelect="none"> Connect Wallet</Text>
      ) : (
        <Text fontSize={12}> {u_account && last4(u_account)}</Text>
      )}
    </Center>
  );
};
