import Title from './Title'
import Tagline from './Tagline'
import NavBar from './NavBar'

const Header = ({colors, reasons}) => (
  <div>
    <Title colors={colors} />
    <Tagline reasons={reasons} colors={colors} />
    <hr />
    {/* <NavBar colors={colors} /> */}
  </div>
)

export default Header
