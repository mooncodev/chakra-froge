import React, { useState } from "react";
import {
  Box, Flex, Button, FormControl, FormLabel,
  Heading, Input, Link, Switch, Text, Stack, Image, Grid, Spacer, Divider,
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
import KasperFormal from 'views/home/sections/MtgCard/assets/KasperFormal.png'
import Jacob from 'views/home/sections/MtgCard/assets/Jacob.png'

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
  team: {
    moonco: {
      imgs:[Moonco,bg001],
      name:'Todd Durica',
      tgHandle:'@MooncoHodlings',
      title:'Lead Developer and FrogeX Contract Owner',
      bio:`Solidity, Full Stack, and Javascript SME Web Engineer of 13 years dedicated experience. 
        Previously and proudly employed with Bank of America at their HQ in Charlotte, and with 
        the Space Warfare Systems Center Atlantic (DOD) in Charleston. Built FrogeX's contract 
        from the ground up to be the most efficient, yet featureful ERC20 contract yet devised.`
    },
    lefrogeski: {
      imgs:[Lefroge,bg002],
      name:'RJ Townsend',
      tgHandle:'@Lefrogeski',
      title:'Project Management, Operations, Marketing',
      bio:`I’ve been in the crypto space since 2018, but $FROGE was my 2nd DeFi asset. 
      I’m experienced in project management and spend my free time petting 
      my dog and riding dirt bikes on the local National Forest. \nSemper Frogedelis`
    },
    drgonzo: {
      imgs:[Gonzo,bg003],
      name:'Oliver Rush',
      tgHandle:'@DrGonzo1184',
      title:'PR Consultant',
      bio:`Studied at Culver Academies, University of Glasgow, and Hofstra University.  
        Spent over a decade and a half working in media, advertising, and film production, 
        on both the technical and creative sides of projects ranging from major motion 
        pictures to national commercials.  Former original Hoge team member, started 
        working for Froge soon after launch.`
    },
    jacob: {
      imgs:[Jacob,bg008],
      name:'Jacob',
      tgHandle:'@jdmichae',
      title:'Charity Outreach & Relationships',
      bio:`Working as a liaison of the Froge Finance Foundation to network our project 
      with other non profit organizations who share our objectives of 
      planting trees and protecting the rainforests.`
    },
    lazan: {
      imgs:[Lazan,bg004],
      name:'Kevin Mahoney',
      tgHandle:'@DeepLazan',
      title:'Business Oversight Lead and Financial Guarantor',
      bio:`Investment and Business Management professional. Key investor and financial backer for FrogeX.`
    },
    panda: {
      imgs:[Panda,bg005],
      name:'Fernando',
      tgHandle:'@CryptoPanda420',
      title:'Social Media Marketer, Writer, & Editor',
      bio:`Experience in fundraising for UNICEF. FrogeX offered me an opportunity to bring my own 
        experience in the traditional charity industry to a revolutionary digital asset project.`
    },
    wesley: {
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
    kasper: {
      imgs:[KasperFormal,bg007],
      name:'Kasper Ripken',
      tgHandle:'@EuropeanCat',
      title:'Froge Foundation President and Legal Advisor',
      bio:`Partner at Helder advocatuur. President/founder of Froge Finance Foundation, 
        our charity organization.`
    },
  }
}

function PgHomeTeam() {

  return (
    <VFlex flexGrow={1}>
      <VFlexCS h='4rem'>
        <NewsMarquee/>
      </VFlexCS>
      <VFlexCS h='4rem'>
        <Heading>Team Froge</Heading>
        <Divider/><br/>
      </VFlexCS>
      <VFlexCS mt={4} mx={{base:'.5rem',md:'4rem',lg:'8rem',}}>
        {copy.originStory}
      </VFlexCS>

      <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
            gap={6} justifyItems={'center'}>
        <MtgCard cardObj={copy.team.moonco}/>
        <MtgCard cardObj={copy.team.lefrogeski}/>
        <MtgCard cardObj={copy.team.jacob}/>
        <MtgCard cardObj={copy.team.lazan}/>
        <MtgCard cardObj={copy.team.panda}/>
        <MtgCard cardObj={copy.team.wesley}/>
        <MtgCard cardObj={copy.team.kasper}/>
        <MtgCard cardObj={copy.team.drgonzo}/>

      </Grid>
    </VFlex>
  );
}

export default PgHomeTeam;
