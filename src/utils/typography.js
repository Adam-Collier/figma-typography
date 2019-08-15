import Typography from "typography";
let pick = require("lodash.pick");
const createTypography = (baseFontSize, baseLineHeight, bodyFont, headerFont, scaleRatio) => {
    const options = {
        baseFontSize: `${baseFontSize}px`,
        headerFontFamily: [headerFont.family],
        headerWeight: headerFont.style,
        bodyFontFamily: [bodyFont.family],
        bodyWeight: bodyFont.style,
        scaleRatio: Number(scaleRatio),
        overrideStyles: () => ({
            p: {
                fontFamily: bodyFont.family,
                fontWeight: bodyFont.style,
                fontSize: "1rem",
                lineHeight: baseLineHeight,
            },
        }),
    };
    // @ts-ignore: Unreachable code error
    let typography = new Typography(options);
    let json = typography.toJSON();
    let properties = pick(json, ["h1", "h2", "h3", "h4", "h5", "h6", "p", "a"]);
    return properties;
};
export default createTypography;
