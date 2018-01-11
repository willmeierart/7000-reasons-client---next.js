import { getRandomColor } from '../../lib/_utils'

const Counter = ({ number, colors }) => {
  const darkColors = colors.filter((color) => !color.light)
  const lightColors = colors.filter((color) => color.light)  
  const randColor = getRandomColor(darkColors)
  const randColor2 = getRandomColor(lightColors).replace(',1)', ',.5)')
  const randColor3 = getRandomColor(colors).replace(',1)', ',.5)')
  const randColor4 = getRandomColor(darkColors)

  // console.log(darkColors)
  return (
    <div className='outerOuter'>
      <div className='outerWrapper'>
        <div className='innerWrapper'>
          <div>{
            number.split('').map((num, i) => {
              const thisNum = i === number.length - 1 ? (
                <div key={i} className='eachNum'>
                  <div className='flipIn'>{num}</div>
                </div>) : (<div key={i} className='eachNum'>
                  <div>{num}</div>
                </div>
              )
              return thisNum
            })
          }</div>
        </div>
      </div>
      <style jsx>{`
        .outerOuter {
          width: 100%;
          height: 20vh;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0;
          margin-top: -1em;
        }
        .innerWrapper, .outerWrapper, .eachNum {
          padding:5px;
          border:1px solid ${randColor4};
          border-radius: 5px;
          text-decoration: bold;
        }
        .eachNum {
          font-family: var(--title-font);
          display: inline-block;
          font-size:2em;
          margin:1px;
          width:1em;
          text-align:center;
          color:${randColor};
          background-color:white;
        }
        .innerWrapper {
          padding: 10px;
          background-color:${randColor2}
        }
        .outerWrapper {
          background-color:${randColor3}
          border-width:2px;
          box-shadow: 0 4px rgba(0,0,0,.5);
        }
        .flipIn {
          backface-visibility: visible !important;
          animation-name: flipIn;
          animation-duration: 3s;
          {/* animation-iteration-count: 5; */}
        }
        @keyframes flipIn {
          from {
            transform: rotate3d(1, 0, 0, -110deg);
            animation-timing-function:linear;
          } to {
            transform: rotate3d(1, 0, 0, 0deg);
          }
        }
      `}</style>
    </div>
  )
}

export default Counter
