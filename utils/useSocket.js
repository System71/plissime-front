import { io } from "socket.io-client";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useSocket = (token) => {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, {
      auth: { token },
      transports: ["websocket"], // ignore polling
    });

    socket.on("connect", () => {
      console.log("Connected to websocket");
      // 🔹 Afficher un toast de test
      toast.success("WebSocket connecté ! 🎉", {
        position: "top-right",
        autoClose: 3000, // 3 secondes
      });
    });

    socket.on("connect_error", (err) => {
      console.error("❌ WebSocket error:", err.message);
    });

    socket.on("new_notification", (data) => {
      console.log("Notification reçue :", data);
      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
      });
    });

    return () => socket.disconnect();
  }, [token]);
};

export default useSocket;
