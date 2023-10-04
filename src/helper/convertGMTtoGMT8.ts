import { BadRequestException } from '@nestjs/common';

export function convertGMTtoGMT8(gmt0Date: Date): Date {
  // Get the current date and time in GMT+0000 (UTC)
  const gmt0Timestamp = gmt0Date.getTime();

  // Calculate the new timestamp with GMT+0800 (UTC+8) offset and 59 minutes

  const eq1 = 8 * 60 * 60 * 1000;
  const eq2 = 59 * 60 * 1000;

  const gmt8Timestamp = gmt0Timestamp + eq1 + eq2; // 8 hours and 59 minutes in milliseconds

  // Create a new Date object with the GMT+0800 timestamp
  const gmt8Date = new Date(gmt8Timestamp);

  return gmt8Date;
}

export const passMsToTimezone = (millisecondsToAdd: number): Date => {
  if (isNaN(millisecondsToAdd)) {
    throw new BadRequestException(
      'Invalid date input. Please provide a valid number of milliseconds.',
    );
  }

  const currentDate = new Date();
  let timezoneDate = convertGMTtoGMT8(currentDate);

  // Add the time to the current date
  timezoneDate = new Date(timezoneDate.getTime() + millisecondsToAdd);

  return timezoneDate;
};

export const humanizeTimeRemaining = (targetDate: Date): string => {
  if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
    throw new BadRequestException(
      'Invalid date input. Please provide a valid Date object.',
    );
  }

  const currentTime = new Date();
  const timeRemaining = targetDate.getTime() - currentTime.getTime();

  // Convert time remaining to a humanized format
  const seconds = Math.floor(timeRemaining / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} remaining`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} remaining`;
  }
};
