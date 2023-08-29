import React from "react";
import { Link } from "react-router-dom"; 

const AuthBox = ({register}) => {
    return (
        <div className="auth">
            <div className="auth__box">
                <div className="auth__header">
                    <h1> {register ? "Register" : "Login"}</h1>
                </div>
                <form>
                    {register &&                     
                        <div className="auth__field">
                            <label>Name</label>
                            <input type="text" />
                        </div>
                    }
                    <div className="auth__field">
                        <label>Email</label>
                        <input type="text" />
                    </div>
                    <div className="auth__field">
                        <label>Password</label>
                        <input type="password" />
                    </div>
                    {register &&                     
                        <div className="auth__field">
                            <label>Confirm Password</label>
                            <input type="text" />
                        </div>
                    }

                    <div className="auth__footer">
                        <p className="auth__error">Something went wrong.</p>
                        <button className="btn"> {register ? "Register" : "Login"} </button>
                        {!register ? (
                            <div className="auth__register">
                                <p>
                                    Not a member? <Link to="/register">Register Now!</Link>
                                </p>
                            </div>
                        ) : (
                            <div className="auth__register">
                                <p>
                                    Already a member? <Link to="/">Login Now!</Link>
                                </p>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthBox;