import React, { useState } from "react"
import { Link } from "react-router-dom"
import userService from "../../services/userService"

import "./ForgotPasswordPage.css"

const ForgotPasswordPage = ({ determineError }) => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await userService.forgotPassword(email)
            setColor(determineError(response.message))
            setMessage(response.message)
        } catch (err) {
            setColor(determineError(err.message))
            setMessage(`Error: ${err.message}`)
        }
    }

    return (
        <div className="ForgotPasswordPage">
            <div>
                <h3>Forgot Password</h3>
                <form
                    className="col s12"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                autoComplete="off"
                                onChange={handleChange}
                                className="active"
                                name="email"
                                value={email}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className="btn green">Submit</button>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <Link to="/login">Return to Login</Link>
                </div>
                <p className={color}>{message}</p>
            </div>
        </div>
    )
}

export default ForgotPasswordPage
