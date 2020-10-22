import React from "react";

import styles from "./Navbar.module.css";

import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { ReactComponent as Check } from "../../assets/icons/check.svg";

import logo from "../../assets/logo/logo.png";

const Navbar = (props) => {
  const onToggleHandler = () => {
    if (props.erase) props.onDrawHandler();
    else props.onEraseHandler();
  };

  const onSelectHandler = (event) => {
    if (event.target.innerText) {
      switch (event.target.innerText) {
        case "Dijkstra's":
          props.setAlgorithm("Dijkstra's");
          break;
        case "A*":
          props.setAlgorithm("A*");
          break;
        case "Best-First Search":
          props.setAlgorithm("Best-First Search");
          break;
        case "Recursive Division":
          props.onGenerateMazeHandler('Recursive Division');
          break;
        case "Recursive Backtracking":
          props.onGenerateMazeHandler('Recursive Backtracking');
          break;
        case "Random Maze":
          props.onGenerateMazeHandler('Random Maze');
        default:
          break;
      }
    }
  };

  return (
    <div className={styles.navbar}>
      <ul className={styles.nav}>
        <li className={styles.item}>
          <img className={styles.logo} src={logo} />
        </li>
        <li className={styles.item}>
          <a className={styles.drawer}>
            Algorithms <ArrowDown className={styles.icon} />
          </a>
          <ul className={styles.dropdown}>
            <li className={styles.item}>
              <a className={styles.selection} onClick={onSelectHandler}>
                Dijkstra's
                {props.algorithm === "Dijkstra's" ? (
                  <Check className={styles.icon} style={{ fill: "#8ac926" }} />
                ) : null}
              </a>
            </li>
            <li className={styles.item} onClick={onSelectHandler}>
              <a className={styles.selection}>
                A*
                {props.algorithm === "A*" ? (
                  <Check className={styles.icon} style={{ fill: "#8ac926" }} />
                ) : null}
              </a>
            </li>
            <li className={styles.item} onClick={onSelectHandler}>
              <a className={styles.selection}>
                Best-First Search
                {props.algorithm === "Best-First Search" ? (
                  <Check className={styles.icon} style={{ fill: "#8ac926" }} />
                ) : null}
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.item}>
          <a className={styles.drawer}>
            Mazes <ArrowDown className={styles.icon} />
          </a>
          <ul className={styles.dropdown}>
            <li className={styles.item}>
              <a className={styles.selection} onClick={onSelectHandler}>
                Recursive Division
              </a>
            </li>
            <li className={styles.item} onClick={onSelectHandler}>
              <a className={styles.selection}>Recursive Backtracking</a>
            </li>
            <li className={styles.item} onClick={onSelectHandler}>
              <a className={styles.selection}>Random Maze</a>
            </li>
          </ul>
        </li>
        <li className={styles.item}>
          Draw
          <input
            className={styles.toggle}
            type="checkbox"
            onClick={onToggleHandler}
          />
          Erase
        </li>
        <li className={styles.item}>
          Fast
          <input
            className={styles.slider}
            type="range"
            min="1"
            max="20"
            step="1"
            value={props.speed}
            onInput={props.onSlideHandler}
          />
          Slow
        </li>
        <li className={styles.item}>
          <a className={styles.ghostBtn} onClick={props.onClearPathHandler} disabled={props.visualizing}>
            Clear Path
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.ghostBtn} onClick={props.onClearWallsHandler} disabled={props.visualizing}>
            Clear Walls
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.redBtn} onClick={props.onClearGridHandler} disabled={props.visualizing}>
            Clear Grid
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.greenBtn} onClick={props.onVisualizeHandler} disabled={props.visualizing}>
            Visualize {props.algorithm}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
