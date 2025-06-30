const StatCard = ({ title, value, icon, trend, change }) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className={`text-xs mt-2 ${trendColors[trend]}`}>
            {change}
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;