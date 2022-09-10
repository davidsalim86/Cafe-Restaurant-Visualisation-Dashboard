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

        console.log(data);
        var address = data[0].trading_name;

        console.log(address)

        // call flask ruote which returns total establishment count
        d3.json("/api/total_esta").then(function(totalData) {
            console.log(totalData)
            tEstablishments.innerHTML = totalData;
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
