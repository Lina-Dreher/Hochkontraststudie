(function () {
    console.log("bookmarklet starting");
    /*Comment on bookmarklet: 
      - For each element (font to background, link to font, link to background...) check if there are contrast problems with one of the colours defined above.
      - Attention!!! also important, with the background colour
      - Output by border and title attribute
      -chrome and edge have the same colour values and behaviours, so only checked once here
      */

    //Font contrast
    let schriftgroessePX;
    let schriftgroesse;
    let schriftGewichtung;
    let schriftStyle;
    let schriftDecoration;

    let elements = document.querySelectorAll('*');


    //Are colors set?
    let bodyColor = Fabangaben();
    setTitleF(bodyColor);

    // Iterate over each element
    for (let a = 0; a < elements.length; a++) {
        // Retrieve computed styles for the current element
        schriftgroessePX = window.getComputedStyle(elements[a]).fontSize;
        schriftgroesse = schriftgroessePX.slice(0, (schriftgroessePX.length - 2));
        schriftGewichtung = window.getComputedStyle(elements[a]).fontWeight;
        schriftStyle = window.getComputedStyle(elements[a]).fontStyle;
        schriftDecoration = window.getComputedStyle(elements[a]).textDecoration;

        vordergrund = window.getComputedStyle(elements[a]).color; // Foreground color
        hintergrund = window.getComputedStyle(elements[a]).backgroundColor; // Background color
        // Check if the element is an anchor (<a>) tag
        if (elements[a].nodeName === 'A') { //Links in body text must not only be set off by colour, but must also be underlined, bolded, inverted or marked.| Exception: The contrast ratio between link colour and surrounding text colour and between link colour and background is 3: 1 or better.
            let title = [];

            //Aktueller bzw. Tageslicht Modus und invertiert
            let parent = elements[a].parentElement;
            let aktuellC = AktualLinkKontrast(elements[a], parent, schriftGewichtung, schriftgroesse);
            title[0] = setTitleAktuellLink(aktuellC);

            //Wasser
            let wasserC = WindowsChromeWasser(schriftGewichtung, schriftgroesse);
            title[1] = setTitleLink(wasserC, 'Wasser Chrome Windows');

            //Abenddämmerung
            let abendC = WindowsChromeAbenddaemmerung(schriftGewichtung, schriftgroesse);
            title[3] = setTitleLink(abendC, 'Abenddämmerung Chrome/Edge Windows');

            //Nachthimmel
            let nachtC = WindowsChromeNachthimmel(schriftGewichtung, schriftgroesse);
            title[5] = setTitleLink(nachtC, 'Nachthimmel Chrome/Edge Windows');

            //Wüste 
            let wuesteC = WindowsChromeWueste(schriftGewichtung, schriftgroesse);
            title[7] = setTitleLink(wuesteC, 'Wüste Chrome/Edge Windows');

            let p = elements[a].parentElement;
            let parentColor = window.getComputedStyle(p).getPropertyValue('background-color');
            if (parentColor == "rgba(0, 0, 0, 0)") { // Defalt Wert. But in Chrome and Edge the browser are showing an white background, not black, so we have to change the color to the correct value. Note: if the background is set to black, we would get 'rgb(0, 0, 0)'
                parentColor = 'rgb(255, 255, 255)';
            }

            let red = 'rgb(255, 0, 0)';
            let borderColor;

            let kontrastArray = [];
            kontrastArray[0] = kontrastAA(red, parentColor, schriftGewichtung, schriftgroesse);
            if (kontrastArray[0][5] < 3.5) {
                borderColor = 'rgb(0, 0, 0)';
            } else {
                borderColor = red;
            }

            // Check if the link is not visually highlighted
            if (!(isLinkHighlighted(schriftGewichtung, schriftStyle, schriftDecoration))) { // Link must only have sufficient colour contrast to the surrounding font if it is not otherwise highlighted.
                let fullTitle = "";
                for (let j = title.length - 1; j >= 0; j--) {

                    if (title[j]) {
                        fullTitle = fullTitle + title[j];
                    }
                }
                if (fullTitle.length > 0) {
                    let p = elements[a].parentElement;
                    let parentColor = window.getComputedStyle(p).getPropertyValue('background-color');
                    if (parentColor == "rgba(0, 0, 0, 0)") { // Defalt Wert. But in Chrome and Edge the browser are showing an white background, not black, so we have to change the color to the correct value. Note: if the background is set to black, we would get 'rgb(0, 0, 0)'
                        parentColor = 'rgb(255, 255, 255)';
                    }
                    let pParentColor = window.getComputedStyle(p.parentElement).getPropertyValue('background-color');

                    let red = 'rgb(255, 0, 0)';
                    let black = 'rgb(0, 0, 0)';
                    let borderColor;

                    let kontrastArray = [];
                    kontrastArray[0] = kontrastAA(red, parentColor, schriftGewichtung, schriftgroesse);
                    kontrastArray[1] = kontrastAA(red, pParentColor, schriftGewichtung, schriftgroesse);
                    kontrastArray[2] = kontrastAA(black, parentColor, schriftGewichtung, schriftgroesse);
                    kontrastArray[3] = kontrastAA(black, pParentColor, schriftGewichtung, schriftgroesse);

                    if ((kontrastArray[0][5] < 3.5) || (kontrastArray[1][5] < 3.5)) {

                        if ((kontrastArray[2][5] < 3.5) || (kontrastArray[3][5] < 3.5)) {
                            borderColor = 'rgb(0, 0, 0)';
                        } else {
                            borderColor = 'rgb(13, 110, 253)';
                        }

                    } else {
                        borderColor = red;
                    }
                    elements[a].setAttribute('title', fullTitle);
                    elements[a].style['border'] = 'solid ' + borderColor; // Apply a red border to the element            
                }
            }
        } else {
            let title = [];
            //Aktueller bzw. Tageslicht Modus
            let aktuellC = AktualKontrast(elements[a], schriftGewichtung, schriftgroesse);
            title[0] = setTitle(aktuellC, 'Tageslichtmodus');

            //Wasser
            let wasserC = WindowsChromeWasser(schriftGewichtung, schriftgroesse);
            title[1] = setTitle(wasserC, 'Wasser Chrome/Edge Windows');

            //Abenddämmerung
            let abendC = WindowsChromeAbenddaemmerung(schriftGewichtung, schriftgroesse);
            title[3] = setTitle(abendC, 'Abenddämmerung Chrome/Edge Windows');

            //Nachthimmel
            let nachtC = WindowsChromeNachthimmel(schriftGewichtung, schriftgroesse);
            title[5] = setTitle(nachtC, 'Nachthimmel Chrome/Edge Windows');

            //Wüste 
            let wuesteC = WindowsChromeWueste(schriftGewichtung, schriftgroesse);
            title[7] = setTitle(wuesteC, 'Wüste Chrome/Edge Windows');

            //invertiert
            let invert = Invertiert(elements[a], schriftGewichtung, schriftgroesse);
            title[9] = setTitle(invert, 'invertiert');

            let fullTitle = "";
            for (let j = title.length - 1; j >= 0; j--) {
                if (title[j]) {
                    fullTitle = fullTitle + title[j];
                }
            }
            if (fullTitle.length > 0) {
                let p = elements[a].parentElement;
                let parentColor = window.getComputedStyle(p).getPropertyValue('background-color');
                if (parentColor == "rgba(0, 0, 0, 0)") { // Defalt Wert. But in Chrome and Edge the browser are showing an white background, not black, so we have to change the color to the correct value. Note: if the background is set to black, we would get 'rgb(0, 0, 0)'
                    parentColor = 'rgb(255, 255, 255)';
                }

                let eColor = window.getComputedStyle(elements[a]).getPropertyValue('background-color');

                let red = 'rgb(255, 0, 0)';
                let black = 'rgb(0, 0, 0)';
                let borderColor;

                let kontrastArray = [];
                kontrastArray[0] = kontrastAA(red, parentColor, schriftGewichtung, schriftgroesse);
                kontrastArray[1] = kontrastAA(red, eColor, schriftGewichtung, schriftgroesse);
                kontrastArray[2] = kontrastAA(black, parentColor, schriftGewichtung, schriftgroesse);
                kontrastArray[3] = kontrastAA(black, eColor, schriftGewichtung, schriftgroesse);

                if ((kontrastArray[0][5] < 3.5) || (kontrastArray[1][5] < 3.5)) {

                    if ((kontrastArray[2][5] < 3.5) || (kontrastArray[3][5] < 3.5)) {
                        borderColor = 'rgb(0, 0, 0)';
                    } else {
                        borderColor = 'rgb(13, 110, 253)';
                    }

                } else {
                    borderColor = red;
                }
                elements[a].setAttribute('title', fullTitle);
                elements[a].style['border'] = 'solid ' + borderColor; // Apply a red border to the element          

            }
        }
    }
})();

