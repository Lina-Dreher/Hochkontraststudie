# Hochkontraststudie
Die Testwebsite wurde im Rahmen der Bachelorarbeit Hochkontrast-Modi im Web - Analyse und Entwiclung von Simulationswerkzeugen zur UNerstützung von Barrierefreiheitsprüfungen erstellt.

Sie dient zum Demonstrieren der Auswirkungen von Kontrastmodi in verschiedenen Webbrowsern und Betriebssystemen. 

Auch das bereits existierende Bookmarklet Vorder- und Hintergrundfarbe definiert und die später selbst entwickelten Bookmarklets werden an der Testwebsite getestet und validiert.

## Getting started
Folgende Voraussetzungen müssen erfüllt sein, damit das Projekt auf dem PC läuft:
- Git muss installiert sein
- Am besten Visual Studio Code installierten

Jetzt kann das Projekt aus GitLab geklont werden (am besten per Visual Studio Code öffnen)

Die Seite kann über den VS Code Server oder per locallhost geöffnet werden.
Die Bookmarklets funktionieren nur über localhost.

## Installation
 Projket Gitlab: https://gitlab.mi.hdm-stuttgart.de/ld038/hochkontraststudie

```
cd existing_repo
git remote add origin https://gitlab.mi.hdm-stuttgart.de/ld038/hochkontraststudie.git
git branch -M main
git push -uf origin main
```

# Projektinformationen
Jede HTML-Seite hat eine andere Definition der Vorder- und Hintergrundfarben im Body. Für eine möglichst gute Vergleichbarkeit sind die Elemente aller Seiten immer in derselben Reihenfolge aufgebaut. Außerdem haben die Elemente jeweils auch unterschiedliche Angaben zu Vorder-, Hintergrundfarben und Transparenzen. 

Somit ist eine möglichst breite Kombination von Vorder- Hintergrundfarben definiert, an der Kontrastmodi und Bookmarklets getestet werden können. 

Auf den Seiten ist jeweils beschrieben, wie der Body definiert ist.

Zudem gibt es eine HTML-Seite mit Bookmarklets, die die Kontrastmodi aus dem Windowssystem für die Browser Chrome, Firefox und Edge simulieren.

Wichtig: um die Bookmarklets nutzen zu können muss XAMPP oder MAMP gestartet werden!!

# Die Webseiten
## BackgroundclorColor
Hier ist die für den Body die Background-color (Hintergrundfarbe) und die Color (Schriftfarbe) definiert.

## BackgroundColor
Hier ist die für den Body der Background (Hintergrundfarbe veraltet) und die Color (Schriftfarbe) definiert.

## Color
Hier ist die für den Body die Color (Schriftfarbe) definiert.

## Undefined
Hier ist weder die für den Body die Background-color (Hintergrundfarbe) noch die Color (Schriftfarbe) definiert.

## Background
Hier ist die für den Body der Background (Hintergrundfarbe veraltet) definiert.

## BackgroundAndColor
Hier ist die für den Body der Background (Hintergrundfarbe veraltet) und die Color definiert.

### Module
Die Seiten sind in sechs nummerierte Abschnitte aufgeteilt, welche als Module bezeichnet werden. Module umschließen immer dieselben Elemente, haben dabei aber jeweils unterschiedliche Eigenschaften in den Angaben zu Vorder- und Hintergrundfarben.

Die Elemente selbst in den Modulen haben auch verschiedene Eigenschaften. Jedes Modul hat eine beschreibende H2-Überschrift. 

Damit die Seiten gut vergleichbar sind, wurden die Module mit ihren Elementen auf allen Seiten immer gleich aufgebaut. 

- Modul 1: Bringt keine eigenen Eigenschaften mit. Hier wird gezeigt, wie die Elemente mit den im Body definierten Eigenschaften korrelieren

- Modul 2: Hat selbst eine Background-color (Hintergrundfarbe) definiert. Hier wird gezeigt, wie die Elemente mit den im Body definierten Eigenschaften und der im Modul definierten Background-color korrelieren

- Modul 3: Hat selbst eine Background (Hintergrundfarbe veraltet) definiert. Hier wird gezeigt, wie die Elemente mit den im Body definierten Eigenschaften und der im Modul definierten Background korrelieren

