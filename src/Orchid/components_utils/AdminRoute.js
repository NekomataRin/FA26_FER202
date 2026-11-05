import { useContext } from "react";
import { Link } from 'react-router-dom'
import AuthContext from "./AuthContext";
import { ThemeContext } from "./ThemeContext";
import './orchidAdmin.css'

export default function AdminRoute({ children }) {
    const { user, isAdmin } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext)

    if (!isAdmin) {
        return (
            <div className="container admin-denied" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                <h1>Access Denied</h1>
                <p>{(!user) ? 'Please login with an admin account.' : <>Sorry <strong>{user}</strong>, this page is for admins only.</>}</p>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        )
    }
    
    return children
}