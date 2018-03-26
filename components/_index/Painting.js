const Painting = ({ painting, colors }) => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  const randomColor = colors[randomIndex].rgba
  console.log(painting);
  return (
    <div>
      <div className='img-wrapper'>
        <img src={painting.image.url} />
        <div className='number'>
          <span>{painting.number}</span>
        </div>
      </div>
      <style jsx>{`
        .img-wrapper{
          height: 25vw;
          width: 25vw;
          overflow: hidden;
          {/* box-shadow: 0 0 20px 5px rgba(0,0,0,.25); */}
          z-index: 3;
          position: relative;
          background-color: ${randomColor};
          {/* background-color:white;
          transition:color:1s ease; */}
        }
        .img-wrapper:hover{
          {/* transition: color:1s ease; */}
          z-index: 2;
          {/* background-color: ${randomColor}; */}
        }
        img {
          display: inline-block;
          width: 25.2vw;
          height: 25.2vw;
          margin: 0;
          transition: opacity .5s ease-out, filter .6s ease-in-out;
          {/* transition-delay: opacity .2s; */}
          {/* transform: translateZ(0) opacity(1); */}
          {/* will-change: opacity; */}
          z-index: 10;
          image-rendering:auto;
          
        }
        img:hover{
          image-rendering: crisp-edges;
          {/* transition: all 1s ease-in-out; */}   
          filter: blur(20px);    
          opacity: 0;
          z-index: 0;
        }
        .number {
          z-index: -1;
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 3em;
          font-family: var(--title-font);
          text-shadow: 0 0 5px rgba(0,0,0,.5);
        }
      `}</style>
    </div>
  )
}

export default Painting
