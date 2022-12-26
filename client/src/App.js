import logo from "./logo.svg";
import "./App.css";
import Home from "./components/pages/Home/Home";
import Chats from "./components/pages/Chats/Chats";
import { Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";


function App() {

  
  return (


   
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>

    </div>
   
  )
}

export default App;
