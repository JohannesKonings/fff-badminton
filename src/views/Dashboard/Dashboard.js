import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

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
