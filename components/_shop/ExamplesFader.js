import React, { Component } from 'react'
import { binder } from '../../lib/_utils'

export default class ExamplesFader extends Component {
  constructor (props) {
    super(props)
    this.state = { src: this.props.images[0].url }
    binder(this, ['switchImg'])
  }
  componentDidMount () {
    this.switchImg()
  }
  switchImg () {
    const { images } = this.props
    let i = 0
    return setInterval(() => {
      const src = images[i] ? images[i].url : ''
      i < images.length - 1 ? i++ : i = 0
      console.log(i)
      console.log(src)
      this.setState({ src: src })
    }, 2000)
    // clearInterval(interval)
  }
  render () {
    return (
      <div className='outer-wrapper'>
        <div className='inner-wrapper'>
          <div className='img-wrapper'>
            <img src={this.state.src} />
          </div>
        </div>
        <style jsx>{`
        .outer-wrapper {
          position: relative;
          overflow: hidden;
        }
        img {
          animation: fade-imgs 2s linear;
        }
        @keyframes fade-imgs {
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