function kontrastAA(vordergrund, hintergrund, schriftGewichtung, schriftgroesse) {

    let vordergrundLumi;
    let hintergrundLumi;
    let ratio;

    let rv = RgbWerte(vordergrund)[0];
    let gv = RgbWerte(vordergrund)[1];
    let bv = RgbWerte(vordergrund)[2];
    vordergrundLumi = Luminescence(rv, gv, bv);
    let vordergrundHex = RgbToHex(parseInt(rv), parseInt(gv), parseInt(bv));

    let rh = RgbWerte(hintergrund)[0];
    let gh = RgbWerte(hintergrund)[1];
    let bh = RgbWerte(hintergrund)[2];
    hintergrundLumi = Luminescence(rh, gh, bh);
    let hintergrundHex = RgbToHex(parseInt(rh), parseInt(gh), parseInt(bh));
    ratio = contrast(vordergrundLumi, hintergrundLumi);
    let shortRatio = CutRatio(ratio);

    let RArray = [];
    if ((schriftgroesse >= 18.5) && (schriftGewichtung === '700')) { //kontrast von 3:1 ausreichend

        if ((schriftgroesse >= 24) && (schriftGewichtung === '700')) {

            if (ratio >= 3) {
                RArray[0] = true;
                RArray[1] = ratio;
                RArray[2] = vordergrundHex;
                RArray[3] = hintergrundHex;
                RArray[4] = '3:1';
                RArray[5] = shortRatio;
                return RArray;
            } else {
                RArray[0] = false;
                RArray[1] = ratio;
                RArray[2] = vordergrundHex;
                RArray[3] = hintergrundHex;
                RArray[4] = '3:1';
                RArray[5] = shortRatio;
                return RArray;
            }
        } else if (ratio >= 3) {
            RArray[0] = true;
            RArray[1] = ratio;
            RArray[2] = vordergrundHex;
            RArray[3] = hintergrundHex;
            RArray[4] = '3:1';
            RArray[5] = shortRatio;
            return RArray;
        } else {
            RArray[0] = false;
            RArray[1] = ratio;
            RArray[2] = vordergrundHex;
            RArray[3] = hintergrundHex;
            RArray[4] = '3:1';
            RArray[5] = shortRatio;
            return RArray;

        }
    } else if ((schriftgroesse < 18.5) && (schriftGewichtung === '700')) { // kontrast von 3:1 ausreichend
        if (ratio >= 3) {
            RArray[0] = true;
            RArray[1] = ratio;
            RArray[2] = vordergrundHex;
            RArray[3] = hintergrundHex;
            RArray[4] = '3:1';
            RArray[5] = shortRatio;
            return RArray;
        } else {
            RArray[0] = false;
            RArray[1] = ratio;
            RArray[2] = vordergrundHex;
            RArray[3] = hintergrundHex;
            RArray[4] = '3:1';
            RArray[5] = shortRatio;
            return RArray;
        }
    } else if ((schriftgroesse < 18) && (schriftGewichtung === '400')) { // braucht kontrast von 4.5:1
        if (ratio >= 4.5) {
            RArray[0] = true;
            RArray[1] = ratio;
            RArray[2] = vordergrundHex;
            RArray[3] = hintergrundHex;
            RArray[4] = '4.5:1';
            RArray[5] = shortRatio;
            return RArray;
        } else {
            RArray[0] = false;
            RArray[1] = ratio;
            RArray[2] = vordergrundHex;
            RArray[3] = hintergrundHex;
            RArray[4] = '4.5:1';
            RArray[5] = shortRatio;
            return RArray;
        }

    } else if ((schriftgroesse >= 18.5) && (schriftGewichtung === '400')) { // kontrast von 3:1 ausreichend
        if (ratio >= 3) {
            RArray[0] = true;
            RArray[1] = ratio;
            RArray[2] = vordergrundHex;
            RArray[3] = hintergrundHex;
            RArray[4] = '3:1';
            RArray[5] = shortRatio;
            return RArray;
        } else {
            RArray[0] = false;
            RArray[1] = ratio;
            RArray[2] = vordergrundHex;
            RArray[3] = hintergrundHex;
            RArray[4] = '3:1';
            RArray[5] = shortRatio;
            return RArray;
        }
    } else { // needs contrast of 4.5:1
        if (ratio >= 4.5) {
            RArray[0] = true;
            RArray[1] = ratio;
            RArray[2] = vordergrundHex;
            RArray[3] = hintergrundHex;
            RArray[4] = '4.5:1';
            RArray[5] = shortRatio;
            return RArray;
        } else {
            RArray[0] = false;
            RArray[1] = ratio;
            RArray[2] = vordergrundHex;
            RArray[3] = hintergrundHex;
            RArray[4] = '4.5:1';
            RArray[5] = shortRatio;
            return RArray;
        }
    }
}

