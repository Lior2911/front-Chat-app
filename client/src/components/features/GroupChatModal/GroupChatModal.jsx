import React from "react";
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Box
} from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../../contexts/ChatProvider";
import axios from "axios";
import UserListItem from '../UserListItem/UserListItem'
import UserBadgeItem from "../UserBadge/UserBadge";
const GroupChatModal = ({ children }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [search, setSearch] = useState()
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const {user , chats , setChats} = ChatState()

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
      console.log(data);
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
  const handleSubmit = async ()=>{
    if(!groupChatName || !selectedUsers){
      toast({
        title:"please fill all the fields",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top"
      })
      return
    }
    try {
      const config = {
        headers : {
          Authorization : `Bearer ${user.token}`
        }}
      const {data} = await axios.post('/chats/groupChat',{
        name:groupChatName,
        users:JSON.stringify(selectedUsers.map((u)=>u._id))

      },config)
      setChats([data , ...chats])
      onClose()
      toast({
        title:"new group chat created",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })

      
    } catch (error) {
      console.log({message:"failed to create a new group"})
    }
  }
  const handleGroup = (userToAdd)=>{
    if(selectedUsers.includes(userToAdd)){
      toast({
        title:"user already added",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top"
      })
      return
    }else{

     return setSelectedUsers([...selectedUsers,userToAdd])
    }
  }
  const handleDelete = (delUser)=>{
    setSelectedUsers(selectedUsers.filter(((sel)=>sel._id !== delUser._id)))
  }
  
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
          fontSize="35px"
          d="flex"
          justifyContent="center">
            Create Group Chat
            </ModalHeader>
          <ModalCloseButton />

          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl >
              <Input 
              placeholder="Chat Name"
              mb={3}
              onChange={(e)=>setGroupChatName(e.target.value)}/>
            </FormControl>
            <FormControl >
              <Input 
              placeholder="Add Users"
              mb={1}
              onChange={(e)=>handleSearch(e.target.value)}/>
           
            </FormControl>
            <Box
            w="100%"
            d="flex"
            flexWrap="wrap"
            bg="black"
            >
            {selectedUsers.map((u)=>(
             <UserBadgeItem key={user._id} user={u} handleFunction={()=>handleDelete(u) }/>))}
            </Box>
            {loading?(<div>loading..</div>):(
              searchResults?.slice(0,4).map((user)=>(
                <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)} />

              ))
            )}

          </ModalBody>

          <ModalFooter>
            <Button backgroundColor="lightgray" onClick={handleSubmit}>
              Create Chat
            </Button>
     
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
