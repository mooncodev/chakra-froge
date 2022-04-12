import React, { useState } from "react";
import {
  Box, Flex, Button, FormControl, FormLabel,
  Heading, Input, Link, Switch, Text, Stack, Image, Grid,
} from '@chakra-ui/react';
// Assets
import { VFlex, VFlexCS } from '../app/bits/UtilityTags.js';
import { NewsMarquee } from './sections/marquee.js';
import { MtgCard } from './sections/MtgCard/MtgCard.js';

import Based from 'views/home/sections/MtgCard/assets/Based.png'
import Froger from 'views/home/sections/MtgCard/assets/Froger.png'
import Gonzo from 'views/home/sections/MtgCard/assets/Gonzo.png'
import Lazan from 'views/home/sections/MtgCard/assets/Lazan.png'
import Lefroge from 'views/home/sections/MtgCard/assets/Lefroge.png'
import Moonco from 'views/home/sections/MtgCard/assets/Moonco.png'
import Panda from 'views/home/sections/MtgCard/assets/Panda.png'
import Wesley from 'views/home/sections/MtgCard/assets/Wesley.png'

import bg001 from 'views/home/sections/MtgCard/assets/001.jpg'
import bg002 from 'views/home/sections/MtgCard/assets/002.jpg'
import bg003 from 'views/home/sections/MtgCard/assets/003.jpg'
import bg004 from 'views/home/sections/MtgCard/assets/004.jpg'
import bg005 from 'views/home/sections/MtgCard/assets/005.jpg'
import bg006 from 'views/home/sections/MtgCard/assets/006.jpg'
import bg007 from 'views/home/sections/MtgCard/assets/007.jpg'
import bg008 from 'views/home/sections/MtgCard/assets/008.jpg'





const copy = {
  originStory:<>Team Froge was formed out of a group of individuals who recognized a
    common desire to maintain the project.  Originally, circa April 2021, Froge's contract
    developer was not present, and the administrative element was sparse and undistinguished.
    <br/><br/>The group shown on this page are those who decided that the basic idea behind Froge
    (a currency which saves the planet) was worth their elevated and long term devotion.<br/><br/></>,
  whyWeDoxx:`A doxxed team is important in this day and age with all of the
            crypto projects out there... many of which with malicious intention.`,
  team: [
    {
      imgs:[Moonco,bg001],
      name:'Todd Durica',
      tgHandle:'@MooncoHodlings',
      title:'Lead Developer and FrogeX Contract Owner',
      bio:`Solidity, Full Stack, and Javascript SME Web Engineer of 13 years dedicated experience. 
        Previously and proudly employed with Bank of America at their HQ in Charlotte, and with 
        the Space Warfare Systems Center Atlantic (DOD) in Charleston. Built FrogeX's contract 
        from the ground up to be the most efficient, yet featureful ERC20 contract yet devised.`
    },
    {
      imgs:[Lefroge,bg002],
      name:'RJ Townsend',
      tgHandle:'@Lefrogeski',
      title:'Project Management, Operations, Marketing',
      bio:`Experienced community moderator, Project Manager and Marketing Representative.`
    },
    {
      imgs:[Gonzo,bg003],
      name:'Oliver Rush',
      tgHandle:'@DrGonzo1184',
      title:'Public Relations, Marketing & Branding, Community Liaison',
      bio:`Studied at Culver Academies, University of Glasgow, and Hofstra University.  
        Spent over a decade and a half working in media, advertising, and film production, 
        on both the technical and creative sides of projects ranging from major motion 
        pictures to national commercials.  Former original Hoge team member, started 
        working for Froge soon after launch.`
    },
    {
      imgs:[Lazan,bg004],
      name:'Kevin Mahoney',
      tgHandle:'@DeepLazan',
      title:'Business Oversight Lead and Financial Guarantor',
      bio:`Investor and Business Management professional. Key investor and financial backer for FrogeX.`
    },
    {
      imgs:[Panda,bg005],
      name:'Fernando',
      tgHandle:'@CryptoPanda420',
      title:'Social Media Marketer, Writer, & Editor',
      bio:`Experience in fundraising for UNICEF. FrogeX offered me an opportunity to bring my own 
        experience in the traditional charity industry to a revolutionary digital asset project.`
    },
    {
      imgs:[Wesley,bg006],
      name:'Wesley Brower',
      tgHandle:'@MerchFROGE',
      title:'Certification Specialist, Marketing, Merch Store, Community Admin',
      bio:`Wesley specializes in the implementation of quality / environmental systems for a variety 
        of industries in compilance with global certification standards including but not limited to 
        AS 9100, AS 9120, ISO 13485, ISO 14001, and ISO 9001. He additionally developed and runs the 
        FrogeX merch store, and supports FrogeX marketing efforts through his personal @HappyStonks 
        social media accounts.`
    },
    {
      imgs:[Based,bg007],
      name:'Kasper Ripken',
      tgHandle:'@EuropeanCat',
      title:'Froge Foundation President and Legal Advisor',
      bio:`Partner at Helder advocatuur. President/founder of Froge Finance Foundation, 
        our charity organization. Acts as Legal Counsel for FrogeX and the Foundation.`},
  ]
}

function PgHomeTeam() {

  return (
    <VFlex flexGrow={1}>
      <VFlexCS h='4rem'>
        <NewsMarquee/>
      </VFlexCS>
      <VFlexCS h='4rem'>
        <Heading>Team Froge</Heading>
      </VFlexCS>
      <VFlexCS mx={{base:'.5rem',md:'4rem',lg:'8rem',}}>
        {copy.originStory}
      </VFlexCS>

      <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
            gap={6} justifyItems={'center'}>
        <MtgCard cardObj={copy.team[0]}/>
        <MtgCard cardObj={copy.team[1]}/>
        <MtgCard cardObj={copy.team[2]}/>
        <MtgCard cardObj={copy.team[3]}/>
        <MtgCard cardObj={copy.team[4]}/>
        <MtgCard cardObj={copy.team[5]}/>
        <MtgCard cardObj={copy.team[6]}/>

      </Grid>
    </VFlex>
  );
}

export default PgHomeTeam;
