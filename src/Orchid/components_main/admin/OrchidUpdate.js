
import { useContext, useState, useEffect } from "react"
import '../../components_utils/orchidAdmin.css'
import { ThemeContext } from "../../components_utils/ThemeContext"
import { Link, useNavigate, useParams } from 'react-router-dom'
import OrchidForm from './OrchidForm'

import axios from 'axios'

export default function OrchidUpdate() {
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const orchidParam = useParams()

    const [orchid, setOrchid] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const orchidAPI = process.env.REACT_APP_API_URL
    useEffect(() => {
        axios.get(`${orchidAPI}/${orchidParam.id}`)
            .then((e) => setOrchid(e.data))
            .catch(e => setError(e.response?.status === 404 ? `Orchid #${orchidParam.id} not found.` : e.message))
            .finally(() => setLoading(false))
    }, [orchidParam.id])

    //Phải return promise để OrchidForm bắt được lỗi và tắt trạng thái "Saving..."
    const handleUpdate = async (values) => {
        return await axios.put(`${orchidAPI}/${orchidParam.id}`, values)
            .then((e) => navigate('/manage', { state: { message: `Updated "${e.data.name}" successfully.` } }))
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
            <OrchidForm title={`Update Orchid #${orchidParam.id}`} submitLabel="Save Changes"
                initialValues={orchid} onSubmit={handleUpdate} />
        </div>
    )
}
