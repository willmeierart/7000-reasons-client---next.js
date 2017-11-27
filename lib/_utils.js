export const binder = (x, Ms) => Ms.forEach(m => x[m] = x[m].bind(x))

export const fadeColors = (element, colors, timing) => {
  const origColor = 'black' // element.style.color
  const randomDelay = Math.floor(Math.random() * timing) + 300
  const rD2 = Math.floor(Math.random() * (timing * 2))
  const randomColorIndex = Math.floor(Math.random() * 3)
  const interval = setInterval(() => {
    setTimeout(() => {
      element.style.color = colors[randomColorIndex]
      setTimeout(() => {
        element.style.color = origColor
      }, rD2)
    }, randomDelay)
    clearInterval(interval)
  }, 200)
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
    return `rgba(${r},${g},${b},${a})`
  })
}
