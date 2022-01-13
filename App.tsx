import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goalsList, setGoalsList] = useState<any[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);

  const addGoalHandler = (goal: string) => {
    if(!!goal) {
      setModalState(false);
      setGoalsList((currentGoals: any[]) => [...currentGoals, {key: Math.random().toString(), goal}]);
    }
  }

  const onDeleteHandler = (goalKey: any) => {
    setGoalsList((currentGoals: any[]) => currentGoals.filter((item) => item.key !== goalKey));
  }

  const onCloseModalHandler = () => {
    setModalState(false);
  }

  return (
    <View style={styles.container}>
      <View>
        <Button title='Add goal' onPress={() => setModalState(true)}/>
      </View>
      <GoalInput modalState={modalState} addGoalHandler={addGoalHandler} closeModalHandler={onCloseModalHandler}/>
      <FlatList 
        data={goalsList}
        renderItem={itemData => <GoalItem goal={itemData.item} onDelete={onDeleteHandler}/>}>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
});
