import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import units from "../../sources/units";
import icons from "../../sources/twicons";
import { Container } from "@material-ui/core";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
      backgroundColor: "#f2a230",
    },
  },
  best: {
    "& > *": {
      borderBottom: "unset",
    },
    backgroundColor: "#ad5405",
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

  cell: {
    padding: theme.spacing(1),
  },
  collapseCell: { paddingBottom: 0, paddingTop: 0, backgroundColor: "#f4e4bc" },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(data, bestOpt) {
  let option = `Szint ${data.opt}`;
  let best = 0;
  if (bestOpt === data.opt) {
    option = `Szint ${data.opt} (Ajánlott)`;
    best = 1;
  }

  let loot = Number(data.res.loot.toFixed(0));
  let time = numToTime(data.res.time * 60);
  let efficiency = Number(data.res.efficiency.toFixed(2));

  let share = [];
  let entries = Object.entries(data.unShare);
  for (const [entry, value] of entries) {
    let optData = { ...value["unitShare"] };
    optData.maxHaul = value["maxHaul"];
    share = [...share, { level: `Szint ${entry}`, optData }];
  }

  let result = {
    option,
    loot,
    time,
    efficiency,
    share,
    best,
  };
  return result;
}

const numToTime = (time) => {
  let sec_num = parseInt(time, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${hours}:${minutes}:${seconds}`;
};

function Row(props) {
  const { row, best } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const { spear, sword, axe, archer, light, marcher, heavy } = units;
  return (
    <React.Fragment>
      <TableRow className={best === 0 ? classes.root : classes.best}>
        <TableCell className={classes.cell}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? (
              <img src={icons.minus.path} alt={<KeyboardArrowUpIcon />} />
            ) : (
              <img src={icons.plus.path} alt={<KeyboardArrowDownIcon />} />
            )}
          </IconButton>
        </TableCell>
        <TableCell className={classes.cell} component="th" scope="row">
          {row.option}
        </TableCell>
        <TableCell className={classes.cell} align="center">
          {row.loot}
        </TableCell>
        <TableCell className={classes.cell} align="center">
          {row.time}
        </TableCell>
        <TableCell className={classes.cell} align="center">
          {row.efficiency}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.collapseCell} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Szintek elosztása
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Szintek</TableCell>
                    <TableCell align="center">
                      {<img src={spear.icon} alt="lándzsás"></img>}
                    </TableCell>
                    <TableCell align="center">
                      {<img src={sword.icon} alt="kradforgató"></img>}
                    </TableCell>
                    <TableCell align="center">{<img src={axe.icon} alt="bárdos"></img>}</TableCell>
                    <TableCell align="center">
                      {<img src={archer.icon} alt="Íjász"></img>}
                    </TableCell>
                    <TableCell align="center">
                      {<img src={light.icon} alt="Könnyűlovas"></img>}
                    </TableCell>
                    <TableCell align="center">
                      {<img src={marcher.icon} alt="Lovas Íjász"></img>}
                    </TableCell>
                    <TableCell align="center">
                      {<img src={heavy.icon} alt="Nehézlovas"></img>}
                    </TableCell>
                    <TableCell align="center">
                      {<img src={icons.resources.path} alt="Nyersanyag"></img>}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.share.map((units) => (
                    <StyledTableRow key={units.level}>
                      <TableCell component="th" scope="row">
                        {units.level}
                      </TableCell>
                      <TableCell align="center">{units.optData.spear}</TableCell>
                      <TableCell align="center">{units.optData.sword}</TableCell>
                      <TableCell align="center">{units.optData.archer}</TableCell>
                      <TableCell align="center">{units.optData.axe}</TableCell>
                      <TableCell align="center">{units.optData.light}</TableCell>
                      <TableCell align="center">{units.optData.marcher}</TableCell>
                      <TableCell align="center">{units.optData.heavy}</TableCell>
                      <TableCell align="center">{units.optData.maxHaul}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    option: PropTypes.string.isRequired,
    loot: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    efficiency: PropTypes.number.isRequired,
    best: PropTypes.number.isRequired,
    share: PropTypes.array.isRequired,
  }).isRequired,
};

export default function CollapsibleTable(props) {
  //main table details (option details)
  const classes = useRowStyles();
  const rows = [];
  const bestOpt = props.data.bestOpt;
  props.data.optValues.map((data) => {
    rows.push(createData(data, bestOpt));
  });

  rows.sort((a, b) => {
    let keyA = a.efficiency;
    let keyB = b.efficiency;

    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  return (
    <Container>
      <h4>Eredmények</h4>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.cell} />
              <TableCell className={classes.cell}>Opciók</TableCell>
              <TableCell className={classes.cell} align="center">
                Hozam
              </TableCell>
              <TableCell className={classes.cell} align="center">
                Idő
              </TableCell>
              <TableCell className={classes.cell} align="center">
                Hatékonyság&nbsp;(hozam/perc)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.option} row={row} best={row.best} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

//backgroundColor={row.best === 1 ? "blue" : null}
