figma.showUI(__html__, { width: 320, height: 480 })

let fontList = async () => {
  let fonts = await figma.listAvailableFontsAsync()

  let groupedFonts = fonts.reduce((objectsByKeyValue, obj) => {
    const family = obj["fontName"]["family"]

    objectsByKeyValue[family] = objectsByKeyValue[family] || {}

    objectsByKeyValue[family]["styles"] =
      objectsByKeyValue[family]["styles"] || []

    objectsByKeyValue[family]["styles"].push(obj["fontName"]["style"])
    return objectsByKeyValue
  }, {})

  figma.ui.postMessage({
    type: "fontList",
    fontList: groupedFonts,
  })
}

fontList()

figma.ui.onmessage = async msg => {
  if (msg.type === "add-font") {
    let { headerFont, bodyFont, baseFontSize } = msg

    await figma.loadFontAsync({
      family: headerFont.family,
      style: headerFont.style,
    })

    await figma.loadFontAsync({
      family: bodyFont.family,
      style: bodyFont.style,
    })

    Object.entries(msg.typography).map(async x => {
      let font: any = x[1]

      let fontFamily = font.fontFamily.replace(/['"]+/g, "")
      let fontSize = Number(font.fontSize.slice(0, -3))
      fontSize = fontSize * baseFontSize
      let fontLineHeight = font.lineHeight * 100

      let textStyle = figma.createTextStyle()
      textStyle.name = x[0]
      textStyle.fontName = {
        family: fontFamily,
        style: font.fontWeight,
      }
      textStyle.fontSize = fontSize
      textStyle.lineHeight = {
        unit: "PERCENT",
        value: fontLineHeight,
      }
    })
  }

  figma.closePlugin()
}
