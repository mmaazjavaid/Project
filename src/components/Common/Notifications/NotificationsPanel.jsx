import React, { useState } from "react";
import {
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkIcon from "@mui/icons-material/Work";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getNotificationsRequest,
  updateNotificationRequest,
} from "../../../state/ducks/notifications/notificationsSlice";

const NotificationsPanel = () => {
  let notifications = useSelector((state) => state.notifications.data);
  let user = useSelector((state) => state.user.data);
  let dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const customNotificationRederer = (notification) => {
    return (
      <>
        {notification.type === "Proposal" && (
          <>
            <ListItemIcon>
              <WorkIcon style={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText
              style={{ maxWidth: "300px" }}
              primary={
                <span style={{ fontSize: "15px" }}>
                  You have received a proposal from{" "}
                  <span style={{ color: "green" }}>{notification?.relatedObj?.Sp_Id?.name}</span>{" "}
                  {moment(notification?.createdAt).fromNow()}
                </span>
              }
              secondary={`Source ad: ${notification?.relatedObj?.Ad_Id?.title}`}
            />
          </>
        )}
        {notification.type === "ProposalHire" && (
          <>
            <ListItemIcon>
              <EmojiEventsIcon style={{ color: "blue" }} />
            </ListItemIcon>
            <ListItemText
              style={{ maxWidth: "300px" }}
              primary={
                <span style={{ fontSize: "15px" }}>
                  Congratulations you are hired by{" "}
                  <span style={{ color: "blue" }}>{notification?.sourceObj?.name}</span>{" "}
                  {moment(notification?.createdAt).fromNow()}
                </span>
              }
              secondary={`Source ad: ${notification?.relatedObj?.Ad_Id?.title}`}
            />
          </>
        )}
        {notification.type === "ProposalTerminate" && (
          <>
            <ListItemIcon>
              <WorkIcon style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText
              style={{ maxWidth: "300px" }}
              primary={
                <span style={{ fontSize: "15px" }}>
                  Your contract is Terminated by{" "}
                  <span style={{ color: "red" }}>{notification?.sourceObj?.name}</span>{" "}
                  {moment(notification?.createdAt).fromNow()} View there review on your profile
                </span>
              }
              secondary={`Source ad: ${notification?.relatedObj?.Ad_Id?.title}`}
            />
          </>
        )}
      </>
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(updateNotificationRequest());
    dispatch(getNotificationsRequest(user._id));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const notificationCount = notifications?.filter(
    (notification) => notification.isRead === false
  ).length;

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notificationCount} color="error">
          {notificationCount ? (
            <NotificationsIcon style={{ fontSize: "30px" }} />
          ) : (
            <NotificationsNoneIcon style={{ fontSize: "30px" }} />
          )}
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{ marginTop: "8px" }}
      >
        <List style={{ minWidth: "200px", maxHeight: "350px", overflowY: "scroll" }}>
          {notifications?.map((notification) => (
            <ListItem key={notification._id}>{customNotificationRederer(notification)}</ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default NotificationsPanel;
