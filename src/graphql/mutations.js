/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFaq = /* GraphQL */ `
  mutation CreateFaq(
    $input: CreateFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    createFaq(input: $input, condition: $condition) {
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
export const updateFaq = /* GraphQL */ `
  mutation UpdateFaq(
    $input: UpdateFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    updateFaq(input: $input, condition: $condition) {
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
export const deleteFaq = /* GraphQL */ `
  mutation DeleteFaq(
    $input: DeleteFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    deleteFaq(input: $input, condition: $condition) {
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
