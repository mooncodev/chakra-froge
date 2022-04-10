import React, { useState } from "react";
import {
  Box, Flex, Button, FormControl, FormLabel,
  Heading, Input, Link, Switch, Text, Stack, Image, Grid,
} from '@chakra-ui/react';
// Assets
import { VFlex, VFlexCS } from '../app/bits/UtilityTags.js';
import { NewsMarquee } from './sections/marquee.js';


function PgHomeTeam() {

  return (
    <VFlex flexGrow={1}>
      <VFlexCS h='4rem'>
        <NewsMarquee/>
      </VFlexCS>
      <VFlexCS h='4rem'>
        Soon: Team Page!
      </VFlexCS>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} display="block">
        <Grid templateColumns="repeat(5, 1fr)" gap={6} display="block">
          <Heading>Meet The Team</Heading>
          <Text textAlign="left" display="block">
            Juicy overview of who/what our team is comprised of here. Put emphasis
            on why a doxxed team is important in this day and age with all of the
            crypto projects out there... many of which with ill intention. Also
            include details about how we are a unique group of individuals with
            varying skillsets who fell in love with this project and the community
            so much that we decided to volunteer our time and efforts for the
            greater good of the project.
          </Text>
        </Grid>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <VFlexCS spacing={2} width="345px" height={600}>
            <Heading size="md" textAlign="center">
              Todd Durica
            </Heading>
            <Image src="https://i.postimg.cc/J4719VJm/Moonco.png" />
            <Heading size="md" textAlign="left">
              @Moonco
            </Heading>
            <Heading size="md" textAlign="left" fontStyle="italic">
              Lead Developer (Solidity, UI)
            </Heading>
            <Text>
              Brief description about Moonco here. Lorem Ipsum Lorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </Text>
          </VFlexCS>
          <VFlexCS spacing={2} width="345px" height={600}>
            <Heading size="md" textAlign="center">
              RJ Townsent
            </Heading>
            <Image src="https://i.postimg.cc/6pzwyZS2/Lefrogeski-v5.png" />
            <Heading size="md" textAlign="left">
              @Lefrogeski
            </Heading>
            <Heading size="md" textAlign="left" fontStyle="italic">
              Project Management / Operations / Marketing
            </Heading>
            <Text>
              Brief description about Lefrogeski here. Lorem Ipsum Lorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </Text>
          </VFlexCS>
          <VFlexCS spacing={2} width="345px" height={600}>
            <Heading size="md" textAlign="center">
              Oliver Rush
            </Heading>
            <Image src="https://i.postimg.cc/V6C3B07F/Gonzo-V5.png" />
            <Heading size="md" textAlign="left">
              @Dr. Gonzo
            </Heading>
            <Heading size="md" textAlign="left" fontStyle="italic">
              Public Relations / Marketing & Branding / Community Liaison
            </Heading>
            <Text>
              Brief description about Dr. Gonzo here. Lorem Ipsum Lorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </Text>
          </VFlexCS>
          <VFlexCS spacing={2} width="345px" height={600}>
            <Heading size="md" textAlign="center">
              Kevin Mahoney
            </Heading>
            <Image src="https://i.postimg.cc/Bn5bNtz4/Lazan-Dox-Cartoon-V3.png" />
            <Heading size="md" textAlign="left">
              @DeepLazan
            </Heading>
            <Heading size="md" textAlign="left" fontStyle="italic">
              Business Oversight Lead and Financial Guarantor
            </Heading>
            <Text>
              Brief description about Lazan here. Lorem Ipsum Lorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </Text>
          </VFlexCS>
          <VFlexCS spacing={2} width="345px" height={600}>
            <Heading size="md" textAlign="center">
              Name Here
            </Heading>
            <Image src="https://i.postimg.cc/YjK2zwfv/Crypto-Panda.png" />
            <Heading size="md" textAlign="left">
              @CryptoPanda
            </Heading>
            <Heading size="md" textAlign="left" fontStyle="italic">
              Titles Here
            </Heading>
            <Text>
              Brief description about Crypto Panda here. Lorem Ipsum Lorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </Text>
          </VFlexCS>
          <VFlexCS spacing={2} width="345px" height={600}>
            <Heading size="md" textAlign="center">
              Wesley Brower
            </Heading>
            <Image src="https://i.postimg.cc/vZXgbctX/Wesley-V3.png" />
            <Heading size="md" textAlign="left">
              @MerchFROGE
            </Heading>
            <Heading size="md" textAlign="left" fontStyle="italic">
              Certification Specialist / Marketing / Merch Store / Community Admin
            </Heading>
            <Text>
              Brief description about MerchFROGE here. Lorem Ipsum Lorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </Text>
          </VFlexCS>
          <VFlexCS spacing={2} width="345px" height={600}>
            <Heading size="md" textAlign="center">
              Basheed Winhaar
            </Heading>
            <Image src="https://i.postimg.cc/MH8KySYv/Based-V6.png" />
            <Heading size="md" textAlign="left">
              @BasedWinner
            </Heading>
            <Heading size="md" textAlign="left" fontStyle="italic">
              Legal Team
            </Heading>
            <Text>
              Brief description about Based Winner here. Lorem Ipsum Lorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </Text>
          </VFlexCS>
          <VFlexCS spacing={2} width="345px" height={600}>
            <Heading size="md" textAlign="center">
              Todd Durica
            </Heading>
            <Image src="https://i.postimg.cc/J4719VJm/Moonco.png" />
            <Heading size="md" textAlign="left">
              @Moonco
            </Heading>
            <Heading size="md" textAlign="left" fontStyle="italic">
              Lead Developer (Solidity, UI)
            </Heading>
            <Text>
              Brief description about Moonco here. Lorem Ipsum Lorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
              IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
            </Text>
          </VFlexCS>
        </Grid>
      </Grid>
    </VFlex>
  );
}

export default PgHomeTeam;
