import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light" >
                <a class="navbar-brand">Navbar</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item nav-link">
                            <Link to={`/`}>
                                Home
                            </Link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#products">Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#about">About</a>
                        </li>
                        <li class="nav-item nav-link">
                            <Link to={`/contact`}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}