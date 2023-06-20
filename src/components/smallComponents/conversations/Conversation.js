import React, { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";
export default function Conversation(props) {
  const { conversation, currentUser } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getBidders = async () => {
      try {
        const res = await axios("http://localhost:3001/api/get-User/" + friendId);
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getBidders();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img className="conversationImg" src="/images/user.jpg" alt="image" />
      <span className="conversationName">{user.name}</span>
    </div>
  );
}
