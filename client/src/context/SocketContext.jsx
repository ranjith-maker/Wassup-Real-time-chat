import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { IncomingMessage } from '../store/chatSlice';
import { BASEURL } from "../main";
import { setOnlineUsers } from "../store/userSlice";


const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};



export const SocketProvider = ({ children }) => {

const [socket, setSocket] = useState(null);
const dispatch = useDispatch();

const { isAuthenticated, userData } = useSelector((state) => state.user);

useEffect(() => {
    let socketInstance = null;

    if (isAuthenticated) {
        socketInstance = io(BASEURL, {
            withCredentials: true,
            transports: ["websocket"],
        });

        setSocket(socketInstance);

        socketInstance.on("getOnlineUsers", (users) => {
            dispatch(setOnlineUsers(users));
        });

        socketInstance.on("newMessage", (message) => {
            const incomingSenderId = message.sender?._id || message.sender;

            if (incomingSenderId?.toString() === userData?._id?.toString()) {
                return;
            }

            dispatch(IncomingMessage(message));
        });
    }

    return () => {
        socketInstance?.disconnect();
        setSocket(null);
    };
}, [isAuthenticated, userData?._id, dispatch]);




    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};


