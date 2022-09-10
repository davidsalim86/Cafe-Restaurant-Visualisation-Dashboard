console.log("fuck you")

function buildPlot(yearSelection) {
    //load json data 
    d3.json("/api/businessyear").then(function(data) {
       
        // varaibles
        // **************************************
        // OVERALL STATS
        // **************************************

        var total_indoor_seats = 0;
        var total_outdoor_seats = 0;
        var total_establishments = 0;


        // HTML objects

        var tEstablishments = document.getElementById('tEstablishments');
        var tOutdoor = document.getElementById('tOutdoor');
        var tIndoor = document.getElementById('tIndoor');

        console.log(data);
        var address = data[0].trading_name;

        console.log(address)


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
