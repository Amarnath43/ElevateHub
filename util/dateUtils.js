// utils/dateUtils.js
const getNext7Days = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const result = [];
  
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayName = daysOfWeek[date.getDay()];
  
      result.push({
        day: dayName,
        times: ['10:00 - 11:00', '14:00 - 15:00']
      });
    }
  
    return result;
  };
  
  module.exports = { getNext7Days };
  