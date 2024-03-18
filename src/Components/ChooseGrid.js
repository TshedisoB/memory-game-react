import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { initGame } from "../Redux/actions";
import PropTypes from "prop-types";
import Header from "./Header";
import GameView from "./GameView";
import InfoIcon from "./InfoIcon";

const ChooseGrid = (props) => {
  const container = document.querySelector(".container");
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const maxPairs = (rows * columns) / 2;

  function handleChangeRows(e) {
    setRows(e.target.value);
  }

  function handleChangeColumns(e) {
    setColumns(e.target.value);
  }

  function resetInputValues() {
    setRows(0);
    setColumns(0);
  }

  function verifyResults() {
    if (maxPairs % 1 !== 0) {
      alert("Please enter an even number of squares");
      props.initGame(0);
      resetInputValues();
      return false;
    }
    if (rows * columns > 12) {
      alert("Rows x Columns Grid must be less than 12");
      props.initGame(0);
      resetInputValues();
      return false;
    }
    if (rows === 1 || rows > 6 || columns === 1 || columns > 6) {
      alert("Rows and Columns must be between 2 and 6");
      props.initGame(0);
      resetInputValues();
      return false;
    }
    if (rows * columns < 4) {
      alert("Grid must be at least 4 squares");
      props.initGame(0);
      resetInputValues();
      return false;
    }
    if (rows < 2 || columns < 2) {
      alert("Grid must have Rows/Columns greater than 1");
      props.initGame(0);
      resetInputValues();
      return false;
    }
    return true;
  }

  function setGridTemplates() {
    if (container !== null) {
      container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
  }

  function handleSubmit(e) {
    if (!verifyResults()) {
      return;
    }
    setGridTemplates();

    e.preventDefault();
    props.initGame(maxPairs);
  }

  useEffect(() => {
    localStorage.setItem("rows", rows);
    localStorage.setItem("columns", columns);
  }, [rows, columns]);

  let displayBoard = undefined;
  displayBoard = <GameView initGame={props.initGame} />;

  return (
    <div className="grid-page">
      <Header />
      <div className="custom-grid-container">
        <div className="custom-grid">
          <h2 className="grid-heading">Custom Grid</h2>

          <div className="dimensions">
            <div className="rows">
              <h3>Row</h3>
              <input
                type="number"
                id="rowValue"
                min="2"
                max="6"
                placeholder="rows"
                value={rows}
                onChange={handleChangeRows}
              />
            </div>

            <div className="columns">
              <h3>Column</h3>
              <input
                type="number"
                id="columnValue"
                min="2"
                max="6"
                placeholder="columns"
                value={columns}
                onChange={handleChangeColumns}
              />
            </div>
          </div>

          <div className="buttons">
            <InfoIcon />
            <button id="start-button" type="submit" onClick={handleSubmit}>
              Start Game
            </button>
          </div>
          <div className="board-display">{displayBoard}</div>
        </div>
      </div>
    </div>
  );
};

ChooseGrid.propTypes = {
  initGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    initGame: (maxPairs) => dispatch(initGame(maxPairs)),
  };
};

export { ChooseGrid };

export default connect(null, mapDispatchToProps)(ChooseGrid);