function Luminescence(r, g, b) //neuere Definition nach wcag s. a. https://www.w3.org/WAI/GL/wiki/Relative_luminance
{
    let rs = r / 255;
    let gs = g / 255;
    let bs = b / 255;

    let R;
    let G;
    let B;

    if (rs <= 0.03928) {
        R = rs / 12.92;
    } else {
        R = ((rs + 0.055) / 1.055) ** 2.4;
    }

    if (gs <= 0.03928) {
        G = gs / 12.92;
    } else {
        G = ((gs + 0.055) / 1.055) ** 2.4;
    }

    if (bs <= 0.03928) {
        B = bs / 12.92;
    } else {
        B = ((bs + 0.055) / 1.055) ** 2.4;
    }

    let lumi = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    return lumi;
}

function RgbWerte(farbwert) {
    const rgbArray = farbwert.split(",");
    if (rgbArray[0].slice(3, 4) === 'a') {
        let r = rgbArray[0].slice(5),
            g = rgbArray[1].slice(1),
            b = rgbArray[2].slice(1);
        return [r, g, b];
    } else {
        let r = rgbArray[0].slice(4),
            g = rgbArray[1].slice(1),
            b = rgbArray[2].slice(1, rgbArray[2].length - 1);
        return [r, g, b];
    }

}

function RgbToHex(rf, gf, bf) { // Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')

    return rgbToHex(rf, gf, bf);
}

function contrast(vordergrundLumi, hintergrundLumi) {
    let ratio;

    if (vordergrundLumi >= hintergrundLumi) {
        ratio = (vordergrundLumi + 0.05) / (hintergrundLumi + 0.05);
    } else {
        ratio = (hintergrundLumi + 0.05) / (vordergrundLumi + 0.05);
    }

    if (ratio > 4.5) { //Nur die Farben nehmen bei denen die Ratio grösser als 4.5 ist
    }

    return ratio;
}

function CutRatio(r) {
    let backpart = 0;

    let frontPart = Math.trunc(r);
    let stringIt = r.toString();

    if (stringIt.indexOf(".") != -1) {
        let splittedPart = stringIt.split(".")[1];
        if (splittedPart.length > 2) {
            backpart = splittedPart.slice(0, 2);
        }
    }

    let shortedRatio = frontPart + '.' + backpart;
    return shortedRatio;
}

function isLinkHighlighted(schriftGewichtung, schriftStyle, schriftDecoration) {
    let result;
    let schriftDecorationL;

    if (schriftDecoration.indexOf(" ") != -1) {
        schriftDecorationL = schriftDecoration.split(" ")[0];
        if (schriftDecorationL == "underline" || schriftDecorationL == "none" || schriftDecorationL == "overline" || schriftDecorationL == "line-through" || schriftDecorationL == "initial" || schriftDecorationL == "inherit") {} else {
            schriftDecorationL = 'none';
        }
    }

    if ((schriftStyle === "normal") && (schriftGewichtung != 700) && (schriftDecorationL === "none")) { //Kontrast nicht ausreichend
        result = false;
    }


    if ((schriftStyle != "normal") || (schriftGewichtung >= 700) || (schriftDecorationL != "none")) { //Kontrast ausreichend
        result = true;
    }

    return result;
}

function invertColor(color) {
    // Parse the color string and extract the RGB components
    const r = color[0];
    const g = color[1];
    const b = color[2];

    // Calculate the inverted RGB components
    const invertedR = 255 - r;
    const invertedG = 255 - g;
    const invertedB = 255 - b;

    return 'rgb(' + invertedR + ', ' + invertedG + ', ' + invertedB + ')';
}

