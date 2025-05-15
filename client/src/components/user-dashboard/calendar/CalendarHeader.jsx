export default function CalendarHeader({ currentDate, changeMonth }) {
  const thaiMonths = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];

  return (
    <div className="mb-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">
        ปฏิทินติดตาม - {thaiMonths[currentDate.getMonth()]}{' '}
        {currentDate.getFullYear() + 543}
      </h2>
      <div className="flex gap-2">
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={() => changeMonth(-1)}
        >
          ←
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={() => changeMonth(1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
