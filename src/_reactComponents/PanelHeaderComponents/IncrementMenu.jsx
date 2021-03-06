import styled, { css } from "styled-components";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

/*
Text input with increment and decrement buttons. Also has dropdown menu to select given values

USE:
For font:
<IncrementMenu font />

For numerical range (inclusive):
<IncrementMenu range={[0, 15]} />

For given values:
<IncrementMenu values={["A", "B", "C", "D", "F"]} />
*/

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Textfield = styled.input`
  border-radius: 5px;
  border: 2px solid black;
  z-index: 0;
  height: 24px;
  width: 46px;
  bottom: 10px;
  padding: 0px 36px 0px 36px;
  text-align: center;
  resize: none;
`;

const IncreaseButton = styled.button`
  background-color: #1a5a99;
  border-radius: 0px 3px 3px 0px;
  border: 2px hidden;
  height: 24px;
  width: 34px;
  position: relative;
  color: white;
  font-size: 18px;
  right: 70px;
  :hover {
    cursor: pointer;
  }
`;

const DecreaseButton = styled.button`
  background-color: #1a5a99;
  border-radius: 3px 0px 0px 3px;
  border: 2px hidden;
  height: 24px;
  width: 34px;
  position: relative;
  color: white;
  font-size: 18px;
  left: -120px;
  :hover {
    cursor: pointer;
  }
`;

const Menu = styled.div`
  display: none;
  position: absolute;
  background-color: #e2e2e2;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  border: 2px black;
  border-radius: 5px;
  left: 38px;
  top: 30px;
`;

const MenuOptions = styled.button`
  background-color: #e2e2e2;
  display: block;
  width: 48px;
  height: 24px;
  border: 1px black solid;
  :hover {
    cursor: pointer;
  }
`;

export default function Increment(props) {
  var values;
  var sizes;
  var menuComponents = [];
  const [currentValue, setCurrentValue] = useState("");

  //Button icons
  var decreaseIcon = "-";
  var increaseIcon = "+";
  if (props.values) {
    decreaseIcon = <FontAwesomeIcon icon={faAngleLeft} />;
    increaseIcon = <FontAwesomeIcon icon={faAngleRight} />;
  }

  //Creation of dropdown menus
  if (props.range) {
    for (let i = props.range[0]; i <= props.range[1]; i++) {
      menuComponents.push(
        <MenuOptions
          id={i}
          onClick={function (e) {
            setCurrentValue(i);
          }}
        >
          {i}
        </MenuOptions>
      );
    }
  }
  if (props.font) {
    sizes = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];
    for (let i = 0; i < sizes.length; i++) {
      menuComponents.push(
        <MenuOptions
          id={i}
          onClick={function (e) {
            setCurrentValue(sizes[i]);
          }}
        >
          {sizes[i]}
        </MenuOptions>
      );
    }
  }
  if (props.values) {
    values = props.values;
    for (let i = 0; i < values.length; i++) {
      menuComponents.push(
        <MenuOptions
          id={i}
          onClick={function (e) {
            setCurrentValue(values[i]);
          }}
        >
          {values[i]}
        </MenuOptions>
      );
    }
  }

  function changeValue(e) {
    setCurrentValue(e.target.value);
  }

  function decrement() {
    if (props.values) {
      var index = values.indexOf(currentValue);
      // setCurrentIndex();
      if (index !== -1 && index !== 0 && index < values.length) {
        setCurrentValue(values[index - 1]);
      } else if (index === -1) {
        setCurrentValue(values[0]);
      } else {
        setCurrentValue(values[values.length - 1]);
      }
    } else if (props.range) {
      if (props.range[0] <= Number(currentValue) - 1) {
        setCurrentValue(Number(currentValue) - 1);
      }
    } else {
      setCurrentValue(Number(currentValue) - 1);
    }
  }

  function increment() {
    if (props.values) {
      // console.log(values.length);
      var index = values.indexOf(currentValue);
      // setCurrentIndex();
      // console.log(currentIndex);
      if (index !== -1 && index < values.length - 1) {
        // console.log("are you there?");
        setCurrentValue(values[index + 1]);
      } else if (index === -1) {
        setCurrentValue(values[values.length - 1]);
      } else {
        setCurrentValue(values[0]);
      }
    } else if (props.range) {
      if (props.range[1] >= Number(currentValue) + 1) {
        setCurrentValue(Number(currentValue) + 1);
      }
    } else {
      setCurrentValue(Number(currentValue) + 1);
    }
  }

  function displayMenu() {
    document.getElementById("menu").style.display = "block";
  }

  function hideMenu() {
    document.getElementById("menu").style.display = "none";
  }

  return (
    <>
      <Container>
        <Textfield
          value={currentValue}
          onClick={() => {
            displayMenu();
          }}
          onChange={() => {
            changeValue(event);
          }}
        ></Textfield>

        <DecreaseButton
          onClick={() => {
            decrement();
          }}
        >
          {decreaseIcon}
        </DecreaseButton>

        <IncreaseButton
          onClick={() => {
            increment();
          }}
        >
          {increaseIcon}
        </IncreaseButton>

        <Menu
          id="menu"
          onMouseLeave={() => {
            hideMenu();
          }}
        >
          {menuComponents}
        </Menu>
      </Container>
    </>
  );
}
