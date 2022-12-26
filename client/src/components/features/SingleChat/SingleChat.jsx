import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box,FormControl,IconButton,Input,Spinner,Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../../contexts/ChatProvider'
import { getSender,getSenderFull } from '../../../config/chatLogics'
import ProfileBox from '../ProfileBox/ProfileBox'
import UpdateGroupChatModal from '../UpdateGroupChatModal/UpdateGroupChatModal'
import { useState } from 'react'

import axios from 'axios'

const SingleChat = ({fetchAgain , setFetchAgain}) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessages, setNewMessages] = useState()
  const toast = useToast()
  const {user , selectedChat , setSelectedChat} = ChatState()

  const sendMessage = async (event)=>{
    if(event.key === "Enter" && newMessages){
      try {
        setLoading(true)
        const config = {
          headers : {
            "Content-Type":"application/json",
            Authorization : `Bearer ${user.token}`
          }
        }
        setNewMessages("")
        const {data} = await axios.post("/messages",{
          content: newMessages,
        chatId:selectedChat._id,},config)
        
        setMessages([...messages,data])
      } catch (error) {
        toast({
          title:"Error Occurred",

        })
        
        setLoading(false)
      }


    }
  
  }
  const typingHandler = (e)=>{
    setNewMessages(e.target.value)
    setLoading(false)
  }
  
  
  return (
    <>
    {selectedChat?(
      <>
      <Text 
      fontSize={{base:"28px",md:"30px"
    }}
    pb={3}
    px={2}
    w="100%"
    display="flex"
    justifyContent={{base:"space-between"}}
    alignItems="center">
      <IconButton 
      d={{base:"flex",md:"none"}}
      icon={<ArrowBackIcon/>}
      onClick={()=>setSelectedChat("")}/>
    {selectedChat.SingleChat?(<>
    {getSender(user,selectedChat.users)}
    <ProfileBox user={getSenderFull(user,selectedChat.users)}/>
    </>):(
      <>
      {selectedChat.chatName}
      <UpdateGroupChatModal fetchAgain={fetchAgain}
      setFetchAgain={setFetchAgain}/>
      </>
    )}
    
        </Text>
        <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="E8E8E8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY='hidden'>
          {loading ? (
            <Spinner
            size="xl"
            w={20}
            h={20}
            alignSelf="center"
            margin="auto"/>
          ):(<>
          <div>
            messages
          </div>
          </>)}
          <FormControl onKeyDown={sendMessage} isRequired={3}>
            <Input 
            variant="filled"
            bg="#E0E0E0"
            placeholder='Enter a message..'
            onChange={typingHandler}
            value={newMessages}/>


          </FormControl>
        </Box>
      </>
    ):(
      <Box d="flex" alignItems="center" justifyContent="center" h="100%">
        <Text fontSize="3xl" pb={3}>
          choose on of your friends and start chatting

        </Text>

      </Box>
    )}</>
  )
}

export default SingleChat