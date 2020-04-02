const timeBreakdown = (ms) => {
	/*
	Converts an integer representing number of milliseconds into a dictionary representing days, hours, minutes, seconds and milliseconds. Output numbers are rounded down to the nearest whole number.

	Parameters:
		ms (integer): number of milliseconds.

	Returns:
		(dictionary): breakdown of total days, hours, minutes, seconds and milliseconds.

	Example usage:
		>>> time_breakdown = time_breakdown(123456789)
		{'day': 1, 'hr': 10, 'min': 17, 'sec': 36, 'ms': 789} 
	*/
	const ms_out = ms % 1000;
	const sec = Math.floor((ms % (1000 * 60)) / 1000);
	const min = Math.floor((ms % (1000 * 60 * 60)) / 1000 / 60);
	const hr = Math.floor((ms % (1000 * 60 * 60 * 24)) / 1000 / 60 / 60);
	const day = Math.floor(
		(ms % (1000 * 60 * 60 * 24 * 365)) / 1000 / 60 / 60 / 24
	);

	return {
		day: day,
		hr: hr,
		min: min,
		sec: sec,
		ms: ms_out,
	};
};

const timeBreakdownToString = (ms, granularity) => {
	/*
	Converts an integer representing number of milliseconds into a string that uses natural language to represent the time quantity.

	Parameters:
		ms (integer): number of milliseconds.
		granularity (integer): the level of detail required.

	Returns:
		(string): string that uses natural language to represent the time quantity.

	Example usage:
		>>> time_breakdown_string(123456789)
		
		'1 day 10 hours 17 minutes 36 seconds 789 milliseconds'

		>>>time_breakdown_string(
		123456789,
		granularity=3)
		
		'1 day 10 hours 17 minutes'
		*/
	const time = timeBreakdown(ms);
	var timeString = "";
	if (!!time.day) {
		if (time.day === 1) {
			timeString += time.day + " day ";
		} else {
			timeString += time.day + " days ";
		}
	}
	if (!!time.hr) {
		if (time.hr === 1) {
			timeString += time.hr + " hr ";
		} else {
			timeString += time.hr + " hrs ";
		}
	}
	if (!!time.min) {
		if (time.min === 1) {
			timeString += time.min + " min ";
		} else {
			timeString += time.min + " mins ";
		}
	}
	if (!!time.sec) {
		if (time.sec === 1) {
			timeString += time.sec + " sec ";
		} else {
			timeString += time.sec + " secs ";
		}
	}
	if (!timeString.length) {
		timeString = "0 min";
	}

	//filter to specified granularity
	timeString = timeString
		.trim()
		.split(" ")
		.splice(0, 2 * granularity);

	return timeString.join(" ");
};

exports.timeBreakdown = timeBreakdown;
exports.timeBreakdownToString = timeBreakdownToString;
