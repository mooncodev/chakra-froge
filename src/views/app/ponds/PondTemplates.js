// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  Portal,
  VStack,
  forwardRef,
  Heading,
  Link,
  Stack,
  Progress,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton, Input,
} from '@chakra-ui/react';
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { useCrawlStore, useFxAccountStore, useFxStore } from '../../../services/atoms.js';
import { BtnXs, P, S, TextXs } from '../bits/UtilityTags.js';
import { mont } from '../../../theme/foundations/fonts.js';
import { CopyIcon } from '@chakra-ui/icons';

export function PondTpl_Spotlight(props) {
  // const {pondLink} = props;
  // useEffect(async ()=>{},[])

  return (
    <Pond pondLink={props.pondLink}>
      <PondHeader>Froge XYZ Partnership: Partner!</PondHeader>
      <PondBody>
        <Image src="https://via.placeholder.com/900x320" />
        <Text>
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        </Text>
        <Link textAlign="right">read more</Link>
      </PondBody>
    </Pond>
  );
}
export function PondTpl_Spotlight3(props) {
  // const {pondLink} = props;
  // useEffect(async ()=>{},[])

  return (
    <Pond pondLink={props.pondLink}>
      <PondHeader>Partner Spotlight</PondHeader>
      <PondBody>
        <Text>
          Text value Lorem Ipsum Text value Lorem Ipsum Text value Lorem Ipsum
          Text value Lorem Ipsum Text value Lorem Ipsum Text value Lorem Ipsum
          Text value Lorem Ipsum Text value Lorem Ipsum Text value Lorem Ipsum
          Text value Lorem Ipsum Text value Lorem Ipsum Text value Lorem Ipsum
          Text value Lorem Ipsum Text value Lorem Ipsum Text value Lorem Ipsum
          Text value Lorem Ipsum Text value Lorem Ipsum Text value Lorem Ipsum
          Text value Lorem Ipsum Text value Lorem Ipsum Text value Lorem Ipsum
          Text value Lorem Ipsum{' '}
        </Text>
        <Stack spacing={2} flexDirection="column">
          <Link textAlign="right">read more</Link>
        </Stack>
      </PondBody>
    </Pond>
  );
}
export function PondTpl_List(props) {
  // const {pondLink} = props;
  // useEffect(async ()=>{},[])
  return (
    <Pond pondLink={props.pondLink}>
      <PondHeader>Leaderboard: Texas Frogem</PondHeader>
      <PondBody>
        <HStack spacing={2} justifyContent="space-between">
          <Text>Lefrogeski</Text>
          <Box textAlign="right">
            <Text>3/31/2022</Text>
            <Text>$350</Text>
          </Box>
        </HStack>
        <HStack spacing={2} justifyContent="space-between">
          <Text>OM</Text>
          <Box textAlign="right">
            <Text>3/31/2022</Text>
            <Text>$350</Text>
          </Box>
        </HStack>
        <HStack spacing={2} justifyContent="space-between">
          <Text>Wesley</Text>
          <Box textAlign="right">
            <Text>3/31/2022</Text>
            <Text>$350</Text>
          </Box>
        </HStack>
      </PondBody>
    </Pond>
  );
}
export function PondTpl_Spotlight2(props) {
  // const {pondLink} = props;
  // useEffect(async ()=>{},[])
  return (
    <Pond pondLink={props.pondLink}>
      <PondHeader>Montel Williams</PondHeader>
      <PondBody>
        <HStack spacing={2} justifyContent="space-between">
          <Heading textAlign="center" size="sm">
            The Froge Fighter!
          </Heading>
          <Image boxSize="100px" src="https://via.placeholder.com/200x400"/>
        </HStack>
        <Stack spacing={2} backgroundColor="facebook.200">
          <Heading size="sm">Deathmatch at the Alamo!</Heading>
          <HStack spacing={2}>
            <Box height="min" bgColor="facebook.500" color="whiteAlpha.500">
              <Text>Apr</Text>
              <Text fontSize="2xl">21</Text>
            </Box>
            <Box backgroundColor="facebook.500" color="whiteAlpha.500">
              <Text>Ipsum TText value Lorem Ipsum T</Text>
            </Box>
          </HStack>
        </Stack>
        <Link textAlign="right">read more</Link>
      </PondBody>
    </Pond>
  );
}
export function PondTpl_NFTProduct(props) {
  // const {pondLink} = props;
  // useEffect(async ()=>{},[])
  return (
    <Pond pondLink={props.pondLink}>
      <Image src="https://via.placeholder.com/300x300" />
      <PondHeader textAlign="left" size="md" display="block">
        NFT: FrogeSoFly
      </PondHeader>
      <HStack spacing={2} justifyContent="space-between">
        <Text display="block" justifyContent="flex-end">
          By: Lefrogeski
        </Text>
        <Text display="block" justifyContent="flex-end">
          #/77
        </Text>
      </HStack>
      <Text display="block" justifyContent="flex-end" textAlign="right">
        $180.00
      </Text>
    </Pond>
  );
}
export function PondTpl_Wizard(props) {
  // const {pondLink} = props;
  // useEffect(async ()=>{},[])
  return (
    <Pond pondLink={props.pondLink}>
      <PondHeader textAlign="left" size="md" display="block">
        Xchange
      </PondHeader>
      <Progress value={60} max={100} />
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>step1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>step2</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>step3</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>step4</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Image src="https://via.placeholder.com/300x420" />
    </Pond>
  );
}

