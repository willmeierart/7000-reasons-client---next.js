import React from 'react'
import Painting from './Painting'

export default (props) => {
  const renderGrid = () => {
    const { paintings, colors } = props
    return paintings.map(painting => {
      return (
        <div key={painting.number} className='painting-wrapper'>
          <Painting painting={painting} colors={colors} />
          <style jsx>{`
            .painting-wrapper {
              width:100%;
              height:100%;
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
