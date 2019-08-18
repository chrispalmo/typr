const timeBreakdown = ms => {
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
		ms: ms_out
	};
};

const timeBreakdownToString = ms => {
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
	if (!timeString.length) {
		timeString = "0 min";
	}

	return timeString;
};

exports.timeBreakdown = timeBreakdown;
exports.timeBreakdownToString = timeBreakdownToString;

/*
//Tests

const testA1 = timeBreakdown(999);
const testA2 = timeBreakdown(999 + 1);
const testA3 = timeBreakdown(999 + 59000);
const testA4 = timeBreakdown(999 + 59000 + 1);
const testA5 = timeBreakdown(999 + 59000 + 59000 * 60);
const testA6 = timeBreakdown(999 + 59000 + 59000 * 60 + 1);
const testA7 = timeBreakdown(999 + 59000 + 59000 * 60 + 23 * 60 * 60000);
const testA8 = timeBreakdown(999 + 59000 + 59000 * 60 + 23 * 60 * 60000 + 1);
const testA9 = timeBreakdown(
	999 + 59000 + 59000 * 60 + 23 * 60 * 60000 + 364 * 24 * 60 * 60000
);

const testB1 = timeBreakdownToString(999);
const testB2 = timeBreakdownToString(999 + 1);
const testB3 = timeBreakdownToString(999 + 59000);
const testB4 = timeBreakdownToString(999 + 59000 + 1);
const testB5 = timeBreakdownToString(999 + 59000 + 59000 * 60);
const testB6 = timeBreakdownToString(999 + 59000 + 59000 * 60 + 1);
const testB7 = timeBreakdownToString(
	999 + 59000 + 59000 * 60 + 23 * 60 * 60000
);
const testB8 = timeBreakdownToString(
	999 + 59000 + 59000 * 60 + 23 * 60 * 60000 + 1
);
const testB9 = timeBreakdownToString(
	999 + 59000 + 59000 * 60 + 23 * 60 * 60000 + 364 * 24 * 60 * 60000
);

console.log("testA1 === ");
console.log(testA1);
console.log("testA2 === ");
console.log(testA2);
console.log("testA3 === ");
console.log(testA3);
console.log("testA4 === ");
console.log(testA4);
console.log("testA5 === ");
console.log(testA5);
console.log("testA6 === ");
console.log(testA6);
console.log("testA7 === ");
console.log(testA7);
console.log("testA8 === ");
console.log(testA8);
console.log("testA9 === ");
console.log(testA9);

console.log("testB1 === ");
console.log(testB1);
console.log("testB2 === ");
console.log(testB2);
console.log("testB3 === ");
console.log(testB3);
console.log("testB4 === ");
console.log(testB4);
console.log("testB5 === ");
console.log(testB5);
console.log("testB6 === ");
console.log(testB6);
console.log("testB7 === ");
console.log(testB7);
console.log("testB8 === ");
console.log(testB8);
console.log("testB9 === ");
console.log(testB9);
*/
