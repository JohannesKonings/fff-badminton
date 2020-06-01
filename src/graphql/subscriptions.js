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
          resultPlayer1
          resultPlayer2
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
          resultPlayer1
          resultPlayer2
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