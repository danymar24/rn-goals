import { gql, useMutation, useQuery } from '@apollo/client';
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

const ADD_GOAL = gql`
  mutation($goal: String) {
    addGoal(goal: $goal) {
      goal 
    }
  }
`;

const Dashboard = (props: any) => {
  const {loading: loadingGoals, error: errorLoadingGoals, data: goalsResponse} = useQuery<any>(GET_GOALS);
  const [addGoal, {data: addedGoal, loading: addingGoal, error: errorAddingGoal}] = useMutation(ADD_GOAL, {
    refetchQueries: [ GET_GOALS ]
  });
  const goalsList = goalsResponse?.goals;
  const [modalState, setModalState] = useState<boolean>(false);

  if (addingGoal) return (
    <Text>Submitting...</Text>
  );
  if (errorAddingGoal) return (
    <Text>{`Submission error! ${errorAddingGoal.message}`}</Text>
  );

  if (loadingGoals || addingGoal) return (
    <ActivityIndicator size="large" />
  );

  if (errorLoadingGoals) return (
    <Text>{`Error! ${errorLoadingGoals.message}`}</Text>
  );

  const addGoalHandler = (goal: string) => {
    if(!!goal) {
      setModalState(false);
      addGoal({variables: {goal}})
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
