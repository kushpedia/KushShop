import React, { useCallback, useRef, useState } from 'react'
import './LoginPage.css'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { login } from '../../services/userService'

const schema = z.object({
	email: z.string().email({message:"Enter a valid Email"}).min(6),
	password: z.string().min(8,{message:"The Password Must be At least 8 Characters"}),
})

const LoginPage = () => {
	const [formError, setFormError] = useState("")
	
	const 
	{
		register,
		handleSubmit,
		formState:{ errors },
	} = useForm({resolver: zodResolver(schema)})
	const onSubmit = async FormData => {
		try {
			await login(FormData)			
			window.location = "/"
		} catch (error) {
			if (error.response && error.response.status === 400){
                setFormError(error.response.data.message)
            }
			
		}
		
	}
	
	return (
		<section className="align_center form_page">
			<form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
				<h2>Login Form</h2>
				<div className="form_inputs">
					<div >
						<label htmlFor="email">Email:</label>
						<input type="email" 
						id='email'
						className='form_text_input' 
						placeholder='Enter Your Email'
						{...register("email")}
						/>
						{
							errors.email && (
								<em className="error_message">
									{errors.email.message}
								</em>
							)
						}
					</div>

					<div >
						<label htmlFor="password">Password:</label>
						<input type="password"
						id='password'
						className='form_text_input'
						placeholder='Enter Password'
						{...register("password")}
						/>
						{
							errors.password && (
								<em className="error_message">
									{errors.password.message}
								</em>
							)
						}
					</div>
					{formError && <em className='form_error'>{formError}</em>}
					<button type="submit" className="search_button form_submit">Submit</button>
				</div>

			</form>
		</section>
	)
}

export default LoginPage
