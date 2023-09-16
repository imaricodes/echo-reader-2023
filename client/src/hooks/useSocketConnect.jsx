import { useCallback } from 'react';
import { socket } from "../socketIO/socket-service";

const useSocketConnect = () => {

    const connectSocket = useCallback(() => {
        if (!socket.connected) {
            socket.connect();
        }
    }, []); // Add dependencies here if any

    const disconnectSocket = useCallback(() => {
        if (socket) {
            socket.disconnect();
        }
    }, []); // Add dependencies here if any

    return {connectSocket, disconnectSocket}
};

export default useSocketConnect;