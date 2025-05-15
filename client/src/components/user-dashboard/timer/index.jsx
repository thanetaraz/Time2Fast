import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const index = ({ selectedSlotIndex, IFslotList }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const data = [
    { name: 'Progress', value: 34 },
    { name: 'Remaining', value: 40 },
  ];

  // สีของกราฟ
  const COLORS = ['#6366f1', '#f0f0f4'];
  const formatStartTime = () => {
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  const formatEndTime = () => {
    if (selectedSlotIndex !== null) {
      let endTime =
        Number(IFslotList[selectedSlotIndex].fasting) +
        Number(currentTime.getHours());

      let dayLabel = endTime > 24 ? 'Tomorrow' : 'Today';
      endTime = endTime > 24 ? endTime - 24 : endTime;

      const formattedHour = String(endTime).padStart(2, '0');
      const formattedMinute = String(currentTime.getMinutes());
      return (
        <span className="flex flex-col">
          {formattedHour}:{formattedMinute}
          <span
            className={
              endTime > 24 ? 'text-sm text-blue-500' : 'text-sm text-blue-500'
            }
          >
            {dayLabel}
          </span>{' '}
        </span>
      );
    }
    return '--:--';
  };
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <h2 className="text-center text-lg font-medium mt-4">ติดตามการอดอาหาร</h2>

      <div className="relative w-64 h-64 mx-auto mb-8">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="90%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">
            {selectedSlotIndex !== null
              ? IFslotList[selectedSlotIndex].fasting
              : '--'}
          </span>
          <span className="text-sm text-gray-500">ชั่วโมง</span>
        </div>
      </div>

      <div className="grid grid-cols-3 text-center mb-6">
        <div>
          <p className="text-lg font-medium">
            {selectedSlotIndex !== null
              ? IFslotList[selectedSlotIndex].fasting +
                '/' +
                IFslotList[selectedSlotIndex].eating
              : '-/-'}
          </p>
          <p className="text-xs text-gray-500">ชั่วโมงอดอาหาร/กิน</p>
        </div>
        <div>
          <p className="text-lg font-medium">
            {selectedSlotIndex !== null
              ? formatStartTime(currentTime)
              : '--:--'}
          </p>
          <p className="text-xs text-gray-500">เวลาเริ่มต้น</p>
        </div>
        <div>
          <p className="text-lg font-medium">
            {selectedSlotIndex !== null ? formatEndTime() : '--:--'}
          </p>
          <p className="text-xs text-gray-500">เวลาสิ้นสุด</p>
        </div>
      </div>

      <div className="flex gap-4 text-center justify-center content-center mb-4">
        <button className="bg-indigo-500 text-white py-2 px-4 rounded-md text-center">
          หยุดการอดอาหาร
        </button>
      </div>
    </div>
  );
};

export default index;
