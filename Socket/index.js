const io=require("socket.io")(8900, {
    cors:{
        origin: "http://localhost:3000",

    },
})
let users = [];

const addUser = (userId,socketId) =>{
    console.log(userId, socketId)
    !users.some((user)=> user.userId === userId)&&
    users.push({userId,socketId})
    console.log(users)
}

const removeUser = (socketId)=>{
    users= users.filter((user) => user.socketId !== socketId);
}
const getUsers = (userId)=>{
    console.log(users)
    return users.find(user=>user.userId ===userId)
}

io.on("connection", (socket) =>{
   
    socket.on("addUser",userId=>{
        addUser(userId, socket.id);
        io.emit("getUsers", users);

    })


    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user= getUsers(receiverId)
        console.log(user.socketId)
        io.to(user.socketId).emit("getMessage",{
            senderId,
            text
        })

    })





    socket.on("disconnected", ()=>{
        removeUser(socket.id);
        io.emit("getUsers", users);

    })
})