import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Unitinput from "../components/layout/unitInput";
import CheckBoxField from "../components/layout/checkBoxField";
import CustomButton from "../components/items/customButton";
import CollapsibleTable from "../components/layout/collapsableTable";
import scavCalculation from "../utils/functions/scavCalc";

class Scavenging extends Component {
  state = {
    units: {
      spear: "",
      sword: "",
      axe: "",
      archer: "",
      light: "",
      marcher: "",
      heavy: "",
    },
    scavOptions: {
      lazy: { checked: false, name: "lazy", label: "Lusta" },
      humble: { checked: false, name: "humble", label: "Szerény" },
      clever: { checked: false, name: "clever", label: "Okos" },
      great: { checked: false, name: "great", label: "Kiváló" },
    },
    values: "",
  };

  handleChangeInput = (e) => {
    const { units } = this.state;
    let copyUnits = { ...units };
    copyUnits = { ...copyUnits, [e.target.id]: e.target.value };
    this.setState({
      units: copyUnits,
    });
  };

  handleCheckBoxChange = (e) => {
    const { scavOptions } = this.state;
    let copyObject = { ...scavOptions[e.target.name] };
    let copyOptions = { ...scavOptions };
    copyOptions = {
      ...copyOptions,
      [e.target.name]: { ...copyObject, checked: e.target.checked },
    };
    this.setState({ scavOptions: copyOptions });
  };

  onCalculate = () => {
    const { lazy, humble, clever, great } = this.state.scavOptions;
    if (!lazy.checked && !humble.checked && !clever.checked && !great.checked)
      return alert("Legalább egy opció választása szükséges");
    let values = scavCalculation(this.state.units, this.state.scavOptions);
    this.setState({ values });
  };

  render() {
    const { units } = this.state;

    return (
      <Container style={styles.mainContainer}>
        <Row>
          <h2 style={{ marginBottom: 20 }}>Gyűjtögető kalkulátor</h2>
        </Row>
        <Row>
          <Col style={styles.leftContainer}>
            <h4>Adatok</h4>
            <Unitinput unitInput={units} handleChange={this.handleChangeInput} />
            <CheckBoxField
              options={this.state.scavOptions}
              handleChange={this.handleCheckBoxChange}
            />
            <CustomButton style={styles.button} text={"Számol"} onClick={this.onCalculate} />
          </Col>
          <Col style={styles.rightContainer} xs={8}>
            {this.state.values === "" ? <p></p> : <CollapsibleTable data={this.state.values} />}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Scavenging;

const styles = {
  mainContainer: {
    backgroundColor: "#F1EBDD",
    padding: 15,
  },
  leftContainer: {
    padding: 10,
    alignContent: "center",
  },
  rightContainer: {
    padding: 10,
  },
  button: {},
};
