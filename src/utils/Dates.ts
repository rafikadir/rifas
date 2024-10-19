export const parseStringToDate =(date:string) => {
	const newDate = new Date(date);
	return newDate;
}

export const formatDateToLocalDate =(date:Date) => {
	return date.toLocaleString();
}

export const getDatePlus12Hrs = () => {
	const now = new Date();
	now.setHours(now.getHours() + 12);
	now.setMinutes(0);
	now.setSeconds(0);
	now.setMilliseconds(0);
	return now;
};

export const getDatePlus15Minutes = () => {
	const now = new Date();
	now.setMinutes(now.getMinutes() + 15);
	now.setSeconds(0);
	now.setMilliseconds(0);
	return now;
};

export const getDatePlus1Month = () => {
	const now = new Date();
	now.setMonth(now.getMonth() + 1);
	now.setMinutes(0);
	now.setSeconds(0);
	now.setMilliseconds(0);
	return now;
};

export const getDateNow = () => {
	const now = new Date();
	now.setSeconds(0);
	now.setMilliseconds(0);
	return now;
}