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
        items {
          id
          title
          result
        }
        nextToken
      }
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
        items {
          id
          title
          result
        }
        nextToken
      }
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
        items {
          id
          title
          result
        }
        nextToken
      }
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
      title
      gameday {
        id
        date
        games {
          nextToken
        }
      }
      player1 {
        items {
          id
          name
        }
        nextToken
      }
      player2 {
        items {
          id
          name
        }
        nextToken
      }
      result
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
      title
      gameday {
        id
        date
        games {
          nextToken
        }
      }
      player1 {
        items {
          id
          name
        }
        nextToken
      }
      player2 {
        items {
          id
          name
        }
        nextToken
      }
      result
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
      title
      gameday {
        id
        date
        games {
          nextToken
        }
      }
      player1 {
        items {
          id
          name
        }
        nextToken
      }
      player2 {
        items {
          id
          name
        }
        nextToken
      }
      result
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
        title
        gameday {
          id
          date
        }
        player1 {
          nextToken
        }
        player2 {
          nextToken
        }
        result
      }
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
        title
        gameday {
          id
          date
        }
        player1 {
          nextToken
        }
        player2 {
          nextToken
        }
        result
      }
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
        title
        gameday {
          id
          date
        }
        player1 {
          nextToken
        }
        player2 {
          nextToken
        }
        result
      }
    }
  }
`;