- Modul 4: Hat selbst ein Background-img (Hintergrundbild) definiert. Hier wird gezeigt, wie die Elemente mit den im Body definierten Eigenschaften und dem im Modul definierten Background-img korrelieren

- Modul 5: Hat selbst ein Image als Background (Hintergrundbild veraltet) definiert. Hier wird gezeigt, wie die Elemente mit den im Body definierten Eigenschaften und dem im Modul definierten Image als Background korrelieren

- Modul 6: Ein Bild als img-Element bildet den Hintergrund und ist mit Bildbeschriftungselementen (den Elementen mit verschiedenen Eigenschaften) versehen. Hier bestehet die Ausnahme, dass immer nur bis zu zwei Elemente pro Bildelement gesetzt ist. Ein div-Element umschließt aber auch hier alle anderen

### Elemente
- Element 1: Textelement ohne Eigenschaften
- Element 2: Color definiert aktuelles div
- Element 3: Background-color im aktuellen Element
- Element 4: Background-color und Color im aktuellen Element definiert
- Element 5: Background statt Background-color im aktuellen Element gesetzt
- Element 6: Background statt Background-color und Color im aktuellen Element definiert
- Element 7: Transparenz Color für aktuelles Element definiert
- Element 8: Transparenz Background-color für aktuelles Element definiert
- Element 9: Transparenz Background-color und Color im aktuellen Element definiert
- Element 10: Transparenz Background im aktuelles Element
- Element 11: Transparenz Background und Color im aktuellen Element definiert
- Element 12: Transparenz Color HSLA für aktuelles Element definiert
- Element 13: Transparenz Background-color HSLA für aktuelles Element definiert
- Element 14: Transparenz Background-color HSLA und Color für aktuelles Element definiert
- Element 15: Transparenz Background HSLA für aktuelles Element definiert
- Element 16: Transparenz Background HSLA und Color für aktuelles Element definiert
- Element 17: Background als Farbpattern gesetzt
- Element 18: Background als Farbpattern und Background-color gesetzt
- Element 19: Background als Farbpattern, Background-color und Color gesetzt
- Element 20: Element/ Pattern als Background gesetzt mit Background-color und Color, Schrift  mit Color und Transparenz abgesetzt
    - a: Transparenz als Background-color
    - b: Transparenz als Background
    - c: Transparenz als Background-color HSLA
    - d: Transparenz als Background HSLA
- Element 21: Zwei Schriftgrafiken mit transparentem Hintergrund sind nebeneinander als Bilder eingesetzt. Die eine hat die Farbe schwarz, die andere rot

### Hyperlinks
In jedem Element ist auch einen Hyperlink eingesetzt. Für die Hyperlinks ist die CSS-Eigenschaft „hover“ gesetzt, was bewirkt, dass beim Darüberfahren mit dem Mauszeiger den Hyperlink einen Hintergrund erhält. Für „hover:visited“ ist auch eine Farbe definiert.

In Zeilen, in denen für die Schrift eine extra Color definiert ist, ist diese auch für den Hyperlink gesetzt. Das gilt auch für Transparenzen. 

Ansonsten ist für Hyperlinks keine weitere Definition in der CSS hinterlegt.

# Die Bookmarklets
Auf Grundlage der Analysierten Kontrastmodi Tageslicht, Wasser, Wüste, Nachthimmel, Abenddämmerung und Invertiert aus dem Betriebssystem Windows wurden Bookmarklets zu deren Simulation programmiert.

Für jeden der Kontrastmodi gibt es eine Version auf Grundlage der Webbrowser Google Chrome, Mozilla Firefox und Microsoft Edge. Damit wird das in der Bachelorarbeit analysierte Verhalten der Webbrowser auf die Kontrastmodi wiedergeben.

Da die Bookmarklets aktuell über den lokalen Server laufen, gibt es eine Seite HTML-Seite BookmarkletsWindows und eine HTML-Seite BookmarkletsMac. Der Unterschied besteht in den URLS. Bei Windows wird die URL localhost/hochkontraststudie/js/bookmarklet verwendet, für Mac OS localhost:8888/hochkontraststudie/js/bookmarklet

