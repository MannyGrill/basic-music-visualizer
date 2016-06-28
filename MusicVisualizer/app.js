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
  var frequencyData = new Uint8Array(150);

  var svgHeight = '300';
  var svgWidth = '1200';
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  // Create initial D3 chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length - barPadding);
     //.transition()
      //.duration(2)
      //.delay(10)

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);

     // Update d3 chart with new data.
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
           /*if(d<150){
            return -svgHeight;
           }
           else{
            return svgHeight - d;
           }*/
  
          return svgHeight - d;
        })
        .attr('height', function(d) {
           if(d<150){
            return 0;
           }
           else{
            return d;
           }      
        })
        .attr('fill', function(d) {
           
           //return 'rgb(0, 0, ' + d + ')';
           
          // IF statement test cases
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
           
          // TEST
           /*if(d<150){
            return 'rgb(0,' + d +'+50,'+ d + ')';
           }
           else if(d<180){
            return 'rgb(0,' + d +'-50,'+ d + ')';
           }
           else{
            return 'rgb(0,' + d + d + ')';
           }*/
           

           //return 'rgb('+d+','+d+',' + d + ')';
           //return 'rgb(0,'+d+',' + d + ')';
        });


      //console.log(frequencyData);
  }

  // Run the loop
  renderChart();

});
