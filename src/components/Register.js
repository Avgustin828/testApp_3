import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		setError('')

		if (password !== confirmPassword) {
			setError('Пароли не совпадают')
			return
		}

		const users = JSON.parse(localStorage.getItem('users') || '[]')

		if (users.some(user => user.email === email)) {
			setError('Пользователь с таким email уже существует')
			return
		}

		const newUser = {
			id: Date.now(),
			email,
			password,
		}

		users.push(newUser)
		localStorage.setItem('users', JSON.stringify(users))

		const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }))
		localStorage.setItem('token', token)
		navigate('/todos')
	}

	return (
		<div className='auth-container'>
			<form onSubmit={handleSubmit} className='auth-form'>
				<h2>Регистрация</h2>
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
				<div className='form-group'>
					<label>Подтвердите пароль:</label>
					<input
						type='password'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Зарегистрироваться</button>
				<p>
					Уже есть аккаунт? <Link to='/login'>Войти</Link>
				</p>
			</form>
		</div>
	)
}

export default Register
