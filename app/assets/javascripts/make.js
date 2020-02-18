$(document).ready(function() {

  var n = Number($('#n').text())
  var need_num = 2*n-2
  var delete_num = n+2

  var relation_list = []
  var delete_turn = []
  var delete_list = [0,0]
  var t_list = []

  console.log("need_count", need_num)
  console.log("delete_count", delete_num)

  //----------------------------------------------------------------------------

  function shuffle(n) {

    var array = new Array(n)
    for (var i=0; i<n; i++) {
      array[i] = i
    }

    for(var i = array.length - 1; i > 0; i--){
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    console.log("shuffle", array)
    return array
  }

  function init(n) {

    var a1 = ""
    var a2 = ""
    var a3 = ""


    for (var i=0; i<n; i++) {
      a1 += "<tr>"
      a2 += "<tr>"
      a3 += "<tr>"
      for (var j=0; j<n; j++) {
        // 書き換えた
        a1 += "<td id='"+ j +"_"+ i +"_nil" + "'>N</td>"
        a2 += "<td id='nil_" + i + "_" + j + "'>N</td>"
        a3 += "<td id='" + j + "_nil_" + i + "'>N</td>"
        // 書き換え終わり
      }
      a1 += "</tr>"
      a2 += "</tr>"
      a3 += "</tr>"
    }

    console.log("動いてます")
    console.log(a1)

    $('#table1').html(a1)
    $('#table2').html(a2)
    $('#table3').html(a3)
  }

  function make(n) {
    t_list_1 = shuffle(n)
    t_list_2 = shuffle(n)
    for (var i=0; i<n; i++) {
      var li = [`${t_list_1[i]}_${i}_nil`, `nil_${i}_${t_list_2[i]}`, `${t_list_1[i]}_nil_${t_list_2[i]}`]

      relation_list.push(li)
    }

    relation_list.splice(Math.round( Math.random()*n-1) ,1)

    relation_list.forEach(function(val_array) {
      val_array.forEach(function(val) {
        $(`#${val}`).html("<span class='red-text'>◯</span>")
        t_list.push(val)
      })
    })
  }



  //----------------------------------------------------------------------------
  for (var i=0; i<n-1; i++) {
    delete_turn.push(Math.round( Math.random()*2 ))
  }



  init(n)
  make(n)
  console.log(delete_turn)
  console.log("relation_list", relation_list)

  delete_turn.forEach(function(value, index) {
    var str = relation_list[index][value]

    $(`#${str}`).html("N")
    t_list = t_list.filter(function(a) {return a !== str;});
  })








  console.log(t_list)


  $('#answer').html(`<a href=/move/capture/[${t_list}]/[]/${n} class=btn waves-effect waves-light btn-large>capture!</a>`)





});
