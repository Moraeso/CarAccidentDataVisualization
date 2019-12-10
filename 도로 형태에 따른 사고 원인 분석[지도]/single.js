d3.csv("data2.csv", function(data) {

  var filtered1 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행"
  })

  var filtered = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로"
  })

  var filtered2 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "강원"
  })
  var filtered3 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "경기"
  })
  var filtered4 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "경남"
  })
  var filtered5 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "경북"
  })
  var filtered6 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "광주"
  })
  var filtered7 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "대구"
  })
  var filtered8 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "대전"
  })
  var filtered9 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "부산"
  })
  var filtered10 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "서울"
  })
  var filtered11 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "세종"
  })
  var filtered12 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "울산"
  })
  var filtered13 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "인천"
  })
  var filtered14 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "전남"
  })
  var filtered15 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "전북"
  })
  var filtered16 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "제주"
  })
  var filtered17 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "충남"
  })
  var filtered18 = data.filter(function(d) {
    return d["도로형태_대분류"] == "단일로" && d["법규위반"] == "안전운전 의무 불이행" && d["발생지시도"] == "충북"
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
    .style("fill", "red");

  var txt = "단일로에서의 안전운전 의무 불이행 수 : " + filtered1.length + " (" + (Math.round(filtered1.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 50)
    .style("font-size", "15px")
    .text(function() {
      return txt;
    });

  var txt2 = "강원 : " + filtered2.length + " (" + (Math.round(filtered2.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 70)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "경기 : " + filtered3.length + " (" + (Math.round(filtered3.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 90)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "경남 : " + filtered4.length + " (" + (Math.round(filtered4.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 110)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "경북 : " + filtered5.length + " (" + (Math.round(filtered5.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 130)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "광주 : " + filtered6.length + " (" + (Math.round(filtered6.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 150)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "대구 : " + filtered7.length + " (" + (Math.round(filtered7.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 170)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "대전 : " + filtered8.length + " (" + (Math.round(filtered8.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 190)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "부산 : " + filtered9.length + " (" + (Math.round(filtered9.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 210)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "서울 : " + filtered10.length + " (" + (Math.round(filtered10.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 230)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "세종 : " + filtered11.length + " (" + (Math.round(filtered11.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 250)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "울산 : " + filtered12.length + " (" + (Math.round(filtered12.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 270)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "인천 : " + filtered13.length + " (" + (Math.round(filtered13.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 290)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "전남 : " + filtered14.length + " (" + (Math.round(filtered14.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 310)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "전북 : " + filtered15.length + " (" + (Math.round(filtered15.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 330)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "제주 : " + filtered16.length + " (" + (Math.round(filtered16.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 350)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "충남 : " + filtered17.length + " (" + (Math.round(filtered17.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 370)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
  var txt2 = "충북 : " + filtered18.length + " (" + (Math.round(filtered18.length / filtered.length * 1000) / 10) + "%" + ")";
  svg.append("text")
    .attr("x", 600)
    .attr("y", 390)
    .style("font-size", "15px")
    .text(function() {
      return txt2;
    });
});
