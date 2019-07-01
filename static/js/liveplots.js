// key: trace1=ETHBTC , trace2=EOSBTC , trace3=BCCBTC , trace4=BNBBTC
// trace5=LTCBTC , trace6=XRPBTC

// URL to help resolve CORS issue 
var proxyurl = "https://cors-anywhere.herokuapp.com/";

// url endpoint for live ticker price 
var url = "https://flask-crypto.herokuapp.com/api/v1.0/cryptosies"

fetch(proxyurl + url).then(function(request) {
  return request.json();
  }).then(function(response) {
  // check JSON response
  // console.log(response);

  var data = response.items;
  //console.log(data);

  var filter1 = data.filter(data => data.symbol == "ETHBTC");
  var price1 = filter1.map(row => row.price);
  var date = filter1.map(row => row.crypto_timestamp)
  console.log(price1);
  console.log(date);

  var filter2 = data.filter(data => data.symbol == "EOSBTC");
  var price2 = filter2.map(row => row.price);
  console.log(price2);

  var filter3 = data.filter(data => data.symbol == "BCCBTC");
  var price3 = filter3.map(row => row.price);
  console.log(price3);

  var filter4 = data.filter(data => data.symbol == "BNBBTC");
  var price4 = filter4.map(row => row.price);
  console.log(price4);

  var filter5 = data.filter(data => data.symbol == "LTCBTC");
  var price5 = filter5.map(row => row.price);
  console.log(price5);

  var filter6 = data.filter(data => data.symbol == "XRPBTC");
  var price6 = filter6.map(row => row.price);
  console.log(price6);

  var filter7 = data.filter(data => data.symbol == "XRPBTC");
  var timestamp = filter7.map(row => row.crypto_timestamp)
  console.log(timestamp);

  document.getElementById("ETH-price").innerHTML = price1;
  document.getElementById("EOS-price").innerHTML = price2;
  document.getElementById("BCC-price").innerHTML = price3;
  document.getElementById("BNB-price").innerHTML = price4;
  document.getElementById("LTC-price").innerHTML = price5;
  document.getElementById("XRP-price").innerHTML = price6;

  document.getElementById("timestamp").innerHTML = date;

});


// url endpoint for live data 
var live_data_url = "https://flask-crypto.herokuapp.com/api/v1.0/livedata" 
function buildPlot () { 

  d3.json(proxyurl + live_data_url).then(function (d) {
    //console.log(d);
    var livedata = d.dataset;
    //console.log(livedata);

    var ethBTC = livedata.filter(livedata => livedata.symbol == "ETHBTC");
    var ethBTC_prices = ethBTC.map(row => row.price);
    var ethBTC_date = ethBTC.map(row => row.crytodatetime);

    var startdate = ethBTC_date[0];
    var enddate = ethBTC_date.slice(-1)[0];
    console.log(ethBTC_date);
    console.log(startdate);
    console.log(enddate);


    var eosBTC = livedata.filter(livedata => livedata.symbol == "EOSBTC");
    var eosBTC_prices = eosBTC.map(row => row.price);
    //console.log(eosBTC_prices);

    var bccBTC = livedata.filter(livedata => livedata.symbol == "BCCBTC");
    var bccBTC_prices = bccBTC.map(row => row.price);
    // console.log(bccBTC_prices);

    var bnbBTC = livedata.filter(livedata => livedata.symbol == "BNBBTC");
    var bnbBTC_prices = bnbBTC.map(row => row.price);
    // console.log(bnbBTC_prices);

    var ltcBTC = livedata.filter(livedata => livedata.symbol == "LTCBTC");
    var ltcBTC_prices = ltcBTC.map(row => row.price);
    // console.log(ltcBTC_prices);

    var xrpBTC = livedata.filter(livedata => livedata.symbol == "XRPBTC");
    var xrpBTC_prices = xrpBTC.map(row => row.price);
    // console.log(xrpBTC_prices);


    var trace1 = {
        x: ethBTC_date,
        y: ethBTC_prices,
        type: "scatter",
        mode: "line",
        name: "ETHBTC"
      }

    var trace2 = {
        x: ethBTC_date,
        y: eosBTC_prices,
        type: "scatter",
        mode: "lines",
        name: "EOSBTC"
      }
    var trace3 = {
      x: ethBTC_date,
      y: bccBTC_prices,
      type: "scatter",
      mode: "lines",
      name: "BCCBTC"
    }
    var trace4 = {
      x: ethBTC_date,
      y: bnbBTC_prices,
      type: "scatter",
      mode: "lines",
      name: "BNBBTC"
    }
    var trace5 = {
      x: ethBTC_date,
      y: ltcBTC_prices,
      type: "scatter",
      mode: "lines",
      name: "LTCBTC"
    }
    var trace6 = {
      x: ethBTC_date,
      y: xrpBTC_prices,
      type: "scatter",
      mode: "lines",
      name: "XRPBTC"
    }

    var layout = {
      title: `Live BTC Prices`,
      xaxis: {
        range: [startdate, enddate], 
        autorange: true,
        type: "date"
      },
      yaxis: {
        title: {
            text: 'Alt Price'
        },
        autorange: true,
        type: "linear"
    }
    }
    var plotdata = [trace1, trace2, trace3, trace4, trace5, trace6];
      

    Plotly.newPlot("linePlot", plotdata, layout);
    });
}; 

buildPlot();