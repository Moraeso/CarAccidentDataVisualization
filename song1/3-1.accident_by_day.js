d3.csv("./data.csv", function(error, data) {
  var dataSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var standard = 3;
  var barScale = 5;
  var labelNameDay = ["일", "월", "화", "수", "목", "금", "토"];

  // 데이터 필터링 : 차대차 & !자전거
  var filtered = data.filter(function(d) {
    return d["사고유형_대분류"] == "차대차" &&
      d["가해자_당사자종별_대분류"] != "자전거" &&
      d["피해자_당사자종별_대분류"] != "자전거";
  })

  // 요일 별 전체 사고
  for (var i = 0; i < filtered.length; i++) {
    var day = filtered[i].요일;
    if (day == "일") {
      dataSet[0]++;
    } else if (day == "월") {
      dataSet[1]++;
    } else if (day == "화") {
      dataSet[2]++;
    } else if (day == "수") {
      dataSet[3]++;
    } else if (day == "목") {
      dataSet[4]++;
    } else if (day == "금") {
      dataSet[5]++;
    } else if (day == "토") {
      dataSet[6]++;
    }
  }

  for (var i = 0; i < filtered.length; i++) {
    var day = filtered[i].요일;
    if (filtered[i].사상자수 >= standard) {
      if (day == "일") {
        dataSet[7]++;
      } else if (day == "월") {
        dataSet[8]++;
      } else if (day == "화") {
        dataSet[9]++;
      } else if (day == "수") {
        dataSet[10]++;
      } else if (day == "목") {
        dataSet[11]++;
      } else if (day == "금") {
        dataSet[12]++;
      } else if (day == "토") {
        dataSet[13]++;
      }
    }
  }

  var svgEle = document.getElementById("myGraph"); // ?
  var svgWidth = window.getComputedStyle(svgEle, null)
    .getPropertyValue("width"); // ?
  var svgHeight = window.getComputedStyle(svgEle, null)
    .getPropertyValue("height");

  svgWidth = parseFloat(svgWidth);
  svgHeight = parseFloat(svgHeight) - 50;

  var offsetX = 85;
  var offsetY = 30;
  var barElements;
  var dataMax;
  var barWidth = 40;
  var barWidth2 = 20;
  var barMargin = 30;

  dataMax = d3.max(dataSet, function(d) {
    return d;
  });

  var yScale = d3.scale
    .linear() //스케일 설정
    .domain([0, dataMax]) //원래크기
    .range([dataMax / barScale, 0]); //실제 출력 크기
  var axis = d3.svg.axis()
    .orient('left')
    .scale(yScale);

  // title 추가
  d3.select("#myGraph")
    .append("text")
    .attr("x", 175)
    .attr("y", 60)
    .attr("font-family", "sans-serif")
    .style("font-size", "20px")
    .text("차대차 전체 사고 대비 대형사고 수");

  // title 추가
  d3.select("#myGraph")
    .append("text")
    .attr("x", 280)
    .attr("y", 85)
    .attr("font-family", "sans-serif")
    .style("font-size", "16px")
    .text("(기준 : " + standard + "명 이상)");

  // 눈금 grid
  d3.select("#myGraph")
    .append("g")
    .attr("class", "grid")
    .attr("transform",
      "translate(" + offsetX + "," + ((svgHeight - dataMax / barScale) - offsetY) + ")")
    .call(axis.tickSize(-svgWidth + offsetX + 100))
    .style("fill", "none");

  // 그래프 그리기(dataSet)
  barElements = d3.select("#myGraph")
    .selectAll("rect")
    .data(dataSet)

  // 데이터가 추가될 때
  barElements.enter()
    .append("rect")
    // 너비, 높이
    .attr("height", 0)
    .attr("width", function(d, i) {
      if (i < 7) {
        return barWidth;
      } else {
        return barWidth2;
      }
    })
    // 색깔
    .attr("class", function(d, i) {
      if (i < 7) {
        if (labelNameDay[i] == "토" || labelNameDay[i] == "일") {
          return "barWeekend";
        } else {
          return "barWeekday"
        }
      } else {
        if (labelNameDay[i - 7] == "토" || labelNameDay[i - 7] == "일") {
          return "barWeekendBig";
        } else {
          return "barWeekdayBig"
        }
      }
    })
    // 막대 (x,y) 좌표
    .attr("x", function(d, i) {
      if (i < 7) {
        return i * (barWidth + barMargin) + offsetX + barMargin; // 처음 y축과의 간격
      } else {
        return (i - 7) * (barWidth + barMargin) + offsetX + barMargin + ((barWidth - barWidth2) / 2);
      }
    })
    .attr("y", svgHeight - offsetY) // 애니메이션 처리
    // y좌표와 길이
    .transition()
    .attr("y", function(d, i) { //Y 좌표를 지정
      return svgHeight - d / barScale - offsetY; //Y 좌표를 계산
    })
    .attr("height", function(d, i) { //넓이설정.2번째의 파라미터에 함수지정
      return d / barScale; //데이터 값을 그대로 높이로 지정
    })

  // text : 각 사고 개수
  barElements.enter()
    .append("text") //text 요소 추가
    .attr("class", "barNum") //CSS 클래스를 지정
    .attr("x", function(d, i) { //X 좌표를 지정함
      //막대그래프의 표시 간격을 맞춤
      var offset = 0;
      if (i >= 7) {
        i -= 7;
        offset = 2;
      }
      return i * (barWidth + barMargin) + offsetX + (barMargin + 7) + offset;
    })
    .attr("y", function(d) {
      var offset = 10;
      if (d < 1000) offset = 7;

      return svgHeight - offsetY - d / barScale - offset; //Y 좌표 출력 위치 지정
    })
    .text(function(d, i) { //데이터 표시
      return d;
    });

  // text : 전체 사고 대비 대형사고 비율(%)
  barElements.enter()
    .append("text") //text 요소 추가
    .attr("class", "barPercent") //CSS 클래스를 지정
    .attr("x", function(d, i) { //X 좌표를 지정함
      //막대그래프의 표시 간격을 맞춤
      if (i >= 7) {
        i -= 7;
      }
      return i * (barWidth + barMargin) + offsetX + (barMargin + 5);
    })
    .attr("y", function(d) {
      return svgHeight - offsetY - d / barScale - 23; //Y 좌표 출력 위치 지정
    })
    .text(function(d, i) { //데이터 표시
      if (i >= 7) return;
      var res = dataSet[i + 7] / dataSet[i] * 100;
      res = res.toFixed(1);
      return res + "%";
    });

  //세로(Y축) 방향의 눈금을 설정하고 표시
  d3.select("#myGraph")
    .append("g")
    .attr("class", "axis")
    .attr("transform",
      "translate(" + offsetX + "," + ((svgHeight - dataMax / barScale) - offsetY) + ")")
    .call(axis.tickSize(5)) //스케일 적용

  d3.select("#myGraph")
    .append("text")
    .attr("x", offsetX - 30)
    .attr("y", offsetY + 150)
    .attr("font-family", "sans-serif")
    .style("font-size", "12px")
    .text("사상자 수");

  //가로(X축) 방향의 선을 표시
  d3.select("#myGraph")
    .append("rect")
    .attr("class", "axis_x")
    .attr("width", svgWidth - offsetX - 80)
    .attr("height", "1")
    .attr("transform",
      "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")


  //막대의 레이블을 표시
  barElements.enter()
    .append("text")
    .attr("class", "barName")
    .attr("x", function(d, i) { //X좌표 지정
      return i * (barWidth + barMargin) + offsetX + (barMargin + 15);
    })
    .attr("y", svgHeight - offsetY + 15)
    .text(function(d, i) {
      return labelNameDay[i]; //레이블 이름을 반환
    })
});
