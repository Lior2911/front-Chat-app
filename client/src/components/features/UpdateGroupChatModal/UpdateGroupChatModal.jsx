import React, { useState } from 'react'
import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { ChatState } from '../../../contexts/ChatProvider'
import UserBadgeItem from '../UserBadge/UserBadge'

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
  const {isOpen , onOpen , onClose} = useDisclosure();
  const {selectedChat , setSelectedChat , user} = ChatState()
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)

  const handleRemove = ()=>{}

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
            {selectedChat.users.map(u=>(
              <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleRemove(u) }/>
            ))}
            </Box>
   
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
   
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal