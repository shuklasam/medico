import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';
import { LogOut, LayoutDashboard, BarChart2, ShieldCheck, Droplet, User } from 'lucide-react';

const Layout = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <Droplet color="#ef4444" size={32} fill="#ef4444" fillOpacity={0.2} />
                    <h1>Medico</h1>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        <span>Inventory</span>
                    </Link>
                    <Link to="/analytics" className={`nav-item ${isActive('/analytics') ? 'active' : ''}`}>
                        <BarChart2 size={20} />
                        <span>Analytics</span>
                    </Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin" className={`nav-item ${isActive('/admin') ? 'active' : ''}`}>
                            <ShieldCheck size={20} />
                            <span>Control Panel</span>
                        </Link>
                    )}
                </nav>
                <div className="logout-container">
                    <button onClick={handleLogout} className="logout-btn interactive-hover">
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
            <main className="main-content">
                <header className="main-header">
                    <div className="user-profile-chip glass">
                        <div className="user-avatar">
                            <User size={16} />
                        </div>
                        <div className="user-details">
                            <span className="user-name">{user?.name || user?.hospitalName || user?.organisationName}</span>
                            <span className="user-role-badge">{user?.role}</span>
                        </div>
                    </div>
                </header>
                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
