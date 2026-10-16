import { useParams } from 'react-router-dom'
import { playerData_v2 } from './listOfPlayers_v2'
import { Link } from 'react-router-dom'
import './playerDetails.css'

export default function PlayerDetails() {
    const userName = useParams()
    const player = playerData_v2.find(e => { return Number(e.id) === Number(userName.id) })
    console.log(userName, player)

    let cost = player.cost.toLocaleString()

    return (
        <div className='container'>
            <div className='product-card'>
                <div className='badge'> {player.name} </div>
                <div className='product-thumb'><img src={`../${player.img}`} alt='' /></div>
                <Link to={`/`}>
                    <p className='close'>&times;</p>
                </Link>
                <div className='product-details'>
                    <h4>{player.club}</h4>
                    <div className='product-price'>Market value: € {cost} </div>
                    <p>{player.info}</p>
                    <div className='product-bottom-details'></div>
                </div>
            </div>
        </div>
    )
}
