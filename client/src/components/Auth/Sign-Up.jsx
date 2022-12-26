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



const SignUp = () => {
  const toast = useToast()
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic ,setPic] = useState()
  const [picLoading,setPicLoading]= useState(false)
  const [loading ,setLoading] = useState()

  const navigate = useNavigate()
  

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setPicLoading(true)
    if(!name || !email ||!password || !confirmPassword){
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setPicLoading(false)
      return
    }
    if(password !== confirmPassword){
      toast({
        title: 'the password not matched',
        status:"warning",
        duration:5000,
        isClosable:true,
        position: 'bottom'
      })
      return
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/users",
        {
          name,
          email,
          password,
          pic,
         
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false)
      navigate('/chats')
    
    
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false)
     
    }
  };

  const postDetails = (pics)=>{
    setLoading(true);
    if(pics == undefined){
      toast({
        title: "Error Occurred!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;

    }
    if(pics.type == 'image/jpeg'||pics.type == "image/png"){
      const data = new FormData()
      data.append('file',pics);
      data.append('upload_preset',"Chat-Up")
      data.append("cloud_name" ,"lior-chatup" )
      fetch("http://api.cloudinary.com/v1_1/lior-chatup/image/upload",{
        method:"post",
        body:data,
      })
      .then((res)=>res.json())
      .then((data)=>{
        setPic(data.url.toString())
        setPicLoading(false)

      }).catch((err)=>{
        console.log(err);
        setPicLoading(false)
      })
    } 
    else{
      toast({
        title:'please select an image',
        status:'warning',
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      setLoading(false)
      return
    }


  }

    
  return (
    <>
    <VStack spacing="5px">
      <FormControl id="first-name">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>

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
      <InputGroup>
        <FormControl id="confirm-password">
          <FormLabel>confirm-password</FormLabel>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Your password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="small" onClick={handleClick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </FormControl>
      </InputGroup>

      <FormControl>
        <FormLabel>Upload your picture</FormLabel>
        <Input
        type="file"
        p={1.5}
        accept="image/*"
        onChange={(e)=>postDetails(e.target.files[0])}/>

      </FormControl>

   

      <Button
        colorSchema="blue"
        width="100%"
        style={{ marginTop: 15 }} 
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign-Up
      </Button>
    </VStack>
    </>
  );
  };


          
export default SignUp;
