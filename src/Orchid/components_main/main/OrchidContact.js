import typhLoading from '../../../Checkout/components_img/typho-loading.png'
import loginImg from '../../components_img/misc/loginimg.png'
import { useContext } from "react"
import AuthContext from "../../components_utils/AuthContext"
import { ThemeContext } from '../../components_utils/ThemeContext'
import { Link } from 'react-router-dom'

export default function OrchidContact() {
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)
    
    return (!user) ? (
        <>
            <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                <h1>Please Login To View The Content</h1>
                <p>It really does feel empty out here...</p>
                <img class="loginImg" src={loginImg} alt="Typhoeus Wallpaper by 小皮不皮er" />
                <p>Not really... I guess... Image credits to <strong>小皮不皮er</strong></p>
                <sub>Looking for <strong><Link to='/lab4' style={{textDecoration: 'none', color: theme.color}}>Lab 4</Link></strong>? I'm just too lazy to seperate it from my GitHub lmao</sub>
                <hr />
            </div>
        </>
    ) : (
         <>
            <p><img src={typhLoading} alt='loading...' /> You know what... test the route first, before doing Lab 5 (Contact)...</p>
        </>
    )
}