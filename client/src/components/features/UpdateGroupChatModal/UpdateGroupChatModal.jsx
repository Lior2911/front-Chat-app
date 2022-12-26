import React, { useState } from 'react'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,  Spinner,  useDisclosure, useToast } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { ChatState } from '../../../contexts/ChatProvider'
import UserBadgeItem from '../UserBadge/UserBadge'
import axios from 'axios'
import UserListItem from '../UserListItem/UserListItem'

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
  const {isOpen , onOpen , onClose} = useDisclosure();
  const {selectedChat , setSelectedChat , user} = ChatState()
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)
  const [groupChatName, setGroupChatName] = useState("")
  const toast = useToast()

  const handleRemove = ()=> async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/chats/removeGroup`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = ()=>async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/chats/groupAdd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };


  const handleRename = async ()=>{
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/chats/renameGroup`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
     
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  }
  
  

  const handleSearch = async (query)=>{
    setSearch(query)
    if(!query){
      return
    }
    try {
      setLoading(true)
      const config = {
        headers : {
          Authorization : `Bearer ${user.token}`
        }
      }
      const {data} = await axios.get(`/chats?search${search}`,config)

      setLoading(false)
      setSearchResults(data)
    } catch (error) {
      toast({
        title:"Error Occurred",
        description:"Failed to load search results",
        duration:5000,
        isClosable:true,
        position:"bottom-left"
      })
      
    }


  }
 

  return (
    <>
      <IconButton d={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="35px"
          display="flex"
          justifyContent="center"
          >{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
          w="100%"
          display="flex"
          flexWrap="wrap"
          pb={3}
          
          >
            <Box>
            {selectedChat.users.slice(0,4).map((u)=>(
              <UserBadgeItem key={u._id} user={u} admin={selectedChat.groupAdmin} handleFunction={()=>handleRemove(u) }/>
            ))}
            </Box>
            <FormControl display="flex">
              <Input 
              placeholder='Chat Name'
              mb={3}
              value={groupChatName}
              onChange={(e)=>setGroupChatName(e.target.value)}/>
              <Button
              variant="solid"
              colorSchema="blue"
              ml={1}
              isLoading={renameLoading}
              onClick={handleRename}>
                Update

              </Button>
            </FormControl>
            <FormControl>
              <Input 
              placeholder='Add user to group'
              mb={1}
              onChange={(e)=>handleSearch(e.target.value)}/>
            </FormControl>
            {loading?(
              <Spinner size="lg"/>
            ):(
              searchResults?.map((userAdd)=>(
                <UserListItem
                key={userAdd._id}
                user={userAdd}
                handleFunction={()=> handleAddUser(userAdd)}/>
              ))
            )}
   
          </ModalBody>
       

          <ModalFooter>
            <Button colorScheme='red'  onClick={()=>handleRemove(user)}>
              Leave Gruop
            </Button>
   
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal