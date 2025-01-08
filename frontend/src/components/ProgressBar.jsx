/* eslint-disable react/prop-types */

const ProgressBar = ({ currentTime, duration, onSeek }) => {
 const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
 };

 return (
  <div className="w-full space-y-1">
   <input
    type="range"
    min={0}
    max={duration}
    value={currentTime}
    onChange={(e) => onSeek(Number(e.target.value))}
    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
   />
   <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
    <span>{formatTime(currentTime) !== 'NaN:NaN' ? formatTime(currentTime) : '0:00'}</span>
    <span>{formatTime(duration) !== 'NaN:NaN' ? formatTime(duration) : '0:00'}</span>
   </div>
  </div>
 );
};

export default ProgressBar;