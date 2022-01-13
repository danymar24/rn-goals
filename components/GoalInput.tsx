import React, { useState } from 'react';
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native';

const GoalInput = (props: any) => {

  const [enteredGoal, setEnteredGoal] = useState<string>('');

  const goalInputHandler = (enteredText: string) => {
    setEnteredGoal(enteredText)
  }

  return (
    <Modal visible={props.modalState} animationType='slide'>
      <View style={styles.container}>
        <View >
          <TextInput 
            placeholder='Course goal'
            style={styles.addInput}
            onChangeText={goalInputHandler}/>
        </View>
        <View style={styles.buttons}>
          <Button title='CANCEL' onPress={props.closeModalHandler} color="red"/>
          <Button title="ADD" onPress={props.addGoalHandler.bind(this, enteredGoal)} />
        </View>
      </View>
    </Modal>
  )
}

export default GoalInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addInput: {
    width: '80%',
    padding: 4, 
    borderBottomColor: 'black', 
    borderBottomWidth: 1, 
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});