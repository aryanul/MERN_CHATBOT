import React, { useRef, useState } from 'react'
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from "react-icons/io";
import { sendChatRequest } from '../helper/apiCommunicator';

  // const chatMessages = [
  //   { role: "user", content: "Hello, how can I help you today?" },
  //   { role: "assistant", content: "Hi! I’m here to assist you with any questions or tasks you have." },
  //   { role: "user", content: "Can you explain what a neural network is?" },
  //   { role: "assistant", content: "Sure! A neural network is a computational model inspired by the way biological neural networks in the human brain work. It consists of layers of nodes, or 'neurons,' that process input data and learn patterns to make predictions or classifications." },
  //   { role: "user", content: "That sounds interesting! How does it learn?" },
  //   { role: "assistant", content: "Neural networks learn by adjusting the weights of connections between neurons based on the errors in their predictions. This process is typically done using an algorithm called backpropagation, which helps minimize the error over time through multiple iterations of training." },
  //   { role: "user", content: "Thanks! That was helpful." },
  //   { role: "assistant", content: "You’re welcome! If you have any more questions, feel free to ask." }
  // ];

type Message = {
  role: string;
  content: string;
}
const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    console.log(chatData);
    const newReceivedMessage: Message = { role: "assistant", content: chatData };
    setChatMessages((prev) => [...prev, newReceivedMessage]);
  }
  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%", height: "100%", mt: 3, gap: 3 }}>
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none", flex: 0.2, flexDirection: "column" } }}>
        <Box sx={{ display: "flex", width: "100%", height: "60vh", bgcolor: "rgb(17,29,39)", borderRadius: 5, flexDirection: "column", mx: 3, }}>
          <Avatar sx={{ mx: "auto", my: "2", bgcolor: "white", color: "black", fontWeight: 700, mt: 4, mb: 4 }}>
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask any type of questions to me but Avoid sharing personal information.
          </Typography>
          <Button sx={{ width: "200px", my: "auto", color: "white", fontWeight: 700, borderRadius: 3, mx: "auto", bgcolor: red[300], ":hover": { bgcolor: red.A400 } }} >
            Clear Chat
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column", px: 3 }}>
        <Typography sx={{ textAlign: "center", fontSize: "40px", color: "white", mb: 2, mx: "auto", fontWeight: 600 }}>
          Model - GPT 4o
        </Typography>
        <Box sx={{ width: "100%", height: "60vh", borderRadius: 3, mx: "auto", display: "flex", flexDirection: "column", overflow: "scroll", overflowX: "hidden", overflowY: "auto", scrollBehavior: "smooth" }}>

          {chatMessages.map((chat, index) => (
            //@ts-ignore  
            <ChatItem content={chat.content} role={chat.role} key={index} />))}
        </Box>
        <div style={{ width: "100%", padding: "20px", borderRadius: 8, backgroundColor: "rgb(17,27,39)", display: "flex", margin: "auto" }}>
          <input ref={inputRef} type="text" style={{ width: "100%", backgroundColor: "transparent", padding: "10px", border: "none", outline: "none", color: "white", fontSize: "20px" }} />
          <IconButton onClick={handleSubmit} sx={{ ml: "auto", color: "white" }}><IoMdSend /></IconButton>
        </div>
      </Box>
    </Box>
  )
}

export default Chat;
