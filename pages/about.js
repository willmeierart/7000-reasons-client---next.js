import Link from 'next/link'
import Head from 'next/head'
import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import withData from '../lib/withData'
import { allProjectInfoes, allFadeColors } from '../lib/queries'
import { formatColors, getRandomColor } from '../lib/_utils'
import Layout from '../components/architecture/Layout'

const AboutPage = ({ url, allProjectInfoes, allFadeColors }) => {
  const description = allProjectInfoes.allProjectInfoes ? allProjectInfoes.allProjectInfoes[0].projectDescription : null
  console.log(description)
  const colors = formatColors(allFadeColors.allFadeColors)
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
        <div className='main-wrapper'>
          <div>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          <style jsx>{`
            .main-wrapper{

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
