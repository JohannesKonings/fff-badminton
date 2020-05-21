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
          resultPlayer1
          resultPlayer2
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
          resultPlayer1
          resultPlayer2
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
          resultPlayer1
          resultPlayer2
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
      id
      gameday {
        id
        date
        games {
          nextToken
        }
        createdAt
        updatedAt
      }
      player1 {
        id
        name
        game {
          id
          resultPlayer1
          resultPlayer2
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      player2 {
        id
        name
        game {
          id
          resultPlayer1
          resultPlayer2
          createdAt
          updatedAt
        }
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
      id
      gameday {
        id
        date
        games {
          nextToken
        }
        createdAt
        updatedAt
      }
      player1 {
        id
        name
        game {
          id
          resultPlayer1
          resultPlayer2
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      player2 {
        id
        name
        game {
          id
          resultPlayer1
          resultPlayer2
          createdAt
          updatedAt
        }
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
      id
      gameday {
        id
        date
        games {
          nextToken
        }
        createdAt
        updatedAt
      }
      player1 {
        id
        name
        game {
          id
          resultPlayer1
          resultPlayer2
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      player2 {
        id
        name
        game {
          id
          resultPlayer1
          resultPlayer2
          createdAt
          updatedAt
        }
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
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
      id
      name
      game {
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
          createdAt
          updatedAt
        }
        player2 {
          id
          name
          createdAt
          updatedAt
        }
        resultPlayer1
        resultPlayer2
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        gameday {
          id
          date
          createdAt
          updatedAt
        }
        player1 {
          id
          name
          createdAt
          updatedAt
        }
        player2 {
          id
          name
          createdAt
          updatedAt
        }
        resultPlayer1
        resultPlayer2
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        gameday {
          id
          date
          createdAt
          updatedAt
        }
        player1 {
          id
          name
          createdAt
          updatedAt
        }
        player2 {
          id
          name
          createdAt
          updatedAt
        }
        resultPlayer1
        resultPlayer2
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
