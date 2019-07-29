var React = require("react");
var Chartist = require("chartist");

function WPMChart(data) {
	var chart = new Chartist.Line(
		".ct-chart",
		{
			labels: [],
			series: data
		},
		{
			showPoint: false,
			showLine: true,
			showArea: false,
			fullWidth: true,
			showLabel: false,
			axisX: {
				showGrid: false,
				showLabel: false,
				offset: 0
			},
			axisY: {
				showGrid: false,
				showLabel: false,
				offset: 0
			},
			chartPadding: 0,
			low: 0
		}
	);

	return <div className="ct-chart ct-perfect-fourth">{chart}</div>;
}

export default WPMChart;