## Chrome und Edge
Die Bookmarklets der Kontrastmodi Abenddämmerung, Wasser, Nachthimmel und Wüste ändern die Werte der Schriftfarbe, der Hintergrundfarbe und die Farben von Hyperlinks. Sie bewirken außerdem, dass der MouseHover-Effekt von Hyperlinks ausgesetzt wird. 
Die Hintergrundfarbe ist immer einheitlich gleich, Bilder werden aber weiterhin angezeigt. 
Bei Text ohne Hintergrund (auf einem Bild) ist dieser in der Textlänge dunkel hinterlegt. Die Schriftfarbe ist auch immer einheitlich gleich und die Hyperlinks haben nun eine einheitliche Farbe, egal ob diese bereits geklickt wurden oder nicht.

Das Bookmarklet Tageslichtmodus zeigt die Seite genauso, wie sie ist, wenn man sie ohne weitere Kontrasteinstelllungen im entsprechenden Webbrowser öffnen würde. Es ist die gleiche Darstellung, die man auch im Dunkelmodus erhält.
Das Bookmarklet Invertiert setzt als erstes, genau wie der Tageslichtmodus die Farben des jeweiligen Webbrowsers um. Danach werden alle Farben auf der Website in ihrem Helligkeitswert umgekehrt.

## Firefox
Die Bookmarklets für Mozilla Firefox ändern nicht viel an der Seite. Ihre Auswirkung hängt davon ab, ob für die Seite Vorder- und Hintergrundfarben definiert sind, wie z. B. auf der Seite BackgroundcolorColor oder nicht. 
Die Bookmarklets setzten an der Stelle des Body-Elements einen Style-Tag mit Angaben für die Hintergrundfarbe, Schriftfarbe, Hyperlinkfarbe und einer Farbe für besuchte Hyperlinks. Diese Angaben greifen so lange, bis die Seite eigene CSS-Definitionen enthält.
Der Invertiert-Modus setzt als erstes, wie der Tageslichtmodus die Farben des jeweiligen Webbrowsers um. Danach werden alle Farben auf der Website in ihrer Helligkeit umgekehrt.

## Zusammenfassendes Bookmarklet
Das zusammenfassende Bookmarklet soll jedes Element einer Website dahingehend überprüfen, ob es, wenn man einen der Kontrastmodi aus den anderen Bookmarklets anwendet, Probleme mit den Kontrasten gibt. 
Dafür sind in dem Bookmarklet die Farben hinterlegt, die bei Anwendung der jeweiligen Kontrastmodi in den jeweiligen Webbrowsern gesetzt werden. 
Das Bookmarklet geht jetzt für jedes Modul jeden der Kontrastmodi durch und überprüft entsprechend den Prüfschritten „9.1.4.1 Ohne Farben nutzbar“ und „9.1.4.3 Kontraste von Texten ausreichend“ aus dem BIK BITV-Test den Kontrast der Elemente zum Hintergrund, bzw. bei Hyperlinks auch zur umliegenden Schrift.
Findet das Bookmarklet heraus, dass für ein Element in einem der Kontrastmodi nicht genug Kontrast vorhanden ist, wird die Element-„border“ rot eingefärbt und dem Element ein „title“-Attribut mitgegeben, indem ausgeben wird, bei welchem Kontrastmodus unter welchem Umstand der Kontrast nicht ausreicht und wie hoch dieser ist.

Das Bookmarklet orientiert sich an den oben genannten Prüfschritten mit folgenden Forderungen:
- „Hyperlinks im Fließtext sind nicht nur farblich abgesetzt, sondern zusätzlich unterstrichen, gefettet, invertiert oder mit einer Markierung versehen. Ausnahme: Das Kontrastverhältnis zwischen Hyperlinkfarbe und umgebender Textfarbe ist 3:1 oder besser. In diesem Fall kann im Ausgangszustand auf die zusätzliche Hervorhebung verzichtet werden. Die Hyperlinks müssen dann aber bei Fokuserhalt zusätzlich hervorgehoben werden“ (Prüfschritt „9.1.4.1 Ohne Farben nutzbar“).
- „Für Schriftgrößen unter 24 px (beziehungsweise 18,7 px bei fetter Schrift) prüfen, ob das Kontrastverhältnis bei 4,5:1 oder größer liegt. Für große Schriften prüfen, ob das Kontrastverhältnis bei 3:1 oder größer liegt.“
- „Die Prüfung der Kontraste für normalen Text und großen Text orientiert sich an den gemessenen Werten der Schriftgröße in Pixel, denn eine Messung der tatsächlich dargestellten Punktgröße auf dem Bildschirm mit einem Typometer ist nicht praktikabel. Bei einer Bildschirmauflösung von 96 dpi entsprechen 18 Punkt etwa 24 Pixeln, 14 Punkt entsprechen etwa 18,7 Pixeln.“ (Prüfschritt „9.1.4.3 Kontraste von Texten ausreichend“).


