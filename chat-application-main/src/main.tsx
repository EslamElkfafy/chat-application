import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import SizeContextProvider from "./context/SizeContextProvider.tsx";
import AdminContextProvider from "./context/AdminContextProvider.tsx";
import UserContextProvider from "./context/UserContextProvider.tsx";
import SocketContextProvider from "./context/SocketContextProvider.tsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
    <UserContextProvider>
      <SocketContextProvider>
         <AdminContextProvider>
        <SizeContextProvider>
          <ChakraProvider>
          <ToastContainer />
            <App />
          </ChakraProvider>
        </SizeContextProvider>
      </AdminContextProvider>
      </SocketContextProvider>
    </UserContextProvider>
    </BrowserRouter>
);