export function PondTpl_UpcomingEvts(props) {
  // const {pondLink} = props;
  // useEffect(async ()=>{},[])
  return (
    <Pond pondLink={props.pondLink}>

      <Heading textAlign="center" size="lg">
        Upcoming Events
      </Heading>
      <HStack spacing={2} backgroundColor="facebook.200">
        <Box
          height="min"
          backgroundColor="facebook.500"
          color="whiteAlpha.500"
        >
          <Text>Apr</Text>
          <Text fontSize="2xl">21</Text>
        </Box>
        <Box backgroundColor="facebook.500" color="whiteAlpha.500">
          <Heading as="h3" size="sm">
            Heading title
          </Heading>
          <Text>
            Text valueText value Lorem Ipsum TText value Lorem Ipsum TText
            value Lorem Ipsum T
          </Text>
        </Box>
      </HStack>
      <HStack spacing={2} backgroundColor="facebook.200">
        <Box
          height="min"
          backgroundColor="facebook.500"
          color="whiteAlpha.500"
        >
          <Text>Apr</Text>
          <Text fontSize="2xl">21</Text>
        </Box>
        <Box backgroundColor="facebook.500" color="whiteAlpha.500">
          <Heading as="h3" size="sm">
            Heading title
          </Heading>
          <Text>
            Text valueText value Lorem Ipsum TText value Lorem Ipsum TText
            value Lorem Ipsum T
          </Text>
        </Box>
      </HStack>
      <Link textAlign="right">read more</Link>
    </Pond>
  );
}
export function PondTpl_BNCalc(props) {
  // const {pondLink} = props;
  // useEffect(async ()=>{},[])
  return (
    <Pond pondLink={props.pondLink}>

      <Heading size="md">BigNum Calc</Heading>
      <HStack spacing={2}>
        <Input />
        <IconButton aria-label="icon" icon={<CopyIcon />} size="xs" />
        <IconButton aria-label="icon" icon={<CopyIcon />} size="xs" />
      </HStack>
      <HStack spacing={2} justifyContent="space-around">
        <IconButton aria-label="icon" icon={<CopyIcon />} size="sm" />
        <IconButton aria-label="icon" icon={<CopyIcon />} size="sm" />
        <IconButton aria-label="icon" icon={<CopyIcon />} size="sm" />
        <IconButton aria-label="icon" icon={<CopyIcon />} size="sm" />
        <IconButton aria-label="icon" icon={<CopyIcon />} size="sm" />
      </HStack>
      <HStack spacing={2}>
        <Input />
        <IconButton aria-label="icon" icon={<CopyIcon />} size="xs" />
        <IconButton aria-label="icon" icon={<CopyIcon />} size="xs" />
      </HStack>
      <HStack spacing={2} justifyContent="space-between">
        <Text>...Output...</Text>
        <IconButton aria-label="icon" icon={<CopyIcon />} size="xs" />
      </HStack>
      <HStack spacing={2} justifyContent="space-between">
        <Text>...Adjusted Output...</Text>
        <IconButton aria-label="icon" icon={<CopyIcon />} size="xs" />
      </HStack>
    </Pond>
  );
}
