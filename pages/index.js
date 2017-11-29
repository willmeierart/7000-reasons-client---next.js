import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import Head from 'next/head'

import withData from '../lib/withData'
import { allFadeColors, allPaintings, allCountdowns, allShiftingMessages } from '../lib/queries'
import { formatColors, checkAllQueriesError, checkAllQueriesLoading } from '../lib/_utils'

import Layout from '../components/architecture/Layout'
import Counter from '../components/_index/Counter'
import PaintingsGrid from '../components/_index/PaintingsGrid'

const HomePage = ({ url: { pathname }, allPaintings, allFadeColors, allShiftingMessages, allCountdowns }) => {
  const queries = ['allPaintings', 'allFadeColors', 'allShiftingMessages', 'allCountdowns']

  checkAllQueriesError(queries)

  const colors = formatColors(allFadeColors.allFadeColors)
  const paintings = allPaintings.allPaintings

  // const content = allCountdowns.allCountdowns[0] ? (
  //   <div>
  //     <Counter number={allCountdowns.allCountdowns[0].remaining || null} />
  //     <PaintingsGrid paintings={paintings} colors={colors} />
  //   </div>
  // ) : null

  return (
    <Layout colors={colors} title='Home'>
      {(allPaintings.loading || allFadeColors.loading || allCountdowns.loading || allShiftingMessages.loading) ? (
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
        <div>
          <Counter colors={colors} number={allCountdowns.allCountdowns[0].remaining} />
          <PaintingsGrid paintings={paintings} colors={colors} />
        </div>
      )}
      {/* { checkAllQueriesLoading(queries, content) } */}
    </Layout>
  )
}

export default withData(
  compose(
    graphql(allCountdowns, { name: 'allCountdowns' }),
    graphql(allShiftingMessages, { name: 'allShiftingMessages' }),
    graphql(allFadeColors, { name: 'allFadeColors' }),
    graphql(allPaintings, { name: 'allPaintings' })
  )(HomePage)
)
