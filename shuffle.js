var results = {"abc":0,"acb":0,"bac":0,"bca":0,"cab":0,"cba":0};
var current_results = results;
var shuffleTimes = 10000;
function shuffle(array) {
	array.forEach(function (item) {
		// Loop through array and assign ech item a "random" number
		item.order = Math.random();
	});
	// Sort the array depending on magnitude of random variable
	array.sort(function (a,b) {return a.order < b.order});
	// Return shuffled array
	return array;
}

function test() {
	var arr = [{card: "a"}, {card: "b"}, {card: "c"}];
	var res = [];
	for (var i = 0; i < shuffleTimes; i++) {
		res = shuffle(arr);
		increment(res);
	}
}
function increment(res) {
	var str = '';
	res.forEach(function (item) {
		str+=item.card
	});
	results[str]++;
	current_results[str]++;
}

$(document).ready(function(){
	var tests = 0, total = 0, chi = 0;
	var expected_deviation = 1/6;

	$('#runTest').click(function () {
		$('#runTest').text('Run Again');
		$('.pass').css('display', 'none');
		$('.fail').css('display', 'none');
		current_results = {"abc":0,"acb":0,"bac":0,"bca":0,"cab":0,"cba":0};
		test();
		tests++;
		total = tests * shuffleTimes;
		chi = 0;
		$('.allcount').text('Total: ' + total + ' Shuffles');
		for (var res in results) {
			var selector = '#'+res;
			var percent = results[res] / total;
			$(selector+' .magnitude').width(current_results[res]/4);
			$(selector+' .count').text(current_results[res]);
			$(selector+'-percent').text((percent*100).toFixed(4) + '%');
			// Pearson's cumulative test statistic
			chi += ((results[res]-(expected_deviation*total))*(results[res]-(expected_deviation*total)))/(expected_deviation*total);
		}
		$('#chi').text(chi);
		if (chi > 11.07) {$('.fail').css('display', 'inline');}
		else {$('.pass').css('display', 'inline');}
	})
});




