import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"
import AuthContext from "./AuthContext"
import { Link, useLocation } from 'react-router-dom'


export default function Navigation() {
    const { theme, toggle, dark } = useContext(ThemeContext)
    const { username, user, userToggle } = useContext(AuthContext)
    const location = useLocation()
    const brand = location.pathname.startsWith('/lab4') ? 'OrchidLab - Lab 4' : 'OrchidLab'
    return (
        <div>
            <nav class="navbar navbar-expand-lg" style={{ backgroundColor: theme.backgroundColor, color: theme.color }} >
                <a class="navbar-brand" style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.color,
                    outline: 'none'
                }}><strong>{brand}</strong></a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav" style={{
                        backgroundColor: theme.backgroundColor,
                        color: theme.color,
                        outline: 'none'
                    }}>
                        <li class="nav-item">
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <p class="nav-link" style={{
                                    color: theme.color,
                                    outline: 'none',
                                    margin: 'auto',
                                    paddingTop: '10px'
                                }}>Home</p>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <p class="nav-link" style={{
                                color: theme.color,
                                outline: 'none',
                                margin: 'auto',
                                paddingTop: '10px'
                            }}>Checkout</p>

                        </li>
                        <li class="nav-item">
                            <Link to="/contact" style={{ textDecoration: 'none' }}> {/* This is for Lab 5, not yet created */}
                                <p class="nav-link" style={{
                                    color: theme.color,
                                    outline: 'none',
                                    margin: 'auto',
                                    paddingTop: '10px'
                                }}>Contact</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div style={{ position: 'relative' }}> {/* Bruh, spagetti code momento :v*/}
                    {
                        !user ?
                            <>
                                <p>Login as <strong>Typhoeus</strong></p>
                                <button className="btn btn-primary login" onClick={() => userToggle("Typhoeus")}><strong>Login</strong></button>
                            </>
                            :
                            <>
                                <p>Welcome to <strong>OrchidLab</strong>, <strong>{username}</strong></p>
                                <button className="btn btn-secondary logout" onClick={() => userToggle("")}><strong>Logout</strong></button>
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
            <hr />
        </div>
    )
}