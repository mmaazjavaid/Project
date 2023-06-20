import "./message.css";
import TimeAgo from "timeago-react";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src="/images/user.jpg" alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        <TimeAgo datetime={message.createdAt} />
      </div>
    </div>
  );
}
