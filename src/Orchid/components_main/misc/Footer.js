import { useContext } from 'react'
import footerIcon from '../../components_img/misc/typhokek.gif'
import { ThemeContext } from '../../components_utils/ThemeContext'
import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
    const { theme } = useContext(ThemeContext)
    const location = useLocation()
    return (
        <div style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
            {!location.pathname.startsWith('/lab4') ?
                (
                    <>
                        <p>Looking for <strong><Link to='/lab4' style={{ textDecoration: 'none', color: theme.borderColor }}>Lab 4</Link></strong>? I'm just too lazy to seperate it from my GitHub, so I made a router to it there
                        </p>
                    </>) :
                (
                    <>
                    </>
                )}
            <sub><img src={footerIcon} width={50} alt='TyphoKek' />
                Typhoeus from <strong style={{color: theme.borderColor}}>Arknights: Endfield (Hypergryph)</strong>
                <br />
                <strong style={{color: theme.borderColor}}>OrchidLab</strong> commited by <strong style={{color: theme.borderColor}}>ArichiAya</strong> (NekomataRin on <a href="https://github.com/NekomataRin/FA26_FER202/tree/NekoRin's">GitHub</a>)
            </sub>
        </div>
    )
}