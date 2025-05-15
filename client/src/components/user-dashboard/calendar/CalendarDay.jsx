export default function CalendarDay({
  day,
  currentMonth,
  color,
  fastingHours,
  onClick,
}) {
  const isCurrentMonth = day.getMonth() === currentMonth;

  return (
    <div
      className={`
        ${isCurrentMonth ? '' : 'opacity-40'}
        ${color}
        h-16 w-16 rounded-full flex items-center justify-center cursor-pointer
        transition duration-200 hover:opacity-80
        ${!isCurrentMonth ? 'pointer-events-none' : ''}
      `}
      onClick={() => isCurrentMonth && onClick()}
    >
      <div className="text-center">
        <div>{day.getDate()}</div>
        {fastingHours > 0 && isCurrentMonth && (
          <div className="text-xs mt-1">{fastingHours} ชม.</div>
        )}
      </div>
    </div>
  );
}
