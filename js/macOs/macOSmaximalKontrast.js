(function () {
    console.log("bookmarklet starting");

    // Farben Mac OS Tageslicht
    let newBackgroundColor = 'rgb(255, 255, 255)';
    let newColor = 'rgb(0, 0, 0)';
    let newLinkColor = 'rgb(54, 78, 162)';
    let newLInkColorVisited = 'rgb(86, 44, 135)';
    const RGBToHSL = (r, g, b) => { //von https://www.30secondsofcode.org/js/s/rgb-to-hsl/
        r /= 255;
        g /= 255;
        b /= 255;
        const l = Math.max(r, g, b);
        const s = l - Math.min(r, g, b);
        const h = s ?
            l === r ?
            (g - b) / s :
            l === g ?
            2 + (b - r) / s :
            4 + (r - g) / s :
            0;
        return [
            60 * h < 0 ? 60 * h + 360 : 60 * h,
            100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
            (100 * (2 * l - s)) / 2,
        ];
        //return[ h*100, s*100, l*100]
    };

    var css = 'body{background-color:' + newBackgroundColor + ';color:' + newColor + ';}a {color:' + newLinkColor + ';} a:visited {color:' + newLInkColorVisited + ';}';
    frame(document);

    function frame(d) {
        var style = d.createElement('style');
        style.className = 'wcagstyle';
        styleContent = d.createTextNode(css);
        style.appendChild(styleContent);
        d.getElementsByTagName('body')[0].prepend(style);
        var elem = d.querySelectorAll('iframe,frame');
        for (var i = 0; i < elem.length; i++) {
            d = elem[i].contentWindow.document;
            frame(d);
        }
    }

    var inputs = document.querySelectorAll('*');
    for (let a = 0; a < inputs.length; a++) {

        let aktualBackgroundC = window.getComputedStyle(inputs[a]).getPropertyValue('background-color');
        let aktualColor = window.getComputedStyle(inputs[a]).getPropertyValue('background-color');
        let rgbBColor = RgbWerte(aktualBackgroundC);
        let rgbColor = RgbWerte(aktualColor);

        let RB = rgbBColor[0];
        let GB = rgbBColor[1];
        let BB = rgbBColor[2];

        let hslBColor = RGBToHSL(RB, GB, BB);

        let RC = rgbColor[0];
        let GC = rgbColor[1];
        let BC = rgbColor[2];

        let hslColor = RGBToHSL(RC, GC, BC);

        //console.log("R "+R);console.log("G "+G);console.log("B "+B);
        //let brightness = (299*R + 587*G + 114*B) / 1000;
        //console.log("brightness "+brightness);

        let colorF = 'filter: contrast(10000%)';
        //let colorF = 'filter: contrast(200%)';
        //let colorF = 'filter: contrast(2)';
        inputs[a].style = colorF;
        //console.log("hsl " + hslBColor[0], hslBColor[1], hslBColor[2]);
        if(hslBColor[2]>50 && hslBColor[2]<100){
            inputs[a].style['background'] = 'hsl('+hslBColor[0]+' '+hslBColor[1]+'% '+'100%)';
        }else if(hslBColor[2]<50 && hslBColor[2]>0){
            inputs[a].style['background'] = 'hsl('+hslBColor[0]+' '+hslBColor[1]+'% '+'0%)';
        }else if(hslBColor[2]==50){
            inputs[a].style['background'] = 'hsl('+hslBColor[0]+' '+hslBColor[1]+'% '+'74%)';
        }

        /*if(hslColor[2]>50 && hslColor[2]<100){
            inputs[a].style['background'] = 'hsl('+hslColor[0]+' '+hslColor[1]+'% '+'100%)';
        }else if(hslColor[2]<50 && hslColor[2]>0){
            inputs[a].style['background'] = 'hsl('+hslColor[0]+' '+hslColor[1]+'% '+'0%)';
        }else if(hslColor[2]==50){
            inputs[a].style['background'] = 'hsl('+hslColor[0]+' '+hslColor[1]+'% '+'84%)';
        }*/

        /*let hsvBColor = rgbToHsv(R, G, B);
        console.log("hsv " + hsvBColor[0], hsvBColor[1], hsvBColor[2]);
        if (hsvBColor[1] > 50) {
            console.log(">50 " + hsvBColor[1]);
            //hsvBColor[1] = hsvBColor[1]*90%;
            hsvBColor[1] = 0;
        }
        if (hsvBColor[1] < 50) {
            console.log("<50 " + hsvBColor[1]);
            hsvBColor[1] = 0;
        }
        console.log('hsv(' + hsvBColor[0] + ' ' + hsvBColor[1] + ' ' + hsvBColor[2] + ')');
        let newBColorRGB = HSVtoRGB(hsvBColor[0]/100, hsvBColor[1]/100, hsvBColor[2]/100);

        console.log('rgb('+newBColorRGB[0] + ', ' +newBColorRGB[1] + ', ' +newBColorRGB[2]+ ')');
        inputs[a].style['background-color'] = 'rgb('+newBColorRGB[0] + ', ' +newBColorRGB[1] + ', ' +newBColorRGB[2]+ ')';
*/
    }



})();

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

function rgbToHsv(r, g, b) {//https://en.meramukoding.com/js-converting-rgb-colorspace-to-hsv/

    var h;
    var s;
    var v;

    var maxColor = Math.max(r, g, b);
    var minColor = Math.min(r, g, b);
    var delta = maxColor - minColor;

    // Calculate hue
    // To simplify the formula, we use 0-6 range.
    if (delta == 0) {
        h = 0;
    } else if (r == maxColor) {
        h = (6 + (g - b) / delta) % 6;
    } else if (g == maxColor) {
        h = 2 + (b - r) / delta;
    } else if (b == maxColor) {
        h = 4 + (r - g) / delta;
    } else {
        h = 0;
    }
    // Then adjust the range to be 0-1
    h = h / 6;

    // Calculate saturation
    if (maxColor != 0) {
        s = delta / maxColor;
    } else {
        s = 0;
    }

    // Calculate value
    v = maxColor / 255;

    return [h * 100, s * 100, v * 100];
}

function HSVtoRGB(h, s, v) { //https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}