import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, Button, Image, FlatList } from 'react-native';

const QuesData = () => {
  const [data, setData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    getAPIData();

    const timer = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getAPIData = async () => {
    try {
      const url = "https://cross-platform.rp.devfactory.com/for_you";
      let result = await fetch(url);
      result = await result.json();
      if (result && result.id) {
        setData(result);
        setSelectedAnswer(null);
        setShowCorrectAnswer(false);
      } else {
        console.error("Unexpected data format:", result);
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };
  

  const handleNextQuestion = () => {
    getAPIData();
  };

  const handleOptionPress = async (selectedOption) => {
    setSelectedAnswer(selectedOption);
    setShowCorrectAnswer(true);

    if (!showCorrectAnswer) {
      const revealUrl = `https://cross-platform.rp.devfactory.com/reveal?id=${data.id}`;
      try {
        const revealResult = await fetch(revealUrl);
        const correctAnswer = await revealResult.json();
        setData((prevData) => ({ ...prevData, correctAnswer: correctAnswer.correct_options[0].id }));
      } catch (error) {
        console.error("Error fetching reveal answer:", error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.optionButton,
        selectedAnswer === item.id && styles.selectedOptionButton,
        showCorrectAnswer && item.id === data.correctAnswer && styles.correctOptionButton,
        showCorrectAnswer && selectedAnswer === item.id && item.id !== data.correctAnswer && styles.wrongOptionButton,
      ]}
      onPress={() => handleOptionPress(item.id)}
      disabled={showCorrectAnswer}
    >
      <Text style={styles.optionText}>{item.answer}</Text>
      {showCorrectAnswer && selectedAnswer === item.id && item.id !== data.correctAnswer && (
        <Image source={require('./../Assets/images/wrong.png')} style={styles.resultIcon} />
      )}
      {showCorrectAnswer && item.id === data.correctAnswer && (
        <Image source={require('./../Assets/images/right.png')} style={styles.resultIcon} />
      )}
    </TouchableOpacity>
  );

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View>
      {data ? (
        <View>
          <ImageBackground source={{ uri: data.image }} style={styles.mcqScreen} resizeMode="cover">
            <View style={styles.topContainer}>
              <View style={styles.timerContainer}>
                <Image source={require('./../Assets/images/timer.png')} style={styles.timerIcon} />
                <Text style={styles.timerText}>{formatTime(timeSpent)}</Text>
              </View>
              <View style={styles.forYouBox}> 
                <Text style={styles.forYouText}>For You</Text> 
              </View>
             
              <Image source={require('./../Assets/images/search.png')} style={styles.timerIcon} />
            </View>
            <View style={styles.mainFlex}>
              <View style={styles.mainsection}>
                <View style={styles.questionContainer}>
                  <Text style={styles.question}>{data.question}</Text>
                </View>
                <View style={styles.optionsContainer}>
                <FlatList
                  data={data.options}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>

                <Text style={styles.authorText}>{data.user.name}</Text>
                <Text style={styles.descriptionText}>{data.description}</Text>
              </View>
              <View style={styles.sidebar}>
                <View style={styles.sidebarInner}>
                  <View style={styles.authorContainer}>
                    <Image source={{ uri: data.user.avatar }} style={styles.avatar} />
                    <Text style={styles.plus}>+</Text>
                  </View>
                  <View>
                    <Image source={require('./../Assets/images/like.png')} />
                    <Text style={styles.text}>87</Text>
                  </View>
                  <View>
                    <Image source={require('./../Assets/images/comment.png')} />
                    <Text style={styles.text}>2</Text>
                  </View>
                  <View>
                    <Image source={require('./../Assets/images/bookmark.png')} />
                    <Text style={styles.text}>203</Text>
                  </View>
                  <View>
                    <Image source={require('./../Assets/images/share.png')} />
                    <Text style={styles.text}>17</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bottomBar}>
              <View style={styles.playlistView}>
                <Image source={require('./../Assets/images/playlist.png')} style={{ marginHorizontal: 10 }} />
                <Text style={styles.playlistText}>Playlist: {data.playlist}</Text>
              </View>
              <Button title=" > " onPress={handleNextQuestion} disabled={!showCorrectAnswer} style={styles.nextButton} />
            </View>

            <View style={styles.footerContainer}>
            <View style={styles.footerItem}>
              <Image source={require('./../Assets/images/home.png')} style={styles.timerIcon} />
              <Text style={styles.footerText}>Home</Text>
            </View>
            <View style={styles.footerItem}>
              <Image source={require('./../Assets/images/discover.png')} style={styles.timerIcon} />
              <Text style={styles.footerText}>Discover</Text>
            </View>
            <View style={styles.footerItem}>
              <Image source={require('./../Assets/images/activity.png')} style={styles.timerIcon} />
              <Text style={styles.footerText}>Activities</Text>
            </View>
            <View style={styles.footerItem}>
              <Image source={require('./../Assets/images/grey-bookmark.png')} style={styles.timerIcon} />
              <Text style={styles.footerText}>Bookmark</Text>
            </View>
            <View style={styles.footerItem}>
              <Image source={require('./../Assets/images/profile.png')} style={styles.timerIcon} />
              <Text style={styles.footerText}>Profile</Text>
            </View>
          </View>
          </ImageBackground>
          
        </View>
      ) : (
        <Text style={{ fontSize: 40, color: 'black' }}>No questions available for you</Text>
      )}
    </View>
  );

};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      apiCallText: {
        fontSize: 20,
        marginBottom: 10,
      },
      mcqScreen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.45)'
  },
  text: {
    fontSize: 15,
    color: 'white', 
    textAlign: 'center',
    textShadowRadius: 2,
    textShadowOffset: {
      width: 2,
      height: 2,
    }
  },
  resultIcon: {
    width: 20,
    height: 20,
    marginLeft: 12, // Ensure the icon stays within the button
  },
  question: {
    fontSize: 28,
    color: 'white', 
    backgroundColor:'rgba(0, 0, 0, 0.7)',
    paddingLeft: 2,
    textAlignVertical: 'top',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'white'
  },
  authorText: {
    fontSize: 18,
    color: 'white',
    textShadowRadius: 2,
    textShadowOffset: {
      width: 2,
      height: 2,
    }
  },
  playlistText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    justifyContent: 'space-around',
    alignItems: 'baseline'
  },
  descriptionText: {
    fontSize: 15,
    color: 'white',
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 20,
    color: 'white',
    margin: 10,
  },
  noDataText: {
    fontSize: 50,
    color: 'black',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    textShadowColor: 'black',
    paddingRight: 19,
    textShadowRadius: 2,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  selectedOptionButton: {
    backgroundColor: 'rgba(220, 95, 95, 0.7)',
  },
  correctOptionButton: {
    backgroundColor: 'rgba(40, 177, 143, 0.7)',
  },
  wrongOptionButton: {
    backgroundColor: 'rgba(220, 95, 95, 0.7)',
  },
  mainsection: {
    flex:0.8,
    justifyContent: 'flex-start',
    marginLeft: 0,
    paddingLeft: 10,
  }, 
  bottomBar: {
    backgroundColor: 'black',
    flexDirection:'row', 
    flexWrap:'no-wrap',
    justifyContent: 'space-between',
    flex: 0.08,
    width: '100%',
    height: 60,
    alignItems: 'center',
    margin: 0,
    paddingHorizontal: 10,
  },
  playlistView: {
    flexDirection:'row', 
    flexWrap:'no-wrap',
    justifyContent: 'flex-start',
    flex: 0.6,
    height: 30,
    alignItems: 'center'
  },
  nextButton:{
    backgroundColor:'black',  
    height: 10,  
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  plus: {
    backgroundColor: '#28B18F',
    borderRadius:35,
    paddingHorizontal: 8,
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  mainFlex: {
    flex: 0.9,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 0.3,
    justifyContent: 'flex-start',
  },
  timerIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  timerText: {
    fontSize: 16,
    color: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 40,
    flex: 0.1,
  },
  sidebarInner:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-end",
    flex: 0.65,
    alignSelf: 'flex-end',
   },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: "space-between",
    backgroundColor: 'black',
    flex: 0.05,
  },
  footerItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    flex: 0.2,
  }, 
  footerText: {
    fontSize: 10,
    color: 'white',
  },
  forYouBox: {
    flex: 0.5,
    alignSelf: 'center',
  }, forYouText: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'white',
  },
  questionContainer: {
    flex: 0.4,
    justifyContent: 'flex-start', 
    paddingTop: 10, 
  }, optionsContainer: {
    flex: 0.6,
    justifyContent: 'flex-start', 
  }
})

export default QuesData;

{/*const handleNextQuestion = () => { 
  setTimeSpent(0); // Reset timer
  getAPIData();
};
 */}