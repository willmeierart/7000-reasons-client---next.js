import React from 'react'
import shuffle from 'shuffle-array'
import Painting from './Painting'

const PaintingsGrid = ({ paintings, colors }) => {
  console.log(paintings)
  // const shuffleArr = (arr) => {
  //   for (let i = arr.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1))
  //     let temp = arr[i]
  //     arr[i] = arr[j]
  //     arr[j] = temp
  //   }
  //   return arr
  // }
  const keys = shuffle(Object.keys(paintings))
  const shuffledPaintings = keys.map(key => paintings[key])
  console.log(shuffledPaintings)
  const renderGrid = () => {
    return shuffledPaintings.map(painting => {
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

export default PaintingsGrid
