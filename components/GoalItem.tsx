import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

/**
 * Component to display the individual goal
 * 
 * @param props: any
 * @returns JSX containing the goal
 */
const GoalItem = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onDelete.bind(this, props.goal.key)}>
      <View style={styles.goalView}>
        <Text>{props.goal.goal}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  goalView: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  },
});

export default GoalItem;