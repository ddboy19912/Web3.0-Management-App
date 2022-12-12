import React, { useState, useContext, useEffect } from 'react';
import videBg from '../assets/video_2.mp4';
import { MemberRoleContext } from '../context/MemberRoleContext';
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Grid,
  Input,
  Heading,
} from '@chakra-ui/react';
import agent from '../assets/pxArt.png';
import agent2 from '../assets/pxArt (1).png';
import { shortenAddress } from '../utils/shortenAddress';
import { useMediaQuery } from '@chakra-ui/react';
import {
  AiFillTwitterCircle,
  AiFillGithub,
  AiFillInstagram,
} from 'react-icons/ai';

const Home = () => {
  const {
    roleType,
    createRoleType,
    sendRoleType,
    handleRoleAssign,
    sendRole,
    assignRole,
    validation,
    currentAccount,
    roleTypeCount,
    setRoleType,
    roleArr,
    roles,
    handleRoleChange,
    membersArr,
    members,
    memberCount,
    memberValidation,
    changeRoleStatus,
    isRoleChecked,
    setIsRoleChecked,
  } = useContext(MemberRoleContext);

  const [showRoles, setShowRoles] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  const submitRole = (e) => {
    e.preventDefault();

    if (!roleType) {
      alert('Please Input a role');
      return;
    }

    sendRoleType();
    setRoleType('');
  };

  const handleAssign = (e) => {
    e.preventDefault();

    const { addressTo, roleType } = assignRole;

    if (!validation) {
      alert("Please enter a valid Agent's address");
      return;
    }

    if (!addressTo || !roleType) {
      alert('Please fill in the fields');
      return;
    }
    sendRole();
  };

  const handleRoleSubmit = (e) => {
    e.preventDefault();

    changeRoleStatus();
  };

  useEffect(() => {
    roleArr();
    membersArr();
    // eslint-disable-next-line
  }, [roleTypeCount, memberCount]);

  const uniqueRoles = [...new Set(roles)];
  const uniqueRolesLength = uniqueRoles.length;
  const uniqueMembers = [...new Set(members)];
  const uniqueMembersLength = uniqueMembers.length;

  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Box
      width="100%"
      height={isMobile ? 'inherit' : '100vh'}
      position="relative"
    >
      <video src={videBg} autoPlay loop muted style={{ width: 'inherit' }} />
      <Box
        position={isMobile ? 'relative' : 'absolute'}
        width="100%"
        height="100%"
        top="0"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <Heading fontSize={isMobile ? '24px' : '29px'}>Welcome to the</Heading>
        <Heading fontSize={isMobile ? '24px' : '29px'}>SUPERVERSE</Heading>
        {currentAccount && (
          <Heading fontSize={isMobile ? '24px' : '29px'}>
            Agent {shortenAddress(currentAccount)}
          </Heading>
        )}
      </Box>
      <Box
        display={isMobile ? 'none' : 'flex'}
        position="absolute"
        top="20%"
        right="0"
        mr="1rem"
        flexDirection="column"
        gap="1rem"
      >
        <span>
          <AiFillTwitterCircle
            className="icons"
            style={{ color: 'gray', fontSize: '2rem', cursor: 'pointer' }}
          />
        </span>
        <span>
          <AiFillGithub
            className="icons"
            style={{ color: 'gray', fontSize: '2rem', cursor: 'pointer' }}
          />
        </span>

        <span>
          <AiFillInstagram
            className="icons"
            style={{ color: 'gray', fontSize: '2rem', cursor: 'pointer' }}
          />
        </span>
      </Box>

      <Flex
        padding="5rem"
        flexDirection="column"
        gap="5rem"
        justify="center"
        align={isMobile ? 'center' : 'inherit'}
      >
        <Box>
          <Heading>Create RoleType</Heading>
          <Flex
            justify={isMobile ? 'center' : 'space-around'}
            align="center"
            flexDirection={isMobile ? 'column' : 'row'}
            gap="1rem"
          >
            <Text fontSize="22px">Role Type</Text>
            <input
              type="text"
              name="role"
              placeholder="Role Type"
              onChange={createRoleType}
              className="form"
              data-cy="roleType-Input"
            />
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0f0f0f"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              margin="0 15px"
              data-cy="roleType-Input"
              onClick={submitRole}
              _hover={{
                opacity: 0.9,
              }}
            >
              Create RoleType
            </Button>
          </Flex>
        </Box>
        <Box display="flex" flexDirection="column">
          <h1>Assign Role to Address</h1>
          <Grid templateColumns="repeat(2, 1fr)">
            <Box
              display="flex"
              flexDirection="column"
              gap="2rem"
              justifyContent="center"
            >
              <Flex flexDirection="column">
                <Text fontSize="22px">Member Address</Text>
                <input
                  type="text"
                  name="addressTo"
                  placeholder="Member Address"
                  onChange={handleRoleAssign}
                  className="form"
                />
                {!validation && (
                  <Text color="#eb4034" fontSize="13px">
                    * Please Input a valid Agent's address
                  </Text>
                )}
              </Flex>
              <Flex flexDirection="column">
                <Text fontSize="22px">Role Type</Text>
                <input
                  type="text"
                  name="roleType"
                  placeholder="Role Type"
                  onChange={handleRoleAssign}
                  className="form"
                />
              </Flex>
            </Box>
            <Image src={agent} alt="" width="8rem" marginLeft="4rem" />
          </Grid>
          <Button
            backgroundColor="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0f0f0f"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            width={isMobile ? '60%' : '50%'}
            height="3rem"
            onClick={handleAssign}
            mt="1rem"
            _hover={{
              opacity: 0.9,
            }}
          >
            Assign Role to Agent
          </Button>
        </Box>
        <Box display="flex" flexDirection="column">
          <Heading>Change Agent Role Status</Heading>
          <Grid templateColumns="repeat(2, 1fr)">
            <Image
              src={agent2}
              width={isMobile ? '13rem' : 'inherit'}
              alt=""
              marginLeft="4rem"
            />
            <Box
              display="flex"
              flexDirection="column"
              gap="2rem"
              justifyContent="center"
            >
              <Flex flexDirection="column">
                <Text fontSize={isMobile ? '15px' : '22px'}>
                  Member Address
                </Text>
                <input
                  type="text"
                  name="roleAddress"
                  placeholder="Member Address"
                  onChange={handleRoleChange}
                  className="form"
                />
                {!memberValidation && (
                  <Text color="#eb4034" fontSize={isMobile ? '8px' : '13px'}>
                    *This address doesn't belong to one of our agents
                  </Text>
                )}
              </Flex>
              <Flex align="center">
                <Text fontSize={isMobile ? '15px' : '22px'}>Role Status</Text>
                <Input
                  type="checkbox"
                  name="roleType"
                  placeholder="Role Type"
                  onChange={() => setIsRoleChecked(!isRoleChecked)}
                  className="form"
                  checked={isRoleChecked}
                  width="5rem"
                />
              </Flex>
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                width={isMobile ? '100%' : '50%'}
                height="3rem"
                onClick={handleRoleSubmit}
                _hover={{
                  opacity: 0.9,
                }}
              >
                Change Agent Status
              </Button>
            </Box>
          </Grid>
        </Box>
        <Box>
          <Heading lineHeight="3rem">
            There are currently {uniqueRolesLength} roles available for Agents
          </Heading>
        </Box>
        <Box>
          <Heading lineHeight="3rem">
            And there are currently {uniqueMembersLength} Agents(Members)
            available
          </Heading>
        </Box>
        <Box>
          <h1>ROLE TYPES</h1>
          <Flex justify="space-between">
            <Heading lineHeight="3rem">
              Click the button to see List of Role Types ------{'>'}
            </Heading>

            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0f0f0f"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              margin="0 15px"
              onClick={() => setShowRoles(!showRoles)}
              _hover={{
                opacity: 0.9,
              }}
            >
              Show Roles
            </Button>
          </Flex>
          {showRoles &&
            uniqueRoles.map((item, i) => {
              return (
                <ul key={i}>
                  <li>{item}</li>
                </ul>
              );
            })}
        </Box>
        <Box>
          <h1>MEMBERS/AGENTS</h1>
          <Flex justify="space-between">
            <Heading lineHeight="3rem">
              Click the button to see List of Members/Agents ------{'>'}{' '}
            </Heading>

            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0f0f0f"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              margin="0 15px"
              onClick={() => setShowMembers(!showMembers)}
              _hover={{
                opacity: 0.9,
              }}
            >
              Show Members
            </Button>
          </Flex>
          <Box>
            {showMembers &&
              uniqueMembers.map((item, i) => {
                return (
                  <ul key={i}>
                    <li>{item}</li>
                  </ul>
                );
              })}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