### Mögliche Verbesserungen bei Weiterentwicklung des Bookmarklets Zusammenfassung
Die Kontrastmodi in Mozilla Firefox werden abhängig von den definierten CSS-Eigenschaften der Website dargestellt. Bringt die Seite eigene Definitionen für die Vorder- oder Hintergrundfarbe mit, so wird diese höher priorisiert als die des Kontrastmodus. 

Daher müsste das Bookmarklet eigentlich als Erstes abfragen, ob für die Schrift oder den Hintergrund eine Farbe gesetzt wurde und dementsprechend die richtigen Farbwerte zur Kontrastkontrolle weitergeben.
Ein Problem dabei ist, herauszufinden, ob die Schriftfarbe im CSS gesetzt wurde oder ob es der Default Wert ist (rgb(0, 0, 0)). Der Default Wert für den Hintergrund ist rgba(0, 0, 0, 0).
Eventuell kann die Ausgabe der gefundenen Probleme anders gestalten, da die Anzeige des „title“-Attributs limitiert ist.


## Quellen
Die Funktion Luminescence und aus dem Beitrag:
https://evileu.de/zum-schwarzen-pinguin/2020/10/01/konform-zu-wcag-kontrastfarben-automatisch-berechnen/
übernommen

Der Code zum Invertiert Filter Chrome aus https://living-sun.com/javascript/384031-javascript-invert-color-on-all-elements-of-a-page-javascript-jquery-google-chrome-bookmarklet.html

BIK BITV-Test Prüfschritte: https://webtest.bitv-test.de/index.php?a=dl

# Weiterentwicklung Bookmarklets
## Linkprüfung Zusammenfassendes Bookmarklet
Prüfschritt 9.1.4.1Ohne Farben nutzbar

https://ergebnis.bitvtest.de/pruefschritt/bitv-20-web/9-1-4-1-ohne-farben-nutzbar

- Links im Fließtext sind nicht nur farblich abgesetzt, sondern zusätzlich unterstrichen, gefettet, invertiert oder mit einer Markierung versehen. Ausnahme: Das Kontrastverhältnis zwischen Linkfarbe und umgebender Textfarbe ist 3:1 oder besser. In diesem Fall kann im Ausgangszustand auf die zusätzliche Hervorhebung verzichtet werden. Die Links müssen dann aber bei Fokuserhalt zusätzlich hervorgehoben werden.
- Für Fließtext-Links gilt ein deutlicher Kontrast (mindestens 3,0:1) der Linkfarbe zur Farbe des umgebenden Textes ausreichend, um diese Anforderung zu erfüllen. Es ist dann keine zusätzliche Hervorhebung nötig. Für die Erfüllung von 9.1.4.3 Kontraste von Texten ausreichend muss jedoch gewährleistet sein, dass die Linkfarbe zum Hintergrund 4,5:1 erfüllt.
- Eine negative Bewertung ist also beispielsweise angebracht, wenn Links im Text oder Menü-Elemente nur durch die Farbe (und nicht zusätzlich durch Unterstreichung, Fettung oder andere Markierung) gekennzeichnet sind. Wenn Links im Text überhaupt nicht gekennzeichnet sind, ist dies zwar nicht nutzerfreundlich, aber wird in diesem Prüfschritt nicht negativ bewertet.

## Tageslichtmodus IOS/MacOS
Wie in der BA festgestellt, sind die Farben für den Tageslichtmodus für IOS und Mac OS gleich, auch in den verschiedenen Browsern