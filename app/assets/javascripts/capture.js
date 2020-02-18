$(document).ready(function() {
  var n = Number($('#n').text());
  var truth = []
  var lies = []
  var f_t = []
  var f_l = []

  var table = []
  var before = ""

  var data1 = []
  var data2 = []
//------------------------------------------------------------------------------

  // 新しく作る初期化関数
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
        a1 += `<td id=${j}_${i}_nil>N</td>`
        a2 += `<td id=nil_${i}_${j}>N</td>`
        a3 += `<td id=${j}_nil_${i}>N</td>`
        // 書き換え終わり
      }
      a1 += "</tr>"
      a2 += "</tr>"
      a3 += "</tr>"
    }

    console.log("動いてます")
    console.log(a1)

    $('#answer1').html(a1)
    $('#answer2').html(a2)
    $('#answer3').html(a3)
  }

  // initで初期化した表に一つずつ書き込む関数 (map=>書き込む座標, branch=>○に書き換えるか×に書き換えるか　True or False)
  function write(map, branch) {
    if (branch == true) {
      $("#" + map).html("<span class='red-text'>o</span>")
    } else {
      $("#" + map).html("<span class='blue-text'>x</span>")
    }
  }


  //truthとかliesを加工する
  function data_processing(string) {
    answer = []
    string = string.slice(1,-1).replace(/"/g,"").replace(/ /g,"");
    ary = string.split(",");
    ary.forEach( function( value ) {
      answer.push(value.split("_"));
    });
    if (answer[0] == "") {
      return[]
    } else {
      return answer
    }
  }

  //truth,liesリストを受け取り表を表示させる,tableを返す
  function display(truth,lies,n,branch) {
    var answer = ["","",""]
    var string = "'><option varue='Nil' selected></option><option varue='True'>◯</option><option varue='False'>×</option></select></td>"
    var str_tr = "'><option varue='Nil'></option><option varue='True' selected>◯</option><option varue='False'>×</option></select></td>"
    var str_fa = "'><option varue='Nil'></option><option varue='True'>◯</option><option varue='False' selected>×</option></select></td>"

    var compass = {0:[1,0],1:[1,2],2:[2,0]} //tableのindex:
    var table = JSON.parse(JSON.stringify((new Array(3)).fill((new Array(n)).fill((new Array(n)).fill(0)))))

    lies.forEach(function(value) {
      var index = value.indexOf("nil");
      var ta_index = (index+1) % 3;
      var data = compass[ta_index];
      table[ta_index][Number(value[data[0]])][Number(value[data[1]])] = "×";
    });
    truth.forEach(function(value) {
      var index = value.indexOf("nil");
      var ta_index = (index+1) % 3;
      var data = compass[ta_index];
      table[ta_index][Number(value[data[0]])][Number(value[data[1]])] = "◯";
    });

    for (var num=0; num<3; num++) {
      a = ""
      for (var i=0; i<n; i++) {
        for (var j=0; j<n; j++) {
          if (table[num][i][j] == "◯") {
            if (branch) {
              a += "<td><span class='red-text'>◯</span></td>"
            } else {
              if (num == 0) {
                a += `<td><select name=${j}_${i}_nil${str_tr}`
              } else if (num == 1) {
                a += `<td><select name=nil_${i}_${j}${str_tr}>`
              } else {
                a += `<td><select name=${j}_nil_${i}${str_tr}`
              }
            }

          } else if (table[num][i][j] == "×") {
            if (branch) {
              a += "<td><span class='blue-text'>×</span></td>"
            } else {
              if (num == 0) {
                a += `<td><select name=${j}_${i}_nil${str_fa}`
              } else if (num == 1) {
                a += `<td><select name=nil_${i}_${j}${str_fa}`
              } else {
                a += `<td><select name=${j}_nil_${i}${str_fa}>`
              }
            }

          } else {
            if (branch){
              a += "<td>nil</td>"
            } else {
              if (num == 0) {
                a += `<td><select name=${j}_${i}_nil${string}`
              } else if (num == 1) {
                a += `<td><select name=nil_${i}_${j}${string}`
              } else {
                a += `<td><select name=${j}_nil_${i}${string}`
              }
            }
          }
        }
        a = "<tr>" + a + "</tr>"
      }
      answer[num] = a
    }
    /*
    if (branch) {
      $('#answer1').html(answer[0])
      $('#answer2').html(answer[1])
      $('#answer3').html(answer[2])
    } else {
      $('#input1').html(answer[0])
      $('#input2').html(answer[1])
      $('#input3').html(answer[2])
    }
    */
    return table
  }

  //truth情報を受け取りその◯がある列に存在するnilを除外する（×で埋める）
  function exclution(truth,lies,n) {
    answer = []
    compass = {0:[1,2], 1:[0,2], 2:[0,1]} //nilindex:書き換えるべきindex

    truth.forEach(function(data) {
      var c_data = compass[data.indexOf("nil")]

      for (var x=0; x<n; x++) {
        for (var num=0; num<2; num++) {
          var possi = Object.assign([],data)
          possi[c_data[num]] = String(x)

          if (possi+"" != data+"") {
            answer.push(possi)
          }
        }
      }
    });

    uniq = function(items, key) {
      var set = {};
      return items.filter(function(item) {
        var k = key ? key.apply(item) : item;
        return k in set ? false : set[k] = true;
      })
    }
    answer = uniq(answer.concat(lies), [].join)

    list = []
    answer.forEach(function(a,i) {
      truth.forEach(function(t) {
        if (a+"" == t+"") {
          list.push(i)
        }
      });
    });
    list.forEach(function(l,i) {
      answer.splice((l-i),1)
    })

    var l = data1.length
    console.log("l", l)

    data1 = uniq(data1.concat(answer))

    var d_answer2 = Array(data1.length - l)
    d_answer2.fill(false)
    data2 = data2.concat(d_answer2)

    return uniq(answer.concat(truth), [].join)

    return answer
  }

  //×がn-1こ存在する列のnilを丸にする
  function confirm(table,truth,n) {
    answer = []
    compass = {0:[1,0],1:[1,2],2:[2,0]}

    for (var ta_num=0; ta_num<3; ta_num++) {
      for (var x=0; x<n; x++) {
        row = table[ta_num][x]
        column = []
        c_data = compass[ta_num]

        for (var y=0; y<n; y++) {
          column.push(table[ta_num][y][x])
        }
        if (row.filter(function(x){return x==="×"}).length == n-1 && row.filter(function(x){return x===0}).length == 1) {
          a = ["nil","nil","nil"]
          a[c_data[0]] = String(x)
          a[c_data[1]] = String(row.indexOf(0))
          answer.push(a)
        }
        if (column.filter(function(x){return x==="×"}).length == n-1 && column.filter(function(x){return x===0}).length == 1) {
          a = ["nil","nil","nil"]
          a[c_data[0]] = String(column.indexOf(0))
          a[c_data[1]] = String(x)
          answer.push(a)
        }

      }
    }

    uniq = function(items, key) {
      var set = {};
      return items.filter(function(item) {
        var k = key ? key.apply(item) : item;
        return k in set ? false : set[k] = true;
      })
    }

    var l = data1.length
    console.log("l", l)

    data1 = uniq(data1.concat(answer))

    var d_answer2 = Array(data1.length - l)
    d_answer2.fill(true)
    data2 = data2.concat(d_answer2)

    return uniq(answer.concat(truth), [].join)


  }

  //table[1]を受け取り縦横反転させたtable[3]を送り返す
  function virtual_table(table,n) {
    answer = JSON.parse(JSON.stringify((new Array(n)).fill((new Array(n).fill(0)))))

    for (var i=0; i<n; i++) {
      row = table[i]
      row.forEach(function(val,index) {
        answer[index][i] = val
      })
    }
    return answer
  }

  //メイン関数　truth情報から丸になる可能性のあるnilをリストアップし、可能性のないものを×に書き換える
  function capture(table,truth,lies,n) {
    var answer = []
    compass = {2:[[1,2],[1,0],[1,0,2]],0:[[0,4],[1,2],[1,2,0]],1:[[3,0],[2,0],[0,2,1]]} //nilindex:[[横列検索,縦列検索するta_num], []]

    truth.forEach(function(tr) {
      a1 = ["nil","nil","nil"]
      a2 = ["nil","nil","nil"]
      list = []
      table[3] = virtual_table(table[1],n)
      table[4] = virtual_table(table[2],n)
      c_data = compass[tr.indexOf("nil")]
      possi_row = table[c_data[0][0]][Number(tr[c_data[1][0]])] //横列格納
      possi_column = [] //縦列格納

      for (var i=0; i<n; i++) {
        possi_column.push(table[c_data[0][1]][i][Number(tr[c_data[1][1]])])
      }

      for (var i=0; i<n; i++) {
        count = 0
        if (possi_row[i] == "×") {count += 1}
        if (possi_column[i] == "×") {count += 1}
        list.push(count)
      }

      list.forEach(function(c,index) {
        if (c == 1) {
          a1[c_data[2][0]] = tr[c_data[2][0]]
          a1[c_data[2][2]] = String(index)
          a2[c_data[2][1]] = tr[c_data[2][1]]
          a2[c_data[2][2]] = String(index)
          answer.push(a1.concat())
          answer.push(a2.concat())
        }
      })
    })
    uniq = function(items, key) {
      var set = {};
      return items.filter(function(item) {
        var k = key ? key.apply(item) : item;
        return k in set ? false : set[k] = true;
      })
    }
    return uniq(answer.concat(lies),[].join)
  }

  function input() {
    display(truth,lies,n,false)
  }

  function processing() {
    var branch = 1

    while (branch == 1) {
      lies = exclution(truth,lies,n)

      lies = capture(table,truth,lies,n)


      table = display(truth,lies,n,true)

      truth = confirm(table,truth,n)

      table = display(truth,lies,n,true)

      before.splice(3,1)
      before.splice(3,1)

      if (before+"" == table+"") {
        branch = 0
      } else {
        before = table
      }
    }


    input()
    $('#finish_btn').show()
    $('#input_btn').show()
    $('#input_btn').click(function() {
      $('#input_wrapper').show()
      $("#answer_wrapper").hide()
    })

  }

//------------------------------------------------------------------------------

  f_t = $('#truth').text()
  f_l = $('#lies').text()

  truth = data_processing(f_t);
  lies = data_processing(f_l);
  $('#input_wrapper').hide()

  f_t = f_t.slice(1,-1).replace(/"/g,"").replace(/ /g,"")
  f_t = f_t.split(",")
  f_l = f_l.slice(1,-1).replace(/"/g,"").replace(/ /g,"")
  f_l = f_l.split(",")

  //console.log("ary", ary)


  lies = exclution(truth,lies,n)

  table = display(truth,lies,n)

  truth = confirm(table,truth,n)

  table = display(truth,lies,n)
  before = table



//------------------------------------------------------------------------------



  processing()


  //console.log("truth", truth)
  //console.log("↓lies")
  //console.log(lies)
  //console.log(table)

  init(n)

  console.log("data1", data1)

  console.log("data2", data2)

  f_t.forEach(function(t) {
    console.log("t", t)
    write(t,true)
  })
  f_l.forEach(function(l) {
    write(l,false)
  })



  $('#next_btn').click(function() {


    var count = 0;
    var countup = function(){
      console.log(count)

      var x = data1[count]
      var y = data2[count]

      x = x.join('_')

      console.log("x", x)
      console.log("y", y)

      write(x,y)

      count++
    }
    var id = setInterval(function(){
      countup();
      if(count >= data2.length){　
        clearInterval(id);　//idをclearIntervalで指定している
      }}, 1);
  })


});
