import CalendarDay from './CalendarDay';
export default function CalendarGrid({
  currentDate,
  fastingData,
  selectedDate,
  formatDate,
  onDayClick,
}) {
  const thaiDays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
  const statusColors = {
    none: 'bg-white border border-gray-300',
    short: 'bg-green-300',
    normal: 'bg-green-400',
    extended: 'bg-green-500',
    selected: 'bg-yellow-400',
    today: 'border-2 border-blue-500',
  };

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const calendarDays = [];
  const currentDay = new Date(startDate);
  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
    if (i > 27 && currentDay.getMonth() !== firstDayOfMonth.getMonth()) {
      break;
    }
  }

  const getDayColor = (day) => {
    const formattedDate = formatDate(day);
    const hours = fastingData[formattedDate] || 0;
    const today = new Date('2025-05-08');

    if (
      selectedDate &&
      day.getDate() === selectedDate.getDate() &&
      day.getMonth() === selectedDate.getMonth() &&
      day.getFullYear() === selectedDate.getFullYear()
    ) {
      return statusColors.selected;
    }
    if (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear() &&
      !(
        selectedDate &&
        selectedDate.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear()
      )
    ) {
      return statusColors.today;
    }
    if (hours === 0) return statusColors.none;
    if (hours < 16) return statusColors.short;
    if (hours <= 18) return statusColors.normal;
    return statusColors.extended;
  };

  return (
    <>
      <div className="grid grid-cols-7 mb-2">
        {thaiDays.map((day, index) => (
          <div key={index} className="text-center py-2 text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            currentMonth={currentDate.getMonth()}
            color={getDayColor(day)}
            fastingHours={fastingData[formatDate(day)]}
            onClick={() => onDayClick(day)}
          />
        ))}
      </div>
    </>
  );
}
