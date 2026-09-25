import { useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
    const [username, setUsername] = useState(null)

    const login = (name) => {
        setUsername(name)
    }

    const logout = () => {
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{ username, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}