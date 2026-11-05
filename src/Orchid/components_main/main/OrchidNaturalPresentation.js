import { useContext, useState, useEffect } from "react"
//import { orchidData } from "../../components_data/ListOfOrchids"
import '../../components_utils/orchid.css'
import { ThemeContext } from "../../components_utils/ThemeContext"
import { Link } from 'react-router-dom'
import AuthContext from "../../components_utils/AuthContext"
import loginimg from "../../components_img/misc/loginimg.png"
import typhLoading from "../../../Checkout/components_img/typho-loading.png"

import axios from 'axios'

export default function OrchidNaturalPresentation() {
    const { theme } = useContext(ThemeContext)
    const { user, isAdmin } = useContext(AuthContext)
    const [naturalOrchid, setNaturalOrchid] = useState([])
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")

    const orchidAPI = 'https://6adff4d28e42963c8d5e864b.mockapi.io/orchids'
    useEffect(() => {
        axios.get(orchidAPI)
            .then(e => setNaturalOrchid(e.data.filter(e => e.isNatural)))
            .catch(e => setError(e.message))
    }, [])

    if (error) return (
        <div className="container">
            <h1>Error</h1>
            <p>{error}</p>
        </div>
    )

    const filtered = naturalOrchid.filter(o =>
        o.name.toLowerCase().includes(search.trim().toLowerCase())
    )

    if (!user) {
        return (
            <>
                <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                    <h1>Please Login To View The Content</h1>
                    <p>It really does feel empty out here...</p>
                    <img className="loginImg" src={loginimg} alt="Typhoeus Wallpaper by 小皮不皮er" />
                    <p>Not really... I guess... Image credits to <strong>小皮不皮er</strong></p>
                    <hr />
                </div>
            </>)
    } else {
        return (
            <>
                <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                    <div className="d-flex align-items-center gap-2">
                        <button className='btn btn-secondary'>
                            <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
                                Go Back
                            </Link>
                        </button>
                        <input
                            type="text"
                            className="form-control"
                            style={{ maxWidth: '250px' }}
                            placeholder="Search by orchid name"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {isAdmin && (
                            <button className="btn btn-secondary ms-auto">
                                <Link to='/manage' style={{ color: 'white', textDecoration: 'none' }}>
                                    Manage Orchids
                                </Link>
                            </button>
                        )}
                    </div>
                    <hr />
                    <div className="row g-4">
                        {
                            (filtered.length === 0) ?
                                <>
                                    <p><img src={typhLoading} width='3%' alt="no data" /> <strong style={{ color: theme.borderColor }}>No Data...</strong></p>
                                </>
                                :
                                filtered.map((orchid) => (
                                    <div className="col-lg-3" key={orchid.id}>
                                        <div className="card" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                                            <img src={orchid.image} alt={orchid.name} />
                                            <div className="card-body">
                                                <h3>{orchid.name}</h3>
                                                <p className="title"><strong>Category:</strong> {orchid.category}</p>
                                                <button className="btn btn-primary">
                                                    <Link to={`/detail/${orchid.id}`} state={{ from: '/naturals' }} style={{ textDecoration: 'none', color: 'white' }}>
                                                        <strong>Detail</strong>
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }

                    </div>
                </div>
                <hr />
            </>
        )
    }
}