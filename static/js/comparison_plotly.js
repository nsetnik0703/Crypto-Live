function buildPlot() {
    /* data route */
  var url = "/plot_USDBTC";
  d3.json(url).then(function(response) {

    console.log(response);

    var data = [response];

    var layout = {
      title: "USD/BTC 1 year data",
      xaxis: {
        title: "USDBTC"
      },
      yaxis: {
        title: "Price"
      }
    };
    Plotly.newPlot("plot", data, layout);
  });
}

buildPlot();