import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"


export default function Navigation() {
    const { theme, toggle, dark } = useContext(ThemeContext)
    return (
        <div>
            <nav class="navbar navbar-expand-lg" style={{ backgroundColor: theme.backgroundColor, color: theme.color }} >
                <a class="navbar-brand" href="#" style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.color,
                    outline: 'none'
                }}><strong>Orchid</strong></a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#" style={{
                                backgroundColor: theme.backgroundColor,
                                color: theme.color,
                                outline: 'none'
                            }}>Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#products" style={{
                                backgroundColor: theme.backgroundColor,
                                color: theme.color,
                                outline: 'none'
                            }}>Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#about" style={{
                                backgroundColor: theme.backgroundColor,
                                color: theme.color,
                                outline: 'none'
                            }}>About</a>
                        </li>
                    </ul>
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
        </div>
    )
}