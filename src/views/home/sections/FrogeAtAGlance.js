import {
  Box,
  Flex,
  Heading,
  Image, Link, Tab,
  TabList, TabPanel, TabPanels,
  Tabs,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { HFlex, S, VFlexCS } from '../../common/UtilityTags.js';

export const FrogeAtAGlance = () => {
  const _h = '60px'

  let panel = {
    display:'flex', flexDirection:'column', gap:'.6rem',lineHeight:'normal'
  }

  return (
    <VFlexCS mb='2rem'>
      <Heading as={'h1'} color='brand.green'>Froge at-a-glance</Heading>
      <S fontSize={17}>What makes Froge the best!</S>
      <Tabs variant='soft-rounded' colorScheme='bog' mt={3}
            w={{ base:'98%',sm:'90%',md:'70%',lg:'40rem', }}
      >
        <TabList flexWrap='wrap' flexDirection='row' justifyContent='center'>
          <Tab>Impact</Tab>
          <Tab>Community</Tab>
          <Tab>Tech</Tab>
          <Tab>Growth</Tab>
          <Tab>Memes</Tab>
          <Tab>Passive Income</Tab>
          <Tab>Beginner-Friendly</Tab>
        </TabList>
        <TabPanels bgColor='bog.600' borderRadius='7px' mt={7}>
          <TabPanel name='Impact' style={panel}>
            <Text fontSize='lg' align={'center'}><em>There is a narrative that Crypto is a net negative, or “worse than” other forms of currency.</em></Text>
            <Text fontSize='sm'>Froge results in far more net positive!  Our project marks a well-defined end to that debate.</Text>
          </TabPanel>
          <TabPanel name='Community' style={panel}>
            <Text>Friendly and vibrant community always having fun together!
              We have a cozy telegram and a discord, and you’re invited!
              We hope (hop?) to see you there.</Text>
          </TabPanel>
          <TabPanel name='Tech' style={panel}>
            <Text>It may be unexpected for an eco-initiative, but Froge is proud to boast amazing technological feats
              and modern app development.  We have a devoted Contract/App programmer who is fully doxxed [<Link to={'./team'}>LINK</Link>].
              Our latest ERC20 iteration, FrogeX, proves industry-leading achievements!
              Please visit the [FrogeX section] to learn more.</Text>
          </TabPanel>
          <TabPanel name='Growth' style={panel}>
            <Text>Froge is hopping to new heights with every passing week.  Our [roadmap] is sure to raise your eyebrows!
              If you are interested to join our team, please first spend some time socializing in our [Telegram],
              and know that we do not have a budget to pay anyone with.  Thank you!</Text>
          </TabPanel>
          <TabPanel name='Memes' style={panel}>
            <Text>Meme game stronk</Text>
          </TabPanel>
          <TabPanel name='PassiveIncome' style={panel}>
            <Text>“Earn passive income while saving the planet”</Text>
            <Text>
              ...is one of our earliest slogans. Our latest offering,
              FrogeX, improves on this concept to strong effect.
              FrogeX belongs to the family of “Eth Rewards” contracts.
              This means that you earn passively in the form of our token’s
              parent currency, Ethereum, instead of earning the token itself.
            </Text>
            <Text>
              This is highly advantageous to the market as it reduces sell pressure,
              while also being advantageous to investors by not subjecting their
              earned rewards to a more potentially volatile market than Ethereum itself.
              (it’s also 70% cheaper to transact with than other “Eth Rewards”
              contracts - a result of superior design)
            </Text>
          </TabPanel>

          <TabPanel name='BeginnerFriendly' style={panel}>
            <Text>
              Froge recognizes our status as a project which carries greater appeal to
              those unfamiliar with crypto.  For this, we take special care to provide
              a user-friendly and educative experience.
            </Text>
            <Text>
              The crypto-newcomer is a VIP to us and we want to be their perfect companion for that journey.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VFlexCS>
  )
}
