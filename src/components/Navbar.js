import React, { useContext } from 'react';
import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { MemberRoleContext } from '../context/MemberRoleContext';
import { useMediaQuery } from '@chakra-ui/react';

const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(MemberRoleContext);

  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Flex
      justify={isMobile ? 'center' : 'space-between'}
      align="center"
      padding="30px"
      borderBottom="2px solid white"
    >
      {/* Icons */}
      <Flex>
        <Heading fontSize={isMobile ? '28px' : '25px'}>SUPERVERSE</Heading>
      </Flex>
      {/* Links */}
      <Flex
        display={isMobile ? 'none' : 'flex'}
        justify="space-around"
        align="center"
        width="40%"
        padding="30px"
      >
        <Box margin="0 15px" cursor="pointer">
          About
        </Box>
        <Spacer />
        <Box margin="0 15px" cursor="pointer">
          Agents
        </Box>
        <Spacer />
        <Box margin="0 15px" cursor="pointer">
          Contracts
        </Box>
        <Spacer />
        {currentAccount ? (
          <Box margin="0 15px" color="lightgreen">
            Connected
          </Box>
        ) : (
          <Button
            backgroundColor="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0f0f0f"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={connectWallet}
          >
            Connect
          </Button>
        )}
      </Flex>
      {/* Connect */}
    </Flex>
  );
};

export default Navbar;
