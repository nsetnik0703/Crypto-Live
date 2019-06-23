function buildCharts(correctedCurrency) {

    var url = `/historical_data/${correctedCurrency}`

    d3.json(url).then(function(response) {
        var dates = response['Date'];
        var rdates = dates.reverse();
        var startdate = response['Date'][0];
        var enddate = response['Date'].slice(-1)[0];
        var closingPrices = response['Close'];
        var rclosingPrices = closingPrices.reverse();

        // console.log(rdates);
        // console.log(rclosingPrices);
        // console.log(startdate);
        // console.log(enddate);

        // BTC currency trace 
        var trace1 = {
            type: "scatter",
            mode: "lines",
            x: rdates,
            name: "Closing Price",
            y: rclosingPrices,
            line: {
              color: "#17BECF"
            }
          };
      
        // Candlestick trace
        var trace2 = {
            type: "candlestick",
            x: rdates,
            close: rclosingPrices
        };  

        var data = [trace1, trace2];
      
        var layout = {
            dragmode: 'zoom',
            margin: {   
                t: 25, 
                b: 40, 
              }, 
            title: `${correctedCurrency} closing prices`,
            xaxis: {
                autorange: true,
                range: [startdate, enddate], 
                rangeslider: {range: [startdate, enddate]}, 
                type: "date"
            },

            yaxis: {
                autorange: true,
                type: "linear"
            }
          };
      
        Plotly.newPlot("scatter", data, layout);
       
    });
        

};

function init() {

    // grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // use the list of sample names to populate the select options
    d3.json("/BTC").then((btc_names) => {
        //console.log(btc_names);
        btc_names.forEach((btc) => {
            selector
            .append("option")
            .text(btc)
            .property("value", btc);
        });

    // build first plot 
    const firstCurrency = btc_names[0];
    buildCharts(firstCurrency);
    });

};

function optionChanged(newCurrency) {
     buildCharts(newCurrency);
};

init();