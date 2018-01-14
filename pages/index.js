import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import Head from 'next/head'

import withData from '../lib/withData'
import { allFadeColors, allPaintings, allCountdowns } from '../lib/queries'
import { formatColors, checkAllQueriesError } from '../lib/_utils'

import Layout from '../components/architecture/Layout'
import Counter from '../components/_index/Counter'
import PaintingsGrid from '../components/_index/PaintingsGrid'

const HomePage = ({ url: { pathname }, allPaintings, allFadeColors, allCountdowns }) => {
  const queries = ['allPaintings', 'allFadeColors', 'allCountdowns']
  checkAllQueriesError(queries)

  const colors = formatColors(allFadeColors.allFadeColors)
  const paintings = allPaintings.allPaintings

  return (
    <Layout colors={colors} title='Home'>
      {(allPaintings.loading || allFadeColors.loading || allCountdowns.loading) ? (
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
    graphql(allFadeColors, { name: 'allFadeColors' }),
    graphql(allPaintings, { name: 'allPaintings' })
  )(HomePage)
)
