import Link from 'next/link'
import Head from 'next/head'
import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import withData from '../lib/withData'
import { allArtists, allFadeColors } from '../lib/queries'
import { formatColors, getRandomColor } from '../lib/_utils'
import Layout from '../components/architecture/Layout'

const ArtistPage = ({ url, allArtists, allFadeColors }) => {
  const colors = formatColors(allFadeColors.allFadeColors) || [{color: 'rgba(0,0,0,1)'}]
  const darkColors = colors.filter((color) => !color.light)
  const randomDark = getRandomColor(darkColors)
  const randomDark2 = getRandomColor(darkColors)
  const isActive = (artistSlug) => url.query.slug === artistSlug
  const nameLinks = () => (
    allArtists.allArtists.map((artist) => {
      // const artistSlug = artist.name.toLowerCase().split(' ').join('-')
      return (
        <div key={artist.id}>
          { isActive(artist.slug) ? <span className='name active'>
            { artist.name }
          </span> : <Link as={`/artists/${artist.slug}`} href={`/artist?slug=${artist.slug}`}><a>
            { artist.name }
          </a></Link>
          }
          <style jsx>{`
            a, .active {
              display: inline-block;
            }
            a {
              font-family: var(--cursive-font);
              text-decoration: none;
              color: black;
            }
            a:hover {
              color: ${randomDark2}
            }
            .active {
              font-family: var(--title-font);
              color: ${randomDark};     
              text-decoration:underline;         
            }
          `}</style>
        </div>
      )
    })
  )
  const activeArtist = allArtists.allArtists ? allArtists.allArtists.filter((artist) => isActive(artist.slug))[0] : null
  console.log(activeArtist)
  // const { bio, bodiesOfWork, personalPhotos } = activeArtist
  return (
    <Layout colors={colors} title='About the Project'>
      {(allArtists.loading || allFadeColors.loading) ? (
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
          <div className='names'>
            { nameLinks()[0] } &nbsp; | &nbsp; { nameLinks()[1] }
          </div>
          <br />
          <div className='artist-info'>
            <div className='bio-wrapper'>
              <div dangerouslySetInnerHTML={{ __html: activeArtist.bio }} />
            </div>
          </div>
          <style jsx>{`
            .main-wrapper{
              display:flex;
              justify-content: center;
              align-items:center;
              flex-direction:column;
            }
            .names {
              margin-top: 1em;
              font-size: 2em;
              display: flex;
              justify-content: space-between;
            }
            .artist-info {
              margin:2vw 5vw;
            }
          `}</style>
        </div>
      )}
    </Layout>
  )
}

export default withData(
  compose(
    graphql(allArtists, { name: 'allArtists' }),
    graphql(allFadeColors, { name: 'allFadeColors' })
  )(ArtistPage)
)
