import { getRandomColor } from '../../lib/_utils'

export default ({ colors }) => {
  const splitShimmer = (phrase) => {
    return phrase.split('').map((letter, i) => {
      const randomColor = getRandomColor(colors)
      return (
        <span>
          <span key={i} className='split-span-letter' >
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
        <div className='by'>by</div>
        <div className='names'>
          {splitShimmer('Jonathan Saiz & Wes Magyar')}
          {/* <div className='name'>Jonathan Saiz</div>
          <div className='and'>&nbsp; & &nbsp;</div>
          <div className='name'>Wes Magyar</div> */}
        </div>
      </div>
      <style jsx>{`
      .by {
        margin-bottom:1em;
      }
      .container {
        width: 60vw;
        margin: 0 20vw 2em 20vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        font-family: var(--cursive-font);
      }
      .names {
        font-size:2em;
        margin-bottom:.5em;
      }
      .names div {
        display: inline-block;
      }
    `}</style>
    </div>
  ) 
}
