import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/features/auth/authActions";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("donar");
    const [phone, setPhone] = useState("");
    const [organisationName, setOrganisationName] = useState("");
    const [address, setAddress] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [website, setWebsite] = useState("");

    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!role || !email || !password || !name || !phone || !address) {
            return alert("Please provide all fields");
        }
        dispatch(
            userRegister({
                name,
                role,
                email,
                password,
                phone,
                organisationName,
                address,
                hospitalName,
                website,
            })
        );
    };

    return (
        <div className="login-page">
            <div className="login-inner">
                {/* Left Side: Hero */}
                <div className="login-hero">
                    <img
                        src="/Users/madhulikasanyal/.gemini/antigravity/brain/ff76480e-cd2a-4641-87fe-60037ebbed3e/blood_donation_login_bg_1772281448513.png"
                        alt="Join Medico"
                        className="hero-img"
                    />
                    <div className="hero-overlay">
                        <h1>Join Us</h1>
                        <p>Save lives through better blood management</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="login-content">
                    <div className="login-form-wrapper">
                        <div className="login-header">
                            <h2>Create Account</h2>
                            <p>Enter your details to join the Medico network</p>
                        </div>

                        {error && <div className="error-alert">{error}</div>}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="role-grid">
                                {["donar", "hospital", "organisation"].map((r) => (
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

                            <div className="form-grid">
                                <div className="form-input-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
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
                            </div>

                            <div className="form-grid">
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
                                <div className="form-input-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        placeholder="+1 (555) 000-0000"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {role === "organisation" && (
                                <div className="form-input-group">
                                    <label>Organisation Name</label>
                                    <input
                                        type="text"
                                        placeholder="Red Cross Inc."
                                        value={organisationName}
                                        onChange={(e) => setOrganisationName(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            {role === "hospital" && (
                                <div className="form-input-group">
                                    <label>Hospital Name</label>
                                    <input
                                        type="text"
                                        placeholder="Central Mercy Hospital"
                                        value={hospitalName}
                                        onChange={(e) => setHospitalName(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            <div className="form-input-group">
                                <label>Physical Address</label>
                                <input
                                    type="text"
                                    placeholder="Street, City, State"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>

                            {(role === "organisation" || role === "hospital") && (
                                <div className="form-input-group">
                                    <label>Website URL</label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                </div>
                            )}

                            <button type="submit" className="login-submit-btn" disabled={loading}>
                                {loading ? "Creating account..." : "Register Now"}
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>
                                Already have an account? <Link to="/login">Sign in here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
