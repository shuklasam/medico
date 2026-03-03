import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/features/auth/authActions";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("donar");

    const { loading, error, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!role || !email || !password) {
            return alert("Please provide all fields");
        }
        dispatch(userLogin({ role, email, password }));
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <div className="login-page">
            <div className="login-inner">
                {/* Left Side: Illustration/Photo */}
                <div className="login-hero">
                    <img
                        src="/Users/madhulikasanyal/.gemini/antigravity/brain/ff76480e-cd2a-4641-87fe-60037ebbed3e/blood_donation_login_bg_1772281448513.png"
                        alt="Blood Donation"
                        className="hero-img"
                    />
                    <div className="hero-overlay">
                        <h1>Medico</h1>
                        <p>Streamline Blood Inventory & Management</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="login-content">
                    <div className="login-form-wrapper">
                        <div className="login-header">
                            <h2>Welcome Back</h2>
                            <p>Please enter your details to sign in</p>
                        </div>

                        {error && <div className="error-alert">{error}</div>}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="role-grid">
                                {["donar", "admin", "hospital", "organisation"].map((r) => (
                                    <label key={r} className={`role-chip ${role === r ? "active" : ""}`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value={r}
                                            checked={role === r}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <span>{r.charAt(0).toUpperCase() + r.slice(1)}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="form-input-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="login-submit-btn" disabled={loading}>
                                {loading ? (
                                    <span className="loader">Signing in...</span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>
                                Don't have an account? <Link to="/register">Create an account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