function Invertiert(element, schriftGewichtung, schriftgroesse) {

    let aktualBackground = window.getComputedStyle(element).getPropertyValue('background-color');
    let aktualColor = window.getComputedStyle(element).getPropertyValue('color');

    if (aktualBackground == "rgba(0, 0, 0, 0)") { // Defalt value. invertiert is a filter and shows the inverted color of im browser showed colors which is white
        aktualBackground = 'rgb(255, 255, 255)';
    }

    let rgbB = RgbWerte(aktualBackground);
    let invertedB = invertColor(rgbB);

    let rgbC = RgbWerte(aktualColor);
    let invertedC = invertColor(rgbC);

    let kontrastArray = [];
    kontrastArray[0] = kontrastAA(invertedC, invertedB, schriftGewichtung, schriftgroesse);

    return kontrastArray;
}

function AktualKontrast(element, schriftGewichtung, schriftgroesse) {
    //Farben der aktuellen Seite

    let aktualBackground = window.getComputedStyle(element).getPropertyValue('background-color');
    let aktualColor = window.getComputedStyle(element).getPropertyValue('color');

    if (aktualBackground == "rgba(0, 0, 0, 0)") { // Defalt Wert. But in Chrome and Edge the browser are showing an white background, not black, so we have to change the color to the correct value. Note: if the background is set to black, we would get 'rgb(0, 0, 0)'
        let pCol = parentColor(element);
        if (pCol === undefined) { // need this step because of inheritance
            aktualBackground = 'rgb(255, 255, 255)';
        } else {
            aktualBackground = pCol;
        }
    }
    let kontrastArray = [];
    kontrastArray[0] = kontrastAA(aktualColor, aktualBackground, schriftGewichtung, schriftgroesse);

    return kontrastArray;
}

function parentColor(element) {
    if (element.parentElement != null) {
        let p = element.parentElement;
        if (window.getComputedStyle(p).getPropertyValue('background-color') == "rgba(0, 0, 0, 0)") {
            parentColor(p);
        } else {
            let col = window.getComputedStyle(p).getPropertyValue('background-color');
            return col;
        }
    } else {
        let farbe = 'rgb(255, 255, 255)';
        return farbe;
    }

}

