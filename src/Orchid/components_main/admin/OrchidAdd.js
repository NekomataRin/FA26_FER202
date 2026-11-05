
import { useContext } from "react"
import '../../components_utils/orchidAdmin.css'
import { ThemeContext } from "../../components_utils/ThemeContext"
import { useNavigate } from 'react-router-dom'
import OrchidForm from './OrchidForm'

import axios from 'axios'

export default function OrchidAdd() {
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate()

    const orchidAPI = process.env.REACT_APP_API_URL

    //Phải return promise để OrchidForm bắt được lỗi và tắt trạng thái "Saving..."
    const handleCreate = async (values) => {
        return await axios.post(orchidAPI, values)
            .then((e) => navigate('/manage', { state: { message: `Added "${e.data.name}" successfully.` } }))
    }

    return (
        <div className="container admin-container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
            <OrchidForm title="Add New Orchid" submitLabel="Add Orchid" onSubmit={handleCreate} />
        </div>
    )
}
