import { PlayerList } from '../shared/ListOfPlayers'
import { Link } from 'react-router-dom'

export default function PlayerRoute() {
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
                                    <Link to={`detail/${player.id}`}>
                                        <button className="btn btn-primary">Detail</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}