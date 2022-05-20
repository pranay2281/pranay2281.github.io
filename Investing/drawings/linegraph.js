//set the dimensions and margins of the graph
var margin = {top:10, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_line = d3.select("#linechart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + (margin.top-25) + ")");

//Read the data
d3.csv("https://gist.githubusercontent.com/pranay2281/27c033e807b492d87da86989c4760102/raw/e2e35589da6b708cfa936ce7cbb65d20e48814c2/line.csv",

    // When reading the csv, I must format variables:
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
    },

    // Now I can use this dataset:
    function(data) {

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
        svg_line.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.value; })])
            .range([ height, 0 ]);
        svg_line.append("g")
            .call(d3.axisLeft(y));

        // Add the line
        svg_line.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#006600")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })
            )
            .call(transition);

        return svg_line.node();

    })

// animation duration

function transition(path){
    path.transition()
        .duration(6000)
        .attrTween("stroke-dasharray",tweenDash)
    //on("end",d3.call(transition));
}

function tweenDash() {
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) { return i(t) };
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**

//1100
sleep(1100).then(() => {
    svg_line.append("text")
        .attr("x",30)
        .attr("y",290)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Gulf war")

    var datagulf = [{x: 40, y: 298}, {x: 33, y: 315}]

    var curveFunc = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return d.x })
        .y(function(d) { return d.y })

    // Add the path using this helper function
    svg_line.append('path')
        .attr('d', curveFunc(datagulf))
        .attr('stroke', 'black')
        .attr('fill', 'none');

})

//2500
sleep(2500).then(()=>{
    svg_line.append("text")
        .attr("x",160)
        .attr("y",304)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Dot com Bubble Burst")

    svg_line.append('circle')
        .attr('cx', 190)
        .attr('cy', 270)
        .attr('r', 17)
        .attr('stroke', 'black')
        .attr('fill', 'none');
})

**/
//annotation delay 

//3000
sleep(3000).then(()=>{
    svg_line.append("text")
        .attr("x",185)
        .attr("y",240)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Mortgage and Housing Crisis")

    var datahousing = [{x: 266, y: 330},{x:262, y:260}]

    var curveFunc = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return d.x })
        .y(function(d) { return d.y })

    // Add the path using this helper function
    svg_line.append('path')
        .attr('d', curveFunc(datahousing))
        .attr('stroke', 'black')
        .attr('fill', 'none');
})


//4000

sleep(4000).then(()=>{
    svg_line.append("text")
        .attr("x",440)
        .attr("y",225)
        .attr("font-family","times")
        .attr("font-size","12px")
        .text("Coronavirus")

    var datacovid = [{x: 428, y: 199}, {x: 448, y: 210}]

    var curveFunc = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return d.x })
        .y(function(d) { return d.y })

    // Add the path using this helper function
    svg_line.append('path')
        .attr('d', curveFunc(datacovid))
        .attr('stroke', 'black')
        .attr('fill', 'none');
})




