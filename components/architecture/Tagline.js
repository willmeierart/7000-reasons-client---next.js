import Link from 'next/link'
import { getRandomColor } from '../../lib/_utils'
import ReasonTo from './ReasonTo'

const Tagline = ({ colors, reasons }) => {
  const splitShimmer = (phrase) => {
    return phrase.split('').map((letter, i) => {
      const randomColor = getRandomColor(colors)
      return (
        <span key={i}>
          <span className='split-span-letter' >
            {letter}
          </span>
          <style jsx>{`
            .split-span-letter {
              animation-name: colorFadeRow;
              animation-duration: 5s;
              animation-delay: ${i * 30}ms;
            }
            @keyframes colorFadeRow {
              from {
                color: black;
              } 30% {
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
  return (
    <div>
      <div className='container'>
        <ReasonTo reasons={reasons} colors={colors} />
        <div className='names'>
          <div className='name'>
            <Link prefetch href='/artist?slug=wes'><a>
              { splitShimmer('Wes Magyar') }
            </a></Link>
          </div>
          <span>&nbsp; &  &nbsp;</span>
          <div className='name'>
            <Link prefetch href='/artist?slug=jonathan'><a>
              { splitShimmer('Jonathan  Saiz') }
            </a></Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        a {
          color: inherit;
          text-decoration: none;
        }
        .prepo {
          margin-bottom:1em;
        }
        .container {
          width: 60vw;
          margin: 0 20vw 1em 20vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items:center;
          font-family: var(--cursive-font);
        }
        .names {
          font-size:2em;
          margin-bottom:.5em;
          display: flex;
          white-space:nowrap;
          flex-wrap: nowrap;
        }
        .name, .names span {
          display:flex;
          wrap: nowrap;
          white-space: nowrap;
        }
        .name div {
          display: inline-block;

        }
        @media (max-width: 500px) {
          .names {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          }
          .name, .names span {
            display:flex;
            white-space: nowrap;
            flex-grow: 1;
            flex-wrap: nowrap;
            text-align: center;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default Tagline
