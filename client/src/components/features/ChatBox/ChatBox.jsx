import React from 'react'
import { ChatState } from '../../../contexts/ChatProvider'
import {Box} from '@chakra-ui/react'
import SingleChat from '../SingleChat/SingleChat'

const ChatBox = ({fetchAgain , setFetchAgain}) => {
  const {selectedChat} = ChatState()
  return (
    <Box 
    display={{base:selectedChat?"flex":"none" , md:"flex"}}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="antiquewhite"
    w={{base:"100%" , md:"68%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox