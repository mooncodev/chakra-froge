import {
  Box, Button, Center, chakra, Flex, Icon, Image, Link,
  Popover, PopoverContent, PopoverTrigger, Portal,
  Stack, Text, useDisclosure, useOutsideClick, useToken,
} from '@chakra-ui/react';
import { ChevronRightIcon, createIcon, } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import FrogeTitleAllGreen from 'assets/logos/title-allgreen/froge-title-logo-ff-allgreen.svg';
import FrogeLogo from 'assets/logos/froge-logo.svg';
import React, { useRef } from 'react';
// import { HomeNavMobile } from './HomeNavMobile.js';
import { useDeviceMode } from '../../../theme/foundations/breakpoints.js';
import { HFlexSC, S, VFlex } from '../../app/bits/UtilityTags.js';
// import { NAV_ITEMS } from './NAV_ITEMS.js';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '../motionexample/use-dimensions.js';
import { MdOutlineEco,MdWidgets,MdOutlineFindInPage,MdAccountBalance } from 'react-icons/md';
import { GiTreasureMap,GiTeamIdea } from 'react-icons/gi';
import { RiArticleLine } from 'react-icons/ri';
import { FrogeLogoOutlineSvg } from '../../../assets/FrogeBrand.js';

export const NAV_ITEMS = [
  {
    label: 'FrogeX',
    href: '/#frogex', key: 'frogex', icon:FrogeLogoOutlineSvg,
  }, {
    label: 'Froad Map',
    href: '/#froadmap', key: 'froadmap', icon:GiTreasureMap,
  }, {
    label: 'Resources', key: 'resources', icon:MdWidgets,
    children: [
      { label: 'FrogeX GreenPaper',
        subLabel: '',
        href: '/FrogeX-Green-Paper.docx', key: 'greenpaper',  icon:MdOutlineFindInPage,},
      { label: 'Foundation Articles', subLabel: '',
        href: '/FrogeX-Articles.docx', key: 'articles',  icon:RiArticleLine,},
      { label: 'FAQ Page', subLabel: 'Robust Q&A!',
        href: '/faq', key: 'fraq',  icon:MdOutlineEco,},
    ],
  }, {
    label: 'Team Froge',
    href: '/team', key: 'team', icon:GiTeamIdea,
  }, {
    label: 'Eco',
    href: '/eco', key: 'eco', icon:MdOutlineEco,
  }, {
    label: 'Accounting',
    href: '/accounting', key: 'accounting', icon:MdAccountBalance,
  },
];

export default function HomeNavbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [isMobile,isDesktop] = useDeviceMode()
  const $$LaunchButton = {
    display:'inline-flex',
    size:'sm',
    fontWeight:'600',
    color:'white',
    fontSize:{ base: '.7rem', md: '1rem' },
    mr:{ base: '60px', md: '10px' },
    bg:'brand.dkgreen',
    _hover:{ bg: 'brand.ltgreen', }
  }
  return (
      <HFlexSC
        bg={'bog.700'}
        minH={'60px'} py={{ base: 2 }} px={{ base: 4 }}
        borderBottom={1} borderStyle={'solid'}
        borderColor={'gray.900'}
      >
        <Flex flex={{ base: 1 }} justify='space-between' alignItems={'center'}>
          <NavLink to='./' mr={1}>
            <Image src={isMobile?FrogeLogo:FrogeTitleAllGreen} height='50px'/>
          </NavLink>
          <Flex display={{ base: 'none', md: 'flex' }} >
            <DesktopNav />
            <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} alignItems='center' direction={'row'} spacing={6}>
              <Button sx={$$LaunchButton} as={NavLink} to={'/app'}>Launch App</Button>
              {isMobile&&
                <Portal>
                  <HomeNavMobile/>
                </Portal>
              }
            </Stack>
          </Flex>
        </Flex>
      </HFlexSC>
  );
}

