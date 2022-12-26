import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import MyChats from '../../features/MyChats/MyChats';
import ChatBox from '../../features/ChatBox/ChatBox';
import {ChatState} from '../../../contexts/ChatProvider'
import SideDrawer from '../../features/SideDrawer/SideDrawer'
import { useState } from 'react';


const Chats = () => {
  const {user} = ChatState()
  const [fetchAgain,setFetchAgain] = useState(false)
  

  
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box
      display='flex'
      justifyContent='space-between'
      w='100%'
      h='91vh'
      p='10px'>
        {user&& ( 
        <MyChats fetchAgain={fetchAgain} />)}
        {user&&( 
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>)}
      </Box>
    </div>
  )
}

export default Chats