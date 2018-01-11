import React, { Component } from 'react'
import Link from 'next/link'
import { fadeColors, forEachChild } from '../../lib/_utils'

export default class Title extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = { origColor:'black' }
  // }
  static async getInitialProps ({ colors }) {
    return colors
  }
  // componentDidMount () {
  //   this.setState () {() => ({ origColor: })}
  // }
  titleSplitta () {
    const title = '7000 reasons'
    return title.split('').map((letter, i) => {
      return (
        <span key={i} className='titleLetter' >
          {letter}
          <style jsx>{`
            .titleLetter {
              pointer-events: none;
              font-family: var(--title-font);
              transition: color 1s ease;
              font-size: 3em;
            }
            @media (max-width: 500px){
              .titleLetter {
                font-size: 2.5em;
              }
            }
          `}</style>
        </span>
      )
    })
    // const title = '7000 Reasons'
    // const styles = `
    //   .titleLetter {
    //     pointer-events: none;
    //     font-family: 'Fredoka One', cursive;
    //     transition: color 1s ease;
    //     font-size: 3em;
    //   }
    // `
    // return splitToSpans(title, styles)
  }
  colorShimma (e) {
    const { colors } = this.props
    const letters = e.target.children
    forEachChild(letters, (letter) => {
      fadeColors(letter, colors, 600)
    })
  }
  render () {
    return (
      <div className='wholeTitle' onMouseOver={e => this.colorShimma(e)}>
        <Link href='/' ><a>
          {this.titleSplitta()}
          <style jsx>{`
              width:50vw;
              margin:1vw 25vw 0 25vw;
              display:flex; justify-content:space-around; align-items: center;
            a {
              text-decoration: none;
              color: unset;
            }
          `}</style>
        </a></Link>
      </div>
    )
  }
}
