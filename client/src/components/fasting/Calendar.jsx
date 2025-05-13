import { useState, useEffect } from 'react';

const mockDatabase = {
  getFastingData: () => {
    return Promise.resolve({
      '2025-05-01': 0,
      '2025-05-02': 16,
      '2025-05-03': 18,
      '2025-05-04': 20,
      '2025-05-05': 16,
      '2025-05-06': 14,
      '2025-05-07': 18,
      '2025-05-08': 0,
    });
  },
  saveFastingHours: (date, hours) => {
    console.log(`บันทึกข้อมูล: วันที่ ${date} อดอาหาร ${hours} ชั่วโมง`);
    return Promise.resolve({ success: true });
  },
};

const statusColors = {
  none: 'bg-white border border-gray-300',
  short: 'bg-green-300',
  normal: 'bg-green-400',
  extended: 'bg-green-500',
  selected: 'bg-yellow-400',
  today: 'border-2 border-blue-500',
};

export default function FastingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date('2025-05-08'));
  const [selectedDate, setSelectedDate] = useState(null);
  const [fastingData, setFastingData] = useState({});
  const [fastingHours, setFastingHours] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    mockDatabase.getFastingData().then((data) => {
      setFastingData(data);
    });
  }, []);

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

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const handleDayClick = (day) => {
    const formattedDate = formatDate(day);
    setSelectedDate(day);
    setFastingHours(fastingData[formattedDate] || 0);
    setShowModal(true);
    setInputError('');
  };

  const handleFastingHoursChange = (e) => {
    let hours = Number(e.target.value);
    if (hours > 24) {
      hours = 24;
    } else if (hours < 0) {
      hours = 0;
    }
    setFastingHours(hours);
    if (inputError) setInputError('');
  };

  const handleSave = () => {
    if (selectedDate) {
      if (fastingHours < 0 || fastingHours > 24 || isNaN(fastingHours)) {
        setInputError('กรุณากรอกจำนวนชั่วโมงระหว่าง 0 ถึง 24 ');
        return;
      }

      setInputError('');
      const formattedDate = formatDate(selectedDate);
      mockDatabase
        .saveFastingHours(formattedDate, fastingHours)
        .then((response) => {
          if (response.success) {
            setFastingData((prev) => ({
              ...prev,
              [formattedDate]: fastingHours,
            }));
            setShowModal(false);
          } else {
            setInputError('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
          }
        })
        .catch((err) => {
          console.error('Save error:', err);
          setInputError('เกิดข้อผิดพลาดในการเชื่อมต่อเพื่อบันทึก');
        });
    }
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

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

  const thaiDays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
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
    <div className="p-4 max-w-xl mx-auto">
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

      <div className="grid grid-cols-7 mb-2">
        {thaiDays.map((day, index) => (
          <div key={index} className="text-center py-2 text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          return (
            <div
              key={index}
              className={`
                ${isCurrentMonth ? '' : 'opacity-40'}
                ${getDayColor(day)}
                h-16 w-16 rounded-full flex items-center justify-center cursor-pointer
                transition duration-200 hover:opacity-80
                ${!isCurrentMonth ? 'pointer-events-none' : ''}
              `}
              onClick={() => isCurrentMonth && handleDayClick(day)}
            >
              <div className="text-center">
                <div>{day.getDate()}</div>
                {fastingData[formatDate(day)] > 0 && isCurrentMonth && (
                  <div className="text-xs mt-1">
                    {fastingData[formatDate(day)]} ชม.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center transition-all duration-300 ease-out">
          <div className="bg-white p-6 rounded-lg w-80 transition-all duration-300 ease-out">
            <h3 className="text-lg font-semibold mb-4">
              บันทึกการอดอาหาร - {selectedDate.getDate()}{' '}
              {thaiMonths[selectedDate.getMonth()]}{' '}
              {selectedDate.getFullYear() + 543}
            </h3>

            <div className="mb-4">
              <label htmlFor="fastingHoursInput" className="block mb-2">
                จำนวนชั่วโมงที่อดอาหาร:
              </label>
              <input
                id="fastingHoursInput"
                type="number"
                className={`w-full p-2 border rounded ${inputError ? 'border-red-500' : 'border-gray-300'}`}
                value={fastingHours}
                onChange={handleFastingHoursChange}
                min="0"
                max="24"
              />
              {inputError && (
                <p className="text-red-500 text-xs mt-1">{inputError}</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  setShowModal(false);
                  setInputError('');
                }}
              >
                ยกเลิก
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-semibold mb-2">คำอธิบาย</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className={`w-4 h-4 mr-2 ${statusColors.none}`}></div>
            <span>ไม่ได้อดอาหาร</span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 mr-2 ${statusColors.short}`}></div>
            <span>น้อยกว่า 16 ชม.</span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 mr-2 ${statusColors.normal}`}></div>
            <span>16-18 ชม.</span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 mr-2 ${statusColors.extended}`}></div>
            <span>มากกว่า 18 ชม.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
