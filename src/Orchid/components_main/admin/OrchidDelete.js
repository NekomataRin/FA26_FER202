
import { useContext, useState, useEffect } from "react"
import '../../components_utils/orchidAdmin.css'
import { ThemeContext } from "../../components_utils/ThemeContext"
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'

export default function OrchidDelete() {
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const orchidParam = useParams()

    const [orchid, setOrchid] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState(null)

    const orchidAPI = process.env.REACT_APP_API_URL

    //GET để check xem Orchid có tồn tại ở API hay không
    useEffect(() => {
        axios.get(`${orchidAPI}/${orchidParam.id}`)
            .then((e) => setOrchid(e.data))
            .catch(e => setError(e.response?.status === 404 ? `Orchid #${orchidParam.id} not found.` : e.message))
            .finally(() => setLoading(false))
    }, [orchidParam.id])

    const handleDelete = () => {
        setDeleting(true)
        setDeleteError(null)
        axios.delete(`${orchidAPI}/${orchidParam.id}`) //Method để remove Orchid ở API
            .then(() => navigate('/manage', { state: { message: `Removed "${orchid.name}".` } }))
            .catch(e => {
                setDeleteError(e.message)
                setDeleting(false)
            })
    }

    if (error) return (
        <div className="container">
            <h1>Error</h1>
            <p>{error}</p>
            <Link to="/manage" className="btn btn-secondary">Back to list</Link>
        </div>
    )

    if (loading) return (
        <div className="container admin-status" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
            <p>Loading orchid...</p>
        </div>
    )

    return (
        <div className="container admin-container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
            <div className="admin-confirm">
                <h2>Remove this orchid?</h2>
                <img className="admin-preview" src={orchid.image} alt={orchid.name} />
                <p><strong>{orchid.name}</strong> ({orchid.category}, {orchid.origin})</p>
                <p className="text-danger"><strong>This action cannot be undone.</strong></p>
                {deleteError && <div className="alert alert-danger">{deleteError}</div>}
                <div className="admin-form-actions">
                    <Link to="/manage" className="btn btn-secondary">Cancel</Link>
                    <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                        {deleting ? 'Removing...' : 'Remove'}
                    </button>
                </div>
            </div>
        </div>
    )
}
