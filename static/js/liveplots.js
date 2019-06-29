// key: trace1=ETHBTC , trace2=EOSBTC , trace3=BCCBTC , trace4=BNBBTC
// trace5=LTCBTC , trace6=XRPBTC
// 

var dt = new Date();
document.getElementById("timestamp").innerHTML = dt.toLocaleTimeString();


var data = {"items":[
{"symbol":"ETHBTC", "price": 0.001234, "crypto_timestamp": "2019-06-26T23:34:04"},
{"symbol":"EOSBTC", "price": 0.005303, "crypto_timestamp": "2019-06-26T23:34:04"},
{"symbol":"BCCBTC", "price": 0.014932, "crypto_timestamp": "2019-06-26T23:34:04"},
{"symbol":"BNBBTC", "price": 0.023421, "crypto_timestamp": "2019-06-26T23:34:04"},
{"symbol":"LTCBTC", "price": 0.045653, "crypto_timestamp": "2019-06-26T23:34:04"},
{"symbol":"XRPBTC", "price": 0.073211, "crypto_timestamp": "2019-06-26T23:34:04"},
]};

var response = data.items;
var traceerror = [];


var filter1 = response.filter(response => response.symbol == "ETHBTC");
var price1 = filter1.map(row => row.price);
var date = filter1.map(row => row.crypto_timestamp)
console.log(price1);

var filter2 = response.filter(response => response.symbol == "EOSBTC");
var price2 = filter2.map(row => row.price);
console.log(price2);

var filter3 = response.filter(response => response.symbol == "BCCBTC");
var price3 = filter3.map(row => row.price);
console.log(price3);

var filter4 = response.filter(response => response.symbol == "BNBBTC");
var price4 = filter4.map(row => row.price);
console.log(price4);

var filter5 = response.filter(response => response.symbol == "LTCBTC");
var price5 = filter5.map(row => row.price);
console.log(price5);

var filter6 = response.filter(response => response.symbol == "XRPBTC");
var price6 = filter6.map(row => row.price);
console.log(price6);

var trace1 = {
  x: date,
  y: price1,
  type: "scatter",
  mode: "lines",
  name: "ETHBTC"
}
var trace2 = {
  x: date,
  y: price2,
  type: "scatter",
  mode: "lines",
  name: "EOSBTC"
}
var trace3 = {
  x: date,
  y: price3,
  type: "scatter",
  mode: "lines",
  name: "BCCBTC"
}
var trace4 = {
  x: date,
  y: price4,
  type: "scatter",
  mode: "lines",
  name: "BNBBTC"
}
var trace5 = {
  x: date,
  y: price5,
  type: "scatter",
  mode: "lines",
  name: "LTCBTC"
}
var trace6 = {
  x: date,
  y: price6,
  type: "scatter",
  mode: "lines",
  name: "XRPBTC"
}

var plotdata = [trace1, trace2, trace3, trace4, trace5, trace6];

Plotly.newPlot("linePlot", plotdata)

// appending prices to cards

document.getElementById("ETH-price").innerHTML = price1;
document.getElementById("EOS-price").innerHTML = price2;
document.getElementById("BCC-price").innerHTML = price3;
document.getElementById("BNB-price").innerHTML = price4;
document.getElementById("LTC-price").innerHTML = price5;
document.getElementById("XRP-price").innerHTML = price6;


// /appending prices to cards


// d3 card animations



// /d3 card animations