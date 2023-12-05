import { gql } from "@apollo/client";

const PARTNER_QUERY = gql`
  query PocSearch($pocSearchLong: String!, $pocSearchLat: String!) {
    pocSearch(long: $pocSearchLong, lat: $pocSearchLat) {
      id
      status
      name
    }
  }
`;
export default PARTNER_QUERY;
