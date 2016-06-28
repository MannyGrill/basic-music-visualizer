Basic Music Visualizer

NOTE: Open via index.html using Firefox Version 47.0.1 (some earlier version will run this).

Tools: D3.js, Web Audio API, jQuery

Music visualizer that utilizes a d3 bar-chart to display the frequencies of a song. Frequencies were obtained through the Web Audio API which grabs the mp3 file from an html audio tag and converts the data into a frequency 0 - 255. Out of choice, I decided to not display frequencies that were >150. I felt this created a neat little 'blinking' effect (start at 1:08, my favorite part).
