export const mockDatabase = {
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
