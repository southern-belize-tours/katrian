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
export const createTune = /* GraphQL */ `
  mutation CreateTune(
    $input: CreateTuneInput!
    $condition: ModelTuneConditionInput
  ) {
    createTune(input: $input, condition: $condition) {
      id
      name
      artist
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTune = /* GraphQL */ `
  mutation UpdateTune(
    $input: UpdateTuneInput!
    $condition: ModelTuneConditionInput
  ) {
    updateTune(input: $input, condition: $condition) {
      id
      name
      artist
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTune = /* GraphQL */ `
  mutation DeleteTune(
    $input: DeleteTuneInput!
    $condition: ModelTuneConditionInput
  ) {
    deleteTune(input: $input, condition: $condition) {
      id
      name
      artist
     createdAt
      updatedAt
      __typename
    }
  }
`;

export const createGallery = `
mutation CreateGallery(
  $input: CreateGalleryInput!
  $condition: ModelGalleryConditionInput
) {
  createGallery(input: $input, condition: $condition) {
    id
    name
    long_description
    alts
    directory
    admin_upload_only
    createdAt
    updatedAt
    __typename
  }
}`;

export const updateGallery = `
  mutation UpdateGallery(
    $input: UpdateGalleryInput!
    $condition: ModelGalleryConditionInput
  ) {
    updateGallery(input: $input, condition: $condition) {
      id
      name
      long_description
      alts
      directory
      admin_upload_only
      createdAt
      updatedAt
      __typename
    }
  }
`

export const deleteGallery = `
  mutation DeleteGallery(
    $input: DeleteGalleryInput!
    $condition: ModelGalleryConditionInput
  ) {
    deleteGallery(input: $input, condition: $condition) {
      id
      name
      long_description
      alts
      directory
      admin_upload_only
      createdAt
      updatedAt
      __typename
    }
  }
`;
