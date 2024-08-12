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

export const getTune = `
  query GetTune($id: ID!) {
    getTune(id: $id) {
      id
      name
      artist
      createdAt
      updatedAt
      __typename
    }
  }`;

export const listTunes = /* GraphQL */ `
  query ListTunes(
    $filter: ModelTuneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTunes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        artist
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const listGalleries = /* GraphQL */ `
  query ListGalleries(
    $filter: ModelGalleryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGalleries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;

export const getGallery = /* GraphQL */ `
  query getGallery($id: ID!) {
    getGallery(id: $id) {
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

export const getGroup = `
  query getGroup($id: ID!) {
    getGroup(id: $id) {
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

export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;

export const listGuests = /* GraphQL */ `
  query ListGuests(
    $filter: ModelGuestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGuests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first
        last
        attending_ceremony
        attending_brunch
        attending_rehearsal
        attending_happy_hour
        createdAt
        updatedAt
        notes
        __typename
      }
      nextToken
      __typename
    }
  }
`;