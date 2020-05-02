function subtractDays(days: number, date: Date) {
  let givenDate = new Date(date.valueOf());

  givenDate.setDate(givenDate.getDate() - days);
  return givenDate;
}

function addDays(days: number, date: Date) {
  let givenDate = new Date(date.valueOf());

  givenDate.setDate(givenDate.getDate() + days);
  return givenDate;
};

export function getDatesSinceDaysAgo(numberOfDays: number) {
  let dateArray = new Array();
  let currentDate = subtractDays(numberOfDays - 1, new Date());
  const stopDate = new Date();
  while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = addDays(1, currentDate);
  }
  return dateArray;
}

export function getFormattedDatesSinceDaysAgo(numberOfDays: number) {
  let dateArray = getDatesSinceDaysAgo(numberOfDays);
  return dateArray.map(function(date) {
    const dateStringArray = date.toDateString().split(" ");
    return [dateStringArray[1], dateStringArray[2]].join(" ");
  });
}
