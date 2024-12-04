import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Components/Home'
import LoginPage from '../Components/login'
import Profile from '../Components/Profile'
import RegisterPage from '../Components/Register'
import TaskList from '../Components/TaskList'
import NoMatch from './NoMatch'

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />

        <Route path='/profile' element={<Profile/>}>
          <Route index element={<Navigate to="tasks" />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}
