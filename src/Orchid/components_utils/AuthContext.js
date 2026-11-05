import { createContext } from "react"
const initialState = {
    username: null,
    user: null,
    isAdmin: false,
    userToggle: () => { }
}

const AuthContext = createContext(initialState)

export default AuthContext