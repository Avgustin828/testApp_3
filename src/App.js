import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import TodoList from './components/TodoList'
import './App.css'

function App() {
	const isAuthenticated = () => {
		return localStorage.getItem('token') !== null
	}

	return (
		<div className='App'>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route
					path='/todos'
					element={isAuthenticated() ? <TodoList /> : <Navigate to='/login' />}
				/>
				<Route path='/' element={<Navigate to='/todos' />} />
			</Routes>
		</div>
	)
}

export default App
