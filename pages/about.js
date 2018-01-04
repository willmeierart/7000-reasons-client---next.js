import Link from 'next/link'
import Head from 'next/head'
import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import withData from '../lib/withData'
import { allProjectInfoes, allFadeColors } from '../lib/queries'
import { formatColors, getRandomColor, checkAllQueriesError } from '../lib/_utils'
import Layout from '../components/architecture/Layout'

const AboutPage = ({ url, allProjectInfoes, allFadeColors }) => {
  const queries = ['allArtists', 'allFadeColors']
  checkAllQueriesError(queries)

  const description = allProjectInfoes.allProjectInfoes ? allProjectInfoes.allProjectInfoes[0].projectDescription : null

  const colors = formatColors(allFadeColors.allFadeColors)
  const darkColors = colors.filter((color) => !color.light)
  const randomDark = getRandomColor(darkColors)
  const randomDark2 = getRandomColor(darkColors)

  return (
    <Layout colors={colors} title='About the Project'>
      {(allProjectInfoes.loading || allFadeColors.loading) ? (
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
        <div className='outer-wrapper'>
          <div className='header-title'> About the Project </div>
          <div className='main-wrapper'>
            <div className='header-img-container'>
              <img src={allProjectInfoes.allProjectInfoes[0].descriptionPhotos[0].url} />
            </div>
            <hr className='a' />
            <div className='description' dangerouslySetInnerHTML={{ __html: description }} />
            <div className='sincerely'>Sincerely,</div>
            <div className='names'>Wes & Jonathan</div>
          </div>
          <div className='shoplink'>
            <div><i>want to partcipate?</i></div>
            <Link prefetch href='/shop'><a><b>FIND OUT HOW</b></a></Link>
          </div>
          <hr className='b' />
          <style jsx>{`
            .outer-wrapper {
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
            }
            .header-title {
              text-align: center;
              font-family: var(--title-font);
              margin-top: 2vw;
              font-size: 2em;
              color: ${randomDark};
            }
            .main-wrapper {
              box-sizing: border-box;
              border: 2px solid ${randomDark2};
              border-radius: 5px;
              width: 90vw;
              margin: 2vw 5vw;
              padding: 2vw;
              display:flex;
              flex-direction: column;
              align-items: center;
            }
            .header-img-container {
              width: 100%;
            }
            .header-img-container img {
              width:100%;
            }
            hr {
              margin-top: 2vw;
              width: 80%;
              height:2px;
              border:0;
              font-size:0;
            }
            .a {
              color: ${randomDark};
              background-color: ${randomDark};
            }
            .b {
              background-color: ${randomDark2};
              color: ${randomDark2};
            }
            .description {
              width: 90%;
              text-align: center;
            }
            .sincerely {
              font-family: var(--cursive-font)
            }
            .names {
              font-family: var(--cursive-font);
              font-size: 1.5em;
              color: ${randomDark}
            }
            .shoplink {
              display: flex;
              justify-content: center;
              flex-direction: column;
            }
            a {
              text-align:center;
              text-decoration: none;
              color: ${randomDark};
              border: 1px solid ${randomDark};
              border-radius:2px;
              padding: .5em;
              margin-top: .5em;
            }
          `}</style>
        </div>    
      )}
    </Layout>
  )
}

export default withData(
  compose(
    graphql(allProjectInfoes, { name: 'allProjectInfoes' }),
    graphql(allFadeColors, { name: 'allFadeColors' })
  )(AboutPage)
)
