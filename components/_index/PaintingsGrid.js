import React from 'react'
import Painting from './Painting'

export default (props) => {
  const renderGrid = () => {
    const { paintings, colors } = props
    return paintings.map(painting => {
      return (
        <div className='painting-wrapper'>
          <Painting key={painting.number} painting={painting} colors={colors} />
          <style jsx>{`
            .painting-wrapper {
              width:99%;
              height:99%;
              display:flex;
              justify-content:center;
              align-items:center;
            }
          `}</style>
        </div>
      )
    })
  }

  return (
    <div className='wrapper'>
      { renderGrid() }
      <style jsx>{`
        .wrapper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          width:99.8%;s
        }
      `}</style>
    </div>
  )
}
