d3.csv("./data2.csv", function(error, data) {
  var w = 400, h = 400;
  var graphData = [0, 0, 0];
  var dataName = ["단일로", "교차로", "기타"];

  for (var i = 0; i < data.length; i++) {
    var accident = data[i].도로형태_대분류;
    if (accident == "단일로") {
      graphData[0]++;
    } else if (accident == "교차로") {
      graphData[1]++;
    }
      else if (accident == "기타" || "불명" || "주차장" || "철널건널목") {
        graphData[2]++;
    }
  }



  var colorData = ["#2E2EFE", "#1E90FF", "#87CEEB"];
  var pie = d3.layout.pie();
  var arc = d3.svg.arc().innerRadius(70).outerRadius(200);

  var svg = d3.select(".one-graph")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("id", "graphWrap");

  var g = svg.selectAll(".pie")
      .data(pie(graphData))
      .enter()
      .append("g")
      .attr("class", "pie")
      .attr("transform","translate("+w/2+","+h/2+")");

  // path 태그로 차트에 색을 넣기
  g.append("path")
      .style("fill", function(d, i) {
          return colorData[i];
      })
      .transition()
      .duration(400)
      .delay(function(d, i) { // 그릴 원 그래프의 시간을 어긋나게 표시
          return i * 400;
      })
      .attrTween("d", function(d, i) { // 보간 처리
          var interpolate = d3.interpolate(
              {startAngle : d.startAngle, endAngle : d.startAngle}, // 각 부분의 시작 각도
              {startAngle : d.startAngle, endAngle : d.endAngle} // 각 부분의 종료 각도
          );
          return function(t){
              return arc(interpolate(t)); // 시간에 따라 처리
          }
      });

  // text 태그로 배열 값 넣기
  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d, i) {
        return  d.endAngle-d.startAngle > 0.2 ?
              dataName[i] + " (" + Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10 + "%)" : ""
      });

  // text 정 중앙에 텍스트 넣기
  svg.append("text")
      .attr("class", "total")
      .attr("transform", "translate("+(w/2-35)+", "+(h/2+5)+")")
      .text("합계:" + d3.sum(graphData));

});
