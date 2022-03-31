import React from 'react';
import {
  Box, Button, Container, Link, SimpleGrid, Stack,
  Text, VisuallyHidden, Input, IconButton, Icon,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import { FrogeLogo, FrogeLogoFull } from 'components/Icons/FrogeBrandSvgs.js';
import IconBox from '../../components/Icons/IconBox.js';
import { DocumentIcon } from '../../components/Icons/Icons.js';
import ErrorBoundary from 'helpers/ErrorBoundary';


export default function HomeFooter() {

  return (
    <Box
      bg={'gray.900'}
      color={'gray.200'}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Icon mr="4" fontSize="46" _groupHover={{ color: 'white', }} as={FrogeLogo}/>
            <Text fontSize={'sm'}>
              © 2022 MoonCo Systems Inc
            </Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href={'#'}>About us</Link>
            <Link href={'#'}>Blog</Link>
            <Link href={'#'}>Contact us</Link>
            <Link href={'#'}>Pricing</Link>
            <Link href={'#'}>Testimonials</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Legal</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Satus</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg={'whiteAlpha.100'}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={'green.800'}
                color={'gray.800'}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

const SocialButton = ({ children, label, href, }) => {
  return (
    <Button
      bg={'whiteAlpha.100'}
      rounded={'full'} w={8} h={9} bgSize={8}
      cursor={'pointer'} as={'a'} href={href}
      display={'inline-flex'} alignItems={'center'}
      justifyContent={'center'} transition={'background 0.3s ease'}
      _hover={{bg:'whiteAlpha.200',}}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};
