/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGameday = /* GraphQL */ `
  mutation CreateGameday(
    $input: CreateGamedayInput!
    $condition: ModelGamedayConditionInput
  ) {
    createGameday(input: $input, condition: $condition) {
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
export const updateGameday = /* GraphQL */ `
  mutation UpdateGameday(
    $input: UpdateGamedayInput!
    $condition: ModelGamedayConditionInput
  ) {
    updateGameday(input: $input, condition: $condition) {
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
export const deleteGameday = /* GraphQL */ `
  mutation DeleteGameday(
    $input: DeleteGamedayInput!
    $condition: ModelGamedayConditionInput
  ) {
    deleteGameday(input: $input, condition: $condition) {
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
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
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
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
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
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
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
