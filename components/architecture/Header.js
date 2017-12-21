import Title from './Title'
import Tagline from './Tagline'
import NavBar from './NavBar'
import { getRandomColor } from '../../lib/_utils'

const Header = ({colors, reasons}) => {
  const darkColors = colors.filter((color) => !color.light)
  const randomDark1 = getRandomColor(darkColors)
  const randomDark2 = getRandomColor(darkColors)
  return (
    <div>
      <Title colors={colors} />
      <Tagline reasons={reasons} colors={colors} />
      <hr />
      {/* <NavBar colors={colors} /> */}
      <div className='temp-tag'>
        <em>send us an email at <a href='mailto:7000reasonsproject@gmail.com' target='_blank'>7000reasonsproject@gmail.com</a> and we'll let you know when we get started in January 2018!</em>
      </div>
      <style jsx>{`
        .temp-tag {
          width: 80vw;
          margin-left: 10vw;
          text-align: center;
          font-family: var(--body-font);
          color: ${randomDark1};
          padding: 1vw 0;
        }
        a {
          {/* text-decoration: none; */}
          color: black; 
        }
      `}</style>
    </div>
  )
}

export default Header
