import { useContext } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { orchidData } from '../../components_data/ListOfOrchids'
import '../../components_utils/orchidDetail.css'
import { ThemeContext } from "../../components_utils/ThemeContext"
import AuthContext from "../../components_utils/AuthContext"
import loginimg from "../../components_img/misc/loginimg.png"


export default function OrchidDetails() {
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const orchidParam = useParams()
    const orchid = orchidData.find(e => { return Number(e.Id) === Number(orchidParam.id) })

    const location = useLocation()
    const backTo = location.state?.from ?? '/' //Trả về link trước đó (/naturals hoặc / aka home)

    const naturalTag = (orchid?.isNatural) ? 'natural' : 'badge'
    return (!user) ?
        (<>
            <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                <h1>Please Login To View The Content</h1>
                <p>It really does feel empty out here...</p>
                <img class="loginImg" src={loginimg} alt="Typhoeus Wallpaper by 小皮不皮er" />
                <p>Not really... I guess... Image credits to <strong>小皮不皮er</strong></p>
                <hr />
            </div>
        </>) :
        (
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