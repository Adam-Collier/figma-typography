var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 320, height: 480 });
let fontList = () => __awaiter(this, void 0, void 0, function* () {
    let fonts = yield figma.listAvailableFontsAsync();
    let groupedFonts = fonts.reduce((objectsByKeyValue, obj) => {
        const family = obj["fontName"]["family"];
        objectsByKeyValue[family] = objectsByKeyValue[family] || {};
        objectsByKeyValue[family]["styles"] =
            objectsByKeyValue[family]["styles"] || [];
        objectsByKeyValue[family]["styles"].push(obj["fontName"]["style"]);
        return objectsByKeyValue;
    }, {});
    figma.ui.postMessage({
        type: "fontList",
        fontList: groupedFonts,
    });
});
fontList();
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    if (msg.type === "add-font") {
        let { headerFont, bodyFont, baseFontSize } = msg;
        yield figma.loadFontAsync({
            family: headerFont.family,
            style: headerFont.style,
        });
        yield figma.loadFontAsync({
            family: bodyFont.family,
            style: bodyFont.style,
        });
        Object.entries(msg.typography).map((x) => __awaiter(this, void 0, void 0, function* () {
            let font = x[1];
            let fontFamily = font.fontFamily.replace(/['"]+/g, "");
            let fontSize = Number(font.fontSize.slice(0, -3));
            fontSize = fontSize * baseFontSize;
            let fontLineHeight = font.lineHeight * 100;
            let textStyle = figma.createTextStyle();
            textStyle.name = x[0];
            textStyle.fontName = {
                family: fontFamily,
                style: font.fontWeight,
            };
            textStyle.fontSize = fontSize;
            textStyle.lineHeight = {
                unit: "PERCENT",
                value: fontLineHeight,
            };
        }));
    }
    figma.closePlugin();
});
