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
                title: {
                    text: 'Price (USD)'
                },
                autorange: true,
                type: "linear"
            }
          };
      
        Plotly.newPlot("scatter", data, layout);
       
    });
    
    // about panel
    var selectPanel = d3.select("#selDataset option:checked").text();
    // console.log(selectPanel)

    var selectDiv = d3.select("#about").html('');
    var newText = document.createElement("p");
    newText.style.color = "#fff";

    if (selectPanel == "XRP") {
        newText.appendChild(document.createTextNode(`Ripple also called XRP coin is traded throughout many different cryptocurrency exchanges and is one of the top traded coins now. Ripple was initially launched in 2012 and is already a revenue producing company with over 100 financial situations and banks on its blockchain network, including JP Morgan and Bank of America. The Ripple network is an open payment network for digital currency as well as a holding company. Ripple aims to create and enable a global network of financial institutions and banks to use Ripple software to lower cost of international payments. Ripple calls this global network the "Internet of Value" and operates on the XRP ledger which is an open source product created by Ripple. Ripple allows a secured and cheap way to move money around in a very fast and cheap way for business and for people.`));
    }

    else if (selectPanel == "ETH") {
        newText.appendChild(document.createTextNode(`Ethereum (ETH) is an open platform that enables developers to build and deploy decentralized applications, Ethereum allows participants to run decentralized blockchain applications called Smart contracts! Smart contracts are highly secure and run with a perfect digital history making them auditable since these smart contracts can be programmed without any chance of downtime censorship or fraud. The Ethereum blockchain and smart contracts form a shared global supercomputer that can move/send value across the world, represent ownership & transmit tokenized assets and digitize many more complex financial applications. This allows developers to create many things all without a middleman and all immutable much like what the internet did for information, Ethereum has the power to open up the financial system to the world and build a safer more accessible and fair economy for everyone to participate in.`));
    }

    else if (selectPanel == "LTC") {
        newText.appendChild(document.createTextNode(`Litecoin (LTC) is one of the oldest cryptocurrencies in existence after Bitcoin, having launched in October 2011. It was developed by Charlie Lee, who remains involved with the coin to this day. Litecoin is a codebase fork of Bitcoin which means it doesn't share any history or connection to the Bitcoin genesis block. As a fork, it has many similar characteristics to Bitcoin, but has opted for shorter block generations times of around 2.5 minutes. This allows transactions to be added to the blockchain sooner. Because of the decreased block generation time, it quadrupled its base supply to 84 million to compensate for the inflation rate. Currently, Litecoin has lower transaction fees than Bitcoin and can be used as a digital currency on the web to pay for goods and services and to play at crypto casinos. The value of Litecoin has grown significantly, and the currency’s market cap now exceeds $4 billion. Part of Litecoin’s surge in popularity in 2017 has been attributed to the currency being able to adopt and test a number of new features before Bitcoin, such as Segregated Witness and the Lightning Network, technology which allows the network to process more transactions.`));
    }

    else if (selectPanel == "BCC") {
        newText.appendChild(document.createTextNode(`Bitcoin Cash (BCC)/BCH is a hard forked version of the original Bitcoin. It is similar to bitcoin with regards to its protocol; Proof of Work SHA-256 hashing, 21,000,000 supply, same block times and reward system. However, two main differences are the block size limits, as of August 2017 Bitcoin has a 1MB block size limit whereas (BCC)/BCH  proposes 8MB blocks. Also, (BCC)/BCH  will adjust the difficulty every 6 blocks as opposed to 2016 blocks as with Bitcoin. 
        
        Bitcoin Cash is a proposal from the via BTC mining pool and the Bitmain mining group to carry out a UAHF (User Activated Hard Fork) on August 1st 12:20 pm UTC. They rejected the agreed consensus (aka BIP-91 or SegWit2x) and have decided to fork the original Bitcoin blockchain and create this new version called “Bitcoin Cash”. Bitcoin Cash can be claimed by BTC owners who have their private keys or store their Bitcoins on a service that will split (BCC)/BCH  for the customer.`));
    }

    else if (selectPanel == "EOS") {
        newText.appendChild(document.createTextNode(`EOS.IO is software that introduces a blockchain architecture designed to enable vertical and horizontal scaling of decentralized applications (the “EOS.IO Software”). This is achieved through an operating system-like construct upon which applications can be built. The software provides accounts, authentication, databases, asynchronous communication and the scheduling of applications across multiple CPU cores and/or clusters. The resulting technology is a blockchain architecture that has the potential to scale to millions of transactions per second, eliminates user fees and allows for quick and easy deployment of decentralized applications.`));
    }

    else {
        newText.appendChild(document.createTextNode(`BIONIC (BNC) provides a secured platform for storing and processing digital
        transactions in a secure and transparent way – absolutely SCAM
        FREE. Our system is based on the Ethereum Blockchain application
        platform implemented by Private Instant Verified Transaction. Our
        protocol does what Bitcoin cannot do, it converts publicly viewable
        PIV into anonymous PIV therefore, whenever users want to spend
        his/her token i.e. sending from User A to User, the token will be
        received without history of where the PIV originated from.
        `));
    }

    // console.log(newText);

    selectDiv.node().appendChild(newText);  

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