import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'

import withData from '../lib/withData'
import { allFadeColors, allPaintings } from '../lib/queries'
import { formatColors } from '../lib/_utils'

import Layout from '../components/architecture/Layout'
import Counter from '../components/_index/Counter'
import PaintingsGrid from '../components/_index/PaintingsGrid'

const HomePage = ({ url: { pathname }, allPaintings, allFadeColors }) => {
  const colors = formatColors(allFadeColors.allFadeColors)
  const paintings = allPaintings.allPaintings

  if (allPaintings.error || allFadeColors.error) return <h1>error</h1> // should be error boundary

  return (
    <Layout colors={colors} title='Home'>
      {(allPaintings.loading || allFadeColors.loading) ? (
        <Loader type='line-spin-fade-loader' active />
      ) : (
        <div>
          <Counter />
          <PaintingsGrid paintings={paintings} colors={colors} />
        </div>
      )}
    </Layout>
  )
}

export default withData(
  compose(
    graphql(allFadeColors, { name: 'allFadeColors' }),
    graphql(allPaintings, { name: 'allPaintings' })
  )(HomePage)
)
