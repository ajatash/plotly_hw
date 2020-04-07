function buildCharts (sample) {
  d3.json("./static/samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObject => sampleObject.id == sample);
    var result = resultArray[0];
    var otu = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    var sample_id = result.id;
    


    var bubbleLayout = {
      title: "Title",
      margin: { t: 0},
      hovermode: "closest",
      xaxis: { title: "x title"},
      margin: { t: 10}
      
    };

    var bubbleData = [
      {
        x: otu,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu,
          colorscale: "Earth"
        }
      }
    ];

    var barLayout = {
        title: "Top Ten OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU ID" }
    };

    var barData = [
      {
        x: sample_values,
        y: otu,
        type: "bar",
        name: "Top Ten OTUs",
        orientation: "h",
        hovertext: otu_labels
      }
    ]; 

    

    
   
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    Plotly.newPlot("bar", barData, barLayout);

});
};

function buildMetadata (sample) {
  d3.json("./static/samples.json").then((data) => {
  var metaData = data.metadata;
  var demoData = metaData.filter(sampleObject => sampleObject.id == sample);
  var demo = demoData[0]
  var id = demo.id;
  var ethnicity = demo.ethnicity;
  var gender = demo.gender;
  var age = demo.age;
  var location = demo.location;
  var bbtype = demo.bbtype;
  var wfreq = demo.wfreq;

  var list = d3.select("#sample-metadata");
  list.html("");


  list.append("li").text(`id: ${id}`);
  list.append("li").text(`ethnicity: ${ethnicity}`);
  list.append("li").text(`gender: ${gender}`);
  list.append("li").text(`age: ${age}`);
  list.append("li").text(`location: ${location}`);
  list.append("li").text(`bbtype ${bbtype}`);
  list.append("li").text(`wfreq: ${wfreq}`);
});
}; 

function init1() {
  var dropdownMenu = d3.select("#selDataset");
  d3.json("./static/samples.json").then((data) => {
    var sample_names = data.names;
    sample_names.forEach((sample) => {
      dropdownMenu
      .append("option")
      .text(sample)
      .property("value", sample);
    });
    var first_sample = sample_names[0];
    buildCharts(first_sample);
    buildMetadata(first_sample);
  });
};


d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {

  var newSample = d3.select(this).property('value'),
  newData = buildCharts(newSample);
  newTable = buildMetadata(newSample)

};

init1();