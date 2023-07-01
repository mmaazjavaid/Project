import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import Conversation from "../smallComponents/conversations/Conversation";
import Message from "../smallComponents/message/Message";
import NewsNav from "../Dashboard/NewsFeed/NewsNav";
import { markConversationReadRequest } from "../../state/ducks/conversations/conversationsSlice";
import "./echat.css";

export default function Echat() {
  let { spId, adId } = useParams();
  let { userId } = useParams();
  let dispatch = useDispatch();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const user = useSelector((state) => state.user);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  });

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.data._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        let res;
        if (spId && adId)
          res = await axios.get(
            "http://localhost:3001/api/conversation/" + user.data._id + `/${spId}/${adId}`
          );
        else res = await axios.get("http://localhost:3001/api/conversation/" + userId);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [user.data._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/get-all-messages/" + currentChat._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.data._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== user.data._id);

    socket.current.emit("sendMessage", {
      senderId: user.data._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("http://localhost:3001/api/messages/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatClick = (chat) => {
    setCurrentChat(chat);
    dispatch(markConversationReadRequest(chat._id));
  };

  return (
    <>
      <NewsNav />

      <div className="messenger">
        <div className="chatManu">
          <div className="chatManuWrapper">
            {conversations.map((c) => (
              <div onClick={() => handleChatClick(c)}>
                <Conversation conversation={c} currentUser={user.data} newMessages={c.active} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox" style={{borderLeft:"1px solid gray"}}>
          <div className="chatBoxWrapper">
            {currentChat.length !== 0 ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, index) => (
                    <div key={index}>
                      <Message message={m} own={m.sender === user.data._id} />
                    </div>
                  ))}
                </div>

                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                {userId ? "Your chat with users" : "start chat with Service Providers"}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
