import logo from '../BaseComponent/avt.png'
import logo1 from '../BaseComponent/test.png'
export default function Footer() {
    const rng = Math.random()
    const img = (rng > 0.5) ? logo : logo1
    const alt = (rng > 0.5) ? logo : logo1
    return(
        <div>
            <img src={img} width={50} alt={alt}/>
            Who knows? This is just a footer btw --ArichiAya
        </div>
    )
}