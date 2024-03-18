export const MAX_PAIRS = 0;

export function generateCardSet(numPairs) {
  const cards = [];
  let id = 1;
  for (let i = 1; i <= numPairs; i++) {
    const card1 = {
      id: id,
      image: i,
      imageUp: false,
      matched: false,
    };
    id++;
    const card2 = {
      id: id,
      image: i,
      imageUp: false,
      matched: false,
    };
    cards.push(card1);
    cards.push(card2);
    id++;
  }
  return cards;
}

export function getCard(id, cards) {
  return cards.find((c) => c.id === id);
}

export function cardsHaveIdenticalImages(id1, id2, cards) {
  return getCard(id1, cards).image === getCard(id2, cards).image;
}
