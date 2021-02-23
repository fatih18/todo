export const DATE_FORMAT = '';

export const dayString = (i18n) => ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const monthString = (i18n) => [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export const toString = (val) => (val < 10 ? `0${val}` : val).toString();
const splitHours = (str) => parseInt(str.substring(0, 2), 0);
const splitMins = (str) => parseInt(str.substring(2), 0);
const roundQuarter = (mins, upper) =>
  upper ? Math.ceil(mins / 15) * 15 : Math.floor(mins / 15) * 15;

export const parseDateRange = (data) => {
  const {specialDeliveryTimes, standartTimeRanges} = data;

  // sometimes timeRangeList is null
  // therefore filter before processing
  const convertedDates = standartTimeRanges
    .filter((it) => it.timeRangeList && Array.isArray(it.timeRangeList))
    .reduce((r, l) => {
      const parsed = l.timeRangeList.reduce((p, {startTime, endTime}) => {
        const temp = p;

        let endMin = roundQuarter(splitMins(endTime), false);
        let endHour = splitHours(endTime);

        let startMins = roundQuarter(splitMins(startTime), true);
        let startHour = splitHours(startTime);

        // if end mins is zero
        // upper limit is 15 mins before
        // e.g 19:00 => 18:45
        if (endMin === 0) {
          endHour -= 1 % 24;
          endMin = 45;
        }

        // if initial mins bigger than 45
        // lower limit is 15 mins after
        // e.g 20:50 => 21:00
        if (startMins > 45) {
          startHour += 1 % 24;
          startMins = 0;
        }

        for (let i = startHour; i <= endHour; i += 1) {
          const minValues = [];
          // if not start hour than init with 0
          const start = i === startHour ? startMins : 0;
          // if not end hour finish when 45
          const end = i === endHour ? endMin : 45;

          for (let j = start; j <= end; j += 15) {
            const mins = toString(j);
            minValues.push(mins);
          }

          const hour = toString(i);
          temp[hour] = minValues;
        }

        return temp;
      }, {});

      const temp = r;
      temp[new Date(l.date).toDateString()] = parsed;

      return temp;
    }, {});

  return {
    special: specialDeliveryTimes,
    converted: convertedDates,
  };
};

export const dateFormat = (i18n, date) => {
  const dateInstance = new Date(date);
  const todayInstance = new Date();

  const monthIndex = dateInstance.getMonth();
  const dateVal = dateInstance.getDate();
  const hoursVal = dateInstance.getHours();
  const minsVal = dateInstance.getMinutes();
  const yearsVal = dateInstance.getFullYear();
  const dateFormatted = toString(dateVal);

  const day = i18n ? dayString(i18n)[dateInstance.getDay()] : dateInstance.getDay();
  const month = i18n ? monthString(i18n)[monthIndex] : toString(monthIndex + 1);

  let alias;

  if (i18n && dateVal === todayInstance.getDate() && monthIndex === todayInstance.getMonth()) {
    alias = i18n.t('date.string.today');
  }

  return {
    formatted:
      i18n &&
      i18n.t('date.format.dayAndMonth', {
        date: dateFormatted,
        day,
        month,
      }),
    alias,
    day,
    month,
    years: yearsVal,
    date: toString(dateVal),
    hours: toString(hoursVal),
    mins: toString(minsVal),
    instance: dateInstance,
  };
};

// format db type
export const fromNow = (date) => {
  const dateInstance = new Date(date);
  const now = new Date();

  let difference = parseInt((now - dateInstance) / 1000, 0); // convert to secs;

  if (difference < 0) {
    // below 0 secs
    const formatDate = dateFormat(date);
    return formatDate.formatted;
  }

  // convert to min format
  difference = Math.floor(difference / 60);

  if (difference < 75) {
    // below 75 mins
    return `${difference} min ago`;
  }

  // convert to hour format
  difference = Math.floor(difference / 60);

  if (difference < 3) {
    // below 3 hours
    return `${difference} hours ago`;
  }

  // convert to day format
  difference = Math.floor(difference / 24);

  if (difference < 7) {
    // below one week
    return `${difference} days ago`;
  }

  return `${difference} years ago`;
};
