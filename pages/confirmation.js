import { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import raf from 'raf'
import Head from 'next/head'
import withData from '../lib/withData'
import { allFadeColors, allCheckoutPages, allCountdowns } from '../lib/queries'
import { formatColors, checkAllQueriesError, getRandomColor, forEachChild, fadeColors, binder } from '../lib/_utils'
import Layout from '../components/architecture/Layout'

class ShopPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      colors: [],
      darkColors: [],
      randomDark: ''
    }
  }
  componentDidMount () {
    const { allFadeColors: { allFadeColors } } = this.props
    const queries = ['allCheckoutPages', 'allFadeColors', 'allCountdowns']
    const colors = formatColors(allFadeColors)
    const darkColors = colors.filter((color) => !color.light)
    const randomDark = getRandomColor(darkColors)
    checkAllQueriesError(queries)
    this.setState({
      colors,
      darkColors,
      randomDark
    })
    const { canvas } = this.refs
  }  
  splitShimmer (phrase) {
    const { darkColors } = this.state
    return phrase.split('').map((letter, i) => {
      const randomColor = getRandomColor(darkColors)
      return (
        <span key={i}>
          <span className='split-span-letter' >
            {letter}
          </span>
          <style jsx>{`
            .split-span-letter {
              animation: colorFadeRow 4s infinite ease-in-out;
              animation-delay: ${i * 100}ms;
            }
            @keyframes colorFadeRow {
              from {
                color: black;
              } 50% {
                color: ${randomColor};
              } to {
                color: black;
              }
            }
          `}</style>
        </span>
      )
    })
  }
  splitta (wd) {
    return wd.split('').map((letter, i) => <span key={i} className='titleLetter' style={{ pointerEvents: 'none' }}>{ letter }</span>)
  }
  colorShimma (e) {
    const { colors } = this.state
    const letters = e.target.children
    forEachChild(letters, (letter) => {
      fadeColors(letter, colors, 600)
    })
  }
  render () {
    const { allCheckoutPages, allFadeColors, allCountdowns } = this.props
    const { colors } = this.state
    return (
      <Layout colors={colors} title='Confirmation'>
        {(allCheckoutPages.loading || allFadeColors.loading || allCountdowns.loading) ? (
          <div className='wrapper'>
            <Loader className='loader' type='line-spin-fade-loader' active />
            <style jsx>{`
              .wrapper {
                width:100%;
                height:100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .loader {
                width:10vw;
                height:10vw;
              }
            `}</style>
          </div>
        ) : (
          <div className='outer-container'>
            <div className='inner-container'>
              <canvas ref={canvas => { this.canvas = canvas }} />
            </div>
            <style jsx>{`
              .outer-container {
                overflow: hidden;
                position: absolute;
                z-index: 20;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: var(--background-color);
              }
              .inner-container {
                width: 100%;
                height: 100%;
              }
            `}</style>
          </div>
        )}
      </Layout>
    )
  }
}

export default withData(
  compose(
    graphql(allCheckoutPages, { name: 'allCheckoutPages' }),
    graphql(allFadeColors, { name: 'allFadeColors' }),
    graphql(allCountdowns, { name: 'allCountdowns' })
  )(ShopPage)
)
