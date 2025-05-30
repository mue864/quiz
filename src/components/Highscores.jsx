import { motion } from 'framer-motion';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaHome, FaRedo, FaFilter, FaSearch, FaTrash } from 'react-icons/fa';
import { DataContext } from '../app/DataProvider';

export const Highscores = () => {
    const [scores, setScores] = useState([]);
    const [filteredScores, setFilteredScores] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const { userScores, clearScores } = useContext(DataContext);
    const navigate = useNavigate();

    // Get unique categories and difficulties for filters
    const categories = [...new Set(scores.map(score => score.category || '').filter(Boolean))];
    const difficulties = [...new Set(scores.map(score => score.difficulty || '').filter(Boolean))];
    
    // Load scores from local storage
    useEffect(() => {
        setScores(userScores);
        setFilteredScores(userScores);
    }, [userScores]);
    
    // Apply filters and search
    useEffect(() => {
        let result = [...scores];
        
        // Apply category filter
        if (filterCategory) {
            result = result.filter(score => score.category === filterCategory);
        }
        
        // Apply difficulty filter
        if (filterDifficulty) {
            result = result.filter(score => score.difficulty === filterDifficulty);
        }
        
        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(score => 
                score.name.toLowerCase().includes(term)
            );
        }
        
        // Sort by score (highest first)
        result.sort((a, b) => b.score - a.score);
        
        setFilteredScores(result);
    }, [scores, filterCategory, filterDifficulty, searchTerm]);
    
    // Handle clearing scores
    const handleClearScores = () => {
        if (window.confirm('Are you sure you want to clear all scores? This cannot be undone.')) {
            clearScores();
        }
    };

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold flex items-center">
                        <FaTrophy className="text-yellow-400 mr-3" /> 
                        High Scores
                    </h1>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                            aria-label="Home"
                        >
                            <FaHome />
                        </button>
                        <button 
                            onClick={() => navigate('/onboard')}
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                            aria-label="Play Again"
                        >
                            <FaRedo />
                        </button>
                    </div>
                </div>

                {/* Search and filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by player name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                            >
                                <FaFilter />
                                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                            </button>
                            
                            {scores.length > 0 && (
                                <button 
                                    onClick={handleClearScores}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                                    title="Clear all local scores"
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/5 backdrop-blur-md rounded-xl p-6 mb-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                                    <select
                                        value={filterDifficulty}
                                        onChange={(e) => setFilterDifficulty(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">All Difficulties</option>
                                        {difficulties.map(difficulty => (
                                            <option key={difficulty} value={difficulty}>{difficulty}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
                
                {/* Scores table */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="p-4 text-left">Rank</th>
                                <th className="p-4 text-left">Player</th>
                                <th className="p-4 text-left">Score</th>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-left">Difficulty</th>
                                <th className="p-4 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredScores.length > 0 ? (
                                filteredScores.map((score, index) => (
                                    <tr 
                                        key={index} 
                                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="p-4">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td className="p-4 font-medium">{score.name}</td>
                                        <td className="p-4 font-bold text-yellow-400">{score.score}</td>
                                        <td className="p-4">{score.category || 'General'}</td>
                                        <td className="p-4 capitalize">{score.difficulty || 'medium'}</td>
                                        <td className="p-4 text-sm text-gray-300">
                                            {score.date ? new Date(score.date).toLocaleDateString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-400">
                                        No scores found. Play a game to set a high score!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="text-center mt-8 text-gray-400 text-sm">
                    <p>Play more games to improve your ranking!</p>
                </div>
            </div>
        </motion.div>
    );
};
