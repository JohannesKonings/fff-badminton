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

import Amplify, { API, graphqlOperation, Analytics } from "aws-amplify";
import awsconfig from "./../../aws-exports";

import { listGamedays, listGames, listPlayers } from "./../../graphql/queries";
import { createGameday, createGame } from "./../../graphql/mutations";
import { onCreateGameday, onCreateGame } from "./../../graphql/subscriptions";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

Amplify.configure(awsconfig);

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
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
      lineHeight: "1",
    },
  },
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
    Analytics.record({ name: "Games" });
    readGameDays();
    subscribeGameDay();
    readPlayers();
    subscribeGame();
  };

  const readGameDays = async () => {
    const allGameDays = await API.graphql(graphqlOperation(listGamedays));

    const allGameDayItems = allGameDays.data.listGamedays.items;

    allGameDayItems.sort((a, b) => {
      const dateA = a.id.replace(/-/g, "");
      const dateB = b.id.replace(/-/g, "");
      return dateA - dateB;
    });

    const tableArray = allGameDayItems.map((item) => {
      return [item.id, item.date];
    });

    setGameDayItems(tableArray);
  };

  const readGames = async (gameDayId) => {
    const allGames = await API.graphql(
      graphqlOperation(listGames, {
        filter: { id: { beginsWith: gameDayId } },
      })
    );

    const allGamesItems = allGames.data.listGames.items;

    const tableArray = allGamesItems.map((item) => {
      return [
        item.id,
        item.player1.name,
        item.player2.name,
        item.resultPlayer1.toString(),
        item.resultPlayer2.toString(),
      ];
    });

    setGameItems(tableArray);
  };

  const readPlayers = async () => {
    const allPlayers = await API.graphql(graphqlOperation(listPlayers));

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
      ("0" + d.getDate()).slice(-2),
    ].join("");

    await API.graphql(
      graphqlOperation(createGameday, {
        input: { id: gameDayDateString, date: gameDayDateString },
      })
    );
  };

  const addGame = async (
    gameDayId,
    gameId,
    player1Id,
    player2Id,
    resultPlayer1,
    resultPlayer2
  ) => {
    try {
      await API.graphql(
        graphqlOperation(createGame, {
          input: {
            id: gameId,
            gameGamedayId: gameDayId,
            gamePlayer1Id: player1Id,
            gamePlayer2Id: player2Id,
            resultPlayer1: resultPlayer1,
            resultPlayer2: resultPlayer2,
          },
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const subscribeGameDay = async () => {
    await API.graphql(graphqlOperation(onCreateGameday)).subscribe({
      next: (subonCreateGameday) => {
        const variant = "success";
        enqueueSnackbar(
          "Gamday created: " + subonCreateGameday.value.data.onCreateGameday.id,
          { variant }
        );

        setGameDayItems((gameDayItems) => [
          ...gameDayItems,
          [
            subonCreateGameday.value.data.onCreateGameday.id,
            subonCreateGameday.value.data.onCreateGameday.date,
          ],
        ]);
      },
    });
  };

  const subscribeGame = async () => {
    await API.graphql(graphqlOperation(onCreateGame)).subscribe({
      next: (subonCreateGame) => {
        const variant = "success";
        enqueueSnackbar(
          "Game created: " + subonCreateGame.value.data.onCreateGame.id,
          { variant }
        );

        setGameItems((gameItems) => [
          ...gameItems,
          [
            subonCreateGame.value.data.onCreateGame.id,
            subonCreateGame.value.data.onCreateGame.player1.name,
            subonCreateGame.value.data.onCreateGame.player2.name,
            subonCreateGame.value.data.onCreateGame.resultPlayer1.toString(),
            subonCreateGame.value.data.onCreateGame.resultPlayer2.toString(),
          ],
        ]);
      },
    });
  };

  useEffect(() => {
    onPageRendered();
  }, []);

  function onClickCreateGameDay() {
    addGameDay();
  }

  function onClickCreateGame() {
    const player1 = playerItems.find((player) => player.id === selectedPlayer1);
    const player2 = playerItems.find((player) => player.id === selectedPlayer2);
    const gameDayId = selectedGameDay[1];
    const gameId = [gameDayId] + "#" + selectedPlayer1 + "#" + selectedPlayer2;
    const gameIdRegExp = new RegExp(gameId, "g");
    let serialId;
    try {
      serialId = gameItems.toString().match(gameIdRegExp).length + 1;
    } catch (err) {
      serialId = 1;
    }
    console.log("serialId", serialId);
    const gameIdserialId = gameId + "#" + serialId;

    addGame(
      gameDayId,
      gameIdserialId,
      player1.id,
      player2.id,
      parseInt(resultPlayer1),
      parseInt(resultPlayer2)
    );
  }

  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGameDaySelection = (event, key) => {
    let selectedGameDayFromState = gameDayItems[key][0];
    readGames(selectedGameDayFromState);
    setSelectedGameDay(gameDayItems[key]);
  };

  const handleSelectedPlayer1 = (value) => {
    setSelectedPlayer1(value);
  };

  const handleSelectedPlayer2 = (value) => {
    setSelectedPlayer2(value);
  };

  const handleResultPlayer1 = (value) => {
    setResultPlayer1(value);
  };

  const handleResultPlayer2 = (value) => {
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
                      "aria-label": "change date",
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
                      fullWidth: true,
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
                      fullWidth: true,
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
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                    }}
                    textFieldValue={handleResultPlayer1}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="ResultPlayer2"
                    id="resultPlayer2"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
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
                "ResultPlayer2",
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
