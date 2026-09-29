import { useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
    const [username, setUsername] = useState(() => localStorage.getItem('user') || null)


    // To toggle username
    const userToggle = (user) => {
        if (user) {
            localStorage.setItem('user', JSON.parse(JSON.stringify(user)))
        } else {
            localStorage.removeItem('user')
        }

        setUsername(user || null)
    }
    const user = (localStorage.getItem('user') === username) ? username : null

    return (
        <AuthContext.Provider value={{ username, user, userToggle }}>
            {children}
        </AuthContext.Provider>
    )
}