function AktualLinkKontrast(element, parent, schriftGewichtung, schriftgroesse) {
    //Farben der aktuellen Seite

    let aktualBackground = window.getComputedStyle(element).getPropertyValue('background-color');
    let aktualColor = window.getComputedStyle(element).getPropertyValue('color');
    let parentColor = window.getComputedStyle(parent).getPropertyValue('color'); // default ist "rgb(0, 0, 0)" -> Websites zeigen die Schrift auch schwarz an, der Wert kann also bleiben wie er ist

    let newLInkColorVisited = 'rgb(21, 233, 29)'; //Color for tests

    let chromeLink = 'rgb(0, 0, 238)';
    let rgbChrome = RgbWerte(chromeLink);
    let invertedChrome = invertColor(rgbChrome);
    let chromeVisited = 'rgb(85, 26, 139)';
    let rgbChromeV = RgbWerte(chromeVisited);
    let invertedChromev = invertColor(rgbChromeV);
    let safariLink = 'rgb(54, 78, 162)';
    let rgbSafari = RgbWerte(safariLink);
    let invertedSafari = invertColor(rgbSafari);
    let safariVisited = 'rgb(86, 44, 135)';
    let rgbSafariV = RgbWerte(safariVisited);
    let invertedSafariV = invertColor(rgbSafariV);
    let browser = "Tageslicht";
    let isDefault = false;
    let isVisited = false;

    let rgbB = RgbWerte(aktualBackground);
    let invertedB = invertColor(rgbB);

    let rgbC = RgbWerte(aktualColor);
    let invertedC = invertColor(rgbC);

    let rgbP = RgbWerte(parentColor);
    let invertedP = invertColor(rgbP);


    if (aktualBackground == "rgba(0, 0, 0, 0)") { // Defalt Wert. But in Chrome and Edge the browser are showing an white background, not black, so we have to change the color to the correct value. Note: if the background is set to black, we would get 'rgb(0, 0, 0)'
        aktualBackground = 'rgb(255, 255, 255)';
    }

    if (aktualColor == chromeLink) { // Windows Chrome/Edge & Android Chrome: defalt Value for Links and visited Links
        browser = "Chrome/Edge Windows/Android";
        isDefault = true;

        var css = 'a:visited {color:' + newLInkColorVisited + ';}';
        let aktualColorN = window.getComputedStyle(element).getPropertyValue('color');
        frame(document);

        function frame(d) {
            var style = d.createElement('style');
            style.className = 'wcagstyle';
            style.id = 'wcagstyle';
            styleContent = d.createTextNode(css);
            style.appendChild(styleContent);
            d.getElementsByTagName('body')[0].prepend(style);
            var elem = d.querySelectorAll('iframe,frame');
            for (var i = 0; i < elem.length; i++) {
                d = elem[i].contentWindow.document;
                frame(d);
            }
        }

        var css2 = 'a:visited {color:' + chromeVisited + ';}';
        frame(document);

        function frame(d) {
            var style = d.createElement('style');
            style.className = 'wcagstyle';
            style.id = 'wcagstyle';
            styleContent = d.createTextNode(css2);
            style.appendChild(styleContent);
            d.getElementsByTagName('body')[0].prepend(style);
            var elem = d.querySelectorAll('iframe,frame');
            for (var i = 0; i < elem.length; i++) {
                d = elem[i].contentWindow.document;
                frame(d);
            }
        }

        if (aktualColorN == 'rgb(21, 233, 29)') {
            isVisited = true;
            isDefault = false;
            aktualColor = colorVisited;
            bFarbe = 'rgb(21, 233, 29)';
        }
    }

    if (aktualColor == safariLink) { //Safari IOS and MacOs: defalt value for Links and visited Links
        browser = 'Safari Mac OS/iOS';
        isDefault = true;

        var css = 'a:visited {color:' + newLInkColorVisited + ';}';
        let aktualColorN = window.getComputedStyle(element).getPropertyValue('color');
        frame(document);

        function frame(d) {
            var style = d.createElement('style');
            style.className = 'wcagstyle';
            style.id = 'wcagstyle';
            styleContent = d.createTextNode(css);
            style.appendChild(styleContent);
            d.getElementsByTagName('body')[0].prepend(style);
            var elem = d.querySelectorAll('iframe,frame');
            for (var i = 0; i < elem.length; i++) {
                d = elem[i].contentWindow.document;
                frame(d);
            }
        }

        var css2 = 'a:visited {color:' + safariVisited + ';}';
        frame(document);

        function frame(d) {
            var style = d.createElement('style');
            style.className = 'wcagstyle';
            style.id = 'wcagstyle';
            styleContent = d.createTextNode(css2);
            style.appendChild(styleContent);
            d.getElementsByTagName('body')[0].prepend(style);
            var elem = d.querySelectorAll('iframe,frame');
            for (var i = 0; i < elem.length; i++) {
                d = elem[i].contentWindow.document;
                frame(d);
            }
        }

        if (aktualColorN == 'rgb(21, 233, 29)') {
            isVisited = true;
            aktualColor = colorVisited;
            isDefault = true;
            bFarbe = 'rgb(21, 233, 29)';
        }
    }


    let kontrastArray = [];
    kontrastArray[0] = kontrastAA(aktualColor, aktualBackground, schriftGewichtung, schriftgroesse);
    kontrastArray[1] = kontrastAA(aktualColor, parentColor, schriftGewichtung, schriftgroesse);
    kontrastArray[2] = kontrastAA(invertedC, invertedB, schriftGewichtung, schriftgroesse);
    kontrastArray[3] = kontrastAA(invertedC, invertedP, schriftGewichtung, schriftgroesse);
    // Für den aktuellen Kontrast kein visited, weil nicht bekannt, ob die aktuelle Farbe nicht bereits visited ist, bzw. was für eine Farbe für visited definiert worden ist
    kontrastArray[4] = browser;
    kontrastArray[5] = isDefault;
    kontrastArray[6] = isVisited;

    if (isDefault || isVisited) { //Weil dann vom Browser vorgegeben die Farben abweichen, wenn keine Farbe gesetzt wurde
        kontrastArray[7] = kontrastAA(chromeVisited, aktualBackground, schriftGewichtung, schriftgroesse);
        kontrastArray[8] = kontrastAA(chromeVisited, parentColor, schriftGewichtung, schriftgroesse);
        kontrastArray[9] = kontrastAA(invertedChromev, invertedB, schriftGewichtung, schriftgroesse);
        kontrastArray[10] = kontrastAA(invertedChromev, invertedP, schriftGewichtung, schriftgroesse);

        kontrastArray[11] = kontrastAA(chromeLink, aktualBackground, schriftGewichtung, schriftgroesse);
        kontrastArray[12] = kontrastAA(chromeLink, parentColor, schriftGewichtung, schriftgroesse);
        kontrastArray[13] = kontrastAA(invertedChrome, invertedB, schriftGewichtung, schriftgroesse);
        kontrastArray[14] = kontrastAA(invertedChrome, invertedP, schriftGewichtung, schriftgroesse);

        kontrastArray[23] = kontrastAA(safariVisited, aktualBackground, schriftGewichtung, schriftgroesse);
        kontrastArray[24] = kontrastAA(safariVisited, parentColor, schriftGewichtung, schriftgroesse);
        kontrastArray[25] = kontrastAA(invertedSafariV, invertedB, schriftGewichtung, schriftgroesse);
        kontrastArray[26] = kontrastAA(invertedSafariV, invertedP, schriftGewichtung, schriftgroesse);

        kontrastArray[27] = kontrastAA(safariLink, aktualBackground, schriftGewichtung, schriftgroesse);
        kontrastArray[28] = kontrastAA(safariLink, parentColor, schriftGewichtung, schriftgroesse);
        kontrastArray[29] = kontrastAA(invertedSafari, invertedB, schriftGewichtung, schriftgroesse);
        kontrastArray[30] = kontrastAA(invertedSafari, invertedP, schriftGewichtung, schriftgroesse);
    }
    return kontrastArray;
}

function WindowsChromeWasser(schriftGewichtung, schriftgroesse) {
    //Farben für Windows Chrome Wasser
    let newBackgroundColorCWa = 'rgb(32, 32, 32)';
    let newColorCWa = 'rgb(255, 255, 255)';
    let newLinkColorCWa = 'rgb(117, 230, 249)';
    let kontrastArray = [];
    kontrastArray[0] = kontrastAA(newColorCWa, newBackgroundColorCWa, schriftGewichtung, schriftgroesse);
    kontrastArray[1] = kontrastAA(newLinkColorCWa, newBackgroundColorCWa, schriftGewichtung, schriftgroesse);
    kontrastArray[2] = kontrastAA(newLinkColorCWa, newColorCWa, schriftGewichtung, schriftgroesse);

    return kontrastArray;
}

function WindowsChromeAbenddaemmerung(schriftGewichtung, schriftgroesse) {
    //Farben für Windows Chrome Abenddämmerung
    let newBackgroundColorCa = 'rgb(45, 50, 54)';
    let newColorCa = 'rgb(255, 255, 255)';
    let newLinkColorCa = 'rgb(112, 235, 222)';
    let kontrastArray = [];
    kontrastArray[0] = kontrastAA(newColorCa, newBackgroundColorCa, schriftGewichtung, schriftgroesse);
    kontrastArray[1] = kontrastAA(newLinkColorCa, newBackgroundColorCa, schriftGewichtung, schriftgroesse);
    kontrastArray[2] = kontrastAA(newLinkColorCa, newColorCa, schriftGewichtung, schriftgroesse);

    return kontrastArray;
}

