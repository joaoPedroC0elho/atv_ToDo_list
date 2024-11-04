import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './Componente/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks !== null) {
          setTaskItems(JSON.parse(savedTasks));
        }
      } catch (e) {
        console.error('Falha ao carregar tarefas', e);
      }
    };

    loadTasks();
  }, []);

  const savetasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Falha ao salvar tarefas', e);
    }
  };

  const handleAddTask = () => {
    if (task) {
      Keyboard.dismiss();
      const newTaskItems = [...taskItems, task];
      setTaskItems(newTaskItems);
      savetasks(newTaskItems);
      setTask(null);
    }
  };

  const completeTask = (index) => {
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    savetasks(itemsCopy);
  };

  return (
    <View style={styles.container}>
      
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tarefas</Text>
        <View style={styles.items}>
          
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <Task text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Digite suas tarefas'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#70F8BA',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});