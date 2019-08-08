const moment = require("moment");

exports.UTC_date_timestamp = ts => {
	if (!ts) {
		//if null input, outputs the timestamp for 12:00am UTC today
		const date_iso = moment()
			.utc()
			.format()
			.slice(0, 10);
		return moment.utc(date_iso).valueOf();
	}
	//Accepts a unix timestamp, outputs the timestamp for 12:00am UTC of that day
	const date_iso = moment(ts)
		.utc()
		.format()
		.slice(0, 10);
	return moment.utc(date_iso).valueOf();
};

exports.UTC_now_timestamp = () => {
	return moment.utc().valueOf();
};
