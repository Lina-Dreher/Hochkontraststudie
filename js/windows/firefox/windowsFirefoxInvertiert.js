(function () {
    console.log("bookmarklet starting");
        //neue Farben
        let newBackgroundColor = 'rgb(255, 255, 255)';
        let newColor = 'rgb(0, 0, 0)';
        let newLinkColor = 'rgb(0, 102, 204)';
        let newLInkColorVisited ='rgb(46, 0, 64)';
    
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
    
        invertiert(document);
        function invertiert(document){
        // the css we are going to inject
        var css = "html {-webkit-filter: invert(100%);" +
        "-moz-filter: invert(100%);" +
        "-o-filter: invert(100%);" +
        "-ms-filter: invert(100%); }",
        
        head = document.getElementsByTagName("head")[0],
        style = document.createElement("style");
        
        // a hack, so you can "invert back" clicking the bookmarklet again
        if (!window.counter) { window.counter = 1;} else  { window.counter ++;
        if (window.counter % 2 == 0) { var css ="html {-webkit-filter: invert(0%); -moz-filter:    invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }"}
        };
        
        style.type = "text/css";
        if (style.styleSheet){
        style.styleSheet.cssText = css;
        } else {
        style.appendChild(document.createTextNode(css));
        }
        
        //injecting the css to the head
        head.appendChild(style);
    }

})();