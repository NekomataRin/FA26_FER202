import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"
import AuthContext from "./AuthContext"
import { Link, useLocation } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from 'yup'

export default function Navigation() {
    const { theme, toggle, dark } = useContext(ThemeContext)
    const { username, user, isAdmin, userToggle } = useContext(AuthContext)

    const nameSchema = yup.object({
        name: yup.string().trim().required("Username is required").min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters")
    })

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: nameSchema,
        onSubmit: (values) => {
            userToggle(values.name.trim())
            formik.resetForm()
        },
    })

    const location = useLocation()
    const brand = location.pathname.startsWith('/lab4') ? 'OrchidLab - Lab 4' : 'OrchidLab'
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: theme.backgroundColor, color: theme.color }} >
                <a className="navbar-brand" style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.color,
                    outline: 'none'
                }}><strong>{brand}</strong></a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" style={{
                        backgroundColor: theme.backgroundColor,
                        color: theme.color,
                        outline: 'none'
                    }}>
                        <li className="nav-item">
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <p className="nav-link" style={{
                                    color: theme.color,
                                    outline: 'none',
                                    margin: 'auto',
                                    paddingTop: '10px'
                                }}>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <p className="nav-link" style={{
                                color: theme.color,
                                outline: 'none',
                                margin: 'auto',
                                paddingTop: '10px'
                            }}>Checkout</p>

                        </li>
                        <li className="nav-item">
                            <Link to="/contact" style={{ textDecoration: 'none' }}> {/* This is for Lab 5, not yet created */}
                                <p className="nav-link" style={{
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
                            <form onSubmit={formik.handleSubmit} className="d-flex align-items-center gap-2" style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    name="name"
                                    className={`form-control form-control-sm ${formik.errors.name ? 'is-invalid' : ''}`}
                                    style={{ width: '180px' }}
                                    placeholder="Enter any username"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                <button className="btn btn-primary btn-sm login" type="submit"><strong>Login</strong></button>
                                {formik.errors.name && (
                                    <small style={{ color: 'red', position: 'absolute', top: '100%', left: 0, whiteSpace: 'nowrap' }}>
                                        {formik.errors.name}
                                    </small>
                                )}
                            </form>
                            :
                            <>
                                <p>Welcome to <strong>OrchidLab</strong>, <strong style={{ color: isAdmin ? theme.borderColor : theme.color }}>{username}</strong></p>
                                <button className="btn btn-secondary logout" onClick={() => userToggle("")}><strong>Logout</strong></button>
                            </>
                    }
                </div>
                <div className="ms-3 flex-shrink-0" style={{ position: 'relative' }}>
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