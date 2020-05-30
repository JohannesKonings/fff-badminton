/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGameday = /* GraphQL */ `
  query GetGameday($id: ID!) {
    getGameday(id: $id) {
      id
      date
      games {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGamedays = /* GraphQL */ `
  query ListGamedays(
    $filter: ModelGamedayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGamedays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      gameday {
        id
        date
        createdAt
        updatedAt
      }
      player1 {
        id
        name
        test
        createdAt
        updatedAt
      }
      player2 {
        id
        name
        test
        createdAt
        updatedAt
      }
      resultPlayer1
      resultPlayer2
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        resultPlayer1
        resultPlayer2
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      name
      game {
        id
        resultPlayer1
        resultPlayer2
        createdAt
        updatedAt
      }
      test
      createdAt
      updatedAt
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        test
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
