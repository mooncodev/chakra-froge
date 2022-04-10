import React from 'react';
import {
  Box, Button, chakra, Container, Link, SimpleGrid, Stack,
  Text, VisuallyHidden, Input, IconButton, Icon, ButtonGroup, Divider, HStack, Grid, VStack,
} from '@chakra-ui/react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import { FrogeLogoSvg,FrogeTitleLogoSvg } from 'assets/FrogeBrand.js';

import IconBox from '../../components/Icons/IconBox.js';
import { DocumentIcon } from '../../components/Icons/Icons.js';
import ErrorBoundary from 'helpers/ErrorBoundary';
import { links,icons } from '../../assets/OtherBrand.js';

export default function HomeFooter() {

  return (<>
      <Stack
        spacing="8"
        direction={{ base: 'column', md: 'row' }}
        justify="space-evenly"
        p={{ base: '3',sm: '5', md: '16' }}
        maxW={1100}
        alignSelf={{ base: 'unset',md: 'center' }}
      >
        <Stack spacing={{ base: '6', md: '8' }} align="center" flex={1}>
          <FrogeTitleLogoSvg style={{ width: '150px', }}/>
          <Text>We're friendly!  Come say "hi":<br/>
            <Link color='bog.400' href=''> Community Telegram</Link></Text>
        </Stack>

        <Stack direction="row" spacing={{ base:'3',md:'8', }} flex={3}>
          <VStack spacing="2" minW="18" flex={1}>
            <Text fontSize="sm" fontWeight="semibold" color="subtle">Froge Around</Text>
            <SimpleGrid columns={2} spacing={3} justifyItems='start'>
              <Button as={'a'} variant="link" href={links.Twitter.url}>{icons.Twitter}</Button>
              <Button as={'a'} variant="link" href={links.Facebook.url}>{icons.Facebook}</Button>
              <Button as={'a'} variant="link" href={links.Discord.url}>{icons.Discord}</Button>
              <Button as={'a'} variant="link" href={links.Instagram.url}>{icons.Instagram}</Button>
              <Button as={'a'} variant="link" href={links.Youtube.url}>{icons.Youtube}</Button>
              <Button as={'a'} variant="link" href={links.Reddit.url}>{icons.Reddit}</Button>
            </SimpleGrid>
          </VStack>
          <VStack spacing={{ base:'2',md:'4', }} minW="90" flex={{ base:'1',md:'1', }}>
            <Text fontSize="sm" fontWeight="semibold" color="subtle">Find Out</Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button as={'a'} variant="link" href={links.FrogeAdminEmail.url}>admin@froge.fi</Button>
              <Button as={'a'} variant="link" to={links.FrogeTgCommunity.url}>Telegram Main</Button>
              <Button as={'a'} variant="link" to={links.FrogeTgAnnounce.url}>Telegram Announce</Button>
              <Button as={'a'} variant="link" href={links.Medium.url}
                      sx={{backgroundColor:'bog.300', padding:'0 14px', borderRadius:'7px'}}>{icons.Medium}</Button>
            </Stack>
          </VStack>
        </Stack>
        <VStack spacing="4"  flex={1}>
          <Text fontSize="sm" fontWeight="semibold" color="subtle">Stay up to date</Text>
          <Input maxW='50%' disabled placeholder="Email" type="email" required/>
          <Button disabled type="submit" flexShrink={0}>Subscribe</Button>
        </VStack>
      </Stack>
      <Divider/>
      <Stack p="6px 16px" justify="end" align="center"
             direction={{ base: 'column-reverse', md: 'row' }}>
        <Text fontSize="sm" color="bog.650">
          &copy; {new Date().getFullYear()} MoonCo Systems Inc
        </Text>
      </Stack></>
  );
}

