import { BadRequestException } from '@nestjs/common';

export function convertGMTtoGMT8(gmt0Date: Date): Date {
  // Get the current date and time in GMT+0000 (UTC)
  const gmt0Timestamp = gmt0Date.getTime();

  // Calculate the new timestamp with GMT+0800 (UTC+8) offset
  const gmt8Timestamp = gmt0Timestamp + 8 * 60 * 60 * 1000; // 8 hours in milliseconds

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
