$.getScript("index.js", function(){
	array_of_voters = voteForCandidate();
})
var dataset = array_of_voters;
var svgwidth = 300, svgheight = 500, barpadding = 5;
var barwidth = (svgbwidth / dataset.length);
var svg = d3.select('svg')
	.attr("width",svgbwidth)
	.attr("height",svgheight);
var barchart = svg.selectall("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("y",function(d){
		return svgheight - d
	})
	.attr("height",function(d){
		return d;
	})
	.attr("width",barwidth - barpadding)
	.attr("transform",function (d, i){
		var translate = [barwidth * i,0];
		return "translate("+ translate +")";
	});