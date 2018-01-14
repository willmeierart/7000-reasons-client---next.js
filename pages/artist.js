import Link from 'next/link'
import Head from 'next/head'
import { graphql, compose } from 'react-apollo'
import Loader from 'react-loaders'
import withData from '../lib/withData'
import { allArtists, allFadeColors } from '../lib/queries'
import { formatColors, getRandomColor, checkAllQueriesError, forEachChild, fadeColors } from '../lib/_utils'
import Layout from '../components/architecture/Layout'

const ArtistPage = ({ url, allArtists, allFadeColors }) => {
  const queries = ['allArtists', 'allFadeColors']
  checkAllQueriesError(queries)

  const colors = formatColors(allFadeColors.allFadeColors) || [{color: 'rgba(0,0,0,1)'}]
  const darkColors = colors.filter((color) => !color.light)
  const randomDark = getRandomColor(darkColors)
  const randomDark2 = getRandomColor(darkColors)
  const makeRandomDark = () => getRandomColor(darkColors)

  const siteSplitta = site => {
    return site.split('').map((letter, i) => {
      return (
        <span key={i} className='titleLetter' >
          {letter}
          <style jsx>{`
            .titleLetter {
              font-family: var(--title-font);
              transition: color 1s ease;
              font-size: 2.5em;
              pointer-events: none;
            }
          `}</style>
        </span>
      )
    })
  }
  const wordSplitta = txt => (
    txt.split(' ').map((wd, i) => {
      return (
        <span key={i} className='split-word'>
          { wd }<span>&nbsp;</span>
          <style jsx>{`
            .split-word {
              transition: color 1s ease;
              pointer-events: none;
            }
          `}</style>
        </span>
      )
    })
  )
  const colorShimma = e => {
    const letters = e.target.children
    forEachChild(letters, (letter) => {
      fadeColors(letter, colors, 600)
    })
  }

  const isActive = (artistSlug) => url.query.slug === artistSlug
  const activeArtist = allArtists.allArtists ? allArtists.allArtists.filter((artist) => isActive(artist.slug || 'wes'))[0] : 'wes'

  const nameLinks = () => (
    allArtists.allArtists.map((artist) => {
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
              white-space: nowrap;
            }
            a:hover {
              color: ${randomDark2}
            }
            .active {
              font-family: var(--cursive-font);
              {/* font-size: 1.25em;ip */}
              color: ${randomDark};     
              {/* text-decoration:underline;          */}
            }
            @media(max-width:500px){
              a {
                font-size: .75em;
              }
            }
          `}</style>
        </div>
      )
    })
  )
  // const activeArtist = allArtists.allArtists ? allArtists.allArtists.filter((artist) => isActive(artist.slug))[0] : null
  // console.log(activeArtist)
  // const { bio, bodiesOfWork, personalPhotos } = activeArtist

  const splitProBio = activeArtist.professionalBio ? wordSplitta(activeArtist.professionalBio.replace(/(<([^>]+)>)/ig, '').replace(/&nbsp;/g, ' ')) : ''
  const splitPersonalBio = activeArtist.personalBio ? wordSplitta(activeArtist.personalBio.replace(/(<([^>]+)>)/ig, '').replace(/&nbsp;/g, ' ')) : ''
  // const splitProBio = ''
  // const splitPersonalBio = ''

  // console.log(activeArtist)

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
              margin: 5px;
            }
          `}</style>
        </div>
      ) : (
        <div className='main-wrapper'>
          <div className='names'>
            { nameLinks()[0] } &nbsp; | &nbsp; { nameLinks()[1] }
          </div>
          {/* <hr /> */}
          <br />
          <div className='artist-info'>
            <div className='header-img'>
              <img src={activeArtist.headerPhoto.url} />
            </div>
            <div className='professional-bio-wrapper'>
              <div onMouseOver={(e) => colorShimma(e)}>
                { splitProBio }
              </div>
            </div>
            <div className='personal-images'>
              <div className='personal-img-wrapper'>
                <div className='img-screen' style={{backgroundColor: makeRandomDark()}} /><img src={activeArtist.personalPhotos[0].url} />
              </div>
              <div className='personal-img-wrapper'>
                <div className='img-screen' style={{backgroundColor: makeRandomDark()}} /><img src={activeArtist.personalPhotos[1].url} />
              </div>
            </div>
            <div className='personal-bio-wrapper'>
              <div onMouseOver={(e) => colorShimma(e)}>
                { splitPersonalBio }
              </div>
            </div>
            <div className='work-images'>
              <div className='website' onMouseOver={(e) => colorShimma(e)}>
                <a href='activeArtist.website' target='_blank'>{ siteSplitta(activeArtist.website.replace(/(https?:\/\/www\.|\/)/g, '')) }</a>
              </div>
              <div className='work-img-wrapper'>
                <div className='img-screen' /><img src={activeArtist.workPhotos[0].url} />
              </div>
              <div className='work-img-wrapper'>
                <div className='img-screen' /><img src={activeArtist.workPhotos[1].url} />
              </div>
              <div className='work-img-wrapper'>
                <div className='img-screen' /><img src={activeArtist.workPhotos[2].url} />
              </div>
              <div className='work-img-wrapper'>
                <div className='img-screen' /><img src={activeArtist.workPhotos[3].url} />
              </div>
            </div>
          </div>
          <style jsx>{`
            hr {
              width: 40%;
              margin: 1vw;
              height:2px;
              border:0;
              font-size:0;
              color: ${randomDark};
              background-color: ${randomDark};
            }
            .professional-bio-wrapper, .personal-bio-wrapper {
              width: 70vw;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
            }
            .professional-bio-wrapper div, .personal-bio-wrapper div {
              display: flex;
              width: 70vw;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              {/* flex-direction: column; */}
              {/* flex-grow: 1; */}
            }
            .main-wrapper{
              display:flex;
              justify-content: center;
              align-items:center;
              flex-direction:column;
              line-height: 1.5em;
            }
            .names {
              margin-top: 1em;
              font-size: 2em;
              display: flex;
              justify-content: space-between;
            }
            .artist-info {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              {/* margin:2vw 5vw; */}
              box-sizing: border-box;
              text-align: center;
              border: 2px solid ${randomDark};
              border-radius: 5px;
              width: 90vw;
              padding: 0 10vw 5vw 10vw;
            }
            .header-img img {
              width: 60vw;
              margin: 2vw;
              margin-top: 4vw;
              filter: ${activeArtist.slug === 'wes' ? 'sepia(100%) hue-rotate(180deg)' : 'sepia(100%) hue-rotate(90deg)'};
              box-shadow: 0 0 30px ${randomDark};
              transition: filter 1s ease-out;
              border-radius: 2px;           
            }
            .header-img img:hover {
              filter: ${activeArtist.slug === 'wes' ? 'sepia(0%) hue-rotate(360deg)' : 'sepia(0%) hue-rotate(0deg)'};
            }
            .personal-bio-wrapper {
              {/* padding-top: 6vw; */}
            }
            .personal-img-wrapper {
              position:relative;
              overflow:hidden;
              width:30vw;
              height:30vw;
              margin: 2vw .5vw;
            }
            .img-screen {
              position: absolute;
              height:100%;
              opacity: .5;
              transition: opacity 1s ease-in-out;
            }
            .personal-img-wrapper img {
              width: 100%;
              height: 100%;
            }
            .img-screen:hover {
              opacity: 0;
            }
            .personal-images {
              width: 60vw;
              display: flex;
              justify-content: space-around;
            }
            .work-images { 
              position: relative;
              display: flex;
              width:60vw;
              margin-top:2vw;
             }
            .work-img-wrapper {
              position:relative;
              width: 25%;
              height:25%;
              overflow:hidden;
            }
            .work-img-wrapper img {
              width: 100%;
              height: 100%;
            }
            .work-img-wrapper .img-screen{

            }
            .website {
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              font-weight: bold;
              color: white;
              {/* background: rgba(0,0,0,.5);                             */}
              {/* -webkit-text-fill-color: transparent;              
              -webkit-background-clip: text; */}
              z-index: 3;
              {/* mix-blend-mode: overlay; */}
              {/* background: none; */}
            }
            .website:hover {
              {/* mix-blend-mode: initial; */}
              {/* transition: .5s mix-blend-mode; */}
            }
            @media(max-width: 500px) {
              .website {
                font-size: .75em;
              }
            }
            a {
              text-decoration: none;
              color: white;
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
