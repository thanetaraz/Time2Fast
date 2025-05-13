import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Calendar from '../components/fasting/Calendar';

export default function FastingTimer() {
  const [remainingTime, setRemainingTime] = useState('18:45');
  const [progress, setProgress] = useState(75); // สมมติว่าคืบหน้าไปแล้ว 75%

  const IFslotList = [
    {
      fasting: '16',
      eating: '8',
    },
    {
      fasting: '18',
      eating: '6',
    },
    {
      fasting: '20',
      eating: '4',
    },
    {
      fasting: '24',
      eating: '0',
    },
  ];
  // ข้อมูลสำหรับ PieChart
  const data = [
    { name: 'Progress', value: progress },
    { name: 'Remaining', value: 100 - progress },
  ];

  // สีของกราฟ
  const COLORS = ['#6366f1', '#f0f0f4'];

  return (
    <section className="min-h-screen bg-[#f9fafc]">
      <section className="ml-4 mt-4 grid grid-cols-[60%_40%] gap-4">
        <div className="bg-white rounded-xl shadow-sm">
          <h2 className="text-center text-lg font-medium mt-4">
            ติดตามการอดอาหาร
          </h2>

          {/* กราฟวงกลมพร้อมเวลาตรงกลาง */}
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

            {/* เวลาและข้อความตรงกลางกราฟ */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{remainingTime}</span>
              <span className="text-sm text-gray-500">ชั่วโมง</span>
            </div>
          </div>

          {/* ข้อมูลเวลาเพิ่มเติม */}
          <div className="grid grid-cols-3 text-center mb-6">
            <div>
              <p className="text-lg font-medium">16/24</p>
              <p className="text-xs text-gray-500">ชั่วโมงอดอาหาร/เป้าหมาย</p>
            </div>
            <div>
              <p className="text-lg font-medium">05:15</p>
              <p className="text-xs text-gray-500">เวลาเริ่มต้น</p>
            </div>
            <div>
              <p className="text-lg font-medium">23:15</p>
              <p className="text-xs text-gray-500">เวลาสิ้นสุด</p>
            </div>
          </div>

          {/* ปุ่มต่างๆ */}
          <div className="flex gap-4 text-center justify-center content-center mb-4">
            <button className="bg-indigo-500 text-white py-2 px-4 rounded-md text-center">
              หยุดการอดอาหาร
            </button>
            <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md  text-center">
              รีเซ็ต
            </button>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm max-w-md mx-auto">
          <div>
            <p>แผนการอดอาหาร</p>
            {IFslotList.map((slot) => (
              <div className="flex bg-[#8c8ef8] rounded-md p-3 mt-3">
                <div className="w-10 h-10 rounded-full p-2 m-2 bg-white text-center">
                  <p className="text-blue-400">{slot.fasting}</p>
                </div>
                <div>
                  <p className="text-white text-bold">
                    {slot.fasting}:{slot.eating}
                  </p>
                  {slot.eating != '0' ? (
                    <p className="text-xs text-gray-100">
                      อดอาหาร {slot.fasting} ชั่วโมง กินอาหาร {slot.eating}{' '}
                      ชั่วโมง
                    </p>
                  ) : (
                    <p className="text-xs text-gray-100">อดอาหารเต็มวัน</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Calendar />
    </section>
  );
}
