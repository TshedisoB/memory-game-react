import {
  GENERATE_PAIRS,
  FLIP_UP_CARD,
  SHUFFLE_CARDS,
  CHECK_UNMATCHED_PAIR,
  MARK_PAIR_AS_MATCHED,
  FLIP_DOWN_PAIR,
  INIT_GAME,
  CHECK_MATCHED_PAIR,
  markPairAsMatched,
  flipDownPair,
  shuffleCards,
  checkUnmatchedPair,
  checkMatchedPair,
  generatePairs,
} from "./actions";
import shuffle from "shuffle-array";
import {
  generateCardSet,
  getCard,
  cardsHaveIdenticalImages,
} from "../cardFunctions";

const initialState = {
  turnNo: 0,
  pairsFound: 0,
  numClicksWithinTurn: 0,
  firstId: undefined,
  secondId: undefined,
  gameComplete: false,
  cards: [],
};

function flipUpCardReducer(state, action) {
  return state.map((card) => {
    if (action.id === card.id) {
      return { ...card, imageUp: true };
    }
    return card;
  });
}

function markPairAsMatchedReducer(state, action) {
  return state.map((card) => {
    if (action.id1 === card.id || action.id2 === card.id) {
      return { ...card, matched: true };
    }
    return card;
  });
}

function flipDownPairReducer(state, action) {
  return state.map((card) => {
    if (action.id1 === card.id || action.id2 === card.id) {
      return { ...card, imageUp: false };
    }
    return card;
  });
}

function generateCardSetReducer(action) {
  return generateCardSet(action.numPairs);
}

function shuffleCardsReducer(state) {
  let newCards = [...state];
  newCards = shuffle(newCards);
  return newCards;
}

function memoryCards(state = [], action) {
  switch (action.type) {
    case FLIP_UP_CARD:
      return flipUpCardReducer(state, action);
    case MARK_PAIR_AS_MATCHED:
      return markPairAsMatchedReducer(state, action);
    case FLIP_DOWN_PAIR:
      return flipDownPairReducer(state, action);
    case GENERATE_PAIRS:
      return generateCardSetReducer(action);
    case SHUFFLE_CARDS:
      return shuffleCardsReducer(state);
    default:
      return state;
  }
}

function generatePairsReducer(state, action) {
  return { ...state, cards: memoryCards(state.cards, action) };
}

function initGameReducer(state, action) {
  const cards = memoryCards(initialState.cards, generatePairs(action.numPairs));
  return {
    ...initialState,
    cards: memoryCards(cards, shuffleCards()),
  };
}

function checkUnmatchedPairReducer(state, action) {
  if (
    state.numClicksWithinTurn === 2 &&
    !cardsHaveIdenticalImages(state.firstId, state.secondId, state.cards)
  ) {
    return {
      ...state,
      numClicksWithinTurn: 0,
      firstId: undefined,
      secondId: undefined,
      cards: memoryCards(
        state.cards,
        flipDownPair(state.firstId, state.secondId)
      ),
    };
  }
  return state;
}

function checkMatchedPairReducer(state, action) {
  if (
    state.numClicksWithinTurn === 2 &&
    cardsHaveIdenticalImages(state.firstId, state.secondId, state.cards)
  ) {
    const pairsFound = state.pairsFound + 1;
    let gameComplete = false;
    if (pairsFound === state.cards.length / 2) {
      gameComplete = true;
    }

    return {
      ...state,
      pairsFound,
      numClicksWithinTurn: 0,
      gameComplete,
      cards: memoryCards(
        state.cards,
        markPairAsMatched(state.firstId, state.secondId)
      ),
    };
  }
  return state;
}

function flipUpCardMemory(state, action) {
  const card = getCard(action.id, state.cards);
  if (card.imageUp || card.matched) {
    return state;
  }

  if (state.numClicksWithinTurn === 2) {
    const s1 = memoryGame(state, checkMatchedPair());
    const s2 = memoryGame(s1, checkUnmatchedPair());
    return {
      ...s2,
      firstId: action.id,
      turnNo: state.turnNo + 1,
      numClicksWithinTurn: 1,
      cards: memoryCards(s2.cards, action),
    };
  }

  let firstId = state.firstId;
  let secondId = state.secondId;
  if (state.numClicksWithinTurn === 0) {
    firstId = action.id;
  } else {
    secondId = action.id;
  }
  const numClicks = state.numClicksWithinTurn + 1;
  return {
    ...state,
    firstId,
    secondId,
    turnNo: state.turnNo + 1,
    numClicksWithinTurn: numClicks,
    cards: memoryCards(state.cards, action),
  };
}

function shuffleCardsMemory(state, action) {
  return {
    ...state,
    cards: memoryCards(state.cards, action),
  };
}

function memoryGame(state = initialState, action) {
  switch (action.type) {
    case INIT_GAME:
      return initGameReducer(state, action);
    case GENERATE_PAIRS:
      return generatePairsReducer(state, action);
    case FLIP_UP_CARD:
      return flipUpCardMemory(state, action);
    case SHUFFLE_CARDS:
      return shuffleCardsMemory(state, action);
    case CHECK_UNMATCHED_PAIR:
      return checkUnmatchedPairReducer(state, action);
    case CHECK_MATCHED_PAIR:
      return checkMatchedPairReducer(state, action);
    default:
      return state;
  }
}

export default memoryGame;
