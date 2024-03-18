import { createStore } from "redux";
import memoryGame from "./Redux/reducers";
import { checkMatchedPair, flipUpCard, generatePairs } from "./Redux/actions";
import { getCard } from "./cardFunctions";
const MAX_PAIRS = 6;

test("should check that images can be generated.", () => {
  const store = createStore(memoryGame);
  store.dispatch(generatePairs(6));
  const state = store.getState();
  expect(state.cards.length).toBe(12);
});

test("Should be able to flip up cards.", () => {
  const store = createStore(memoryGame);
  store.dispatch(generatePairs(MAX_PAIRS));
  expect(getCard(1, store.getState().cards).imageUp).toBe(false);
  store.dispatch(flipUpCard(1));
  expect(getCard(1, store.getState().cards).imageUp).toBe(true);
});

test("Should match the pair after flipping two cards with same image", () => {
  const store = createStore(memoryGame);
  store.dispatch(generatePairs(MAX_PAIRS));
  expect(store.getState().pairsFound).toBe(0);

  store.dispatch(flipUpCard(1));
  store.dispatch(checkMatchedPair());
  expect(store.getState().pairsFound).toBe(0);

  store.dispatch(flipUpCard(2));
  store.dispatch(checkMatchedPair());
  expect(store.getState().pairsFound).toBe(1);
  expect(getCard(1, store.getState().cards).matched).toBe(true);
  expect(getCard(2, store.getState().cards).matched).toBe(true);
  expect(getCard(1, store.getState().cards).image).toBe(
    getCard(1, store.getState().cards).image
  );
});

test("Should not find a pair after flipping two cards with different images.", () => {
  const store = createStore(memoryGame);
  store.dispatch(generatePairs(MAX_PAIRS));
  expect(store.getState().pairsFound).toBe(0);
  store.dispatch(flipUpCard(1));
  store.dispatch(flipUpCard(3));
  store.dispatch(checkMatchedPair());
  expect(store.getState().pairsFound).toBe(0);
  expect(getCard(1, store.getState().cards).image).not.toBe(
    getCard(3, store.getState().cards).image
  );
});

test("Should complete the game when all pairs are found.", () => {
  const store = createStore(memoryGame);
  store.dispatch(generatePairs(MAX_PAIRS));
  expect(store.getState().gameComplete).toBe(false);

  for (let i = 1; i <= MAX_PAIRS * 2; i++) {
    store.dispatch(flipUpCard(i));
  }

  for (let i = 1; i <= MAX_PAIRS * 2; i += 2) {
    store.dispatch(checkMatchedPair());
  }
  expect(store.getState().gameComplete).toBe(true);
});

test("Should update the card count when the card is flipped up.", () => {
  const store = createStore(memoryGame);
  store.dispatch(generatePairs(MAX_PAIRS));
  expect(store.getState().turnNo).toBe(0);
  store.dispatch(flipUpCard(1));
  expect(store.getState().turnNo).toBe(1);
  store.dispatch(flipUpCard(2));
  expect(store.getState().turnNo).toBe(2);
});
