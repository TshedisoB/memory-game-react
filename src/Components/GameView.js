import React from "react";
import PropTypes from "prop-types";
import CardView from "./CardView";
import GameStatusView from "./GameStatusView";
import Timer from "./Timer";
import "../styles/Game.css";
import { connect } from "react-redux";
import {
  flipUpCard,
  checkUnmatchedPair,
  checkMatchedPair,
  initGame,
} from "../Redux/actions";

let timeOut = null;

const Game = (props) => {
  const cardViews = props.cards.map((c) => (
    <CardView
      key={c.id}
      id={c.id}
      image={c.image}
      imageUp={c.imageUp}
      matched={c.matched}
      onClick={props.onCardClicked}
    />
  ));

  let gameDone = undefined;
  gameDone = (
    <GameStatusView gameComplete={props.gameComplete} turnNo={props.turnNo} />
  );

  return (
    <div className="game">
      <div className="turnTime">
        <div className="turns">
          <span id="liveCount">Turns: </span>
          {props.turnNo}
        </div>

        <div id="timer">
          <span id="timerHeading">Timer: </span>
          <span> {props.turnNo > 0 ? <Timer /> : "00:00"}</span>
        </div>
      </div>

      <div className="container">{cardViews}</div>
      <div className="game-status">{gameDone}</div>
    </div>
  );
};

Game.propTypes = {
  gameComplete: PropTypes.bool,
  cards: PropTypes.array,
  onCardClicked: PropTypes.func,
  onInitGame: PropTypes.func,
  turnNo: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    turnNo: state.turnNo,
    gameComplete: state.gameComplete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCardClicked: (id) => {
      clearInterval(timeOut);
      dispatch(flipUpCard(id));
      dispatch(checkMatchedPair());
      timeOut = setTimeout(() => {
        dispatch(checkUnmatchedPair());
      }, 2000);
    },
    onInitGame: (numPairs) => {
      dispatch(initGame(numPairs));
    },
  };
};

const GameView = connect(mapStateToProps, mapDispatchToProps)(Game);

export default GameView;
