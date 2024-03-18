import { React } from "react";
import { connect } from "react-redux";
import { shuffleCards, initGame } from "../Redux/actions";
import PropTypes from "prop-types";
import { Celebrate } from "./Confetti";
import { MAX_PAIRS } from "../cardFunctions";

const GameStatusView = (props) => {
  if (props.gameComplete) {
    const seconds = localStorage.getItem("seconds");
    const minutes = localStorage.getItem("minutes");

    let turnTime = document.querySelector(".turnTime");

    if (turnTime !== null) {
      turnTime.style.display = "none";
    }

    function formatTime(num) {
      return String(num).padStart(2, "0");
    }

    function restartGame() {
      props.initGame(MAX_PAIRS);
      setTimeout(() => {
        props.shuffleCards();
      }, 800);
      turnTime.style.display = "block";
    }

    return (
      <div className="modal-container">
        <div className="modal">
          <div id="complete">GAME COMPLETE!</div>
          <div id="cardTurns">
            Card turns:
            <span id="turnDisplay">{props.turnNo}</span> turns
          </div>
          <div id="timeResult">
            Time taken:
            <span id="timeDisplay">
              {formatTime(minutes)}:{formatTime(seconds)}
            </span>
            s
          </div>
          <div id="chosenGrid">
            Grid: <span id="rows">{localStorage.getItem("rows")}</span> Rows x
            <span id="columns">{localStorage.getItem("columns")}</span> Columns
          </div>
          <div className="modal-button-container">
            <button className="game-button" id="restart" onClick={restartGame}>
              New Grid
            </button>
          </div>
          <Celebrate />
        </div>
      </div>
    );
  }
};

GameStatusView.propTypes = {
  gameComplete: PropTypes.bool,
  turnNo: PropTypes.number,
  shuffleCards: PropTypes.func,
  initGame: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    gameComplete: state.gameComplete,
    turnNo: state.turnNo,
  };
};

const mapDispatchToProps = {
  shuffleCards,
  initGame,
};

export { GameStatusView };

export default connect(mapStateToProps, mapDispatchToProps)(GameStatusView);
