 // set the dimensions and margins of the graph
    var margin = {top: 30, right: 50, bottom: 10, left: 50},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg_parallel = d3.select("#parallel")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("https://gist.githubusercontent.com/pranay2281/41d1c3963db6448091ff887600cbd5be/raw/1c30954ba09c55ce184940a2d0db984a506c1486/share_price", function(data) {


    // Here I set the list of dimension manually to control the order of axis:
    dimensions = ["SharePrice", "MarketCap"]

    // For each dimension, I build a linear scale. I store all in a y object
    var y = {}
    for (i in dimensions) {
    name = dimensions[i]
    y[name] = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return +d[name]; })) // --> Same axis range for each group
    // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )
    .range([height, 0])
}

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
    .range([0, width])
    .domain(dimensions);
    
    // Highlight the specie/company that is hovered
    var highlight = function(d){

    selected_specie = d.Company

    // first every group turns grey
    d3.selectAll(".line")
    .transition().duration(1000)
    .style("stroke", "lightgrey")
    .style("opacity", "0.5")
    // Second the hovered specie/company takes its color
    d3.selectAll("." + selected_specie)
    .transition().duration(200)
    .style("stroke", "orange")
    .style("opacity", "1")
}

//trying to display name while hovering but it did not work

    var displayname= function (d){

        selected_specie = d.Company
        svg_parallel.append("text")
            .attr("x",100)
            .attr("y",250)
            .attr("font-family","times")
            .attr("font-size","12px")
            .text(selected_specie)
    }



    // Unhighlight
    var doNotHighlight = function(d){
    d3.selectAll(".line")
    .transition().duration(500).delay(500)
    .style("stroke", "#69b3a2" )
    .style("opacity", "1")


}

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
    return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
}

    // Draw the lines
    svg_parallel
    .selectAll("myPath")
    .data(data)
    .enter()
    .append("path")
    .attr("class", function (d) { return "line " + d.Company } ) // 2 class for each line: 'line' and the group name
    .attr("d",  path)
    .style("fill", "none" )
    .style("stroke", "#69b3a2" )
    .style("opacity", 0.5)
    .on("mouseover", function (d){
        highlight(d)
        //displayname(d)
    })

    .on("mouseleave", function (d){
        doNotHighlight(d)
    })

    // Draw the axis:
    svg_parallel.selectAll("myAxis")

    // For each dimension of the dataset I add a 'g' element:
    .data(dimensions).enter()
    .append("g")
    .attr("class", "axis")
    // I translate this element to its right position on the x axis
    .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
    // And I build the axis with the call function
    .each(function(d) { d3.select(this).call(d3.axisLeft().ticks(10).scale(y[d])); })
    // Add axis title
    .append("text")
    .style("text-anchor", "middle")
    .attr("y", -9)
    .text(function(d) { return d; })
    .style("fill", "black")

//manually added all the names of the company as tooltip did not work

    svg_parallel.append("text")
        .attr("x",455)
        .attr("y",7)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Apple")

    svg_parallel.append("text")
        .attr("x",455)
        .attr("y",102)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Microsoft")  

    svg_parallel.append("text")
        .attr("x",455)
        .attr("y",285)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Tesla") 

    svg_parallel.append("text")
        .attr("x",455)
        .attr("y",198)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Amazon")  

    svg_parallel.append("text")
        .attr("x",455)
        .attr("y",173)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Google") 

    svg_parallel.append("text")
        .attr("x",455)
        .attr("y",355)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Meta")

    svg_parallel.append("text")
        .attr("x",455)
        .attr("y",410)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Alibaba")  

     svg_parallel.append("text")
        .attr("x",455)
        .attr("y",430)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Netflix")   

     svg_parallel.append("text")
        .attr("x",455)
        .attr("y",441)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Shopify")                                   

    svg_parallel.append("text")
        .attr("x",455)
        .attr("y",453)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Seaboard") 
})