import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import Head from 'next/head'

import withData from '../lib/withData'
import { allFadeColors, allCheckoutPages } from '../lib/queries'
import { formatColors, checkAllQueriesError, getRandomColor } from '../lib/_utils'

import Layout from '../components/architecture/Layout'
import PriceCounter from '../components/_shop/PriceCounter'
import ExamplesFader from '../components/_shop/ExamplesFader'
import CheckoutForm from '../components/_shop/CheckoutForm'

const ShopPage = ({ url: { pathname }, allFadeColors, allCheckoutPages }) => {
  const queries = ['allCheckoutPages', 'allFadeColors']
  checkAllQueriesError(queries)

  const colors = formatColors(allFadeColors.allFadeColors)
  const darkColors = colors.filter((color) => !color.light)
  const randomDark = getRandomColor(darkColors)
  const randomDark2 = getRandomColor(darkColors)

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
            <div classname='intro'>
              <h2>Thank you for your interest!</h2>
              <div dangerouslySetInnerHTML={{ __html: shopData.introParagraph }} />
            </div>
            {/* <hr /> */}
            <div className='instructions-section'>
              <div className='instructions'>
                <h1>INSTRUCTIONS:</h1>
                <div dangerouslySetInnerHTML={{ __html: shopData.instructions }} />
              </div>
              <div className='fader-good'>
                <ExamplesFader images={shopData.goodPortraitExamples} />
                <span>GOOD</span>
              </div>
              <div className='fader-bad'>
                <ExamplesFader images={shopData.badPortraitExamples} />
                <span>BAD</span>
              </div>
            </div>
            <h1>LET'S DO THIS!</h1>
            <img src='/static/paypal.png' />
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
              grid-template-rows: 1fr 1fr;
              grid-template-columns: 3fr 1fr;
              grid-template-areas: "instructions images1" "instructions images2";
              margin: 5vw 0;
            }
            h1 {
              text-decoration: underline;
            }
            .instructions {
              grid-area: instructions;
              text-align: justify;
              padding-right: 3em;
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
