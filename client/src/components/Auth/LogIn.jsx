import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const LogIn = () => {
  const toast = useToast()
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate()


  const handleClick = () => setShow(!show);

  const submitHendler = async () => {
    if(!email || !password){
      toast({
        title:"please fill the fields",
        status:'warning',
        duration:5000,
        isClosable:true,
        position:'bottom'
      })
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/users/login",
        {
      
          email,
          password,
         
        },
        config
      );
      console.log(data);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/chats')
    
    
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
     
    }
    
  }

    
  return (
    <>
    <VStack spacing="5px">
    <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <InputGroup>
        <FormControl id="password">
          <FormLabel>password</FormLabel>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="small" onClick={handleClick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </FormControl>
      </InputGroup>
      <Button
        colorSchema="green"
        width="100%"
        style={{ marginTop: 15 }} 
        onClick={submitHendler}
      >
        Log In
      </Button>
    </VStack>
    </>
  );
  };


export default LogIn