function WindowsChromeNachthimmel(schriftGewichtung, schriftgroesse) {
    //Farben für Windows Chrome Nachthimmel
    let newBackgroundColorCn = 'rgb(0, 0, 0)';
    let newColorCn = 'rgb(255, 255, 255)';
    let newLinkColorCn = 'rgb(128, 128, 255)';
    let kontrastArray = [];
    kontrastArray[0] = kontrastAA(newColorCn, newBackgroundColorCn, schriftGewichtung, schriftgroesse);
    kontrastArray[1] = kontrastAA(newLinkColorCn, newBackgroundColorCn, schriftGewichtung, schriftgroesse);
    kontrastArray[2] = kontrastAA(newLinkColorCn, newColorCn, schriftGewichtung, schriftgroesse);

    return kontrastArray;
}

function WindowsChromeWueste(schriftGewichtung, schriftgroesse) {
    //Farben für Windows Chrome Wüste
    let newBackgroundColorCw = 'rgb(255, 250, 239)';
    let newColorCw = 'rgb(61, 61, 61)';
    let newLinkColorCw = 'rgb(28, 94, 117)';
    let kontrastArray = [];
    kontrastArray[0] = kontrastAA(newColorCw, newBackgroundColorCw, schriftGewichtung, schriftgroesse);
    kontrastArray[1] = kontrastAA(newLinkColorCw, newBackgroundColorCw, schriftGewichtung, schriftgroesse);
    kontrastArray[2] = kontrastAA(newLinkColorCw, newColorCw, schriftGewichtung, schriftgroesse);

    return kontrastArray;
}

function Fabangaben() {
    /*Elements for which no colours have been defined return a default value when queried, which does not have to match the colour that is displayed on the website. These default values are:  background-color: rgba(0, 0, 0, 0); color: rgb(0, 0, 0)
     To check whether the value that was queried is the default value or a set value, we set the colour values for textelements for the body element and the color values for the background in the html element. If the colour value for the element then changes, the previous value was a default value. (Can be reproduced using CSS Hierarchy). */

    let aktualBackground = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
    let aktualColor = window.getComputedStyle(document.body, null).getPropertyValue('color');

    let rgbBackground = RgbWerte(aktualBackground);
    let rgbColor = RgbWerte(aktualColor);

    let backgroundBlack;
    let colorBlack;

    /*Check background colour for default value */
    if (aktualBackground == "rgba(0, 0, 0, 0)") {
        backgroundBlack = true;
    } else {
        backgroundBlack = false;
        i = 0;
    }

    /*Check front colour for default value */
    if (aktualColor == "rgb(0, 0, 0)") {
        colorBlack = true;
    } else {
        colorBlack = false;
        i = 0;
    }

    let newBackgroundColor;
    let newColor;

    if (backgroundBlack) { //must only be checked if the background-color is rgba(0, 0, 0, 0) in all other cases the background-color ist set
        newBackgroundColor = 'rgb(153, 0, 76)';
    } else {
        newBackgroundColor = 'rgb(0, 0, 0)';
    }

    if (colorBlack) {
        newColor = 'rgb(255, 0, 76)';
    } else {
        newColor = 'rgb(0, 0, 0)';
    }

    //as a child element. The variables contain the respective colour values for the browser
    //set color in HTML but background-color must be set in body-Element to get the right results
    var css = 'body{background-color:' + newBackgroundColor + ';}'; //a {color:' + newLinkColor + ';} a:visited {color:' + newLInkColorVisited + ';}
    frame(document);

    function frame(d) {
        var style = d.createElement('style');
        style.className = 'wcagstyle';
        style.id = 'wcagstyle';
        styleContent = d.createTextNode(css);
        style.appendChild(styleContent);
        d.getElementsByTagName('body')[0].prepend(style);
        var elem = d.querySelectorAll('iframe,frame');
        for (var i = 0; i < elem.length; i++) {
            d = elem[i].contentWindow.document;
            frame(d);
        }
    }

    var css = 'html{color:' + newColor + ';}'; //a {color:' + newLinkColor + ';} a:visited {color:' + newLInkColorVisited + ';}
    frame(document);

    function frame(d) {
        var style = d.createElement('style');
        style.className = 'wcagstyle';
        styleContent = d.createTextNode(css);
        style.appendChild(styleContent);
        d.getElementsByTagName('html')[0].prepend(style);
        var elem = d.querySelectorAll('iframe,frame');
        for (var i = 0; i < elem.length; i++) {
            d = elem[i].contentWindow.document;
            frame(d);
        }
    }

    let newAktualBackground = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
    let newAktualColor = window.getComputedStyle(document.body, null).getPropertyValue('color');

    let newRgbBackground = RgbWerte(newAktualBackground);
    let newRgbColor = RgbWerte(newAktualColor);

    let sameBackground = true;
    let sameColor = true;
    if (backgroundBlack) {
        for (let i = newRgbBackground.length - 1; i >= 0; i--) {
            if (rgbBackground[i] != newRgbBackground[i]) {
                sameBackground = false;
                i = 0;
            }
        }
    }

    for (let i = newRgbColor.length - 1; i > 0; i--) {
        if (rgbColor[i] != newRgbColor[i]) {
            sameColor = false;
            i = 0;
        }
    }

    //Change values
    let aktualStyle1 = document.getElementsByClassName('wcagstyle')[1];
    aktualStyle1.innerHTML = 'body{background-color:' + aktualBackground + ';}';

    let aktualStyle2 = document.getElementsByClassName('wcagstyle')[0];
    aktualStyle2.innerHTML = 'html{color:' + aktualColor + ';}';
    var css = 'html{color:' + aktualColor + ';}';

    //are both colors set?
    let colorsSet;
    if (sameBackground && sameColor) {
        colorsSet = true;
    } else {
        colorsSet = false;
    }

    let summarize = [];
    summarize[0] = colorsSet;
    summarize[1] = sameBackground;
    summarize[2] = sameColor;
    return summarize;
}

