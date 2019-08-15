import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import Input from "./components/Input";
import typography from "./utils/typography";
const App = () => {
    const onCreate = () => {
        let outputTypography = typography(baseFontSize, baseLineHeight, bodyFont, headerFont, scaleRatio);
        parent.postMessage({
            pluginMessage: {
                type: "add-font",
                typography: outputTypography,
                headerFont,
                bodyFont,
                baseFontSize,
                baseLineHeight,
            },
        }, "*");
    };
    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
    };
    const [fontList, setFontList] = useState();
    const [headerFont, setHeaderFont] = useState("Roboto");
    const [bodyFont, setBodyFont] = useState("Regular");
    const [baseFontSize, setBaseFontSize] = useState("16");
    const [baseLineHeight, setLineHeight] = useState("1.666");
    const [scaleRatio, setScaleRatio] = useState("1.666");
    onmessage = event => {
        setFontList(event.data.pluginMessage.fontList);
    };
    let updateState = (type, value) => {
        switch (type) {
            case "headerFont": {
                setHeaderFont(value);
                return;
            }
            case "bodyFont": {
                setBodyFont(value);
                return;
            }
            default: {
                console.log("failed to run update font state");
                return;
            }
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { fonts: fontList, update: { identifier: "headerFont", updateState }, title: "Header Font" }),
        React.createElement(Input, { fonts: fontList, update: { identifier: "bodyFont", updateState }, title: "Body Font" }),
        React.createElement("div", { className: "flex" },
            React.createElement("div", null,
                React.createElement("p", null, "Base Font Size(px)"),
                React.createElement("input", { value: baseFontSize, onChange: e => setBaseFontSize(e.target.value) })),
            React.createElement("div", null,
                React.createElement("p", null, "Scale Ratio"),
                React.createElement("input", { value: scaleRatio, onChange: e => setScaleRatio(e.target.value) }))),
        React.createElement("p", null, "Line Height"),
        React.createElement("input", { value: baseLineHeight, onChange: e => setLineHeight(e.target.value) }),
        React.createElement("button", { id: "create", onClick: () => onCreate() }, "Create"),
        React.createElement("button", { onClick: () => onCancel() }, "Cancel")));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("react-page"));
