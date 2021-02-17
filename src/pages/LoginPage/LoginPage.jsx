import React, { useState } from "react"

import LoginForm from "../../components/LoginForm/LoginForm"

import "./LoginPage.css"

const LoginPage = ({ history, handleSignupOrLogin, determineError }) => {
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")

    const updateMessage = (msg) => {
        setMessage(msg)
        setColor(determineError(msg))
    }

    return (
        <div className="LoginPage">
            <LoginForm
                history={history}
                handleSignupOrLogin={handleSignupOrLogin}
                updateMessage={updateMessage}
            />
            <p className={color}>{message}</p>
        </div>
    )
}

export default LoginPage
