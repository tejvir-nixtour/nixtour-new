import dayjs from 'dayjs';

export const calculateTimeDifference = (
  durationStart: any,
  durationEnd: any
): string => {
  // Convert time strings to Date objects
  const start = new Date(
    `${dayjs(durationStart.date).format('YYYY-MM-DD')}T${durationStart.time}:00Z`
  ); // Assume both times are on the same day
  const end = new Date(
    `${dayjs(durationEnd.date).format('YYYY-MM-DD')}T${durationEnd.time}:00Z`
  );

  // Get the difference in milliseconds
  let difference = end.getTime() - start.getTime();

  // If the durationEnd time is earlier than the start time, adjust for the next day
  if (difference < 0) {
    difference += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
  }

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(difference / (1000 * 60 * 60)); // Hours
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)); // Minutes

  return `${hours}H ${minutes}M`;
};

export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
