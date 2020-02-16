import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomInputSelect(props) {
  const classes = useStyles();
  const [player, setPlayer] = React.useState('');

  const { labelText, id, formControlProps, menuItems, selectedPlayer } = props;

  const handleChange = event => {
    setPlayer(event.target.value);
    console.log(event.target)
    console.log(menuItems)
    selectedPlayer(event.target.value)
  };


  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <TextField
        id={id}
        label={labelText}
        select
        value={player}
        onChange={handleChange}
      >
        {menuItems.map(option => (
          <MenuItem key={option.id} value={option.name} name={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}

CustomInputSelect.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};
