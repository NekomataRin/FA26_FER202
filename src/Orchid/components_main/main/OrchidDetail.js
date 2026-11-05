import { useContext, useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
//import { orchidData } from '../../components_data/ListOfOrchids'
import '../../components_utils/orchidDetail.css'
import { ThemeContext } from "../../components_utils/ThemeContext"
import AuthContext from "../../components_utils/AuthContext"
import loginimg from "../../components_img/misc/loginimg.png"
import typhLoading from "../../../Checkout/components_img/typho-loading.png"

import axios from 'axios'


export default function OrchidDetails() {
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const [orchid, setOrchid] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const orchidAPI = 'https://6adff4d28e42963c8d5e864b.mockapi.io/orchids'
    const orchidParam = useParams()

    useEffect(() => {
        axios.get(`${orchidAPI}/${orchidParam.id}`)
            .then(e => setOrchid(e.data))
            .catch(e => setError(e.response?.status === 404 ? `Orchid #${orchidParam.id} not found.` : e.message))
            .finally(() => setLoading(false))
    }, [orchidParam.id])

    //const orchid = orchidData.find()

    const location = useLocation()
    const backTo = location.state?.from ?? '/' //Trả về link trước đó (/naturals hoặc / aka home)

    const naturalTag = (orchid?.isNatural) ? 'natural' : 'badge'

    if (error) return (
        <div className="container">
            <p><img src={typhLoading} width='3%' alt="no data"/> Orchid <strong style={{color: theme.borderColor}}>#{orchidParam.id}</strong> not found...</p>
            <Link to={backTo} className="btn btn-secondary">Back</Link>
        </div>
    )

    if (!user) {
        return (<>
            <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                <h1>Please Login To View The Content</h1>
                <p>It really does feel empty out here...</p>
                <img className="loginImg" src={loginimg} alt="Typhoeus Wallpaper by 小皮不皮er" />
                <p>Not really... I guess... Image credits to <strong>小皮不皮er</strong></p>
                <hr />
            </div>
        </>)
    }
    else if (loading) {
        return (
            <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                <p>Loading orchid...</p>
            </div>
        )
    } else {
        return (
            <div className='detail-container'>
                <div className='product-card' style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                    <div className={naturalTag}>{orchid.name}</div>
                    <Link to={backTo}>
                        <p className='close'>&times;</p>
                    </Link>
                    <img className='product-thumb' src={orchid.image} alt={orchid.name} />
                    <hr />
                    <div className='product-details' style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                        <p style={{ textAlign: 'left', marginLeft: '25px' }}>
                            {"> "} <strong>Category:</strong> {orchid.category} <br />
                            {"> "} <strong>Rating:</strong> {orchid.rating}★ <br />
                            {"> "} <strong>Color:</strong> {orchid.color} <br />
                            {"> "} <strong>Origin:</strong> {orchid.origin}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}