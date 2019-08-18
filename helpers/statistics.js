const analyze = (keyEvents, auto_pause_delay) => {
	const correctEvents = keyEvents.filter(event => event.wpmCounter === 1);

	var accumulated_pause_time = 0;
	var lastEvent = null;
	keyEvents.forEach(event => {
		if (lastEvent != null) {
			time_gap = event.timestamp - lastEvent.timestamp;
			if (time_gap > auto_pause_delay) {
				accumulated_pause_time += time_gap;
			}
		}
		lastEvent = event;
	});

	var wordsTyped = 0;
	correctEvents.forEach(event => {
		if (lastEvent != null) {
			if (lastEvent.word != event.word) {
				wordsTyped += 1;
			}
		}
		lastEvent = event;
	});

	const first_time = keyEvents[0].timestamp;
	const last_time = keyEvents[keyEvents.length - 1].timestamp;
	const total_time = last_time - first_time;

	const total_time_minus_gaps = total_time - accumulated_pause_time;

	charsTyped = correctEvents.length;
	accuracy = correctEvents.length / keyEvents.length;

	return {
		wordsTyped: wordsTyped,
		charsTyped: charsTyped,
		accuracy: accuracy,
		totalTime: total_time_minus_gaps
	};
};

exports.auto_pause_delay = 1000;
exports.analyze = analyze;
