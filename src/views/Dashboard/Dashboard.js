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
  const [trainingsItems, setTrainingItems] = useState([]);
  const [numberOfGameDays, setNumberOfGameDays] = useState();
  const [numberOfGames, setNumberOfGames] = useState();
  const [averageParticipants, setAverageParticipants] = useState();
  const [firstGameDayDate, setFirstGameDayDate] = useState();

  const readAllGames = async () => {
    const allGames = await API.graphql(graphqlOperation(listGames));
    setGamesItems(allGames.data.listGames.items);
  };

  useEffect(() => {
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

  const createTrainingsList = async () => {
    const gamesList = allGamesItems.flatMap(item => [
      item.gameday.id + item.player1.name,
      item.gameday.id + item.player2.name
    ]);
    let gamesListUnique = [...new Set(gamesList)];
    gamesListUnique = gamesListUnique.map(x => x.substring(10));
    var gamesListNo = [];
    gamesListUnique.reduce(function(res, value) {
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

    setTrainingItems(trainingsList);
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
                tableData={trainingsItems}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
