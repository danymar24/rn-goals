import { gql } from "@apollo/client";

const GET_GOALS = gql`
  query Goals {
    goals {
      key
      goal
    }
  }
`;

export default GET_GOALS;