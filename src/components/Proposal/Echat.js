import React, { useEffect, useRef, useState } from 'react'
import "./echat.css"
import Conversation from '../smallComponents/conversations/Conversation'
import Message from "../smallComponents/message/Message"
import ChatOnline from '../smallComponents/chatOnline/ChatOnline'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { async } from 'q'
import { current } from '@reduxjs/toolkit'
import { io } from "socket.io-client"



export default function Echat() {

    let dispatch = useDispatch();
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState([])
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const user = useSelector((state) => state.user)
    const socket = useRef()
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data =>{
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })
        })
        
    })
    
    useEffect(()=>{

        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&&
        setMessages((prev)=>[...prev, arrivalMessage])


    },[arrivalMessage,currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user.data._id);
        socket.current.on("getUsers", users => {
            console.log(users)
        })

    }, [user])

   

    useEffect(() => {
        const getConversations = async () => {
            try {
                console.log("inside getconversation : "+user.data._id)

                const res = await axios.get("http://localhost:3001/api/conversation/" + user.data._id)

                setConversations(res.data)

            } catch (err) {
                console.log(err)
            }

        }

        getConversations();
    }, [user.data._id])

    useEffect(() => {
        const getMessages = async () => {
            try {

                const res = await axios.get("http://localhost:3001/api/get-all-messages/" + currentChat._id)
                setMessages(res.data)
            } catch (err) {
                console.log(err)

            }
        }
        getMessages()

    }, [currentChat])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.data._id,
            text: newMessage,
            conversationId: currentChat._id
        }
        
        const receiverId = currentChat.members.find(member=> member !==user.data._id)
      

        socket.current.emit("sendMessage",{
            senderId:user.data._id,
            receiverId,
            text:newMessage,
        })
        try {
            const res = await axios.post("http://localhost:3001/api/messages/", message)
            setMessages([...messages, res.data])
            setNewMessage("")
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])



    return (

        <div className='messenger'>
            <div className='chatManu'>
                <div className='chatManuWrapper'>
                    <input placeholder='Search for friends' className='chatManuInput' />
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={user.data} />
                        </div>
                    ))}

                </div>
            </div>
            <div className='chatBox'>
                <div className='chatBoxWrapper'>
                    {
                        currentChat.length !== 0 ?
                            (<>
                                <div className='chatBoxTop' >
                                    {messages.map((m, index) => (
                                        <div key={index} >

                                            <Message message={m} own={m.sender === user.data._id} />
                                        </div>
                                    ))}



                                </div>


                                <div className='chatBoxBottom'>
                                    <textarea className='chatMessageInput'
                                        placeholder='write something...'
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    />
                                    <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                                </div></>) : (
                                <span className='noConversationText'>
                                    start chat with Service Providers
                                </span>)}

                </div>

            </div>
            <div className='chatOnline'>
                <div className='chatOnlineWrapper'>
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>

            </div>


        </div>
    )
}