const DesktopNav = () => {
  const linkColor = 'gray.200'
  const linkHoverColor = 'white'
  const popoverContentBgColor = 'gray.800'

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Center key={navItem.key}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2} href={navItem.href ?? '#'}
                fontSize={'sm'} fontWeight={500} color={linkColor}
                _hover={{ textDecoration: 'none', color: linkHoverColor, }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
            {navItem.children && (
              <PopoverContent
                border={0} boxShadow={'xl'} bg={popoverContentBgColor} p={4} rounded={'xl'} minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.key} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Center>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link href={href} role={'group'} display={'block'} p={2} rounded={'md'}
    _hover={{ bg: 'gray.900' }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'} transform={'translateX(-10px)'} opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }} justify={'flex-end'}
          align={'center'} flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5}><ChevronRightIcon/></Icon>
        </Flex>
      </Stack>
    </Link>
  );
};

const Path = props => (<motion.path fill="transparent" strokeWidth="3"
                                    stroke={useToken('colors','brand.green')}
                                    strokeLinecap="round" {...props}/>)
const $$BurgerBtn = {
  position: "absolute", top: "24px", right: "12px", width: "50px", height: "50px",
  borderRadius: "50%",  pointerEvents:'all',userSelect: "none", cursor: "pointer",
  background: "transparent",outline: "none", border: "none",
}
export const MenuToggle = ({ toggle }) => {
  return (
    <VFlex as={Button} onClick={toggle} style={$$BurgerBtn}>
      <chakra.svg width="23" height="23" viewBox="0 0 23 23">
        <Path variants={{ closed: { d: "M 2 2.5 L 20 2.5" }, open: { d: "M 3 16.5 L 17 2.5" } }}/>
        <Path d="M 2 9.423 L 20 9.423" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.1 }}/>
        <Path variants={{ closed: { d: "M 2 16.346 L 20 16.346" }, open: { d: "M 3 2.5 L 17 16.346" } }}/>
      </chakra.svg></VFlex>)};

const fmV_Sidebar = {
  open: (height = 1000) => ({ clipPath: `circle(${height * 2 + 200}px at 262px 33px)`,
    transition: { type: "spring", stiffness: 20, restDelta: 2 } }),
  closed: { clipPath: "circle(26px at 262px 33px)",
    transition: { delay: 0.3, type: "spring", stiffness: 400, damping: 40 } }
}
const fmV_Navigation = {
  open:   { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
}
const fmV_MenuItem = {
  open:   { y: 0,  opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } }
}

const itemIds = [0, 1, 2, 3, 4];
const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
const $$ul = { position: "absolute", top: "100px", width: "280px", }
const $$li = { margin: "0 0 20px 0", padding: "0", listStyle: "none", display: "flex", alignItems: "center", cursor: "pointer"}
const $$Icon = { width: "32px", height: "32px", marginRight: "20px",
  borderRadius: "50%", border:'2px solid',borderColor:'bog.300',color:'bog.400' }
const $$Text = { width: "200px", justifyContent: "right", borderRadius: "5px",
  color:'bog.100', userSelect: 'none', marginRight: '10px'}
export const HomeNavMobile = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  useOutsideClick({ref:containerRef,handler:()=>isOpen&&toggleOpen()})
  const { height } = useDimensions(containerRef);
  const $$navBase = { position: "fixed", top: "0", right: "0", bottom: "0", width: "300px", zIndex:'900',
    pointerEvents:isOpen?'all':'none', }
  const $$navBg = { position: "fixed", top: "0", right: "0", bottom: "0", width: "300px", background: useToken('colors','bog.800') }

  return (
    <motion.nav
      style={$$navBase} initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height} ref={containerRef}
    >
      <motion.div style={$$navBg} variants={fmV_Sidebar} />
      <motion.ul style={$$ul} variants={fmV_Navigation}>
        {NAV_ITEMS.map((v,i) => {
          return (
            <Link key={v.key} href={v.href}>
          <motion.li style={$$li} variants={fmV_MenuItem}
                     whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          >
              <Flex sx={$$Text}>{v.label}</Flex>
              <Icon sx={$$Icon} as={v.icon}/>
          </motion.li>
        </Link>
        );
        })}
      </motion.ul>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

