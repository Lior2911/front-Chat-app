import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../../../contexts/ChatProvider";


const UserBadgeItem = ({ handleFunction}) => {
  const {user} = ChatState()
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="gold"
      color='white'
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {/* {admin === user._id && <span> (Admin)</span>} */}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;