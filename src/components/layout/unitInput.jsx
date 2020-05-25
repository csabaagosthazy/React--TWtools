import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import InputField from "../items/inputField";
import units from "../../sources/units";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#f4e4bc",
  },
  cell: {
    padding: theme.spacing(1),
  },
  tableBody: {
    backgroundColor: "#f4e4bc",
  },
  table: {
    backgroundColor: "#f4e4bc",
  },
  tableHead: {
    fontSize: "9pt",
    textAlign: "left",
    fontWeight: "700",
    backgroundColor: "#c1a264 !important",
    position: "relative",
    padding: "2px",
    height: 10,
  },
}));

const createTableData = (unitInput, handleChange) => {
  //const { spear: sp, sword: sw, axe: ax, archer: arc, light: lc, marcher: marc, heavy: hc } = units;

  let infantry = [];
  let cavalry = [];
  const unitsArr = Object.entries(units);

  for (const [entry, value] of unitsArr) {
    let fieldData = {
      name: entry,
      label: { src: value.icon, alt: value.nameHun },
      type: "number",
      value: unitInput[entry],
    };

    if (value.class === "infantry") {
      infantry = [...infantry, fieldData];
    }
    if (value.class === "cavalry") {
      cavalry = [...cavalry, fieldData];
    }
  }

  console.log("infantry", infantry, "cavalry", cavalry);

  // unitinput data 2 columns from unitinput and units

  return { infantry, cavalry };
};
const CustomTable = (props) => {
  const classes = useStyles();
  console.log(classes);

  return (
    <Table className={classes.table}>
      <TableHead className={classes.tableHead}>
        <TableRow>
          <TableCell className={classes.cell}>{props.header}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className={classes.tableBody}>
        {props.data.map((row) => (
          <TableRow key={row.name}>
            <TableCell className={classes.cell}>
              <InputField
                name={row.name}
                label={<img src={row.label.src} alt={row.label.alt}></img>}
                type={row.type}
                value={row.value}
                handleChange={props.handleChange}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function Unitinput({ unitInput, handleChange }) {
  const classes = useStyles();

  const tableData = createTableData(unitInput, handleChange);

  return (
    <Box display="flex" flexDirection="row">
      <TableContainer className={classes.container} component={Paper}>
        <CustomTable data={tableData.infantry} handleChange={handleChange} header={"Gyalogság"} />
      </TableContainer>
      <TableContainer className={classes.container} component={Paper}>
        <CustomTable data={tableData.cavalry} handleChange={handleChange} header={"Lovasság"} />
      </TableContainer>
    </Box>
  );
}
