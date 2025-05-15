import React from 'react';

const index = ({ selectedSlotIndex, setSelectedSlotIndex, slot, index }) => {
  return (
    <div
      className={`flex rounded-md p-3 mt-3 cursor-pointer transition-all ${
        selectedSlotIndex === index ? 'bg-indigo-300' : 'bg-white'
      }`}
      onClick={() => setSelectedSlotIndex(index)}
    >
      <div
        className={`w-10 h-10 rounded-full p-2 m-2 text-center ${selectedSlotIndex === index ? 'bg-white text-indigo-300' : 'bg-gray-200 text-black'}`}
      >
        <p>{slot.fasting}</p>
      </div>
      <div>
        <p
          className={`font-bold ${selectedSlotIndex === index ? 'text-white' : 'text-black'}`}
        >
          {slot.fasting}
          {slot.fasting === '24' ? ' ชั่วโมง' : `:${slot.eating}`}
        </p>
        {slot.eating !== '0' ? (
          <p
            className={`text-xs  ${selectedSlotIndex === index ? 'text-gray-100' : 'text-gray-400'}`}
          >
            อดอาหาร {slot.fasting} ชั่วโมง กินอาหาร {slot.eating} ชั่วโมง
          </p>
        ) : (
          <p
            className={`text-xs  ${selectedSlotIndex === index ? 'text-gray-100' : 'text-gray-400'}`}
          >
            อดอาหารเต็มวัน
          </p>
        )}
      </div>
    </div>
  );
};

export default index;
