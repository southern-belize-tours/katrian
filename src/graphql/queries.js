/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFaq = /* GraphQL */ `
  query GetFaq($id: ID!) {
    getFaq(id: $id) {
      id
      question
      answer
      pinned
      likes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFaqs = /* GraphQL */ `
  query ListFaqs(
    $filter: ModelFaqFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFaqs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        answer
        pinned
        likes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
