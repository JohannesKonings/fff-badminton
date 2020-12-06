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

import Amplify, { API, graphqlOperation, Analytics } from "aws-amplify";
import awsconfig from "./../../aws-exports";

import { listPlayers } from "./../../graphql/queries";

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
function Player() {
  const [playerItems, setPlayerItems] = useState([]);

  const readPlayers = async () => {
    console.log("readPlayers before");
    const allPlayers = await API.graphql(graphqlOperation(listPlayers));
    console.log("readPlayers after");
    console.log("player", allPlayers.data.listPlayers.items);

    const allPlayerItems = allPlayers.data.listPlayers.items;

    console.log("sortPlayers");
    allPlayerItems.sort(function (a, b) {
      return a.id - b.id;
    });

    const tableArray = allPlayerItems.map((item) => {
      console.log(item.id, item.name);
      return [item.id, item.name];
    });

    setPlayerItems(tableArray);
  };

  useEffect(() => {
    console.log("useEffect");
    Analytics.record({ name: "navPlayer" });
    readPlayers();
  }, []);

  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Player</h4>
            <p className={classes.cardCategoryWhite}>
              Everyone who can play a game
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Id", "Name"]}
              tableData={playerItems}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default Player;
