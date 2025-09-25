import logo from './logo.svg';
import './App.css';
import React from "react";
//We use route in order to define the different routes of our app
import {Route, Routes } from "react-router-dom";
//components we will need in our app - we create these:
import NavBar from "./components/navbar";
import PostList from "./components/postList";
import EditPost from "./components/postEdit";
import CreatePost from "./components/postCreate";
import Register from "./components/register";
import Login from "./components/login";

const App = () =>{
  return(
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
</Routes>
    </div>
  );
};

export default App;