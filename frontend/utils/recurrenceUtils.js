export function getRecurringDates(startDateStr, type, count = 10) {
    const startDate = new Date(startDateStr);
    const dates = [];
  
    for (let i = 0; i < count; i++) {
      const nextDate = new Date(startDate);
  
      if (type === "daily") {
        nextDate.setDate(startDate.getDate() + i);
      } else if (type === "weekly") {
        nextDate.setDate(startDate.getDate() + i * 7);
      } else if (type === "monthly") {
        nextDate.setMonth(startDate.getMonth() + i);
      } else if (type === "yearly") {
        nextDate.setFullYear(startDate.getFullYear() + i);
      }
  
      dates.push(nextDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }
  
    return dates;
  }
  