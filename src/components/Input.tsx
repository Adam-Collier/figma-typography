import React, { useState } from "react"

const index = ({ fonts, title, update }) => {
  let [fontFamily, setFontFamily] = useState("Roboto")
  let [fontStyle, setFontStyle] = useState("Regular")

  let { identifier, updateState } = update

  const handleChange = (event, type) => {
    if (type === "family") {
      setFontFamily(event.target.value)
      updateState(identifier, { family: event.target.value, style: fontStyle })
    } else {
      setFontStyle(event.target.value)
      updateState(identifier, {
        family: fontFamily,
        style: event.target.value,
      })
    }
  }

  return (
    <>
      <p>{title}</p>
      <select
        name="font family"
        className="font-list"
        value={fontFamily}
        onChange={e => handleChange(e, "family")}
      >
        {fonts ? (
          Object.keys(fonts).map((font, i) => (
            <option key={i} value={font}>
              {font}
            </option>
          ))
        ) : (
          <option value="Roboto">Roboto</option>
        )}
      </select>
      <select
        name="font style"
        className="font-list"
        value={fontStyle}
        onChange={e => handleChange(e, "style")}
      >
        {fonts ? (
          fonts[fontFamily]["styles"].map((weight, i) => (
            <option key={i} value={weight}>
              {weight}
            </option>
          ))
        ) : (
          <option value="Regular">Regular</option>
        )}
      </select>
    </>
  )
}

export default index
