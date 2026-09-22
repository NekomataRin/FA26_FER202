import logo from '../BaseComponent/avt.png'
import logo1 from '../BaseComponent/test.png'
import logo2 from '../BaseComponent/typhokek.gif'
export default function Footer() {
    const rng = Math.floor(Math.random()*3)
    const img = [logo, logo1, logo2]
    const alt = ['murasame', 'salt', 'typokek']
    return(
        <div>
            <img src={img[rng]} width={50} alt={alt[rng]}/>
            Who knows? This is just a footer btw --ArichiAya
        </div>
    )
}