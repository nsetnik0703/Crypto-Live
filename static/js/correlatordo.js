console.log("Script is here");

// /** 
// * @param {array} rows
// * @param {integer} index

// */
var tbody = d3.select("tbody");
var row = tbody.append("tr");
var cell = tbody.append("td");

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  };

function getPearsonCorrelation(x, y) {
  var shortestArrayLength = 0;
    
  if(x.length == y.length) {
      shortestArrayLength = x.length;
  } else if(x.length > y.length) {
      shortestArrayLength = y.length;
      console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
  } else {
      shortestArrayLength = x.length;
      console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
  }

  var xy = [];
  var x2 = [];
  var y2 = [];

  for(var i=0; i<shortestArrayLength; i++) {
      xy.push(x[i] * y[i]);
      x2.push(x[i] * x[i]);
      y2.push(y[i] * y[i]);
  }

  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_x2 = 0;
  var sum_y2 = 0;

  for(var i=0; i< shortestArrayLength; i++) {
      sum_x += x[i];
      sum_y += y[i];
      sum_xy += xy[i];
      sum_x2 += x2[i];
      sum_y2 += y2[i];
  }

  var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
  var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
  var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
  var step4 = Math.sqrt(step2 * step3);
  var answer = step1 / step4;

  console.log(answer);
  var row = tbody.append("tr");
  var cell = tbody.append("td");
  cell.text(symbol1Bro);
  var cell = tbody.append("td");
  cell.text(symbol2Bro);
  var cell = tbody.append("td");
  cell.text(datetimeBro);
  var cell = tbody.append("td");
  cell.text(shortestArrayLength);
  var cell = tbody.append("td");
  cell.text(answer);
  row.text("");
};


function respond_to_button() {
    d3.event.preventDefault();
    console.log("Your button is reacting");
    var userSelectedCrypto1 = d3.select("#firstCurrency").node().value;
    var userSelectedCrypto2 = d3.select("#secondCurrency").node().value;
    var userSelectedDateTime1 = d3.select("#firstDateTime").node().value;
    var userSelectedDateTime2 = d3.select("#secondDateTime").node().value;
    console.log(userSelectedCrypto1);
    console.log(userSelectedDateTime1);
    datetimeBro = String(userSelectedDateTime1);
    symbol1Bro = String(userSelectedCrypto1).slice(0,3);
    symbol2Bro = String(userSelectedCrypto2).slice(0,3);
    buildPlot(userSelectedCrypto1, userSelectedCrypto2, userSelectedDateTime1, userSelectedDateTime2);
};

function buildPlot(userSelectedCrypto1, userSelectedCrypto2, userSelectedDateTime1, userSelectedDateTime2) {

    // URL to help resolve CORS issue 
    var proxyurl = "https://cors-anywhere.herokuapp.com/";

    var corr_data_fetch_url = `https://flask-crypto.herokuapp.com/livedata/${userSelectedCrypto1}/${userSelectedCrypto2}/${userSelectedDateTime1}/${userSelectedDateTime2}`;

    fetch(proxyurl + corr_data_fetch_url).then(function(response) {
        console.log(response);
        return response.json();
        }).then(function(data) {

        // Grab values from the response json object to build the plots
        var symbol = unpack(data.dataset.data, 0);
        var price = unpack(data.dataset.data, 1);
        var timestamp = unpack(data.dataset.data, 2);

        // console.log(symbol);
        // console.log(price);
        // console.log(timestamp);



        var halfWayThrough = Math.floor(timestamp.length / 2)

        var symbolBrah = symbol.slice(0, halfWayThrough);
        var symbolBrah2 = symbol.slice(halfWayThrough, symbol.length);
        var priceBrah = price.slice(0, halfWayThrough);
        var priceBrah2 = price.slice(halfWayThrough, price.length);
        var datetimeBrah = timestamp.slice(0, halfWayThrough);


        minutesInt = Array.from(Array(datetimeBrah.length).keys())
        // console.log(minutesInt)

      console.log(symbolBrah)
      console.log(priceBrah);
      console.log(symbolBrah2);
      console.log(priceBrah2);

        var trace1 = {
            x: minutesInt,
            y: priceBrah,
            name: symbol1Bro,
            type: 'scatter'
          };
          var trace2 = {
            x: minutesInt,
            y: priceBrah2,
            xaxis: 'x2',
            yaxis: 'y2',
            name: symbol2Bro,
            type: 'scatter'
          };
          
          var data1 = [trace1, trace2];
          
          trace3 = {
            x: priceBrah,
            y: priceBrah2,
            name: `${userSelectedCrypto1} & ${userSelectedCrypto2}`,
            type: 'scatter',
            mode: 'markers'
          }
          
          var data2 = [trace3];
          
        var trace4 = {
            y: priceBrah,
            name: symbol1Bro,
            type: "box"
        };
        var trace5 = {
            y: priceBrah2,
            name: symbol2Bro,
            type: "box"
        };

        var data3 = [trace4];
        var data4 = [trace5];
          
        var layout = {
          grid: {rows: 1, columns: 2, pattern: 'independent'},
          xaxis: {
                title: {
                  text: 'Minutes',
                  font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                  }
                },
              },
        };
          // var layout = {
          //   xaxis: {
          //     title: {
          //       text: 'Minutes',
          //       font: {
          //         family: 'Courier New, monospace',
          //         size: 18,
          //         color: '#7f7f7f'
          //       }
          //     },
          //   },
          //   yaxis: {
          //     title: {
          //       text: `${userSelectedCrypto1} exchange rates`,
          //       }
          //     },
          //   yaxis2: {
          //     title: {
          //       text: `${userSelectedCrypto2} exchange rates`,
          //       titlefont: {color: 'rgb(148, 103, 189)'},
          //       tickfont: {color: 'rgb(148, 103, 189)'},
          //       overlaying: 'y',
          //       side: 'left'
          //     }
          //   }
          //   };
          

          var layout2 = {
            // title: {
            //   text:'Scatterplot',
            //   font: {
            //     family: 'Courier New, monospace',
            //     size: 24
            //   },
            //   xref: 'paper',
            //   x: 0.05,
            // },
            xaxis: {
              title: {
                text: symbol1Bro,
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
              },
            },
            yaxis: {
              title: {
                text: symbol2Bro,
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
              }
            }
          };

          var layout3 = {
            title: {
              text: symbol1Bro,
              font: {
                family: 'Courier New, monospace',
                size: 24
              },
              xaxis: ''
            }
          };
          var layout4 = {
              title: {
                text: symbol2Bro,
                font: {
                  family: 'Courier New, monospace',
                  size: 24
                },
                xaxis: ''
              }
            };

          Plotly.newPlot('lineplot', data1, layout);
          Plotly.newPlot('scatterplot', data2, layout2)
          Plotly.newPlot("boxplot1", data3, layout3);
          Plotly.newPlot("boxplot2", data4, layout4)




    getPearsonCorrelation(priceBrah,priceBrah2);
   
    });



};

d3.selectAll("#submit").on("click", respond_to_button);