import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { quizQuestions } from '../data/quizData';

const SPACE_BG = 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=3000&auto=format&fit=crop';

export default function QuizScreen({ navigation }: any) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  const question = quizQuestions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple taps
    
    setSelectedAnswer(answer);
    
    const isCorrect = answer === question.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1000); // 1 second delay to see the result
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  return (
    <ImageBackground source={{ uri: SPACE_BG }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      <View style={styles.content}>
        {showResults ? (
          <View style={styles.card}>
            <Text style={styles.title}>Quiz Complete!</Text>
            <Text style={styles.scoreText}>You scored {score} out of {quizQuestions.length}</Text>
            
            <TouchableOpacity style={styles.actionButton} onPress={restartQuiz}>
              <Text style={styles.actionButtonText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.outlineButton]} onPress={() => navigation.navigate('Level1')}>
              <Text style={styles.outlineButtonText}>Back to Orbit Map</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.progressText}>Question {currentQuestionIndex + 1} of {quizQuestions.length}</Text>
            <Text style={styles.questionText}>{question.question}</Text>
            
            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => {
                let buttonStyle = styles.optionButton;
                let textStyle = styles.optionText;
                
                if (selectedAnswer) {
                  if (option === question.correctAnswer) {
                    buttonStyle = [styles.optionButton, styles.correctOption];
                    textStyle = [styles.optionText, styles.correctText];
                  } else if (option === selectedAnswer) {
                    buttonStyle = [styles.optionButton, styles.wrongOption];
                    textStyle = [styles.optionText, styles.wrongText];
                  }
                }
                
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={buttonStyle} 
                    onPress={() => handleAnswer(option)}
                    activeOpacity={0.7}
                  >
                    <Text style={textStyle}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  progressText: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  questionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 32,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  correctOption: {
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    borderColor: '#4ade80',
  },
  correctText: {
    color: '#4ade80',
  },
  wrongOption: {
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
    borderColor: '#f87171',
  },
  wrongText: {
    color: '#f87171',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreText: {
    color: '#a78bfa',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: '#8b5cf6',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  outlineButtonText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
