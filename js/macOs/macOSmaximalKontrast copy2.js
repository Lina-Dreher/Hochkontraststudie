(function () {
  console.log("bookmarklet starting");

  // Neue Farben Mac OS Tageslicht
  let newBackgroundColor = 'rgb(255, 255, 255)';
  let newColor = 'rgb(0, 0, 0)';
  let newLinkColor = 'rgb(54, 78, 162)';
  let newLinkColorVisited = 'rgb(86, 44, 135)';

  const RGBToHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    let h = 0;
    switch (max) {
      case r:
        h = (g - b) / (max - min);
        break;
      case g:
        h = 2 + (b - r) / (max - min);
        break;
      case b:
        h = 4 + (r - g) / (max - min);
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
    return [h, s * 100, l * 100];
  };

  var css = 'body{background-color:' + newBackgroundColor + ';color:' + newColor + ';}a {color:' + newLinkColor + ';} a:visited {color:' + newLinkColorVisited + ';}';
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

    var inputs = d.querySelectorAll('*');
    for (let a = 0; a < inputs.length; a++) {
      let aktualBackgroundC = window.getComputedStyle(inputs[a]).getPropertyValue('background-color');
      let rgbColor = RgbWerte(aktualBackgroundC);
      let R = rgbColor[0];
      let G = rgbColor[1];
      let B = rgbColor[2];
      let hsl = RGBToHSL(R, G, B);

      let colorF = 'filter: contrast(2)';
      inputs[a].style = colorF;

      if (R === 0 && G === 255 && B === 255) {
        inputs[a].style['background'] = 'hsl(' + hsl[0] + ' ' + hsl[1] + '% 100%)';
      } else if (R === 0 && G === 128 && B === 0) {
        inputs[a].style['background'] = 'hsl(' + hsl[0] + ' ' + hsl[1] + '% 0%)';
      }
    }
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