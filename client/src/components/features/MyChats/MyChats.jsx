import React from 'react'
import { ChatState } from '../../../contexts/ChatProvider';
import { Box, Button, useToast,Stack,Text } from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons'
import { useState,useEffect } from 'react';
import { getSender } from '../../../config/chatLogics';
import axios from 'axios';
import  ChatLoading from '../ChatLoading/ChatLoading'
import GroupChatModal from '../GroupChatModal/GroupChatModal';

const MyChats = ({fetchAgain}) => {
  const { user,setSelectedChat,selectedChat,chats,setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast()

  const fetchChats = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/chats", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()

  }, [fetchAgain])
  

  return (
    <Box
    d={{base: selectedChat ? "none":"flex",md:"flex"}}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="antiquewhite"
    w={{base:"100%" ,md:"31%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
      <Box
      pb={3}
      px={3}
      fontSize={{base:'28px',md:"30px"}}
      d="flex"
      w='100%'
      justifyContent="space-between"
      alignItems="center"
      >
        My Chats
       <GroupChatModal>
        <Button 
        d="flex"
        fontSize={{base:"17px" , md:"10px",lg:"17px"}}
        rightIcon={<AddIcon/>}>
          New Group Chat
        </Button>
        </GroupChatModal>

      </Box>
      <Box
      display="flex"
      flexDir="column"
      p={3}
      bg="#f8f8f8"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
      >
        {chats?(
          <Stack overflowY="scroll">
            {chats?.map((chat)=>(
             <Box
              onClick={()=>setSelectedChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat? "#38B2AC":"#E8E8E8"}
              color={selectedChat === chat?"white":"black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}>
                <Text>
                  {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                </Text>
                {chat.lastMessage && (
                  <Text fontSize="xs">
                    <b>{chat.lastMessage.sender.name} : </b>
                    {chat.lastMessage.content.length > 50
                      ? chat.lastMessage.content.substring(0, 51) + "..."
                      : chat.lastMessage.content}
                  </Text>
                )}

              </Box>
            ))}

          </Stack>
        ):(
          <ChatLoading/>
        )}
        
      </Box>

    </Box>
  )
}

export default MyChats