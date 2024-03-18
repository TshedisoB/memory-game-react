import React from "react";
import PropTypes from "prop-types";
import "../styles/Game.css";

const CardView = (props) => {
  const frontImg = `${window.location.href}/images/${props.image}.PNG`;
  const backImg = `${window.location.href}/images/cover.PNG`;

  let className = "card flip-card";
  if (props.matched) {
    className = className + " matched";
  }
  const classNameWithAnimation = className + " animate";

  return (
    <div
      onClick={() => {
        if (!props.matched && !props.imageUp) {
          props.onClick(props.id);
        }
      }}
      data-testid="card"
      className={props.imageUp ? classNameWithAnimation : className}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={`${backImg}`} alt="" />
        </div>
        <div className="flip-card-back">
          <img src={`${frontImg}`} alt="" />
        </div>
      </div>
    </div>
  );
};

CardView.propTypes = {
  matched: PropTypes.bool,
  imageUp: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.number,
  image: PropTypes.number,
};

export default CardView;
