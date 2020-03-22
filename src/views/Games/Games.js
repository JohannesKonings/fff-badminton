import "date-fns";
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomInputSelect from "components/CustomInput/CustomInputSelect.js";

import { SnackbarProvider, useSnackbar } from "notistack";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./../../aws-exports";

import { listGamedays, listGames, listPlayers } from "./../../graphql/queries";
import { createGameday, updateGameday } from "./../../graphql/mutations";
import { onCreateGameday } from "./../../graphql/subscriptions";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

Amplify.configure(awsconfig);

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

//https://dev.to/joemsak/barebones-aws-amplify-react-graphql-app-5ae8
function Games() {
  const [gameDayItems, setGameDayItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedGameDay, setSelectedGameDay] = useState([]);
  const [gameItems, setGameItems] = useState([]);

  const [playerItems, setPlayerItems] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState("");
  const [selectedPlayer2, setSelectedPlayer2] = useState("");
  const [resultPlayer1, setResultPlayer1] = useState("");
  const [resultPlayer2, setResultPlayer2] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const onPageRendered = async () => {
    readGameDays();
    subscribeGameDay();
    readPlayers();
  };

  const readGameDays = async () => {
    const allGameDays = await API.graphql(graphqlOperation(listGamedays));
    console.log(allGameDays.data.listGamedays.items);

    const allGameDayItems = allGameDays.data.listGamedays.items;

    const tableArray = allGameDayItems.map(item => {
      return [item.id, item.date];
    });
    console.log(tableArray);

    tableArray.sort(function(a, b) {
      return a.id - b.id;
    });

    setGameDayItems(tableArray);
  };

  const readGames = async gameDayId => {
    const allGames = await API.graphql(
      graphqlOperation(listGames, {
        filter: { id: { beginsWith: gameDayId } }
      })
    );

    const allGamesItems = allGames.data.listGames.items;

    const tableArray = allGamesItems.map(item => {
      return [
        item.id,
        item.player1.name,
        item.player2.name,
        item.resultPlayer1.toString(),
        item.resultPlayer2.toString()
      ];
    });
    console.log(tableArray);
    setGameItems(tableArray);
  };

  const readPlayers = async () => {
    const allPlayers = await API.graphql(graphqlOperation(listPlayers));
    console.log(allPlayers.data.listPlayers.items);

    const allPlayersItems = allPlayers.data.listPlayers.items;

    setPlayerItems(allPlayersItems);
  };

  const addGameDay = async () => {
    const d = selectedDate;
    const gameDayDateString = [
      d.getFullYear(),
      "-",
      ("0" + (d.getMonth() + 1)).slice(-2),
      "-",
      ("0" + d.getDate()).slice(-2)
    ].join("");
    console.log(gameDayDateString);

    await API.graphql(
      graphqlOperation(createGameday, {
        input: { id: gameDayDateString, date: gameDayDateString }
      })
    );
  };

  const updateGameDay = async () => {
    const d = selectedDate;
    const gameDayDateString = [
      d.getFullYear(),
      "-",
      ("0" + (d.getMonth() + 1)).slice(-2),
      "-",
      ("0" + d.getDate()).slice(-2)
    ].join("");
    console.log(gameDayDateString);

    await API.graphql(
      graphqlOperation(updateGameday, {
        input: { id: selectedGameDay[0], date: selectedGameDay[1] }
      })
    );
  };

  const subscribeGameDay = async () => {
    await API.graphql(graphqlOperation(onCreateGameday)).subscribe({
      next: subonCreateGameday => {
        console.log("subscription", subonCreateGameday);
        const variant = "success";
        enqueueSnackbar(
          "Gamday created: " + subonCreateGameday.value.data.onCreateGameday.id,
          { variant }
        );

        setGameDayItems(gameDayItems => [
          ...gameDayItems,
          [
            subonCreateGameday.value.data.onCreateGameday.id,
            subonCreateGameday.value.data.onCreateGameday.date
          ]
        ]);

        /*
        newGameDayList.sort(function(a, b) {
          return a.id - b.id;
        });

        setGameDayItems(newGameDayList)
        */
      }
    });
  };

  useEffect(() => {
    onPageRendered();
  }, []);

  function onClickCreateGameDay() {
    console.log("create GameDay: " + selectedDate);
    addGameDay();
  }

  function onClickCreateGame() {
    console.log("create Game: ");
    console.log(selectedPlayer1);
    console.log(selectedPlayer2);
    const player1 = playerItems.find(player => player.id === selectedPlayer1);
    const player2 = playerItems.find(player => player.id === selectedPlayer2);
    const key = selectedGameDay[1];
    const gameId = [key] + "#" + selectedPlayer1 + "#" + selectedPlayer2;
    console.log(selectedGameDay);
    console.log(gameId);
    const games = [
      gameId,
      player1.name,
      player2.name,
      resultPlayer1,
      resultPlayer2
    ];
    //setGameItems(games)

    setGameItems(gameItems => [...gameItems, games]);

    console.log(gameItems);

    updateGameDay();
  }

  const classes = useStyles();

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleGameDaySelection = (event, key) => {
    console.log(key);
    console.log(gameDayItems);
    console.log(gameDayItems[key][0]);
    readGames(gameDayItems[key][0]);
  };

  const handleSelectedPlayer1 = value => {
    setSelectedPlayer1(value);
  };

  const handleSelectedPlayer2 = value => {
    setSelectedPlayer2(value);
  };

  const handleResultPlayer1 = value => {
    setResultPlayer1(value);
  };

  const handleResultPlayer2 = value => {
    setResultPlayer2(value);
  };

  return (
    <GridContainer>
      {/* GameDays */}

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <GridContainer justify="flex-start">
              <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.cardTitleWhite}>Gamedays</h4>
                <p className={classes.cardCategoryWhite}>
                  Whenever wherever games happend
                </p>
              </GridItem>
            </GridContainer>
            <GridContainer justify="flex-end">
              <GridItem xs={12} sm={12} md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd.MM.yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>

                <Button onClick={onClickCreateGameDay} color="primary">
                  Create a Gameday
                </Button>
              </GridItem>
            </GridContainer>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Id", "Date"]}
              tableData={gameDayItems}
              selectedRow={handleGameDaySelection}
            />
          </CardBody>
        </Card>
      </GridItem>

      {/* Games */}

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <GridContainer justify="space-between" spacing={2}>
              <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.cardTitleWhite}>
                  Games {selectedGameDay[1]}
                </h4>
                <p className={classes.cardCategoryWhite}>
                  All games per GameDay
                </p>
              </GridItem>
            </GridContainer>

            <GridContainer justify="space-between" spacing={2}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInputSelect
                    labelText="Player1"
                    id="player1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    menuItems={playerItems}
                    textFieldValue={handleSelectedPlayer1}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInputSelect
                    labelText="Player2"
                    id="player2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    menuItems={playerItems}
                    textFieldValue={handleSelectedPlayer2}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="ResultPlayer1"
                    id="resultPlayer1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number"
                    }}
                    textFieldValue={handleResultPlayer1}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="ResultPlayer2"
                    id="resultPlayer2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number"
                    }}
                    textFieldValue={handleResultPlayer2}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Button onClick={onClickCreateGame} color="primary">
                    Create a Game
                  </Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Id",
                "Player1",
                "Player2",
                "ResultPlayer1",
                "ResultPlayer2"
              ]}
              tableData={gameItems}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

//export default Games;

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Games />
    </SnackbarProvider>
  );
}
