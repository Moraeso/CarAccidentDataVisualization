d3.csv("./data2.csv", function(error, data) {
  var w = 600, h = 600;
  var graphData = [0, 0, 0, 0];
  var dataName = ["안전운전 의무 불이행", "신호위반", "과속", "중앙선 침범"];

  for (var i = 0; i < data.length; i++) {
    var road = data[i].도로형태_대분류;
    if(road == "교차로") {
      var accident = data[i].법규위반;
      if (accident == "안전운전 의무 불이행") {
        graphData[0]++;
      } else if (accident == "신호위반") {
        graphData[1]++;
      } else if (accident == "과속") {
        graphData[2]++;
      } else if (accident == "중앙선 침범") {
        graphData[3]++;
      }
    }
  }



  var colorData = ["#DB7093", "#FFE4E1", "#FFB6C1", "#FF9999"];
  var pie = d3.layout.pie();
  var arc = d3.svg.arc().innerRadius(60).outerRadius(250);

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
      // .attr("d", arc) // 미리 색을 칠해놓음
      .style("fill", function(d, i) {
          return colorData[i];
      }) // 애니메이션이 싫을경우 arc 를 활성화시키고 아래내용을 주석
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
