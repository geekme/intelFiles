Markers you should know before Implementing MAP PopUP

1. Add a link "<a href = "#" class = "largeMap">View large Map</a>" after every of your | <div class = "map-canvas1"></div> |

2. Add an data Element with the Coordinates as the data in it | data-coordinates="your DB values" |
    Ex : <div class = "map-canvas1" data-coordinates="your DB values"></div>
         <a href = "#" data-coordinates="your DB values" class = "largeMap">View large Map</a>

3. Add the following HTML at the end of the page before the body tag closes.
    <div class = "mainLarge">
        <div class = "closeLargeMap" style="">Close - X</div>
        <div class = "large"></div>
    </div>

4. Update the files from Github.

5. Copy the new Script for Initializing the Maps from | feed1.html | file from the bottom.
