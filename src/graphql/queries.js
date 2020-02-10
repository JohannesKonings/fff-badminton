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
          title
          result
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
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          title
          result
        }
      }
      nextToken
    }
  }
`;
