import React, { Component } from 'react'
import { fadeColors, forEachChild } from '../../lib/_utils'

export default class Title extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = { origColor:'black' }
  // }
  // componentDidMount () {
  //   this.setState () {() => ({ origColor: })}
  // }
  titleSplitta () {
    const title = '7000 Reasons'
    return title.split('').map((letter, i) => {
      return (
        <span key={i} className='titleLetter' >
          {letter}
          <style jsx>{`
            .titleLetter {
              pointer-events: none;
              font-family: 'Fredoka One', cursive;
              transition: color 1s ease;
              font-size: 3em;
            }
          `}</style>
        </span>
      )
    })
  }
  colorShimma (e) {
    const { colors } = this.props
    const letters = e.target.children
    forEachChild(letters, (letter) => {
      fadeColors(letter, colors, 2000)
    })
  }
  render () {
    return (
      <div className='wholeTitle' onMouseOver={e => this.colorShimma(e)}>
        { this.titleSplitta() }
        <style jsx>{`
          width:80vw;
          margin:4vw 10vw 2vw 10vw;
          display:flex; justify-content:space-around; align-items: center;
        `}</style>
      </div>
    )
  }
}
