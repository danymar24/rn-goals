import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import GoalInput from '../components/GoalInput';
import GoalItem from '../components/GoalItem';

const GET_GOALS = gql`
  query Goals {
    goals {
      key
      goal
    }
  }
`;

const Dashboard = (props: any) => {
  const {loading, error, data} = useQuery<any>(GET_GOALS);
  const goalsList = data?.goals;
  const [modalState, setModalState] = useState<boolean>(false);
  console.log('loading', loading);
  console.log('goals', goalsList);
  if (loading) return (
    <ActivityIndicator size="large" />
  );

  if (error) return (
    <Text>`Error! ${error.message}`</Text>
  );

  const addGoalHandler = (goal: string) => {
    if(!!goal) {
      setModalState(false);
      // setGoalsList((currentGoals: any[]) => [...currentGoals, {key: Math.random().toString(), goal}]);
    }
  }

  const onDeleteHandler = (goalKey: any) => {
    // setGoalsList((currentGoals: any[]) => currentGoals.filter((item) => item.key !== goalKey));
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
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
});
