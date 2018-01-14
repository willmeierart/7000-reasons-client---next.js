import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import withData from '../../lib/withData'
import { allFontses, allShiftingMessages } from '../../lib/queries'
import Head from '../Head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, title, colors, allFontses, allShiftingMessages }) => {
  const fontArr = allFontses.loading || !allFontses.allFontses ? [] : [allFontses.allFontses[0].headerFont, allFontses.allFontses[0].secondaryDisplayFont, allFontses.allFontses[0].bodyFont]
  const appFonts = allFontses.loading ? 'Fredoka+One|Lobster|Roboto' : fontArr.join('|').replace(' ', '+')
  const reasons = allShiftingMessages.allShiftingMessages
  const fonts = allFontses.allFontses

  return ((allFontses.loading || allShiftingMessages.loading) ? (
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
    <div className='layout-wrapper'>
      <Head fonts={appFonts} title={title} />
      <Header reasons={reasons} colors={colors} />
      <hr />
      <main>{ children }</main>
      <Footer />
      <style jsx global>{`
        :root{
          --title-font: ${fonts[0].headerFont}, cursive;
          --cursive-font: ${fonts[0].secondaryDisplayFont}, cursive;
          --body-font: ${fonts[0].bodyFont}, sans-serif;
          --background-color: #fffcf2;
        }
        hr{
          width:90vw;
        }
        .layout-wrapper{
          width:100%;
        }
        body {
          margin:0!important;
          width:100vw;
          font-family: var(--body-font);
          background-color: var(--background-color);
        }
        .loader-hidden {display:none;}
        .loader-active {
          display:block;
        }
        .line-spin-fade-loader div {
          background-color: red;
          left: 5vw;
          top: 5vw;
        }
        .loader {
          {/* min-width:100vw; */}
          {/* min-height:100vh; */}
          margin-top:25vh;
          margin-bottom:25vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  ))
}

export default withData(
  compose(
    graphql(allFontses, { name: 'allFontses' }),
    graphql(allShiftingMessages, { name: 'allShiftingMessages' })
  )(Layout)
)
