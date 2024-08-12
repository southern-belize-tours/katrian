/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGroup = `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
      id
      title
      invited_rehearsal
      address
      city
      state
      email
      zip
      invited_happy_hour
      phone
      Guest_ids
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const createGuest = `
  mutation CreateGuest(
    $input: CreateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    createGuest(input: $input, condition: $condition) {
      id
      first
      last
      attending_ceremony
      attending_brunch
      attending_rehearsal
      attending_happy_hour
      notes
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const updateGroup = `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
      id
      title
      invited_rehearsal
      address
      city
      state
      zip
      invited_happy_hour
      phone
      email
      Guest_ids
      createdAt
      updatedAt
      __typename
    }
  }
`

export const updateGuest = `
  mutation UpdateGuest(
    $input: UpdateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    updateGuest(input: $input, condition: $condition) {
      id
      first
      last
      attending_ceremony
      attending_brunch
      attending_rehearsal
      attending_happy_hour
      notes
      createdAt
      updatedAt
      __typename
    }
  }
`;

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

export const deleteGroup = `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
      id
      title
      invited_rehearsal
      address
      city
      state
      email
      zip
      invited_happy_hour
      phone
      Guest_ids
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteGuest = `
  mutation DeleteGuest(
    $input: DeleteGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    deleteGuest(input: $input, condition: $condition) {
      id
      first
      last
      attending_ceremony
      attending_brunch
      attending_rehearsal
      attending_happy_hour
      notes
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
