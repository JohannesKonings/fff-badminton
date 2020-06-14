import React, { useState, useEffect } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Warning from "@material-ui/icons/Warning";
import Store from "@material-ui/icons/Store";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Danger from "components/Typography/Danger.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Amplify, { API, graphqlOperation, Analytics } from "aws-amplify";
import awsconfig from "./../../aws-exports";

import { listGames } from "./../../graphql/queries";

Amplify.configure(awsconfig);

const useStyles = makeStyles(styles);

export default function Dashboard() {
  useEffect(() => {
    onPageRendered();
  }, []);

  const onPageRendered = async () => {
    Analytics.record({ name: "navDashboard" });
    readAllGames();
  };

  const [allGamesItems, setGamesItems] = useState([]);
  const [trainingItems, setTrainingItems] = useState([]);
  const [gameItems, setGameItems] = useState([]);
  const [ewigeTabelle, setEwigeTabelle] = useState([]);
  const [numberOfGameDays, setNumberOfGameDays] = useState();
  const [numberOfGames, setNumberOfGames] = useState();
  const [averageParticipants, setAverageParticipants] = useState();
  const [firstGameDayDate, setFirstGameDayDate] = useState();

  const readAllGames = async () => {
    const allGames = await API.graphql(graphqlOperation(listGames));
    setGamesItems(allGames.data.listGames.items);
  };

  useEffect(() => {
    createEwigeTabelle();
    createTrainingsList();
    getNumberOfGameDays();
    getNumberOfGames();
    getAverageParticipants();
  }, [allGamesItems]);

  function countUnique(iterable) {
    return new Set(iterable).size;
  }

  const getNumberOfGameDays = async () => {
    const gameDayList = allGamesItems.flatMap(item => [item.gameday.id]);
    setNumberOfGameDays(countUnique(gameDayList));

    const sortedDates = gameDayList.sort();
    const minDate = sortedDates[0];
    setFirstGameDayDate(minDate);
  };

  const getNumberOfGames = async () => {
    setNumberOfGames(Object.keys(allGamesItems).length);
  };
  const getAverageParticipants = async () => {
    let gameDayPlayerCombined = [];

    let gameDayPlayer1 = allGamesItems.map(item => {
      return [item.gameday.id, item.player1.id];
    });
    let gameDayPlayer2 = allGamesItems.map(item => {
      return [item.gameday.id, item.player2.id];
    });
    gameDayPlayerCombined.push(...gameDayPlayer1);
    gameDayPlayerCombined.push(...gameDayPlayer2);

    let set = new Set(gameDayPlayerCombined.map(JSON.stringify));
    let gameDayPlayerCombinedUnique = Array.from(set).map(JSON.parse);

    const gameDayList = gameDayPlayerCombined.flatMap(item => [item[0]]);
    let numberOfGameDays = countUnique(gameDayList);

    if (numberOfGameDays !== 0) {
      let averageParticipants =
        gameDayPlayerCombinedUnique.length / numberOfGameDays;
      setAverageParticipants(averageParticipants.toFixed(2));
    }
  };

  const calculateTrainingsList = list => {
    var gamesListNo = [];
    list.reduce(function(res, value) {
      if (!res[value]) {
        res[value] = { name: value, no: 0 };
        gamesListNo.push(res[value]);
      }
      res[value].no += 1;
      return res;
    }, {});

    gamesListNo.sort((a, b) => b.no - a.no);

    let trainingsList = gamesListNo.map(item => {
      return [item.name, item.no.toString()];
    });

    return trainingsList;
  };

  const createTrainingsList = async () => {
    const gamesList = allGamesItems.flatMap(item => [
      item.gameday.id + item.player1.name,
      item.gameday.id + item.player2.name
    ]);
    let gameDayListUnique = [...new Set(gamesList)];
    gameDayListUnique = gameDayListUnique.map(x => x.substring(10));

    const gameListUnique = gamesList.map(x => x.substring(10));

    let trainingsList;
    trainingsList = calculateTrainingsList(gameDayListUnique);
    setTrainingItems(trainingsList);
    trainingsList = calculateTrainingsList(gameListUnique);
    setGameItems(trainingsList);
  };

  const createEwigeTabelle = async () => {
    const flatGameList = allGamesItems.flatMap(item => [
      [
        item.player1.name,
        item.resultPlayer1 > item.resultPlayer2 ? 1 : 0,
        item.resultPlayer1 > item.resultPlayer2 ? 0 : 1,
        item.resultPlayer1,
        item.resultPlayer2
      ],
      [
        item.player2.name,
        item.resultPlayer2 > item.resultPlayer1 ? 1 : 0,
        item.resultPlayer2 > item.resultPlayer1 ? 0 : 1,
        item.resultPlayer2,
        item.resultPlayer1
      ]
    ]);

    let gamesListNo = [];
    flatGameList.reduce(function(res, value) {
      const name = value[0];
      if (!res[name]) {
        res[name] = {
          name: name,
          gewonnen: 0,
          verloren: 0,
          punkte: 0,
          gegenpunkte: 0
        };
        gamesListNo.push(res[name]);
      }
      res[name].gewonnen += value[1];
      res[name].verloren += value[2];
      res[name].punkte += value[3];
      res[name].gegenpunkte += value[4];
      return res;
    }, {});

    const ewigeTabelle = gamesListNo.map(item => {
      return [
        item.name,
        item.gewonnen.toString(),
        item.verloren.toString(),
        item.punkte.toString(),
        item.gegenpunkte.toString()
      ];
    });

    //sort
    const sortCols = (a, b, attrs) =>
      Object.keys(attrs).reduce(
        (diff, k) => (diff == 0 ? attrs[k](a[k], b[k]) : diff),
        0
      );
    ewigeTabelle.sort((a, b) =>
      sortCols(a, b, {
        1: (a, b) => b - a,
        2: (a, b) => a - b,
        3: (a, b) => b - a,
        4: (a, b) => a - b
      })
    );

    setEwigeTabelle(ewigeTabelle);
  };

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>number gamedays</p>
              <h3 className={classes.cardTitle}>{numberOfGameDays}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Since {firstGameDayDate}
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>number of games</p>
              <h3 className={classes.cardTitle}>{numberOfGames}</h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>average participants</p>
              <h3 className={classes.cardTitle}>{averageParticipants}</h3>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <CardIcon color="danger">
                <Icon>star</Icon>
              </CardIcon>
              <h4 className={classes.cardTitleWhite}>Ewige Tabelle</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={[
                  "Name",
                  "gewonnen",
                  "verloren",
                  "Punkte",
                  "Gegenpunkte"
                ]}
                tableData={ewigeTabelle}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Trainingsweltmeister</h4>
              <p className={classes.cardCategoryWhite}>
                Anzahl der Trainigsteilnahmen
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Name", "Anzahl"]}
                tableData={trainingItems}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Gameweltmeister</h4>
              <p className={classes.cardCategoryWhite}>
                Anzahl der Spielteilnahmen
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Name", "Anzahl"]}
                tableData={gameItems}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
