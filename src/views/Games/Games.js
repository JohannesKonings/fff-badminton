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

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./../../aws-exports";

import { listGamedays } from "./../../graphql/queries";
import { createGameday } from "./../../graphql/mutations";

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

  const readGameDays = async () => {
    const allGameDays = await API.graphql(graphqlOperation(listGamedays));
    console.log(allGameDays.data.listGamedays.items);

    const allGameDayItems = allGameDays.data.listGamedays.items;

    allGameDayItems.sort(function(a, b) {
      return a.date - b.date;
    });
    const tableArray = allGameDayItems.map(item => {
      console.log(item.id, item.date);
      return [item.id, item.date];
    });

    setGameDayItems(tableArray);
  };

  const addGameDay = async () => {
      const d = selectedDate
      const gameDayDateString = [d.getFullYear(), '-', ('0' + (d.getMonth() + 1)).slice(-2), '-', ('0' + d.getDate()).slice(-2)].join('');
      console.log(gameDayDateString)
      
    await API.graphql(
      //graphqlOperation(createGameDay, { input: { date: gameDayDateString } })
      //https://github.com/aws-amplify/amplify-ios/issues/278
      //https://docs.aws.amazon.com/appsync/latest/devguide/scalars.html
      graphqlOperation(createGameday, { input: { id: gameDayDateString,  date: gameDayDateString } })
    );
  };

  useEffect(() => {
    readGameDays();
  }, []);

  function onClickCreateGameDay() {
    console.log("create GameDay: " + selectedDate);
    addGameDay();
  }

  const classes = useStyles();

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <GridContainer>
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
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default Games;
