import {
  Box, Button, Center, chakra, Flex, Icon, Image, LinkBox,
  Popover, PopoverArrow, PopoverContent, PopoverTrigger, Portal, Spacer,
  Stack, Text, useDisclosure, useOutsideClick, useToken,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon, createIcon, DownloadIcon, } from '@chakra-ui/icons';
import { NavLink,useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

import FrogeTitleAllGreen from 'assets/logos/title-allgreen/froge-title-logo-ff-allgreen.svg';
import FrogeLogo from 'assets/logos/froge-logo.svg';
import React, { useRef } from 'react';
// import { HomeNavMobile } from './HomeNavMobile.js';
import { useDeviceMode } from '../../../theme/foundations/breakpoints.js';
import { HFlexCC, HFlexSC, S, VFlex } from '../../app/bits/UtilityTags.js';
// import { NAV_ITEMS } from './NAV_ITEMS.js';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '../motionexample/use-dimensions.js';
import {
  MdOutlineEco,
  MdWidgets,
  MdOutlineFindInPage,
  MdAccountBalance,
  MdPlayArrow,
  MdDownload
} from 'react-icons/md';
import { GiTreasureMap,GiTeamIdea } from 'react-icons/gi';
import { RiArticleLine } from 'react-icons/ri';
import { FrogeLogoOutlineSvg,CISVG_FrogeLogo,CISVG_FrogeTitleGreen } from 'assets/FrogeBrand.js';
import { abs, bgImg } from '../sections/MtgCard/MtgCard.js';
import { MenuToggle } from './MenuToggle.js';


const sxLaunchButton = {
  display:'inline-flex', size:'sm', fontWeight:'600', color:'white',
  fontSize:{ base: '.7rem', md: '.9rem' }, mr:{ base: '60px', md: '10px' },
  bg:'brand.dkgreen', _hover:{ bg: 'brand.ltgreen', }
}
const sxFrogeLogo = { position: 'fixed', mr:'1rem', top: '10px', left: '10px', boxSize:'40px', zIndex: '1000' }
const sxFrogeTitleGreen = { m:'0 1rem 0 2.05rem', h:'2.5rem',w:'auto', }
const sxDesktopNavBase = {
  bg: 'bog.700', minH: '60px', py: { base: 2 }, px: { base: 4 },
  borderBottom: '1', borderStyle: 'solid', borderColor: 'bog.900',
  justifyContent: 'end', alignItems: 'center',
}
const sxDNavLink = { display:{base:'none',md:'block'},
  fontSize:'sm', fontWeight:'500', color:'gray.200',mx:'1rem', position:'relative',
  _hover:{ textDecoration: 'none', color: 'white', },textAlign: 'center'
}
const sxDNavPopoverContent = {
  border:'0',bgColor:'bog.800',borderRadius:'.9rem',width:'fit-content', px:'.7rem'
}

export default function HomeNavbar() {
  const nav = useNavigate()
  const [isMobile,isDesktop] = useDeviceMode()
  return (<>
    <Portal><Link smooth to='#top'><CISVG_FrogeLogo sx={sxFrogeLogo}/></Link></Portal>

    <Flex sx={sxDesktopNavBase} id='top'>
      <Link smooth to='./' style={{flex:'auto' }}>
        <CISVG_FrogeTitleGreen sx={sxFrogeTitleGreen}/>
      </Link>
      <Box as={Link} smooth to='/#frogex' sx={sxDNavLink}>FrogeX</Box>
      <Box as={Link} smooth to='/#froadmap' sx={sxDNavLink}>Froad Map</Box>
      <Box as={Link} to='/team' sx={sxDNavLink}>Team Froge</Box>
      <Box as={Link} to='/eco' sx={sxDNavLink}>Eco</Box>
      <Box as={Link} to='/accounting' sx={sxDNavLink}>Accounting</Box>
      <Popover placement={'bottom-end'} gutter={21} isLazy>
        <PopoverTrigger>
          <Box as={Link} to='' sx={sxDNavLink}>Resources
            <ChevronDownIcon sx={{ ...abs(null,null, '-.7rem','0'), boxSize:'15px',width:'100%', }}/>
          </Box>
        </PopoverTrigger>
        <PopoverContent offset={4} as={Stack} sx={sxDNavPopoverContent}>
          <PopoverArrow bg={'bog.800'} />
          <ResourcesList />
        </PopoverContent>
      </Popover>

      <Button sx={sxLaunchButton} onClick={()=>nav('/app')}>Launch App</Button>
      {isMobile&&<Portal><HomeNavMobile/></Portal>}
    </Flex>
  </>);
}

const DesktopNav = ({sx}) => {
  return (
    <>
    </>
  );
};

const ResourcesList = ({ }) => {
  const sxGroupBase = { padding:'.6rem 2rem', borderRadius:'12px',_hover:{ bg: 'gray.900' }}
  const H1 = ({children})=><Text sx={{transition:'all .3s ease', _groupHover:{ color: 'green.300' }, fontWeight:'500'}}>{children}</Text>
  const H2 = ({children})=><Text sx={{fontSize:'xs',fontWeight:'300'}}>{children}</Text>
  const sxIconWrap = { transition: 'all .3s ease', transform: 'translateX(-10px)', opacity: '0',
    _groupHover: { opacity: '1', transform: 'translateX(0)' }, justify: 'flex-end', align: 'center', flex: '1'
  }
  return (<>
    <Link to='./downloads/FrogeX-Green-Paper.docx' role={'group'}>
      <HFlexCC sx={sxGroupBase}><Box><H1>FrogeX GreenPaper</H1><H2>FrogeX-Green-Paper.docx</H2></Box>
        <MdDownload size={17} style={{marginLeft:'4px'}}/></HFlexCC>
    </Link>
    <Link to='./downloads/FrogeX-Articles.docx' role={'group'}>
      <HFlexCC sx={sxGroupBase}><Box><H1>Foundation Articles</H1><H2>FrogeX-Articles.docx</H2></Box>
        <MdDownload size={17} style={{marginLeft:'4px'}}/></HFlexCC>
    </Link>
  </>);
};


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

const $$ul = { position: "absolute", top: "100px", width: "280px", }
const $$li = { margin: "0 0 20px 0", padding: "0", listStyle: "none", display: "flex", alignItems: "center", cursor: "pointer"}
const $$Icon = { width: "32px", height: "32px", marginRight: "20px",
  borderRadius: "50%", border:'2px solid',borderColor:'bog.300',color:'bog.400' }
const $$Text = { width: "200px", justifyContent: "flex-end", borderRadius: "5px",
  color:'bog.100', userSelect: 'none', marginRight: '10px'}

export const HomeNavMobile = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  useOutsideClick({ref:containerRef,handler:()=>isOpen&&toggleOpen()})
  const { height } = useDimensions(containerRef);
  const $$navBase = { position: "fixed", top: "0", right: "0", bottom: "0", width: "300px", zIndex:'900',
    pointerEvents:isOpen?'all':'none', }
  const $$navBg = { position: "fixed", top: "0", right: "0", bottom: "0", width: "300px", background: useToken('colors','bog.800') }

  const MobNavLink = ({to,label,icon})=>(
    <Box as={Link} smooth to={to}>
      <motion.li style={$$li} variants={fmV_MenuItem}
                 whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Flex sx={$$Text}>{label}</Flex><Icon sx={$$Icon} as={icon}/>
      </motion.li>
    </Box>
  )
  return (
    <motion.nav
      style={$$navBase} initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height} ref={containerRef}
    >
      <motion.div style={$$navBg} variants={fmV_Sidebar} />
      <motion.ul style={$$ul} variants={fmV_Navigation}>
        <MobNavLink to='/#frogex' label='FrogeX' icon={FrogeLogoOutlineSvg}/>
        <MobNavLink to='/#froadmap' label='Froad Map' icon={GiTreasureMap}/>
        <MobNavLink to='/team' label='Team Froge' icon={GiTeamIdea}/>
        <MobNavLink to='/eco' label='Eco' icon={MdOutlineEco}/>
        <MobNavLink to='/accounting' label='Accounting' icon={MdAccountBalance}/>
        <MobNavLink to='' label='Resources (soon)' icon={MdWidgets}/>
        <MobNavLink to='/app' label='Launch App' icon={MdPlayArrow}/>
      </motion.ul>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export const NAV_ITEMS = [
  {
    label: 'FrogeX',
    href: '/#frogex', icon:FrogeLogoOutlineSvg,
  }, {
    label: 'Froad Map',
    href: '/#froadmap', icon:GiTreasureMap,
  }, {
    label: 'Resources', icon:MdWidgets,
    children: [
      { label: 'FrogeX GreenPaper', subLabel: '',
        href: '/FrogeX-Green-Paper.docx', icon:MdOutlineFindInPage,},
      { label: 'Foundation Articles', subLabel: '',
        href: '/FrogeX-Articles.docx', icon:RiArticleLine,},
      { label: 'FAQ Page', subLabel: 'Robust Q&A!',
        href: '/faq', icon:MdOutlineEco,},
    ],
  }
];
