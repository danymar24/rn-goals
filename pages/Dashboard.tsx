import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';

/**
 * Required components
 */
import GoalInput from '../components/GoalInput';
import GoalItem from '../components/GoalItem';
import ErrorReceived from '../components/ErrorReceived';

/**
 * Graphql queries and mutations
 */
import ADD_GOAL from '../graphql/AddGoal';
import GET_GOALS from '../graphql/GetGoals';
import REMOVE_GOAL from '../graphql/RemoveGoal';

/**
 * Displays the main page of the application
 * 
 * @param props: any
 * @returns JSX - the page to load
 */
const Dashboard = (props: any) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const {loading: loadingGoals, error: errorLoadingGoals, data: goalsResponse} = useQuery<any>(GET_GOALS);
  const [addGoal, {data: addedGoal, loading: addingGoal, error: errorAddingGoal}] = useMutation(ADD_GOAL, {
    refetchQueries: [ GET_GOALS ]
  });
  const [removeGoal, {data: removedGoal, loading: removingGoal, error: errorRemovingGoal }] = useMutation(REMOVE_GOAL, {
    refetchQueries: [ GET_GOALS ]
  });
  const goalsList = goalsResponse?.goals;

  if (loadingGoals || addingGoal || removingGoal) return (
    <ActivityIndicator style={styles.loading} size="large" />
  );

  if(errorAddingGoal || errorLoadingGoals || errorRemovingGoal) {
    const error = errorAddingGoal || errorLoadingGoals || errorRemovingGoal;
    return <ErrorReceived error={error?.message}/>
  }

  const addGoalHandler = (goal: string) => {
    if(!!goal) {
      setModalState(false);
      addGoal({variables: {goal}})
    }
  }

  const onDeleteHandler = (key: string) => {
    if(!!key) {
      removeGoal({variables: {key}});
    }
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
  loading: {
    flex: 1
  }
});
