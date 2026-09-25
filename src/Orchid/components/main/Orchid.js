import { useState, useContext } from "react"
import { orchidData } from "../../components_data/orchid"
import '../../utils/orchid.css'
import { ThemeContext } from "../../utils/ThemeContext"
import AuthContext from "../../utils/AuthContext"
import loginimg from "../../img/misc/loginimg.png"

export default function Orchid() {
    const [orchid, setOrchid] = useState([])

    const { theme } = useContext(ThemeContext)
    const { username } = useContext(AuthContext)
    return (!username) ? (
        <>
            <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                <h1>Please Login To View The Content</h1>
                <p>It really does feel empty out here...</p>
                <img class="loginImg" src={loginimg} alt="Typhoeus Wallpaper by 小皮不皮er"/>
                <p>Not really... I guess... Image credits to <strong>小皮不皮er</strong></p>
                <hr />
            </div>
        </>
    ) : (
        <>
            <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                <div class="row g-4">
                    {
                        orchidData.map((orchid) => (
                            <div className="col-lg-3" key={orchid.Id}>
                                <div className="card" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                                    <img src={orchid.image} alt={orchid.name} />
                                    <div className="card-body">
                                        <h3>{orchid.name}</h3>
                                        <p className="title"><strong>Category:</strong> {orchid.category}</p>
                                        <button className="btn btn-primary" onClick={() => setOrchid(orchid)}><a href='#popup1' id='openPopUp' className="text-white text-decoration-none"><strong>Detail</strong></a></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>

                <div id='popup1' className='overlay'>
                    <div className='popup' style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                        <img src={orchid.image} alt={orchid.name} />
                        <a className='close' href='#'>&times;</a>
                        <div className='content' style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                            <h3>{orchid.name}</h3>
                            <hr />
                            <p><strong>Category:</strong> {orchid.category}</p>
                            <p><strong>Rating:</strong> {orchid.rating}★</p>
                            <p><strong>Color:</strong> {orchid.color}</p>
                            <p><strong>Origin:</strong> {orchid.origin}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}