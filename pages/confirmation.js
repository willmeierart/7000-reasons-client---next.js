import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import Confetti from 'react-confetti'
import Link from 'next/link'
import Head from 'next/head'
import withData from '../lib/withData'
import { allFadeColors, allCheckoutPages, allCountdowns } from '../lib/queries'
import { formatColors, checkAllQueriesError, getRandomColor, forEachChild, fadeColors, binder } from '../lib/_utils'
import Layout from '../components/architecture/Layout'
import Counter from '../components/_index/Counter'

const Confirmation = ({ allFadeColors, allCheckoutPages, allCountdowns }) => {
  const queries = ['allCheckoutPages', 'allFadeColors', 'allCountdowns']
  checkAllQueriesError(queries)

  const faderColors = allFadeColors.allFadeColors
  const colors = formatColors(faderColors)
  const darkColors = colors.filter((color) => !color.light)
  const lightColors = colors.filter((color) => color.light)
  const randomDark = getRandomColor(darkColors)
  const colorNames = colors.map(color => color.rgba)
  const width = typeof window !== 'undefined' ? window.innerWidth : 2000
  const height = typeof window !== 'undefined' ? window.innerHeight : 3000

  const splitShimmer = (phrase) => {
    return phrase.split('').map((letter, i) => {
      const randomColor = getRandomColor(darkColors) 
      return (
        <span key={i}>
          <span className='split-span-letter'>
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
  const splitta = (wd) => {
    return wd.split('').map((letter, i) => <span key={i} className='titleLetter' style={{ pointerEvents: 'none' }}>{ letter }</span>)
  }
  const colorShimma = (e) => {
    const { colors } = this.state
    const letters = e.target.children
    forEachChild(letters, (letter) => {
      fadeColors(letter, colors, 600)
    })
  }

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
        <div className='conf-outer-container'>
          <div className='conf-inner-container'>
            <div className='conf-thank-you'>{ splitShimmer('THANK YOU!!!') }</div>
            <div className='conf-plaintext'>{ splitShimmer('and') }</div>
            <div className='conf-congratulations'>{ splitShimmer('CONGRATULATIONS!!') }</div>
            <div className='conf-you-are'>{ splitShimmer('you are reason number:') }</div>
            <div className='conf-counter' >
              <Counter number={`${~~allCountdowns.allCountdowns[0].remaining + 1}`} colors={colors} className='conf-counter' />
            </div>
            <div className='conf-instructions'>
              <div>your payment has been received!</div>
              <div>make sure to check your email for confirmation</div>
              <div>and then remember to send 1-3 GOOD images to</div>
              <div className='conf-email'><Link href='mailto:7000reasonsproject@gmail.com' target='_blank'><a>{ splitShimmer('7000reasonsproject@gmail.com') }</a></Link></div>
              <div>(the sooner we get them, the sooner we can get started on your painting)</div>
              <div>if you have any questions, please refer back to <Link prefetch href='/shop'><a><b>{ splitShimmer('the instructions on our checkout page') }</b></a></Link></div>
            </div>
          </div>
          <Confetti width={width} height={height} confettiSource={{ x: 0, y: 0, w: 2000, h: 0 }} opacity={0.25} />
          <style jsx global>{`
            .conf-outer-container {
              overflow: scroll;
              position: absolute;
              z-index: 20;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: var(--background-color);
            }
            .conf-inner-container {
              width: 100vw;
              height: 90vh;
              position: absolute;
              top: 10vh;
              left: 0;
              display: flex;
              justify-content: space-around;
              align-items: center;
              flex-direction: column;
              z-index: 25;
            }
            .conf-thank-you {
              font-family: var(--title-font);
              font-size: 3em;
              width: 50vw;
              display: flex;
              justify-content: space-between;
            }
            .conf-congratulations {
              font-family: var(--cursive-font);
              font-size: 2em;
              width: 40vw;
              display: flex;
              justify-content: space-between;
            }
            .conf-you-are {
              font-family: var(--cursive-font);      
              font-size: 1.25em;          
            }
            .conf-counter {
              animation: shine 2.5s infinite ease-in-out;
              box-shadow: 0 0 50px ${getRandomColor(lightColors)};
              box-sizing: content-box;
              display: flex;
              jusify-content: center;
              align-items: center;
              flex-grow: 0;
              flex-shrink: 1;
              height: 0;
              margin-top: 10vh;
            }
            .conf-instructions {
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              height: 20vh;
              margin-top: 10vh;
              padding: 10vw;
            }
            .conf-email {
              font-family: var(--title-font);
              font-size: 2em;
            }
            .conf-instructions a {
              text-decoration: none;
              color: inherit;
            }
            @keyframes shine {
              from {
                box-shadow: 0 0 ${~~(Math.random() * 100 + 40)}px ${~~(Math.random() * 50 + 20)}px ${getRandomColor(lightColors)};
              } 20% {
                box-shadow: 0 0 ${~~(Math.random() * 100 + 40)}px ${~~(Math.random() * 50 + 20)}px ${getRandomColor(lightColors)};
              } 40% {
                box-shadow: 0 0 ${~~(Math.random() * 100 + 40)}px ${~~(Math.random() * 50 + 20)}px ${getRandomColor(lightColors)};
              } 60% {
                box-shadow: 0 0 ${~~(Math.random() * 100 + 40)}px ${~~(Math.random() * 50 + 20)}px ${getRandomColor(lightColors)};
              } 80% {
                box-shadow: 0 0 ${~~(Math.random() * 100 + 40)}px ${~~(Math.random() * 50 + 20)}px ${getRandomColor(lightColors)};
              } to {
                box-shadow: 0 0 ${~~(Math.random() * 100 + 40)}px ${~~(Math.random() * 50 + 20)}px ${getRandomColor(lightColors)}; 
              }
            }
            @media(max-width: 500px) {
              .conf-thank-you {
                font-size: 2em;
                width: 90vw;
              }
              .conf-congratulations {
                font-size: 1em;
                width: 90vw;
              }
              .conf-instructions {
                font-size: .8em;
              }
              .conf-email {
                font-size: 1.25em;
              }
            }
          `}</style>
        </div>
      )}
    </Layout>
  )
}

export default withData(
  compose(
    graphql(allCheckoutPages, { name: 'allCheckoutPages' }),
    graphql(allFadeColors, { name: 'allFadeColors' }),
    graphql(allCountdowns, { name: 'allCountdowns' })
  )(Confirmation)
)
