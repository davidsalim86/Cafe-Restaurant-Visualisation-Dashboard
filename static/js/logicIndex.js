console.log("fuck you")

function buildPlot(yearSelection) {
    //load json data 
    d3.json("/api/businessyear").then(function(data) {
       
        // varaibles

        var bchartIndustry = []
        var bchartSeats = []
        // **************************************
        // OVERALL STATS
        // **************************************

        // HTML objects

        var tEstablishments = document.getElementById('tEstablishments');
        var tOutdoor = document.getElementById('tOutdoor');
        var tIndoor = document.getElementById('tIndoor');


        var address = data[0].trading_name;
        console.log(address)


        // *************************
        // Industry Seat Count Chart
        // *************************
        d3.json("/api/seats_per_industry").then(function(data) {
            console.log(data)

            for ( i = 0; i < data.length; i++) {
                bchartIndustry.push(data[i].industry_anzsic4_description);
                bchartSeats.push(data[i].number_of_seats);
              }
            
              var hozBarData = [{
                // x is OTU ID of the top 10 samples
                y: bchartIndustry.reverse(),
                // y is OTU sample values ( it is in the same order as the id)
                x: bchartSeats.reverse(),
                text: bchartSeats.reverse(),
                type: "bar",
                orientation: "h",
            }];

            var hozBarLayout = {

                title:`Total Seat Counts Per Industry in Year :XXX`,
                xaxis: { title: "Seat Count" },
                yaxis: { title: "Industry" }
            };

            Plotly.newPlot('bar', hozBarData, hozBarLayout)

        });



        // *************************
        // UPDATE TOTAL VALUES
        // *********************

        // call flask ruote which returns total establishment count
        d3.json("/api/total_esta").then(function(totalData) {
            tEstablishments.innerHTML = totalData;
        });

        // outdoor
        d3.json("/api/total_outdoor").then(function(totalData) {
            tOutdoor.innerHTML = totalData;
        });

        //indoor
        d3.json("/api/total_indoor").then(function(totalData) {
            tIndoor.innerHTML = totalData;
        });


    });
};

// // creating dropdown menu function
// function createDropdown(){
//         d3.json("samples.json").then(function(data) {
//             // gets the list of sample ids then for each id in the list, create an option html tag with the id as the value and id
//             var sample_id_list = data.names;
//             sample_id_list.forEach(data => {
//                 d3.select("#selDataset").append("option").text(data).property("value", data);
//         })

//     })       
// };

// createDropdown();
buildPlot(2019);
