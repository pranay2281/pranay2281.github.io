
// set the dimensions and margins of the graph
    var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#barchart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("https://gist.githubusercontent.com/pranay2281/4620b3bb0b07a95df0f126971e68c3bb/raw/d4033b01c4078362a382fab96f623a77841f2c03/bardata.csv", function(data) {

    // Add X axis
    var x = d3.scaleLinear()
    .domain([0, 5])
    .range([ 0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(0)")
    .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.application; }))
    .padding(.1);
    svg.append("g")
    .call(d3.axisLeft(y))

    //Bars
    svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.application); })
    .attr("width", function(d) { return x(d.rating); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#6993D8")

})
