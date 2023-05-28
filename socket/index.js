const io = require("socket.io")(8900,{
    cors:{
        orgin:"http://localhost:3000"
    }
})

let users = [];

const addUser = (userId, socketId) => {
  
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
    console.log(users)
};
console.log(users)
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId != socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  console.log(users)
io.on("connection",(socket)=>{ 
  //connect 
    console.log("a user connected")
    socket.on('addUser',(userId)=>{
    addUser(userId,socket.id)
    io.emit('getUsers',users) 
    }) 
//send and get messege
socket.on("sendMessage", ({ senderId, receiverId, text }) => {
  const user = getUser(receiverId);
  io.to(user?.socketId).emit("getMessage", {
    senderId,  
    text,
  });
});

   //Disconnect
    socket.on('disconnect',()=>{
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
    }) 
}) 