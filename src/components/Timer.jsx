import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";

export const Timer = ({ timeRemaining, timeUp }) => {
  // Calculate percentage for the progress bar
  const percentage = Math.max((timeRemaining / 30) * 100, 0); // Assuming 30 seconds total
  
  // Determine color based on time remaining
  const getColor = () => {
    if (timeRemaining > 20) return 'bg-green-500';
    if (timeRemaining > 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Format seconds to display
  const formatTime = (seconds) => {
    return seconds < 10 ? `0${seconds}` : seconds;
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center space-x-2">
      <FaClock className={`${timeRemaining <= 5 && !timeUp ? 'animate-pulse text-red-400' : 'text-gray-300'}`} />
      <div className="relative w-16 h-4 bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className={`absolute top-0 left-0 h-full ${getColor()} rounded-full`}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className={`font-mono ${timeRemaining <= 5 && !timeUp ? 'text-red-400 font-bold' : 'text-gray-300'}`}>
        {formatTime(timeRemaining)}s
      </span>
    </div>
  );
};
