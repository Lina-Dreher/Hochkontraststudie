(function () {
    console.log("bookmarklet starting");
    //In Firefox bleiben die gesetzten Farben, Elemente die keine eigene Farbdefinition haben bekommen druch das Bookmarklet ein Style-Element mit den neuen Farben.
    /*Elements for which no colours have been defined return a default value when queried, which does not have to match the colour that is displayed on the website. These default values are:  background-color: rgba(0, 0, 0, 0); color: rgb(0, 0, 0)
    To check whether the value that was queried is the default value or a set value, we set the colour values for textelements for the body element and the color values for the background in the html element. If the colour value for the element then changes, the previous value was a default value. (Can be reproduced using CSS Hierarchy). */
    
    //aktual colors
    let aktualBackground = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
    let aktualColor = window.getComputedStyle(document.body, null).getPropertyValue('color');

    //neue Farben
    let newBackgroundColorW = 'rgb(32, 32, 32)';
    let newColorW = 'rgb(255, 255, 255)';


    let firefoxFarben = TestColors();

        if (firefoxFarben[1] == true) {
            newBackgroundColorW = aktualBackground;
        }
        if (firefoxFarben[2] == true) {
            newColorW = aktualColor;
        }
    
    //als Child-Element hinzu. Dabei beinhalten die Variablen die jeweiligen Farbwerte für den Browser

    var css = 'body{background-color:' + newBackgroundColorW + ';color:' + newColorW + ';}';
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

    setLinkfarben();

})();

function TestColors() {
    //aktual colors
    let aktualBackground = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
    let aktualColor = window.getComputedStyle(document.body, null).getPropertyValue('color');

    let rgbBackground = RgbWerte(aktualBackground);
    let rgbColor = RgbWerte(aktualColor);

    let backgroundBlack;
    let colorBlack;

    /*Background-color auf Standardwert überprüfen */
    if (aktualBackground == "rgba(0, 0, 0, 0)") {
        backgroundBlack = true;
    } else {
        backgroundBlack = false;
    }

    /*color auf Standardwert überprüfen */
    if (aktualColor == "rgb(0, 0, 0)") {
        colorBlack = true;
    } else {
        colorBlack = false;
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

    //als Child-Element hinzu. Dabei beinhalten die Variablen die jeweiligen Farbwerte für den Browser  
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

function setLinkfarben(){
    let newLinkColor = 'rgb(117, 233, 252)';
    let newLInkColorVisited = 'rgb(144, 255, 144)';

    var css = 'a {color:' + newLinkColor + ';} a:visited {color:' + newLInkColorVisited + ';}}';
    frame(document);

    function frame(d) {
        var style = d.createElement('style');
        style.className = 'wcagstyle';
        style.id = 'wcagstyle';
        styleContent = d.createTextNode(css);
        style.appendChild(styleContent);
        d.getElementsByTagName('html')[0].prepend(style);
        var elem = d.querySelectorAll('iframe,frame');
        for (var i = 0; i < elem.length; i++) {
            d = elem[i].contentWindow.document;
            frame(d);
        }
    }
}