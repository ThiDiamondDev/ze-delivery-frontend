import { gql } from "@apollo/client";

const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      title
    }
  }
`;
export default CATEGORIES_QUERY;