function setTitle(ratioArray, kontrastmodiString) { // Function to set the title attribute for elements which are not links
    let title = "";
    if (!ratioArray[0][0]) {
        title = title + kontrastmodiString + ': Schrift ' + ratioArray[0][2] + ' auf Hintergrund' + ratioArray[0][3] + ' = ' + ratioArray[0][5] + ':1 (min. ' + ratioArray[0][4] + ')' + '\n';
    }
    return title;
}

function setTitleAktuellLink(ratioArray) { // Funktion to set the title attrobute for the aktual kontrast and inverted
    let title = "";

    if (!ratioArray[0][0]) { // aktuelle Farben Schrift zu Hintergrund
        title = title + ratioArray[4] + ' Tageslicht: Linkfarbe (' + ratioArray[0][2] + ' auf Hintergrund (' + ratioArray[0][3] + ') = ' + ratioArray[0][5] + ':1 (min. ' + ratioArray[0][4] + ')' + '\n';
    }
    if (!ratioArray[1][0]) { // aktuelle Farben Schrift zu umgebender Schrift
        title = title + ratioArray[4] + ' Tageslicht: Linkfarbe (' + ratioArray[1][2] + ') zu Schrift (' + ratioArray[1][3] + ') = ' + ratioArray[1][5] + ':1 (min. ' + ratioArray[1][4] + ')' + '\n';
    }
    if (!ratioArray[2][0]) { //invertierte Schriftfarbe zu invertiertem Hintergrund
        title = title + ratioArray[4] + ' invertiert: Linkfarbe (' + ratioArray[2][2] + ') auf invertieren Hintergrund (' + ratioArray[2][3] + ') = ' + ratioArray[2][5] + ':1 (min. ' + ratioArray[2][4] + ')' + '\n';
    }
    if (!ratioArray[3][0]) { // invertierte Schriftfarbe zur invertierten umgebender Schrift
        title = title + ratioArray[4] + ' invertiert: Linkfarbe (' + ratioArray[3][2] + ') zu invertierter Schrift (' + ratioArray[3][3] + ') = ' + ratioArray[3][5] + ':1 (min. ' + ratioArray[3][4] + ')' + '\n';
    }
    if (ratioArray[5][0] || ratioArray[6][0]) {
        if (!ratioArray[7][0]) { //visited Link Chrome zu Hintergrundfarbe
            title = title + 'Chrome/Edge Windows/Android' + ': Linkfarbe visited(' + ratioArray[7][2] + ') auf Hintergrund (' + ratioArray[7][3] + ') = ' + ratioArray[7][5] + ':1 (min. ' + ratioArray[7][4] + ')' + '\n';
        }
        if (!ratioArray[11][0]) { // Link Chrome zu Hintergrund
            title = title + 'Chrome/Edge Windows/Android' + ': Linkfarbe (' + ratioArray[7][2] + ') auf Hintergrund (' + ratioArray[7][3] + ') = ' + ratioArray[7][5] + ':1 (min. ' + ratioArray[7][4] + ')' + '\n';
        }
        if (!ratioArray[8][0]) { //visited Link Chrome zu umgebender Schriftfarbe
            title = title + 'Chrome/Edge Windows/Android' + ': Linkfarbe visited (' + ratioArray[8][2] + ') zu Schrift (' + ratioArray[8][3] + ') = ' + ratioArray[8][5] + ':1 (min. ' + ratioArray[8][4] + ')' + '\n';
        }
        if (!ratioArray[12][0]) { // Link Chrome zu umgebender Schriftfarbe
            title = title + 'Chrome/Edge Windows/Android' + ': Linkfarbe (' + ratioArray[8][2] + ') zu Schrift (' + ratioArray[8][3] + ') = ' + ratioArray[8][5] + ':1 (min. ' + ratioArray[8][4] + ')' + '\n';
        }
        if (!ratioArray[9][0]) { // invertierter Link visited Chrome zu invertiertem Hintergrund
            title = title + 'Chrome/Edge' + ': Linkfarbe visited invertiert (' + ratioArray[9][2] + ') auf invertierten Hintergrund (' + ratioArray[9][3] + ') = ' + ratioArray[9][5] + ':1 (min. ' + ratioArray[9][4] + ')' + '\n';
        }
        if (!ratioArray[13][0]) { // invertierter Chrome Link zu invertiertem Hintergrund
            title = title + 'Chrome/Edge' + ': Linkfarbe invertiert (' + ratioArray[9][2] + ') auf invertierten Hintergrund (' + ratioArray[9][3] + ') = ' + ratioArray[9][5] + ':1 (min. ' + ratioArray[9][4] + ')' + '\n';
        }
        if (!ratioArray[10][0]) { // invertierter Chrome Link visited zu invertierter Schrift
            title = title + 'Chrome/Edge' + ': Linkfarbe visited invertiert (' + ratioArray[10][2] + ') zu invertierter Schrift (' + ratioArray[10][3] + ') = ' + ratioArray[10][5] + ':1 (min. ' + ratioArray[10][4] + ')' + '\n';
        }
        if (!ratioArray[14][0]) { // invertierter Chrome Link zu invertierter Schrift
            title = title + 'Chrome/Edge' + ': Linkfarbe invertiert (' + ratioArray[10][2] + ') zu invertierter Schrift (' + ratioArray[10][3] + ') = ' + ratioArray[10][5] + ':1 (min. ' + ratioArray[10][4] + ')' + '\n';
        }
        if (!ratioArray[23][0]) { //Safari Link visited zu Hintergrundfarbe
            title = title + 'Safari Mac OS/iOS' + ': Linkfarbe visited (' + ratioArray[15][2] + ') auf Hintergrund (' + ratioArray[15][3] + ') = ' + ratioArray[15][5] + ':1 (min. ' + ratioArray[15][4] + ')' + '\n';
        }
        if (!ratioArray[27][0]) { // Safari Link auf Hintergrundfarbe
            title = title + 'Safari Mac OS/iOS' + ': Linkfarbe (' + ratioArray[15][2] + ') auf Hintergrund (' + ratioArray[15][3] + ') = ' + ratioArray[15][5] + ':1 (min. ' + ratioArray[15][4] + ')' + '\n';
        }
        if (!ratioArray[24][0]) { //Safari Link visite zu Schriftfarbe
            title = title + 'Safari Mac OS/iOS' + ': Linkfarbe visited (' + ratioArray[16][2] + ') zu Schrift (' + ratioArray[16][3] + ') = ' + ratioArray[16][5] + ':1 (min. ' + ratioArray[16][4] + ')' + '\n';
        }
        if (!ratioArray[28][0]) { // Safari Link zu Schriftfarbe
            title = title + 'Safari Mac OS/iOS' + ': Linkfarbe (' + ratioArray[16][2] + ') zu Schrift (' + ratioArray[16][3] + ') = ' + ratioArray[16][5] + ':1 (min. ' + ratioArray[16][4] + ')' + '\n';
        }
        if (!ratioArray[25][0]) { // Safari Link visited invertiert zu invertiertem Hintergrund
            title = title + 'Safari' + ': Linkfarbe visited invertiert(' + ratioArray[17][2] + ') auf invertierten Hintergrund (' + ratioArray[17][3] + ') = ' + ratioArray[17][5] + ':1 (min. ' + ratioArray[17][4] + ')' + '\n';
        }
        if (!ratioArray[29][0]) { // Safari Link invertiert zu invertieretem Hintergrund
            title = title + 'Safari' + ': Linkfarbe invertiert (' + ratioArray[17][2] + ') auf invertierten Hintergrund (' + ratioArray[17][3] + ') = ' + ratioArray[17][5] + ':1 (min. ' + ratioArray[17][4] + ')' + '\n';
        }
        if (!ratioArray[26][0]) { // Safari Link visited invertiert zu invertierter Schriftfarbe
            title = title + 'Safari' + ': Linkfarbe visited invertiert (' + ratioArray[18][2] + ') zu invertierter Schrift (' + ratioArray[18][3] + ') = ' + ratioArray[18][5] + ':1 (min. ' + ratioArray[18][4] + ')' + '\n';
        }
        if (!ratioArray[30][0]) { // Safari Link invertiert zu invertierter Schrift
            title = title + 'Safari' + ': Linkfarbe invertiert (' + ratioArray[18][2] + ') zu invertierter Schrift (' + ratioArray[18][3] + ') = ' + ratioArray[18][5] + ':1 (min. ' + ratioArray[18][4] + ')' + '\n';
        }
    }

    return title;
}

