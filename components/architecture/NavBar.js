import Menu from './Menu'

export default ({ colors }) => (
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
