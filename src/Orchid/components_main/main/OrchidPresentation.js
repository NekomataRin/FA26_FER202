import { useState, useContext } from "react"
import { orchidData } from "../../components_data/ListOfOrchids"
import '../../components_utils/orchid.css'
import { ThemeContext } from "../../components_utils/ThemeContext"

export default function OrchidPresentation() {
    const [orchid, setOrchid] = useState([])
    const { theme } = useContext(ThemeContext)
    
    return (
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
                            <hr />
                            <h3>{orchid.name} {(orchid.isSpecial) ? "★" : ""}</h3>
                            <hr />
                            <p style={{ textAlign: 'left', marginLeft: '25px' }}>
                                {"> "} <strong>Category:</strong> {orchid.category} <br />
                                {"> "} <strong>Rating:</strong> {orchid.rating}★ <br />
                                {"> "} <strong>Color:</strong> {orchid.color} <br />
                                {"> "} <strong>Origin:</strong> {orchid.origin}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}