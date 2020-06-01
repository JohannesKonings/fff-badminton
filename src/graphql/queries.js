/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGameday = /* GraphQL */ `
  query GetGameday($id: ID!) {
    getGameday(id: $id) {
      id
      date
      games {
        items {
          id
          resultPlayer1
          resultPlayer2
        }
        nextToken
      }
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
        games {
          nextToken
        }
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
        games {
          nextToken
        }
      }
      player1 {
        id
        name
        game {
          id
          resultPlayer1
          resultPlayer2
        }
      }
      player2 {
        id
        name
        game {
          id
          resultPlayer1
          resultPlayer2
        }
      }
      resultPlayer1
      resultPlayer2
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
        gameday {
          id
          date
        }
        player1 {
          id
          name
        }
        player2 {
          id
          name
        }
        resultPlayer1
        resultPlayer2
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
        gameday {
          id
          date
        }
        player1 {
          id
          name
        }
        player2 {
          id
          name
        }
        resultPlayer1
        resultPlayer2
      }
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
        game {
          id
          resultPlayer1
          resultPlayer2
        }
      }
      nextToken
    }
  }
`;