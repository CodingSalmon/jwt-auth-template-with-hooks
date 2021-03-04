import React, { useState } from "react"
import { useParams } from "react-router-dom"
import userService from "../../services/userService"

import "./ResetPasswordPage.css"

const ResetPasswordPage = ({ determineError }) => {
    const [newPassword, setNewPassword] = useState({
        password: "",
        passwordConf: "",
    })
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")
    const { token } = useParams()

    const handleChange = (e) => {
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await userService.resetPassword(
                newPassword.password,
                token
            )
            setColor(determineError(response.message))
            setMessage(response.message)
        } catch (err) {
            setColor(determineError(err.message))
            setMessage(`Error: ${err.message}`)
        }
    }

    const isFormInvalid = () => {
        return !(
            newPassword.password &&
            newPassword.password === newPassword.passwordConf
        )
    }

    return (
        <div className="ResetPasswordPage">
            <div>
                <h3>Reset Password</h3>
                <form
                    className="col s12"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="password"
                                autoComplete="off"
                                onChange={handleChange}
                                className="active"
                                name="password"
                                value={newPassword.password}
                            />
                            <label htmlFor="password">New Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="password"
                                autoComplete="off"
                                onChange={handleChange}
                                className="active"
                                name="passwordConf"
                                value={newPassword.passwordConf}
                            />
                            <label htmlFor="passwordConf">
                                Confirm Password
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button
                                className="btn green"
                                disabled={isFormInvalid()}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                <p className={color}>{message}</p>
            </div>
        </div>
    )
}

export default ResetPasswordPage
