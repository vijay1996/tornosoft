import { Typography } from '@material-ui/core'
import '../master-style.css'

const Header = () => {
    return (
        <header style={style}>
            <Typography variant="h1">Tornosoft</Typography>
        </header>
    )
}

const style = {
    color: "#FF865E"
}

export default Header;