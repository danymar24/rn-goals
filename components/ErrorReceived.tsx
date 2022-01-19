import { StyleSheet, Text } from "react-native";

/**
 * Component to display an error
 * 
 * @param props: any
 * @returns JSX containing the error
 */
const GoalItem = (props: any) => {
  return (
    <Text style={styles.error}>{props.error}</Text>
  )
}

export default GoalItem;

const styles = StyleSheet.create({

  error: {
    color: "red",
    fontSize: 12
  }
});