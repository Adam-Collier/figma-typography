import React, { useState } from "react";
const index = ({ fonts, title, update }) => {
    let [fontFamily, setFontFamily] = useState("Roboto");
    let [fontStyle, setFontStyle] = useState("Regular");
    let { identifier, updateState } = update;
    const handleChange = (event, type) => {
        if (type === "family") {
            setFontFamily(event.target.value);
            updateState(identifier, { family: event.target.value, style: fontStyle });
        }
        else {
            setFontStyle(event.target.value);
            updateState(identifier, {
                family: fontFamily,
                style: event.target.value,
            });
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("p", null, title),
        React.createElement("select", { name: "font family", className: "font-list", value: fontFamily, onChange: e => handleChange(e, "family") }, fonts ? (Object.keys(fonts).map((font, i) => (React.createElement("option", { key: i, value: font }, font)))) : (React.createElement("option", { value: "Roboto" }, "Roboto"))),
        React.createElement("select", { name: "font style", className: "font-list", value: fontStyle, onChange: e => handleChange(e, "style") }, fonts ? (fonts[fontFamily]["styles"].map((weight, i) => (React.createElement("option", { key: i, value: weight }, weight)))) : (React.createElement("option", { value: "Regular" }, "Regular")))));
};
export default index;
