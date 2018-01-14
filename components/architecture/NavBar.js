import Menu from './Menu'

const NavBar = ({ colors }) => (
  <div className='wrapper'>
    <Menu colors={colors} />
    <style jsx>{`
      .wrapper {
        width: 60vw;
        margin-left: 20vw;
      }
    `}</style>
  </div>
)

export default NavBar
