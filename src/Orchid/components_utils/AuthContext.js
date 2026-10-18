import { createContext } from "react"
const initialState = {
    username: null,
    user: null,
    userToggle: () => { }
}

const AuthContext = createContext(initialState)

export default AuthContext