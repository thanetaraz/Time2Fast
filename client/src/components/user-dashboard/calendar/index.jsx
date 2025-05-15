// src/components/FastingCalendar/FastingCalendar.jsx
import { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import FastingLegend from './FastingLegend';
import FastingModal from './FastingModal';
import { mockDatabase } from '../../../services/fastingService';

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

  return (
    <div className="p-4 max-w-xl mx-auto">
      <CalendarHeader currentDate={currentDate} changeMonth={changeMonth} />

      <CalendarGrid
        currentDate={currentDate}
        fastingData={fastingData}
        selectedDate={selectedDate}
        formatDate={formatDate}
        onDayClick={handleDayClick}
      />

      {showModal && selectedDate && (
        <FastingModal
          selectedDate={selectedDate}
          fastingHours={fastingHours}
          inputError={inputError}
          onClose={() => {
            setShowModal(false);
            setInputError('');
          }}
          onSave={handleSave}
          onChange={handleFastingHoursChange}
        />
      )}

      <FastingLegend />
    </div>
  );
}
