import { createContext } from "react"
const initialState = {
    username: null,
    theme: null,
    userToggle: () => { }
}

const AuthContext = createContext(initialState)

export default AuthContext