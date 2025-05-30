import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

// Category mapping for Open Trivia DB
const categoryMapping = {
  general: 9, // General Knowledge
  science: 17, // Science & Nature
  history: 23, // History
  geography: 22, // Geography
  art: 25, // Art
  sports: 21, // Sports
  entertainment: 11, // Entertainment: Film
  animals: 27, // Animals
};

export const DataProvider = ({children}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(10); // Default number of questions
    const [userScores, setUserScores] = useState(() => {
        // Load scores from localStorage if available
        const savedScores = localStorage.getItem('quizScores');
        return savedScores ? JSON.parse(savedScores) : [];
    });

    useEffect(() => {
        if (!category) return; // Don't fetch if no category is selected
        
        setLoading(true);
        setError(null);
        
        // Convert categories to Open Trivia DB format
        const categoryIds = category.split(',')
            .map(cat => categoryMapping[cat])
            .filter(Boolean);
            
        // If multiple categories, we'll need to make multiple requests and combine
        const fetchQuestions = async () => {
            try {
                // For simplicity, we'll use the first category if multiple are selected
                // In a more advanced implementation, we could fetch from multiple categories
                const categoryParam = categoryIds.length > 0 ? `&category=${categoryIds[0]}` : '';
                const difficultyParam = difficulty ? `&difficulty=${difficulty}` : '';
                
                const response = await axios.get(
                    `https://opentdb.com/api.php?amount=${amount}${categoryParam}${difficultyParam}&encode=base64`
                );
                
                if (response.data.response_code === 0) {
                    // Transform data to match our application format
                    const transformedData = response.data.results.map(item => ({
                        difficulty: atob(item.difficulty),
                        category: atob(item.category),
                        question: {
                            text: atob(item.question)
                        },
                        correctAnswer: atob(item.correct_answer),
                        incorrectAnswers: item.incorrect_answers.map(answer => atob(answer)),
                        type: atob(item.type)
                    }));
                    
                    setData(transformedData);
                } else {
                    // Handle API errors based on response_code
                    const errorMessages = {
                        1: "Not enough questions available for your criteria",
                        2: "Invalid parameter in API request",
                        3: "Invalid session token",
                        4: "Session token has retrieved all available questions"
                    };
                    
                    setError(errorMessages[response.data.response_code] || "Unknown API error");
                }
            } catch (err) {
                setError("Failed to fetch questions. Please try again later.");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchQuestions();
    }, [category, difficulty, amount]);

    const addCategories = (selected) => {
        setCategory(selected);
    };

    const addDifficulty = (level) => {
        setDifficulty(level);
    };
    
    const setQuestionAmount = (num) => {
        setAmount(Math.min(Math.max(5, num), 50)); // Limit between 5 and 50
    };
    
    const saveScore = (name, score, categoryName, difficultyLevel) => {
        const newScore = {
            id: Date.now(),
            name,
            score,
            category: categoryName,
            difficulty: difficultyLevel,
            date: new Date().toISOString()
        };
        
        const updatedScores = [...userScores, newScore].sort((a, b) => b.score - a.score);
        setUserScores(updatedScores);
        
        // Save to localStorage
        localStorage.setItem('quizScores', JSON.stringify(updatedScores));
        
        return newScore;
    };

    return (
       <DataContext.Provider 
          value={{
              data, 
              loading, 
              error, 
              addCategories, 
              addDifficulty, 
              setQuestionAmount,
              amount,
              userScores,
              saveScore
          }}
       >
            {children}
       </DataContext.Provider>
    );
}