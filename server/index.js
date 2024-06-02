import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chats.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import  {Server} from "socket.io";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import User from "./models/User.js";
import postRoutes from "./routes/posts.js"
import roomRoutes from "./routes/room.js"
import http from "http"


const app = express();
const server = http.createServer(app);
let io = new Server(server, {
  origin: true, // Allows all origins
  credentials: true // Allows sending cookies with the request
})

const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Destination folder where uploaded files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Save file with original name and timestamp
  }
});
const upload = multer({ storage: storage });
dotenv.config();

const connect = () => {
  mongoose
    .connect('mongodb://localhost:27017')
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};
let online = []
let s = new Set()
let tempList = [];
io.on("connection", socket => {
  console.log(socket.id)
  socket.on("sent-event", (message) => {
    socket.broadcast.emit("receive-event", message)
  })
  socket.emit('userStatus', { userId: socket.id, status: 'online' });
  socket.on('user', async (user) => {
    console.log("---------------in------------------")
    let found = false
    for (let i = 0; i < online.length; i++)
    {
      if (online[i].socketID === socket.id)
      {
        found = true
        break
      }
    }
    if (!found)
    {
      online.push({socketID: socket.id, userId: user._id})
      console.log(online)
      await User.findByIdAndUpdate(user._id, {
        $addToSet: {tokens: socket.id},
        status: "connect"
      }) 
      // for(let i = 0; i < online.length; i++) {
      //   s.add(online[i].userId)
      // }
      // tempList = [...s]
      // socket.broadcast.emit("online", tempList)
      // socket.emit("online", tempList)
      // s.clear()
    }
  
  })
  socket.on("join-room", room => {
    socket.join(room);
  })
  socket.on("leave-room", (room) => {
    socket.leave(room);
  })
  socket.on("send-room",(message, room) => {
    socket.to(room).emit("receive-room", message)
  } )
  socket.on("info", (message, userId, fromUserId) => {
    console.log("aaaaaaaaaaaaa")
    console.log(socket.id)
    socket.broadcast.emit("recieve-info", message, userId, fromUserId)
  })
  // Handle incoming audio stream
  socket.on('audioStream', (audioData, room) => {
    console.log(room)
    if (room) 
      socket.to(room).emit('audioStream', audioData);
  });
  // for(let i = 0; i < online.length; i++) {
  //   s.add(online[i].userId)
  // }
  // tempList = [...s]
  // console.log(tempList)
  // socket.emit("online", tempList)
  
  // s.clear()
  socket.on('disconnect', async () => {
    console.log('User disconnected');
    let socketIndex = -1
    for (let i = 0; i < online.length; i++)
    {
      if (online[i].socketID === socket.id)
      {
        socketIndex = i
        break
      }
    }
    if (socketIndex != -1)
    {
      let userId = online[socketIndex].userId
      online.splice(socketIndex, 1)
      const currentUser = await User.findByIdAndUpdate(userId, {
        $pull: {tokens: socket.id}
      })
      if ((currentUser.tokens.length - 1) === 0) {
        await User.findByIdAndUpdate(userId, {
          status: "disconnect",
          deptureTime: Date.now()
        })
      }
      // for(let i = 0; i < online.length; i++) {
      //   s.add(online[i].userId)
      // }
      // tempList = [...s]
      // socket.broadcast.emit("online", tempList)
      // socket.emit("online", tempList)
      // s.clear()
    }
    
    // Emit event when user disconnects
    // io.emit('userStatus', { userId: socket.id, status: 'offline' });
  });
  
})



//middlewares
app.use(cors({
  origin: true, // Allows all origins
  credentials: true // Allows sending cookies with the request
}));
app.use(cookieParser({limit: "800mb"}));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, 'static')))
app.get("/:rommId", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"))
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/posts", postRoutes)
app.use("/api/rooms", roomRoutes)

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
app.post('/upload', upload.single('file'), (req, res) => {
  // 'image' is the name attribute of the file input field in the form
  console.log(req.file)
  const path = req.file.path
  res.status(200).json({path, type: req.file.mimetype});
});
app.get("/api/socket/:roomId", (req, res) => {
  const roomId = req.params.roomId
  const room = io.sockets.adapter.rooms.get(roomId)
  return res.status(200).json(room? room.size : 0)
})
server.listen(port, '0.0.0.0', () => {
  connect();
  console.log("Connected to Server");
});
