import { gql } from "@apollo/client";

const REMOVE_GOAL = gql`
  mutation DeleteGoal($key: String) {
    deleteGoal(key: $key)
  }
`;

export default REMOVE_GOAL;