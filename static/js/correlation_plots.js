// Submit Button handler
function handleSubmit() {
  
    // prevent the page from refreshing
    d3.event.preventDefault();

    var firstBTC = d3.select("#firstCurrency").node().value;
    var secondBTC = d3.select("#secondCurrency").node().value;
    
    // clear the input value
    //d3.select("#firstCurrency").node().value = "";
    //d3.select("#secondCurrency").node().value = "";
  
    // build the plot with the new BTC currencies
    buildPlot(firstBTC, secondBTC);
  }


function buildPlot(firstBTC, secondBTC) {

    // url of each BTC independent API
    var first_BTC_url = `/live_data_trace1/${firstBTC}`;
    var second_BTC_url = `/live_data_trace2/${secondBTC}`;

    // create dictionary to hold data values 
    d = {}

    // request response for first BTC and then
    // create price, dates as key-value pair to dictionary
    d3.json(first_BTC_url).then(function(first_response) {
        var first_BTC_price = first_response["price"];
        var dates = first_response["crypto_timestamp"]
        d["first_BTC_price"] = first_BTC_price; 
        d["dates"] = dates;

    });

    // request response for second BTC and then 
    // create price as another key-value pair to dictionary
    d3.json(second_BTC_url).then(function(second_response) {
        var second_BTC_price = second_response["price"];
        d["second_BTC_price"] = second_BTC_price;


        // create variables from dictionary
        var first = d.first_BTC_price;
        var second = d.second_BTC_price;
        var dates = d.dates;
        var startdate = d['dates'][0];
        var enddate = d['dates'].slice(-1)[0];

        // Dates and prices are reversed(?), so reverse the data
        var rfirst = first.reverse();
        var rsecond = second.reverse();
        var rdates = dates.reverse();

        // confirm data
        console.log(first);
        console.log(second);
        console.log(dates);
        console.log(startdate);
        console.log(enddate);

        // create first trace 
        var trace1 = {
        type: "scatter",
        mode: "lines",
        x: rdates,
        name: `${firstBTC} Closing Price`,
        y: rfirst,
        line: {
          color: "#17BECF"
            }
        };
        
        // create second trace 
        var trace2 = {
        type: "scatter",
        mode: "lines",
        x: rdates,
        name: `${secondBTC} Closing Price`,
        y: rsecond,
        line: {
          color: "#3517cf"
            }
        };  

        var data = [trace1, trace2];

        var layout = {
            margin: {   
                t: 25, 
                b: 40, 
                }, 
            title: `Closing Prices between ${firstBTC} and ${secondBTC}`,
            xaxis: {
                range: [startdate, enddate],
                type: "date"
            },
    
            yaxis: {
                title: {
                    text: 'Bitcoin Price'
                }, 
                autorange: true,
                type: "linear"
            }
            };
            
        Plotly.newPlot("plot", data, layout);
    });
   
};

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);