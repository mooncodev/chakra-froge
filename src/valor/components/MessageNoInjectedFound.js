import { Box, ListItem, UnorderedList, VStack } from '@chakra-ui/react';

export default function MessageNoInjectedFound() {
  return (
    <VStack opacity='0.7'>
      <Box fontSize={'xs'}>
        No supported wallets were detected within the browser context.
        <br/>You might want to:
        <UnorderedList marginLeft={16}>
          <ListItem>Install a web3 wallet</ListItem>
          <ListItem>Connect an external wallet</ListItem>
        </UnorderedList>
      </Box>
    </VStack>
  )
}
