export default function FastingModal({
  selectedDate,
  fastingHours,
  inputError,
  onClose,
  onSave,
  onChange,
}) {
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
            onChange={onChange}
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
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onSave}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
