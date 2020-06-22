import React, {useState, useEffect} from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    findRepositories();
  }, []);

  function findRepositories(){
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }

  async function handleLikeRepository(id) {    
    const repository = repositories.find(repository => repository.id === id);

    if(!repository)
      return response.status(400).send();

    const response = await api.post(`repositories/${id}/like`).then(response => {
      findRepositories();
    }).catch(err => console.log(err));
    
    return response.satus(204).send();
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <View style={styles.repositoryContainer}>
          <FlatList 
            data={repositories}
            keyExtractor={repository => repository.id}
            renderItem={({ item: repository }) => (
            <View>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                <Text style={styles.tech}>ReactJS</Text>
                <Text style={styles.tech}>Node.js</Text>
              </View>

              <View style={styles.techsContainer}>  
                <Text
                  style={styles.likeText}             
                  testID={`repository-likes-${repository.id}`}
                >               
                {repository.likes} curtid{repository.likes > 1 ? "as" : "a"}             
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}                
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>        
            )}
          />
        </View>             
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 20,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
