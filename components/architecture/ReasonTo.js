import React, { Component } from 'react'
import { getRandomColor, binder } from '../../lib/_utils'

export default class ReasonTo extends Component {
  constructor (props) {
    super(props)
    this.state = { currentReason: 'be', randomColor: 'rgba(0,0,0,1)', randomInterval: 1000, number: 1 }
    binder(this, ['tagSwitcha'])
  }
  componentDidMount () {
    this.props.colors[0] && this.tagSwitcha()
  }
  tagSwitcha () {
    const theseColors = this.props.colors
    const darkColors = theseColors.filter((color) => !color.light)
    const reasons = this.props.reasons || ['']
    const switchEm = (color) => {
      const randomInt = (Math.floor(Math.random() * 10) + 30) * 100
      this.setState(() => (
        {
          currentReason: reasons[i].headline,
          randomColor: (darkColors[i].color || color),
          randomInterval: randomInt,
          number: Math.floor(Math.random() * 7000)
        }
      ))
    }
    let i = 0
    setInterval(() => {
      const randTxtColor = getRandomColor(darkColors)
      switchEm(randTxtColor)
      ++i
      if (i === reasons.length) { i = 0 }
    }, this.state.randomInterval)
  }
  render () {
    return (
      <div className='container'>
        <div className='reason'> #{ this.state.number }: to { this.state.currentReason }</div>
        <style jsx>{`
          .prepo {
            margin:1em;
          }
          .container {
            width: 60vw;
            margin: 0 20vw 1em 20vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items:center;
            font-family: var(--cursive-font);
          }
          .reason {
            color: ${this.state.randomColor}
            text-align:center;
            font-size:1.5em;
            opacity: 0;
            animation: fade-reasons ${this.state.randomInterval / 1000}s linear;
            white-space: nowrap;
          }
          @media (max-width: 500px){
            .reason{
              font-size: 1em;
            }
          }
          @keyframes fade-reasons {
            from {
              opacity:0;
            } 50% {
              opacity:1;
            } to {
              opacity:0;
            }
          }
        `}</style>
      </div>
    )
  }
}
