import { useContext } from "react"
import { orchidData } from "../../components_data/ListOfOrchids"
import '../../components_utils/orchid.css'
import { ThemeContext } from "../../components_utils/ThemeContext"
import { Link } from 'react-router-dom'
import AuthContext from "../../components_utils/AuthContext"
import loginimg from "../../components_img/misc/loginimg.png"

export default function OrchidPresentation() {
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    return (!user) ?
        (
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
                <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                    <div class="row-g4 col-3">
                        <button className='btn btn-primary' >
                            <Link to='/naturals' style={{ color: 'white', textDecoration: 'none' }}>
                                Show Natural Orchids Only
                            </Link>
                        </button>
                    </div>
                    <hr />
                    <div class="row g-4">
                        {
                            orchidData.map((orchid) => (
                                <div className="col-lg-3" key={orchid.Id}>
                                    <div className="card" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                                        <img src={orchid.image} alt={orchid.name} />
                                        <div className="card-body">
                                            <h3>{orchid.name}</h3>
                                            <p className="title"><strong>Category:</strong> {orchid.category}</p>
                                            <button className="btn btn-primary">
                                                <Link to={`/detail/${orchid.Id}`} state={{ from: '/' }} style={{ textDecoration: 'none', color: 'white' }}>
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