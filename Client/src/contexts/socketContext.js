import socketio from "socket.io-client";
import React from "react";
import { SERVER_URL } from "../services/fetchService";

export const socket = socketio.connect(SERVER_URL);
export const SocketContext = React.createContext();
