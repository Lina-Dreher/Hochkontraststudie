(function () {
    console.log("bookmarklet starting");
    //Das Bookmarklet Tageslichtmodus zeigt die Seite genauso, wie sie ist, wenn man sie ohne weitere Kontrasteinstelllungen im entsprechenden Webbrowser öffnen würde. Es ist die gleiche Darstellung, die man auch im Dunkelmodus erhält.
    //Dafür setzt das Bookmarklet im Body-Element ein Style-Element mit den Angaben:
    
    //neue Farben mit Color Contrast Picker von Screenshot genommen (Genauigkeit leider nicht 100%)
    let newBackgroundColor = 'rgb(255, 255, 255)';
    let newColor = 'rgb(0, 0, 0)';
    let newLinkColor = 'rgb(0, 0, 238)';
    let newLInkColorVisited ='rgb(85, 26, 139)';

    //als Child-Element hinzu. Dabei beinhalten die Variablen die jeweiligen Farbwerte für den Browser

    var css = 'body{background-color:'+newBackgroundColor+';color:'+newColor+';}a {color:'+newLinkColor+';} a:visited {color:'+newLInkColorVisited+';}';
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
})();