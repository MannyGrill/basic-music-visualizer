$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind analyser to the media element source.
  audioSrc.connect(analyser);
  analyser.connect(audioCtx.destination);
  //audioSrc.connect(audioCtx.destination);

  //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  // Store frequency data in 150 bins (can have more). 
  var frequencyData = new Uint8Array(150);

  var svgHeight = '300';
  var svgWidth = '1200';
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  // Create initial d3 bar-chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length - barPadding);

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);

     // Update d3 bar-chart with new data.
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
          return svgHeight - d;
        })
        .attr('height', function(d) {
          // If frequency data <150, do not draw bar.
          if(d<150){
            return 0;
          }
          else{
            return d;
          }      
        })
        .attr('fill', function(d) {
          // Use frequency data to decide the color of the bar. The color of the bar
          // is also determined by the frequency data.
          if(d<150){
            //return 'rgb(0,' + d +',' + d + ')';
            return 'rgb(0,' + (255-d) + ', 0)';
          }
          else if(d<180){
            //return 'rgb(' + d + ', 0, 0)';
            //return 'rgb(75, 0, ' + d + ')';
            return 'rgb(0,' + (300-d) + ', 0)';
           }
          else{
            //return 'rgb(0, 75, ' + d + ')';
            return 'rgb(0,' + d + ', 0)';
          }
        });
      // Used to monitor frequency data (WARNING: WILL RUN VERY SLOW).
      //console.log(frequencyData);
  }
  // Run the loop
  renderChart();
});
