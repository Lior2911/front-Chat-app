import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box,IconButton,Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../../contexts/ChatProvider'
import { getSender,getSenderFull } from '../../../config/chatLogics'
import ProfileBox from '../ProfileBox/ProfileBox'
import UpdateGroupChatModal from '../UpdateGroupChatModal/UpdateGroupChatModal'

const SingleChat = ({fetchAgain , setFetchAgain}) => {
  const {user , selectedChat , setSelectedChat} = ChatState()
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
          messegaes here
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