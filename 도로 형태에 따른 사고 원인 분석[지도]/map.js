d3.csv("data2.csv", function(data) {

  var filtered1 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로"
  })

  var filtered2 = data.filter(function(d) {
    return d["도로형태_대분류"] == "교차로"
  })

  var filtered3 = data.filter(function(d) {
    return d["도로형태_대분류"] == "기타" || d["도로형태_대분류"] == "불명" || d["도로형태_대분류"] == "주차장" || d["도로형태_대분류"] == "철길건널목"
  })

  points.selectAll("circle")
    .data(filtered1)
    .enter().append("circle")
    .attr("cx", function(d) {
      return projection([d.경도, d.위도])[0];
    })
    .attr("cy", function(d) {
      return projection([d.경도, d.위도])[1];
    })
    .attr("r", function(d) {
      return 2;
    })
    .style("fill", "blue");

  points2.selectAll("circle")
    .data(filtered2)
    .enter().append("circle")
    .attr("cx", function(d) {
      return projection([d.경도, d.위도])[0];
    })
    .attr("cy", function(d) {
      return projection([d.경도, d.위도])[1];
    })
    .attr("r", function(d) {
      return 2;
    })
    .style("fill", "red");

  points3.selectAll("circle")
    .data(filtered3)
    .enter().append("circle")
    .attr("cx", function(d) {
      return projection([d.경도, d.위도])[0];
    })
    .attr("cy", function(d) {
      return projection([d.경도, d.위도])[1];
    })
    .attr("r", function(d) {
      return 2;
    })
    .style("fill", "black");

  var txt = "단일로에서의 사고 수" + "(빨강) : " + filtered1.length;
  svg.append("text")
    .attr("x", 600)
    .attr("y", 50)
    .style("font-size", "15px")
    .text(function() {
      return txt;
    });

  var txt2 = "교차로에서의 사고 수" + "(파랑) : " + filtered2.length;
  svg.append("text")
    .attr("x", 600)
    .attr("y", 70)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });

  var txt3 = "기타에서의 사고 수" + "(검정) : " + filtered3.length;
    svg.append("text")
      .attr("x", 600)
      .attr("y", 90)
      .style("font-size", "15px")
      .text(function() {
        return txt3;
      });
});