function setTitleLink(ratioArray, kontrastmodiString) { // Function to set the title attribute for links
    let title = "";
    if (ratioArray.length > 3) { // Firefox hat für visited andere Farben

        if (!ratioArray[1][0]) { // Linkfarbe zu Hintergrund
            title = title + kontrastmodiString + ': Linkfarbe (' + ratioArray[0][2] + ') auf Hintergrund (' + ratioArray[1][3] + ') = ' + ratioArray[1][5] + ':1 (min. ' + ratioArray[1][4] + ')' + '\n';
        }
        if (!ratioArray[2][0]) { // Linkfarbe zu Schriftfarbe umgebend
            title = title + kontrastmodiString + ': Linkfarbe (' + ratioArray[1][2] + ') zu Schrift (' + ratioArray[2][3] + ') = ' + ratioArray[2][5] + ':1 (min. ' + ratioArray[2][4] + ')' + '\n';
        }

        if (!ratioArray[3][0]) { // Linkfarbe visited zu Hintergrund
            title = title + kontrastmodiString + ': Linkfarbe visited (' + ratioArray[2][2] + ') auf Hintergrund (' + ratioArray[3][3] + ') = ' + ratioArray[3][5] + ':1 (min. ' + ratioArray[3][4] + ')' + '\n';
        }
        if (!ratioArray[4][0]) { // Linkfarbe visited zu Schriftfarbe
            title = title + kontrastmodiString + ': Linkfarbe  visited (' + ratioArray[3][2] + ') zu Schrift (' + ratioArray[4][3] + ') = ' + ratioArray[4][5] + ':1 (min. ' + ratioArray[4][4] + ')' + '\n';
        }

    } else {

        if (!ratioArray[1][0]) { // Linkfarbe zu Hintergrund
            title = title + kontrastmodiString + ': Linkfarbe (' + ratioArray[1][2] + ') auf Hintergrund' + ratioArray[1][3] + ') = ' + ratioArray[1][5] + ':1 (min. ' + ratioArray[1][4] + ')' + '\n';
        }
        if (!ratioArray[2][0]) { // Linkfarbe zu Schriftfarbe
            title = title + kontrastmodiString + ': Linkfarbe (' + ratioArray[2][2] + ') zu Schrift (' + ratioArray[2][3] + ') = ' + ratioArray[2][5] + ':1 (min. ' + ratioArray[2][4] + ')' + '\n';
        }
    }
    return title;
}

function setTitleF(bodyColor) { // Function to set the title for alert

    let title = "";
    if (bodyColor[0] == false) {
        if (bodyColor[1] == false) {
            title = title + 'Achtung keine Background-color für die Website (body) gesetzt. ' + '\n';
        }
        if (bodyColor[2] == false) {
            title = title + 'Achtung keine Color für die Website (html) gesetzt.' + '\n';
        }
        alert(title);
    }
}