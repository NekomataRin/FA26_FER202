import { PlayerList } from '../shared/ListOfPlayers'
import { useState } from 'react'
export default function EX8Players() {
    const [player, setPlayer] = useState([])
    return (
        <div className='container'>
            <div class='row g-3'>
                {
                    PlayerList.map((player) => (
                        <div className="col-4" key={player.id}>
                            <div className="card">
                                <img src={player.img} className="card-img-top" alt={player.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{player.name}</h5>
                                    <p className="card-text text-muted">{player.club}</p>
                                    <button className="btn btn-primary" onClick={() => setPlayer(player)}><a href='#popup1' id='openPopUp' className="text-white text-decoration-none">Detail</a></button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div id='popup1' className='overlay'>
                <div className='popup'>
                    <img src={player.img} />
                    <h2>{player.name}</h2>
                    <a className='close' href='#'>&times;</a>
                    <div className='content'>
                        {player.info}
                    </div>
                </div>
            </div>
        </div>
    )
}