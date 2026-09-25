import { useContext } from 'react'
import banner from '../../img/misc/banner.png'
import { ThemeContext } from '../../utils/ThemeContext'

export default function Banner() {
    const { theme } = useContext(ThemeContext)
    return (
        <div class="container-fluid p-0" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
            <div class="row">
                <img src={banner} width="50%" alt="Typhoeus-Banner" />
            </div>
        </div>
    )
}