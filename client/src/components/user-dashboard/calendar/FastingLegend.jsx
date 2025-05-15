export default function FastingLegend() {
  const statusColors = {
    none: 'bg-white border border-gray-300',
    short: 'bg-green-300',
    normal: 'bg-green-400',
    extended: 'bg-green-500',
    selected: 'bg-yellow-400',
    today: 'border-2 border-blue-500',
  };

  return (
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
  );
}
