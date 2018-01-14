import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import Head from 'next/head'
import withData from '../lib/withData'
import { allFadeColors, allCheckoutPages } from '../lib/queries'
import { formatColors, checkAllQueriesError, getRandomColor, forEachChild, fadeColors } from '../lib/_utils'
import Layout from '../components/architecture/Layout'
import PriceCounter from '../components/_shop/PriceCounter'
import ExamplesFader from '../components/_shop/ExamplesFader'

const ShopPage = ({ url: { pathname }, allFadeColors, allCheckoutPages }) => {
  const queries = ['allCheckoutPages', 'allFadeColors']
  checkAllQueriesError(queries)

  const colors = formatColors(allFadeColors.allFadeColors)
  const darkColors = colors.filter((color) => !color.light)
  const randomDark = getRandomColor(darkColors)

  const splitShimmer = phrase => {
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
  const splitta = wd => {
    return wd.split('').map((letter, i) => {
      return (
        <span key={i} className='titleLetter' style={{ pointerEvents: 'none' }}>{ letter }</span>
      )
    })
  }
  const colorShimma = e => {
    const letters = e.target.children
    forEachChild(letters, (letter) => {
      fadeColors(letter, colors, 600)
    })
  }

  const shopData = allCheckoutPages.allCheckoutPages ? allCheckoutPages.allCheckoutPages[0] : {}

  return (
    <Layout colors={colors} title='Shop'>
      {(allCheckoutPages.loading || allFadeColors.loading) ? (
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
          <PriceCounter colors={colors} price={shopData.priceofPainting} />
          <div className='content'>
            <div className='intro'>
              <div dangerouslySetInnerHTML={{ __html: shopData.introParagraph }} />
            </div>
            {/* <hr /> */}
            <div className='instructions-section'>
              <div className='fader-good'>
                <span className='good'>{ splitShimmer('GOOD') }</span>
                <ExamplesFader images={shopData.goodPortraitExamples} />
              </div>
              <div className='fader-bad'>
                <span className='bad'>BAD</span>
                <ExamplesFader images={shopData.badPortraitExamples} />
              </div>
              <div className='instructions'>
                <h1>INSTRUCTIONS:</h1>
                <div dangerouslySetInnerHTML={{ __html: shopData.instructions }} />
              </div>
            </div>
            <div className='paypal-wrapper'>
              <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
                {/* <h1 onMouseOver={(e) => colorShimma(e)}>{splitta('LET\'S DO THIS!')}</h1> */}
                <input type='hidden' name='cmd' value='_s-xclick' />
                <input type='hidden' name='hosted_button_id' value='DYSPDM25R2MUY' />
                <input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!' />
                <img alt='' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1' />
              </form>
            </div>
            {/* <CheckoutForm colors={colors} /> */}
          </div>
          <style jsx>{`
            .content {
              box-sizing: border-box;
              margin: 5vw;
              margin-top: 0;
              padding: 5vw;
              width: 90vw;
              border: 2px solid ${randomDark}
              border-radius: 5px;
              text-align: center;
            }
            hr {
              width: 15%;
            }
            .instructions-section {
              display: grid;
              grid-template-rows: 1fr auto;
              grid-template-columns: 3fr 1fr;
              grid-template-areas: "images1 images2" "instructions instructions";
              margin: 5vw 0;
            }
            h1 {
              text-decoration: underline;
            }
            .instructions {
              grid-area: instructions;
              text-align: justify;
              padding-top: 3em;
              box-sizing:border-box;
              {/* border-right: 1px solid black; */}
            }
            .fader-good, .fader-bad{
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 2em;
            }
            .fader-good {
              grid-area: images1;
            }
            .fader-bad {
              grid-area: images2;
            }
            .good, .bad {
              font-size: 8vw;
            }
            .paypal-wrapper {
              display: flex;
              flex-direction: column;
              width: 80vw;
              justify-content: center;
              margin-bottom: 1em;
            }
            form, input, form img {
              cursor: pointer;
            }
            @media(max-width:600px){
              .instructions-section {
                display: flex;
                flex-direction: column;
              }
              .instructions {
                padding-right: 0;
              }
            }
          `}</style>
        </div>
      )}
      {/* { checkAllQueriesLoading(queries, content) } */}
    </Layout>
  )
}

export default withData(
  compose(
    graphql(allCheckoutPages, { name: 'allCheckoutPages' }),
    graphql(allFadeColors, { name: 'allFadeColors' })
  )(ShopPage)
)
