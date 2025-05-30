import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaHome, FaRedo } from 'react-icons/fa';

export const Highscores = () => {
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // In a real app, you would fetch scores from your backend
        const mockScores = [
            { id: 1, name: 'Quiz Master', score: 950, date: '2023-04-15' },
            { id: 2, name: 'Trivia King', score: 890, date: '2023-04-14' },
            { id: 3, name: 'Brainiac', score: 850, date: '2023-04-13' },
            { id: 4, name: 'Whiz Kid', score: 800, date: '2023-04-12' },
            { id: 5, name: 'Quizzer', score: 750, date: '2023-04-11' },
        ];
        setScores(mockScores);
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                        Leaderboard
                    </h1>
                    <p className="text-xl text-gray-300">Top performers of all time</p>
                </motion.div>

                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4 mb-8"
                >
                    {scores.map((score, index) => (
                        <motion.div
                            key={score.id}
                            variants={item}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex items-center justify-between shadow-lg"
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900' :
                                    index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700' :
                                    index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-amber-100' :
                                    'bg-indigo-600 text-white'
                                }`}>
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">{score.name}</h3>
                                    <p className="text-gray-400 text-sm">{new Date(score.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaTrophy className={`text-xl ${
                                    index === 0 ? 'text-yellow-400' : 
                                    index === 1 ? 'text-gray-300' : 
                                    index === 2 ? 'text-amber-600' : 'text-indigo-400'
                                }`} />
                                <span className="text-2xl font-bold">{score.score}</span>
                                <span className="text-gray-400">pts</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center space-x-4 mt-8"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                    >
                        <FaHome />
                        <span>Home</span>
                    </button>
                    <button
                        onClick={() => navigate('/onboard')}
                        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                    >
                        <FaRedo />
                        <span>Play Again</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};