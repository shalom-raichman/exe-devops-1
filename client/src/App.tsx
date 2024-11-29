import { useEffect } from "react";
import Nav from "./components/Nav";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Votes from "./components/pages/Votes";
import Statistics from "./components/pages/Statistics";
import { socket } from "./main";
import { useAppDispatch } from "./redux/store";
import { fetchCandidates } from "./redux/slices/candidatesSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("newDataHasOccurred", () => {
      dispatch(fetchCandidates());
      toast.info("Someone somewhere just voted");
    });
  }, []);

  return (
    <div>
      <Nav />
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        theme="light"
        pauseOnHover
        // stacked
      />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="votes" element={<Votes />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
      </Routes>
    </div>
  );
}
