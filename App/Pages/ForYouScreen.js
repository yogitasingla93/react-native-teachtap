import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const ForYouScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState({ id: null, answer: null });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://cross-platform.rp.devfactory.com/for_you');
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const revealAnswer = async (id) => {
    try {
      const response = await fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${id}`);
      const data = await response.json();
      setSelectedAnswer({ id, answer: data.answer });
    } catch (error) {
      console.error('Error revealing answer:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.question}</Text>
      <Button title="Reveal Answer" onPress={() => revealAnswer(item.id)} />
      {selectedAnswer.id === item.id && (
        <Text style={styles.answerText}>Answer: {selectedAnswer.answer}</Text>
      )}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={questions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  answerText: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
  },
});

export default ForYouScreen;
