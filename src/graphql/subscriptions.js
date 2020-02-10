/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGameday = /* GraphQL */ `
  subscription OnCreateGameday {
    onCreateGameday {
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
export const onUpdateGameday = /* GraphQL */ `
  subscription OnUpdateGameday {
    onUpdateGameday {
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
export const onDeleteGameday = /* GraphQL */ `
  subscription OnDeleteGameday {
    onDeleteGameday {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
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
