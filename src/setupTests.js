import React from "react";
import { configure, shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import Header from "../src/Components/Header";
import CardView from "./Components/CardView";
import { GameStatusView } from "./Components/GameStatusView";
import { Game } from "./Components/GameView";
import { ChooseGrid } from "./Components/ChooseGrid";
import { initGame } from "./Redux/actions";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

let wrapper;

describe("Header", function () {
  it("should check if header is 'Memory game web app'", function () {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("h1").text()).toEqual("Memory Web App Game");
  });
});

describe("CardView component", function () {
  const onClick = jest.fn();
  it("should call the onClick prop when a card is clicked.", function () {
    const { getByTestId } = render(
      <CardView matched={false} imageUp={false} onClick={onClick} />
    );
    fireEvent.click(getByTestId("card"));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("GameStatusView", function () {
  beforeEach(() => {
    wrapper = shallow(<GameStatusView gameComplete={true} turnNo={20} />);
    localStorage.setItem("rows", 2);
    localStorage.setItem("columns", 3);
  });

  it("Should display 'Game Complete' when game is completed", function () {
    expect(wrapper.find("#complete").text()).toEqual("GAME COMPLETE!");
  });

  it("Should display number of turns when game is completed", function () {
    expect(wrapper.find("#cardTurns").text()).toEqual("Card turns:20 turns");
  });

  it("Should display text 'Time taken:' when game is completed.", function () {
    expect(wrapper.find("#timeResult").text()).toContain("Time taken:");
  });

  it("Should display text 'Grid:' when game is completed.", function () {
    expect(wrapper.find("#chosenGrid").text()).toContain(
      `Grid: 2 Rows x3 Columns`
    );
  });
});

describe("ChooseGrid", function () {
  beforeEach(() => {
    wrapper = shallow(<ChooseGrid initGame={initGame} />);
    window.alert = jest.fn();
  });

  it("Should display 'Rows' and 'Column' as heading for input ", function () {
    expect(wrapper.find(".rows").text()).toEqual("Row");
    expect(wrapper.find(".columns").text()).toEqual("Column");
  });

  it("Should display 'Start Game' button", function () {
    expect(wrapper.find("#start-button").text()).toEqual("Start Game");
  });

  it("Should call the initGame function when the start button is clicked", function () {
    const initGame = jest.fn();
    wrapper = shallow(<ChooseGrid initGame={initGame} />);
    wrapper.find("#start-button").simulate("click");
    expect(initGame).toHaveBeenCalled();
  });
});
