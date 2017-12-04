import Link from 'next/link'
import Title from './Title'
import Tagline from './Tagline'
import NavBar from './NavBar'

export default ({colors, reasons}) => (
  <div>
    <Title colors={colors} />
    <Tagline reasons={reasons} colors={colors} />
    <hr />
    <NavBar colors={colors} />
  </div>
)
