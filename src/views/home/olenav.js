import React, { ReactNode } from 'react';
import {
  IconButton, Avatar, Box, CloseButton, Flex, HStack, VStack, Icon,
  useColorModeValue as ucmv, Link, Drawer, DrawerContent, Text,
  useDisclosure, BoxProps, FlexProps,
  Menu, MenuButton, MenuDivider, MenuItem, MenuList, Button, Image,
} from '@chakra-ui/react';
import {
  FiHome, FiTrendingUp, FiCompass,
  FiStar, FiSettings, FiMenu, FiBell, FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { NavLink } from 'react-router-dom';


const LinkItems = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

export default function Olenav({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={ucmv('gray.100', 'gray.900')}>
      {/* <SidebarContent */}
      {/*   onClose={() => onClose} */}
      {/*   display={{ base: 'none', md: 'block' }} */}
      {/* /> */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease" bg={ucmv('white', 'gray.900')}
      borderRight="1px" borderRightColor={ucmv('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }} pos="fixed" h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center" p="4" mx="4" borderRadius="lg" role="group" cursor="pointer"
        _hover={{ bg: 'cyan.400', color: 'white', }} {...rest}
      >
        {icon && (
          <Icon mr="4" fontSize="16" _groupHover={{ color: 'white', }} as={icon}/>
        )}
        {children}
      </Flex>
    </Link>
  );
};
const LaunchAppButton = () => {
  return (
    <NavLink to={'/app'}>
      <Button to={'/app'} p="8px 12px" me="8px" bg="green.900" borderRadius="50px"
        colorScheme="green" borderColor="green.400" color="green.200"
        variant="outline" fontSize="xs">Launch App</Button>
    </NavLink>
  );
};

function LogoSection() {
  return null;
}

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      mx={{ base: 0, md: 20 }} px={{ base: 4, md: 4 }} height="20" alignItems="center"
      bg={ucmv('white', 'gray.900')}
      borderBottomWidth="1px" borderBottomColor={ucmv('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }} {...rest}>
      <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Froge
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <LogoSection/>
        <Image left="0" width={12} size={'sm'} src={'./logo-alpha-504x504.png'}/>

        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <VStack width={20}
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="center" spacing="1px" ml="2">
                  <Text fontSize="sm">Downloads</Text>
                  <Text fontSize="xs">& Links</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}><FiChevronDown /></Box>
              </HStack>
            </MenuButton>
            <MenuList bg={ucmv('white', 'gray.900')}
                      borderColor={ucmv('gray.200', 'gray.700')}>
              <MenuItem>Greenpaper</MenuItem>
              <MenuDivider />
              <MenuItem>FrogeHopper</MenuItem>
              <MenuItem>Liquidity Lock</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <LaunchAppButton/>
      </HStack>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        variant="outline" aria-label="open menu"
        onClick={onOpen}
        icon={<FiMenu />}
      />
    </Flex>
  );
};
