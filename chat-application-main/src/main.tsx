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
import OptionContextProvider from "./context/OptionContextProvider.tsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <OptionContextProvider>
        <UserContextProvider>
          <SocketContextProvider>
            <AdminContextProvider>
              <SizeContextProvider>
                <ChakraProvider>
                  <ToastContainer autoClose={false} closeOnClick={true}/>
                  <ToastContainer 
                    stacked 
                    containerId="stacked" 
                    autoClose={false} 
                    closeOnClick={true}
                    position="bottom-left"
                  />
                  <App />
                </ChakraProvider>
              </SizeContextProvider>
            </AdminContextProvider>
          </SocketContextProvider>
        </UserContextProvider>
      </OptionContextProvider>
    </BrowserRouter>
);
