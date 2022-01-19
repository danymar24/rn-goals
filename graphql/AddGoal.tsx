import { gql } from "@apollo/client";

const ADD_GOAL = gql`
  mutation AddGoal($goal: String) {
    addGoal(goal: $goal) {
      key
      goal
    }
  }
`;

export default ADD_GOAL;