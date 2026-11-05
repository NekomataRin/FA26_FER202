
import { useContext, useState, useEffect } from "react"
//import { orchidData } from "../../components_data/ListOfOrchids"
import '../../components_utils/orchidAdmin.css'
import { ThemeContext } from "../../components_utils/ThemeContext"
import { Link, useLocation, useNavigate } from 'react-router-dom'

import axios from 'axios'

export default function OrchidManage() {
    const { theme } = useContext(ThemeContext)
    const location = useLocation()
    const navigate = useNavigate()

    const [orchidData, setOrchidData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    //Thông báo gửi từ trang Add / Update / Delete sau khi thành công
    const [message, setMessage] = useState(location.state?.message ?? null)
    
    const orchidAPI = process.env.REACT_APP_API_URL
    useEffect(() => {
        axios.get(orchidAPI)
            .then((e) => setOrchidData(e.data))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [])


    //Xoá message khỏi history để F5 không hiện lại
    useEffect(() => {
        if (location.state?.message) navigate(location.pathname, { replace: true, state: null })
    }, [location, navigate])

    if (error) return (
        <div className="container">
            <h1>Error</h1>
            <p>{error}</p>
        </div>
    )

    if (loading) return (
        <div className="container admin-status" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
            <p>Loading orchids...</p>
        </div>
    )

    return (
        <div className="container admin-container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
            <div className="admin-header">
                <h2>Orchid Management</h2>
                <p><strong style={{color: theme.borderColor}}>{orchidData.length} </strong>orchids in collection</p>
            </div>

            {message && (
                <div className="alert alert-success alert-dismissible" role="alert">
                    {message}
                    <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
                </div>
            )}

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Color</th>
                            <th>Origin</th>
                            <th>Rating</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orchidData.length === 0 ? (
                            <tr><td colSpan={9} className="admin-status">No orchids yet.</td></tr>
                        ) : orchidData.map((orchid) => (
                            <tr key={orchid.id}>
                                <td>{orchid.id}</td>
                                <td><img className="admin-thumb" src={orchid.image} alt={orchid.name} /></td>
                                <td><strong>{orchid.name}</strong></td>
                                <td>{orchid.category}</td>
                                <td>{orchid.color}</td>
                                <td>{orchid.origin}</td>
                                <td>{orchid.rating}★</td>
                                <td>
                                    <span className={`admin-tag ${orchid.isNatural ? 'natural' : 'hybrid'}`}>
                                        {orchid.isNatural ? 'Natural' : 'Hybrid'}
                                    </span>
                                </td>
                                <td>
                                    <div className="admin-actions">
                                        <Link to={`/manage/update/${orchid.id}`} className="btn btn-primary btn-sm">Update</Link>
                                        <Link to={`/manage/delete/${orchid.id}`} className="btn btn-danger btn-sm">Remove</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="admin-footer">
                <Link to="/" className="btn btn-secondary">Back to Home</Link>
                <Link to="/manage/create" className="btn btn-success">+ Add Orchid</Link>
            </div>
        </div>
    )
}

