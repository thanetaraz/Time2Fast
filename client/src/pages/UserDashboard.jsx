import { useState } from 'react';
import CalendarDay from '../components/user-dashboard/calendar';
import PlanFasting from '../components/user-dashboard/plan-fasting';
import Timer from '../components/user-dashboard/timer';

export default function FastingTimer() {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

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

  return (
    <section className="min-h-screen bg-[#f9fafc]">
      <section className="ml-4 mt-4 grid grid-cols-[60%_40%] gap-4">
        <Timer selectedSlotIndex={selectedSlotIndex} IFslotList={IFslotList} />
        <div className="p-6 bg-white rounded-xl shadow-sm max-w-md mx-auto">
          <div>
            <p>แผนการอดอาหาร</p>
            {IFslotList.map((slot, index) => (
              <PlanFasting
                key={index}
                selectedSlotIndex={selectedSlotIndex}
                setSelectedSlotIndex={setSelectedSlotIndex}
                slot={slot}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      <CalendarDay />
    </section>
  );
}
