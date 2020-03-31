import React, { useState, useEffect } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./../../aws-exports";

import { listGames } from "./../../graphql/queries";

Amplify.configure(awsconfig);

const useStyles = makeStyles(styles);

export default function Dashboard() {
  useEffect(() => {
    onPageRendered();
  }, []);

  const onPageRendered = async () => {
    createTrainingsList();
  };

  const [trainingsItems, setTrainingItems] = useState([]);

  const createTrainingsList = async () => {
    const allGames = await API.graphql(graphqlOperation(listGames));

    const allGamesItems = allGames.data.listGames.items;

    const gamesList = allGamesItems.flatMap(item => [
      item.player1.name,
      item.player2.name
    ]);

    var gamesListNo = [];
    gamesList.reduce(function(res, value) {
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
