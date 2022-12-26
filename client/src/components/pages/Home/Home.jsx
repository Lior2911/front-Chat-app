import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import LogIn from "../../Auth/LogIn";
import SignUp from "../../Auth/Sign-Up";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ChatState}from '../../../contexts/ChatProvider'

const Home = () => {
  const {setUser} = ChatState()
  const navigate = useNavigate()
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    setUser(userInfo)

    if(!userInfo){
    return navigate('/chats')

    }
  },[navigate])
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
       justifyContent='center'
        bg={"white"}
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="3px"
        borderColor={"black"}
      >
        <Text  fontSize="4xl" fontFamily={"sans-serif"}>
          Chat-Up
        </Text>
      </Box>
      <Box bg="white" p={4} w="100%" borderRadius="lg" border borderWidth='3px' borderColor={"black"}>


    <Tabs>
      <TabList mb='1em'>
        <Tab width='50%'>LogIn</Tab>
        <Tab width='50%'>Sign-Up</Tab>
       
      </TabList>
      <TabPanels>
        <TabPanel><LogIn/></TabPanel>
        <TabPanel><SignUp/></TabPanel>

      </TabPanels>
    </Tabs>

      </Box>
    </Container>
  );
};

export default Home;
