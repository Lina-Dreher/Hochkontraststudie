(function () {
    console.log("bookmarklet starting");

    //neue Farben
    let newBackgroundColor = 'rgb(32, 32, 32)';
    let newColor = 'rgb(255, 255, 255)';
    let newLinkColor = 'rgb(117, 230, 249)';

    let body = document.getElementsByTagName('body');
    let elements = document.querySelectorAll('*');

    const bg = {
        background: newBackgroundColor
    }

    body[0].style['background-color'] = newBackgroundColor; // Body Hintergrund setzen

    for (let a = 0; a < elements.length; a++) {
        //console.log(elements[a]);

        if (window.getComputedStyle(elements[a]).backgroundColor !== 'rgba(0, 0, 0, 0)') { // Wenn Wert auf rgba(0, 0, 0, 0) wurde keiner im CSS gesetzt (Ausgebe in Chrome standardmäßig weiß) -> Aktuell Problem, falls Hintergrundfarbe der Website schwarz ist

            let rgba = getStyle(elements[a], 'background-color');
            if (rgba[3] == 'a') { // Abfrage, ob eine Transparenz gesetzt wurde
                if (window.getComputedStyle(elements[a]).backgroundColor == 'rgba(0, 0, 0, 0)') { // Wenn Wert auf rgba(0, 0, 0, 0) wurde keiner im CSS gesetzt (Ausgebe in Chrome standardmäßig weiß) -> Aktuell Problem, falls Hintergrundfarbe der Website schwarz ist
                    elements[a].style['background-color'] = newBackgroundColor;

                } else {
                    let transparenz = rgba.slice((rgba.length - 4), (rgba.length - 1));
                    let rgbaTransparenz = newBackgroundColor.slice(0, (newBackgroundColor.length - 1));
                    let transparenzElement = rgbaTransparenz + ',' + transparenz + ')';
                    elements[a].style['background-color'] = transparenzElement;

                }
            } else {
                elements[a].style['background-color'] = newBackgroundColor;
            }

        } else {
            if (elements[a].nodeName === "IMG") {
              console.log("is an IMG");
            } else {
              if (elements[a].children.length > 0) {
                const childE = elements[a].children;
                let hasIMG = false;
                for (let i = 0; i < childE.length; i++) {
                  if (childE[i].nodeName === "IMG") {
                    console.log(childE[i].nodeName);
                    hasIMG = true;
                    i = childE.length;
                  } else {
                    console.log(childE[i].nodeName);
                    i++;
                  }
                }
                if (hasIMG) {
                  console.log("has IMG Child Nodes");
                } else {
                  console.log("has no IMG Child Nodes");
                  elements[a].style['background-color'] = newBackgroundColor;
                }
              } else {
                console.log("has No Child Nodes");
                elements[a].style['background-color'] = newBackgroundColor;
              }
            }
          }

        //console.log( window.getComputedStyle(elements[a], ':after').getPropertyValue('background'));
        //console.log( window.getComputedStyle(elements[a], ':before').getPropertyValue('background'));
        let additionB =window.getComputedStyle(elements[a], ':before').getPropertyValue('background');
        let additionA =window.getComputedStyle(elements[a], ':after').getPropertyValue('background');

        if(additionB !== 'rgba(0, 0, 0, 0)'){
            //additionA
            var styleElem = elements[a].appendChild(document.createElement("style"));
            styleElem.innerHTML = "#theDiv:before {background: black !important;}";
            elements[a].appendChild(styleElem);
            //console.log("styleElem.innerHTML "+styleElem.innerHTML);
        }

        if(additionA !== 'rgba(0, 0, 0, 0)'){
            //additionA
            var styleElem = elements[a].appendChild(document.createElement("style"));
            styleElem.innerHTML = "#theDiv:after {background: black !important;}";
            elements[a].appendChild(styleElem);
            //console.log("styleElem.innerHTML "+styleElem.innerHTML);
        }


        if (elements[a].nodeName === 'A') { // Abfrage ob das Element ein Link ist
            elements[a].style['color'] = newLinkColor;
            elements[a].style.borderColor = newLinkColor;
        } else {
            elements[a].style['color'] = newColor;
            elements[a].style.borderColor = newColor;
        }

        if (window.getComputedStyle(elements[a]).background !== 'rgba(0, 0, 0, 0)') { //Enthält auch Module mit Bildern als Background | rgba(0, 0, 0, 0) ist der Defaultwert

            if (window.getComputedStyle(elements[a]).background.indexOf('repeating-linear-gradient') != -1) { //Pattern entfernen

                elements[a].style['background'] = newBackgroundColor;
            }

        }

        if (elements[a].querySelectorAll(":hover")) {

            elements[a].classList.remove("hover");
        }

    }

    let elementsSecond = elements;
    for (let b = 0; b < elementsSecond.length; b++) {
        if (elementsSecond[b].nodeName === 'A') {
            elementsSecond[b].style['color'] = newLinkColor;
            elementsSecond[b].style.borderColor = newLinkColor;
            if (elementsSecond[b].childNodes.length > 0) {
                let divChildNodes = elementsSecond[b].childNodes;
                for (let j = 0; j < divChildNodes.length; j++) {
                    if (divChildNodes[j].nodeType === Node.ELEMENT_NODE) {
                        divChildNodes[j].style['color'] = newLinkColor;
                        searchChildNodes(divChildNodes[j], newLinkColor); // Call the function on each child node
                    }
                }
            }

        }
    }

    for (let a = 0; a < elements.length; a++) {
        let divChildNodes = elements[a].childNodes;

        for (let j = 0; j < divChildNodes.length; j++) {
            let mElements = []; // array to store newly created "m" elements

            if (divChildNodes[j].nodeName == '#text') {

                let textV = divChildNodes[j].textContent;
                let textNeu = textV.split('\n');
                let stringA = '';

                for (let i = 0; i < textNeu.length; i++) {
                    let w = leerzeichen(textNeu[i]);
                    stringA = stringA + w;
                }

                let emptyStringA = false;
                if (stringA == " " || stringA == "") {
                    emptyStringA = true;
                }

                let leer = true;
                for (let i = 0; i < divChildNodes[j].textContent.length; i++) {
                    if (divChildNodes[j].textContent[i] == " " || divChildNodes[j].textContent[i] == "") {} else {
                        leer = false;
                        i = divChildNodes[j].textContent.length;
                    }
                }

                if (!leer && !emptyStringA) {
                    let parent = divChildNodes[j].parentElement;
                    let childColor = parent.style.color;
                    let m = document.createElement("m");
                    m.innerText = stringA;
                    Object.assign(m.style, {
                        color: childColor
                    }, bg);
                    mElements.push({
                        element: m,
                        index: j
                    }); // add newly created "m" element to the array and give him the index

                    let textNodeIndex = mElements.findIndex((el) => el.index === j);
                    let textContentM = mElements[textNodeIndex].element.textContent;
                    let proof = false;
                    for (let a = 0; a < textContentM.length; a++) {
                        if (textContentM[a] != " ") {
                            proof = true;
                        }
                    }
                    if (proof) {
                        parent.replaceChild(mElements[textNodeIndex].element, divChildNodes[j]);
                    }
                }

            }

        }
    }



})();

function getStyle(element, strCssRule) { // gibt einen String mit rgb-Wert zurück
    var strValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
        strValue = document.defaultView.getComputedStyle(element, "").getPropertyValue(strCssRule);
    }
    return strValue;
}

function leerzeichen(textNeu) {
    let t = 0;
    const sarray = [];
    const orginalW = [];

    while (t < textNeu.length) {

        if ((textNeu[t] === ' ')) {

            sarray.push(t);

            if (t == (sarray[t - 1]) + 1) {

            } else {

                orginalW.push(textNeu[t]);

            }
        } else {

            orginalW.push(textNeu[t]);

        }

        t++;

    }
    let ra = '';

    for (let i = 0; i < orginalW.length; i++) {

        ra = ra + orginalW[i];
    }
    return ra;
}

function searchChildNodes(element, newLinkColor) {
    if (element.childNodes.length > 0) {
        let childNodes = element.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
                childNodes[i].style['color'] = newLinkColor;
                searchChildNodes(childNodes[i], newLinkColor); // Recursively call the function on the child node
            }
        }
    }
}