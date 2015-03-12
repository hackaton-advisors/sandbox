
angular.module('FundDataCtrl', []).controller('FundDataController', function($scope) {

    $scope.tagline = 'CHARTS here also!!!';

});
angular.module("app", ["chart.js"]).controller("LineCtrl", function ($scope) {

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  function ChartController($scope) {
	$scope.data1 = {
		series: ['Sales', 'Income', '<i>Expense</i>', 'Laptops', 'Keyboards'],
		data: [{
			x: "Sales",
			y: [100, 500, 0],
			tooltip: "this is tooltip"
		}, {
			x: "Not Sales",
			y: [300, 100, 100]
		}, {
			x: "Tax",
			y: [351]
		}, {
			x: "Not Tax",
			y: [54, 0, 879]
		}]
	};

	$scope.data2 = {
		series: ['<em>500</em> Keyboards', '<em>105</em> Laptops', '<em>100</em> TVs'],
		data: [{
			x: "Sales",
			y: [100, 500, 0],
			tooltip: "this is tooltip"
		}, {
			x: "Income",
			y: [300, 100, 100]
		}, {
			x: "Expense",
			y: [351, 50, 25]
		}]
	}

	$scope.chartType = 'bar';

	$scope.config1 = {
		labels: false,
		title: "Products",
		legend: {
			display: true,
			position: 'left'
		},
		innerRadius: 0
	};

	$scope.config2 = {
		labels: false,
		title: "HTML-enabled legend",
		legend: {
			display: true,
			htmlEnabled: true,
			position: 'right'
		},
		lineLegend: 'traditional'
	}
}
});
    