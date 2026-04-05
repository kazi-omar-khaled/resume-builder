import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "./config/api.js";
import { login, setLoading } from "./app/features/authSlice.js";

import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";
import Layout from "./pages/layout";
import ResumeBuilder from "./pages/resumeBuilder";
import Preview from "./pages/preview";
import Login from "./pages/login";

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: token },
        });

        // Server returns the user object directly
        dispatch(login({ token, user: data }));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
      </Route>

      <Route path="/view/:resumeId" element={<Preview />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;

