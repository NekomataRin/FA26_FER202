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
                        <sub>Looking for <strong><Link to='/lab4' style={{ textDecoration: 'none', color: theme.color }}>Lab 4</Link></strong>? I'm just too lazy to seperate it from my GitHub lmao
                        </sub>
                        <br />
                    </>) :
                (
                    <>
                    </>
                )}
            <img src={footerIcon} width={50} alt='TyphoKek' />
            Typhoeus from <strong>Arknights: Endfield (Hypergryph)</strong>
            <br />
            Orchid Lab commited by ArichiAya (Nekomata Rin on <a href="https://github.com/NekomataRin/FA26_FER202/tree/NekoRin's">GitHub</a>)
        </div>
    )
}