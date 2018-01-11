import Loader from 'react-loaders'

export const binder = (x, Ms) => Ms.forEach(m => x[m] = x[m].bind(x))

export const getRandomColor = (colors) => {
  const randomColorIndex = Math.floor(Math.random() * colors.length)
  // return colors[randomColorIndex] // <<< classic, but:
  return colors[randomColorIndex] ? colors[randomColorIndex].rgba : 'rgba(0,0,0,1)'
}

export const splitToSpans = (word, styles) => {
  return word.split('').map((letter, i) => {
    return <span key={i} className='split-span-letter' >{ letter }{ styles }</span>
  })
}

export const fadeColors = (element, colors, timing) => {
  const origColor = 'inherit' // element.style.color
  const randomDelay = Math.floor(Math.random() * timing) + 300
  const rD2 = Math.floor(Math.random() * (timing * 2))
  const interval = setInterval(() => {
    setTimeout(() => {
      element.style.color = getRandomColor(colors)
      setTimeout(() => {
        element.style.color = origColor
      }, rD2)
    }, randomDelay)
    clearInterval(interval)
  }, 20)
}
export const forEachChild = (array, callback) => {
  return Array.prototype.forEach.call(array, child => {
    callback(child)
  })
}

export const formatColors = (colors = []) => {
  return colors.map((each, i) => {
    // const snagColor = (x) => {
    //   console.log(x)
    //   console.log(each.color[x])
    //   console.log(each.color)
    //   return each.color[x]
    // }
    const splitta = each.color.split(/"[a-z]":/g)
    const colorList = splitta.map(each => parseInt(each.replace(/\D/g, ''))).slice(1)
    // let r, g, b, a
    // const colorList = [r, g, b, a]
    // for (let color of each.color) {
    //   console.log(color);
    // }
    // let colorList = ['"r"', '"g"', '"b"', '"a"']
    // colorList = colorList.map((letter) => {
    //   return snagColor(letter)
    // })
    // console.log(colorList);
    let r = colorList[0]
    let g = colorList[1]
    let b = colorList[2]
    let a = colorList[3]
    // const { [r], [g], [b], [a] } = each.color
    // return `rgba(${r},${g},${b},${a})`   // <<<<< classic, but:
    return {
      rgba: `rgba(${r},${g},${b},${a})`,
      light: each.lightColor
    }
  })
}

export const checkAllQueriesError = (queries) => {
  queries.forEach((query) => {
    if ([query].error) {
      return <h1>¯\_(ツ)_/¯</h1>
    }
  })
}

// take all seperate queries and evaluate if loading or error:
export const checkAllQueriesLoading = (queries, loadedState) => {
  const loadingState = (
    <div className='loader-wrapper'>
      <Loader type='line-spin-fade-loader' active />
    </div>
  )
  let loading = true
  queries.forEach((query) => {
    if ([query].loading) {
      loading = true
    } else {
      loading = false
    }
  })
  return loading ? loadingState : loadedState
}
