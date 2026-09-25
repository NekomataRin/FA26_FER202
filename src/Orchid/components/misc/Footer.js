import { useContext } from 'react'
import footerIcon from '../../img/misc/typhokek.gif'
import { ThemeContext } from '../../utils/ThemeContext'
export default function Footer() {
    const { theme } = useContext(ThemeContext)
    return (
        <div style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
            <img src={footerIcon} width={50} alt='TyphoKek' />
            Typhoeus from <strong>Arknights: Endfield (Hypergryph)</strong>
            <br />
            Orchid Lab commited by ArichiAya (Nekomata Rin on <a href="https://github.com/NekomataRin/FA26_FER202/tree/NekoRin's">GitHub</a>)
        </div>
    )
}