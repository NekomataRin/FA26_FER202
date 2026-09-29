import { useContext } from "react"
import '../../components_utils/orchid.css'
import { ThemeContext } from "../../components_utils/ThemeContext"
import AuthContext from "../../components_utils/AuthContext"
import loginimg from "../../components_img/misc/loginimg.png"
import OrchidPresentation from "./OrchidPresentation"

export default function Orchid() {
   

    const { theme } = useContext(ThemeContext)
    const { username } = useContext(AuthContext)
    return (!username) ? (
        <>
            <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                <h1>Please Login To View The Content</h1>
                <p>It really does feel empty out here...</p>
                <img class="loginImg" src={loginimg} alt="Typhoeus Wallpaper by 小皮不皮er" />
                <p>Not really... I guess... Image credits to <strong>小皮不皮er</strong></p>
                <hr />
            </div>
        </>
    ) : (
        <>
            <OrchidPresentation />
        </>
    )
}