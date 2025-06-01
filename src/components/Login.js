import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		setError('')

		const users = JSON.parse(localStorage.getItem('users') || '[]')
		const user = users.find(u => u.email === email && u.password === password)

		if (user) {
			const token = btoa(JSON.stringify({ id: user.id, email: user.email }))
			localStorage.setItem('token', token)
			navigate('/todos')
		} else {
			setError('Неверный email или пароль')
		}
	}

	return (
		<div className='auth-container'>
			<form onSubmit={handleSubmit} className='auth-form'>
				<h2>Вход</h2>
				{error && <div className='error'>{error}</div>}
				<div className='form-group'>
					<label>Email:</label>
					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Пароль:</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Войти</button>
				<p>
					Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link>
				</p>
			</form>
		</div>
	)
}

export default Login
