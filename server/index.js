import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chats.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import User from "./models/User.js";
import Chat from "./models/Chat.js";
import postRoutes from "./routes/posts.js";
import roomRoutes from "./routes/room.js";
import recordRoutes from "./routes/records.js";
import generalRoomRoutes from "./routes/generalRoom.js"
import adminRoutes from './routes/admin.js'
import statusRoutes from './routes/status.js'
import http from "http"
import { env } from "process";
import Room from "./models/Room.js";
import { createProxyMiddleware } from "http-proxy-middleware";
import { promises as fs } from "fs";
import initFiles from "./initFiles.js"

initFiles()

const app = express();
const server = http.createServer(app);
let io = new Server(server, {
  origin: true, // Allows all origins
  credentials: true, // Allows sending cookies with the request
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder where uploaded files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with original name and timestamp
  },
});
const upload = multer({ storage: storage, limits: 2000000000 });
dotenv.config();

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017")
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};
let online = {};
setInterval(async () => {
  const jsonData = await readJsonFile(
    path.resolve("./welcomedailymessages.json")
  );
  jsonData
    .filter((message) => message.type === "daily")
    .forEach((message) => {
      if (Date.now() - message.date >= 1000 * 60 * 60) {
        io.emit("receive-event", message);
        updateJsonFile(
          path.resolve("./welcomedailymessages.json"),
          (jsonData) =>
            jsonData.map((item) =>
              item.id === message.id ? { ...item, date: Date.now() } : item
            )
        );
      }
    });
  const bannedUsers = await User.find({ "banned.bannedUntil": { $ne: null } });
  await Promise.all(
    bannedUsers.map(async (user) => {
      if (Date.now() >= user.banned.bannedUntil) {
        return User.findByIdAndUpdate(user._id, { $set: { banned: null } });
      }
    })
  );
}, 1000);
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("sent-event", (message) => {
    socket.broadcast.emit("receive-event", message);
  });
  socket.emit("userStatus", { userId: socket.id, status: "online" });
  socket.on("user", async (user) => {
    console.log("---------------in------------------");
    const temp = online[user._id];
    online[user._id] = socket.id;

    if (temp) {
      socket.to(temp).disconnectSockets();
    }
  });
  socket.on("sent-welcome", async () => {
    const jsonData = await readJsonFile(
      path.resolve("./welcomedailymessages.json")
    );
    jsonData
      .filter((message) => message.type === "welcome")
      .forEach((message) => socket.emit("receive-event", message));
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("leave-room", (room) => {
    socket.leave(room);
  });
  socket.on("send-room", async (message, room) => {
    socket.to(room).emit("receive-event", message);
  });
  socket.on("send-private", (message, room) => {
    socket.to(room).emit("receive-room", message);
  });
  socket.on("info", (message, userId, fromUserId) => {
    console.log("aaaaaaaaaaaaa");
    console.log(socket.id);
    socket.broadcast.emit("recieve-info", message, userId, fromUserId);
  });
  // Handle incoming audio stream
  socket.on("audioStream", (audioData, room) => {
    if (room) socket.to(room).emit("audioStream", audioData);
  });

  socket.on("roomsDeleteChecker", () => {
    io.emit("roomsDeleteChecker")
  })
  socket.on("usersDeleteChecker", () => {
    io.emit("usersDeleteChecker")
  })
  socket.on("changeListOfVoices", (roomId) => {
    io.emit("changeListOfVoices", roomId)
  })
  // for(let i = 0; i < online.length; i++) {
  //   s.add(online[i].userId)
  // }
  // tempList = [...s]
  // console.log(tempList)
  // socket.emit("online", tempList)

  // s.clear()
  socket.on("disconnect", async () => {
    console.log("User disconnected");
    const userId = Object.keys(online).find((key) => online[key] === socket.id);
    if (userId) {
      try {
        const user = await User.findByIdAndUpdate(userId, {
          status: "disconnect",
          deptureTime: Date.now(),
          private: [],
        });
        const room = await Room.findById(user.room);
        room.placesOfVoices[room.placesOfVoices.indexOf(user._id)] = "";
        await room.save();
        await Chat.deleteMany({
          $or: [{ user1: userId }, { user2: userId }],
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
});

//middlewares
app.use(
  cors({
    origin: true, // Allows all origins
    credentials: true, // Allows sending cookies with the request
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  "/api/get-my-ip",
  createProxyMiddleware({
    target: "http://ip-api.com/json",
    changeOrigin: true,
    secure: false,
  })
);
app.use("/", express.static(path.join(__dirname, "static")));
app.get("/:rommId", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/admins", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/general", generalRoomRoutes)
app.use("/api/status", statusRoutes)
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

const readJsonFile = async (filePath) => {
  // Read the JSON file
  const data = await fs.readFile(filePath, "utf-8");
  // Parse the JSON data
  return JSON.parse(data);
};
async function updateJsonFile(filePath, updateFunction) {
  try {
    const jsonData = await readJsonFile(filePath);
    // Modify the data
    // For example, let's add a new key-value pair
    const updatedJsonData = updateFunction(jsonData);
    // Stringify the modified data
    const updatedData = JSON.stringify(updatedJsonData, null, 2);

    // Write the updated JSON back to the file
    await fs.writeFile(filePath, updatedData, "utf-8");
    return updatedJsonData;
  } catch (error) {
    return "Error updating JSON file:" + error;
  }
}
app.post("/upload", upload.single("file"), (req, res) => {
  // 'image' is the name attribute of the file input field in the form
  const path = req.file.path;
  console.log(req.file);
  res.status(200).json({ path, type: req.file.mimetype});
});
app.get("/api/socket/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const room = io.sockets.adapter.rooms.get(roomId);
  return res.status(200).json(room ? room.size : 0);
});
app.post("/api/welcomedailymessages/addmessage", async (req, res) => {
  const responseMessage = await updateJsonFile(
    path.resolve("./welcomedailymessages.json"),
    (jsonData) => {
      jsonData.push(req.body.message);
      return jsonData;
    }
  );
  res.status(200).json({ message: responseMessage });
});
app.get("/api/welcomedailymessages/getmessages", async (req, res) => {
  const jsonDataById = await updateJsonFile(
    path.resolve("./welcomedailymessages.json"),
    (jsonData) =>
      jsonData.map((item, index) => ({
        id: index + 1,
        ...item,
      }))
  );
  res.status(200).json(jsonDataById);
});
app.delete("/api/welcomedailymessages/deletemessage/:id", async (req, res) => {
  // TODO: Implement the logic to delete a message from the JSON file
  const id = req.params.id;
  await updateJsonFile(
    path.resolve("./welcomedailymessages.json"),
    (jsonData) => jsonData.filter((item) => item.id !== +id)
  );
  res.status(200).json({ message: "Message deleted successfully" });
});
// Read File Json
app.get("/api/readjsonfile/:fileName", async (req, res) => {
  const filePath = path.resolve(`./${req.params.fileName}.json`);
  const jsonData = await readJsonFile(filePath);
  res.status(200).json(jsonData);
});
// abberviations
app.post("/api/abbreviations/add", async (req, res) => {
  // TODO: Implement the logic to add a new abbreviation to the JSON file
  const { abbreviation, description } = req.body;
  const responseMessage = await updateJsonFile(
    path.resolve("./abbreviations.json"),
    (jsonData) => {
      jsonData[abbreviation] = description;
      return jsonData;
    }
  );
  res.status(200).json({ payload: responseMessage });
});
app.delete("/api/abbreviations/:key", async (req, res) => {
  const key = req.params.key;
  await updateJsonFile(path.resolve("./abbreviations.json"), (jsonData) => {
    delete jsonData[key];
    return jsonData;
  });
  res.status(200).json({ message: "Abbreviation deleted successfully" });
});
app.get("/api/abbreviations/get", async (req, res) => {
  const dataAbbreviations = await readJsonFile(
    path.resolve("./abbreviations.json")
  );
  res.status(200).json(dataAbbreviations);
});
// Filter
app.get("/api/filters/get", async (req, res) => {
  const dataFilters = await readJsonFile(path.resolve("./filter.json"));
  res.status(200).json(dataFilters);
});
app.post("/api/filters/add", async (req, res) => {
  const word = req.body.word;
  const responseMessage = await updateJsonFile(
    path.resolve("./filter.json"),
    (jsonData) => {
      jsonData.push(word);
      let uniqueSet = new Set(jsonData);
      let uniqueArray = Array.from(uniqueSet);
      return uniqueArray;
    }
  );
  res.status(200).json({ payload: responseMessage });
});
app.delete('/api/filters/:word', function(req, res) {
  const word = req.params.word;
  updateJsonFile(path.resolve("./filter.json"), (jsonData) => {
    jsonData = jsonData.filter((item) => item!== word);
    return jsonData;
  });
  res.status(200).json({ message: "Filter deleted successfully" });
});
// Emojis
app.post("/api/emojis/add", async (req, res) => {
  const { urlEmoji } = req.body;
  const responseMessage = await updateJsonFile(
    path.resolve("./emojis.json"),
    (jsonData) => {
      const listOfKeys = Object.keys(jsonData);
      if (listOfKeys.length > 0) {
        const newKey = "ف" + (+listOfKeys[listOfKeys.length - 1].slice(1) + 1);
        jsonData[newKey] = urlEmoji;
      } else {
        jsonData["ف1"] = urlEmoji;
      }

      return jsonData;
    }
  );
  res.status(200).json({ payload: responseMessage });
})
app.get('/api/emojis/get', async (req, res) => {
  const dataEmojis = await readJsonFile(
    path.resolve("./emojis.json")
  );
  res.status(200).json(dataEmojis);
});
app.delete("/api/emojis/:key", async (req, res) => {
  const key = req.params.key;
  await updateJsonFile(path.resolve("./emojis.json"), (jsonData) => {
    delete jsonData[key];
    return jsonData;
  });
  res.status(200).json({ message: "Abbreviation deleted successfully" });
});

//Color Pallete
app.get("/api/colorpalette", async (req, res) => {
  const dataColorPallete = await readJsonFile(
    path.resolve("./colorPalette.json")
  );
  res.status(200).json(dataColorPallete);
});
server.listen(env.PORT, "0.0.0.0", () => {
  connect();
  console.log("Connected to Server " + env.PORT);
});
