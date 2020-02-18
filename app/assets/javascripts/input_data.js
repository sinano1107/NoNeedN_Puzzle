$(document).ready(function() {

  x = [0,0]
  y = Object.assign([],x)
  y[0] = 1
  console.log(x)
  console.log(y)

  var string = "'><option varue='Nil'></option><option varue='True'>◯</option><option varue='False'>×</option></select></td>"

  var answer1 = "";
  var answer2 = "";
  var answer3 = "";
  var n = $('#n').text();

  for (var i=0; i<n; i++) {
    var a1="";
    var a2="";
    var a3="";

    for (var j=0; j<n; j++) {
      a1 += "<td>" + "<select name='"+ j + "_" + i +"_nil" + string
      a2 += "<td>" + "<select name='"+ "nil_" + i + "_" + j + string
      a3 += "<td>" + "<select name='"+ j + "_nil_" + i + string
    }
    answer1 = answer1 + "<tr>" + a1 + "</tr>"
    answer2 = answer2 + "<tr>" + a2 + "</tr>"
    answer3 = answer3 + "<tr>" + a3 + "</a3>"
  }

  $('#answer1').html(answer1);
  $('#answer2').html(answer2);
  $('#answer3').html(answer3);


});
