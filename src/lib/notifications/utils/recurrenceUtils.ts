// src/lib/notifications/utils/recurrenceUtils.ts

export function addRecurringTime(date: Date, patternId: string): Date {
    const newDate = new Date(date);
  
    switch (patternId) {
      case "1": // Daily
        newDate.setDate(newDate.getDate() + 1);
        break;
      case "2": // Weekly
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "3": // Monthly
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case "4": // Yearly
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
      case "5": // Bi-Weekly
        newDate.setDate(newDate.getDate() + 14);
        break;
      case "6": // Quarterly
        newDate.setMonth(newDate.getMonth() + 3);
        break;
      case "7": // Semi-Annually
        newDate.setMonth(newDate.getMonth() + 6);
        break;
      default:
        console.warn("Unknown recurrence pattern:", patternId);
    }
  
    return newDate;
  }
  