import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"
import AuthContext from "./AuthContext"


export default function Navigation() {
    const { theme, toggle, dark } = useContext(ThemeContext)
    const { username, login, logout } = useContext(AuthContext)

    return (
        <div>
            <nav class="navbar navbar-expand-lg" style={{ backgroundColor: theme.backgroundColor, color: theme.color }} >
                <a class="navbar-brand" href="#" style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.color,
                    outline: 'none'
                }}><strong>OrchidLab</strong></a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav" style={{
                        backgroundColor: theme.backgroundColor,
                        color: theme.color,
                        outline: 'none'
                    }}>
                        <li class="nav-item active">
                            <a class="nav-link" href="#" style={{
                                color: theme.color,
                                outline: 'none'
                            }}>Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#products" style={{
                                color: theme.color,
                                outline: 'none'
                            }}>Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#about" style={{
                                color: theme.color,
                                outline: 'none'
                            }}>About</a>
                        </li>
                    </ul>
                </div>
                <div> {/* Bruh, spagetti code momento :v*/}
                    {
                        !username ?
                            <>
                                <p>Login as <strong>Typhoeus</strong></p>
                                <button className="btn btn-primary" onClick={() => login("Typhoeus")}><strong>Login</strong></button>
                            </>
                            :
                            <>
                                <p>Welcome to <strong>OrchidLab</strong>, <strong>{username}</strong></p>
                                <button className="btn btn-secondary" onClick={() => logout()}><strong>Logout</strong></button>
                            </>
                    }
                </div>
                <div style={{ position: 'relative' }}>
                    <a className='switch-mode' href='#' onClick={toggle}
                        style={{
                            backgroundColor: theme.backgroundColor,
                            color: theme.color,
                            outline: 'none'
                        }} data-testid="toggle-theme-btn"
                    >
                        Switch to {!dark ? 'Dark' : 'Light'} mode
                    </a>
                </div>
            </nav>
            <hr/>
        </div>
    )
}