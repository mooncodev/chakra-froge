/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

export default function AppFooter(props) {
  // const linkTeal = "red.200"=
  return (
    <Flex
      id='AppFooter'
      flexDirection="row"
      alignItems="center"
      justifyContent="space-evenly"
      width={{ base: '350px', md: '500px' }}
      gap={2}
      my="8px"
      mx={'auto'}
      opacity='0.8'
      textAlign='center'
      fontSize={{base:'14px',md:'16px'}}
    >
          <Text color="gray.400" >
            &copy; {1900 + new Date().getYear()},{" "}
            <Link
              as={NavLink}
              color="green.300"
              to="../"
              target="_parent"
            >
              Ribbit
            </Link>
          </Text>


          <Link href="https://froge.fi"
            target="_parent"
            color="gray.400">
            Back to Home
          </Link>

          <Link color="gray.400"
            target="_parent"
            href="https://froge.fi">
            Support
          </Link>


    </Flex>
  );
}
