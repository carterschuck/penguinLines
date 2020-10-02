

//penguins is the array of data
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawLines = function(penguins,target,
                         xScale,yScale)
{
   var lineGenerator = d3.line()
        .x(function(quiz,i)
          {
            return xScale(i)
        })
        .y(function(quiz)
          {
            return yScale(quiz.grade)
        })
        .curve(d3.curveCardinal)

   var lines = d3.select("svg")
        .select("#graph")
        .selectAll("g")
        .data(penguins)
        .enter()
        .append("g")
        .classed("line",true)
        .attr("fill","none")
        .attr("stroke","black")

        .on("mouseover",function(penguins)
           {
            if(! d3.select(this).classed("off"))
              {d3.selectAll(".line")
                .classed("selected path",false);

               d3.select(this)
                  .classed("selected path",true)
                  .raise();

               d3.select("img")
                    .remove()      
            }
            d3.select("#tooltip")
                 .classed("hidden",false)
                 .append("img")
                 .attr("src","imgs/"+penguins.picture)
        })

        .on("mouseout",function(penguins)
           {
            if(! d3.select(this).classed("off"))
                {

                    d3.selectAll(".line")
                    .classed("selected path",false)

                }
        })



   lines.append("path")
        .datum(function(penguins)
            {
                return penguins.quizes
            })
        .attr("d",lineGenerator)
}


@@ -24,7 +81,17 @@ var makeTranslateString = function(x,y)
var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var axes = d3.select("svg")
        .append("g")
    axes.append("g")
        .attr("transform","translate("+(margins.left/2)+","+(margins.top+graphDim.height+10)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+(margins.left/2)+","+(margins.top+10)+")")
        .call(yAxis)

}

@@ -33,7 +100,31 @@ var drawAxes = function(graphDim,margins,
//margins - object that stores the size of the margins
var drawLabels = function(graphDim,margins)
{
    var labels = d3.select("svg")
        .append("g")
        .classed("labels",true)

    labels.append("text")
        .text("Penguin Quiz Grades")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graphDim.width/2))
        .attr("y",margins.top/2)

    labels.append("text")
        .text("Day")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+graphDim.width/2)
        .attr("y",margins.top+graphDim.height+(margins.bottom/2))

    labels.append("g")
        .attr("transform","translate(10,"+(margins.top+(graphDim.height/2))+")")
        .append("text")
        .text("Quiz Grade")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
}


@@ -45,7 +136,7 @@ var initGraph = function(penguins)
    //size of screen
    var screen = {width:800,height:600}
    //how much space on each side
    var margins = {left:30,right:20,top:20,bottom:30}
    var margins = {left:50,right:50,top:50,bottom:80}



@@ -62,7 +153,7 @@ var initGraph = function(penguins)

    var target = d3.select("svg")
    .append("g")
    .attr("id","#graph")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");