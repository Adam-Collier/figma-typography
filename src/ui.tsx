import React, { useState, useRef } from "react"
import * as ReactDOM from "react-dom"
import "./ui.css"

import Input from "./components/Input"
import typography from "./utils/typography"

declare function require(path: string): any

const App = () => {
  const onCreate = () => {
    let outputTypography = typography(
      baseFontSize,
      baseLineHeight,
      bodyFont,
      headerFont,
      scaleRatio,
    )

    parent.postMessage(
      {
        pluginMessage: {
          type: "add-font",
          typography: outputTypography,
          headerFont,
          bodyFont,
          baseFontSize,
          baseLineHeight,
        },
      },
      "*",
    )
  }

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*")
  }

  const [fontList, setFontList] = useState()

  const [headerFont, setHeaderFont] = useState("Roboto")
  const [bodyFont, setBodyFont] = useState("Regular")
  const [baseFontSize, setBaseFontSize] = useState("16")
  const [baseLineHeight, setLineHeight] = useState("1.666")
  const [scaleRatio, setScaleRatio] = useState("1.666")

  onmessage = event => {
    setFontList(event.data.pluginMessage.fontList)
  }

  let updateState = (type, value) => {
    switch (type) {
      case "headerFont": {
        setHeaderFont(value)
        return
      }
      case "bodyFont": {
        setBodyFont(value)
        return
      }
      default: {
        console.log("failed to run update font state")
        return
      }
    }
  }

  return (
    <>
      <Input
        fonts={fontList}
        update={{ identifier: "headerFont", updateState }}
        title="Header Font"
      />
      <Input
        fonts={fontList}
        update={{ identifier: "bodyFont", updateState }}
        title="Body Font"
      />
      <div className="flex">
        <div>
          <p>Base Font Size(px)</p>
          <input
            value={baseFontSize}
            onChange={e => setBaseFontSize(e.target.value)}
          />
        </div>
        <div>
          <p>Scale Ratio</p>
          <input
            value={scaleRatio}
            onChange={e => setScaleRatio(e.target.value)}
          />
        </div>
      </div>

      <p>Line Height</p>
      <input
        value={baseLineHeight}
        onChange={e => setLineHeight(e.target.value)}
      />
      <button id="create" onClick={() => onCreate()}>
        Create
      </button>
      <button onClick={() => onCancel()}>Cancel</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("react-page"))
