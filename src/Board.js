import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };

  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let x = 0; x < this.props.nrows; x++) {
      let row = [];
      for (let y = 0; y < this.props.ncols; y++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    console.log(`Flipping ${coord}`);
    let { nrows, ncols } = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);

    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
        board[x][y] = !board[x][y];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(x, y); //flip clicked cell
    flipCell(x, y - 1); //flip left
    flipCell(x, y + 1); //flip right
    flipCell(x - 1, y); //flip above
    flipCell(x + 1, y); //flip below

    // win when every cell is turned off
    let hasWon = board.every(row => row.every(cell => !cell));

    // TODO: determine is the game has been won
    this.setState({ board: board, hasWon: hasWon });
  }


  /** Render game board or winning message. */
  render() {
    // make table board
    let tblboard = [];
    for (let x = 0; x < this.props.nrows; x++) {
      let row = [];
      for (let y = 0; y < this.props.ncols; y++) {
        let cord = `${x}-${y}`;
        row.push(<Cell
          key={cord}
          isLit={this.state.board[x][y]}
          flipCellsAroundMe={() => this.flipCellsAround(cord)}
        />);
      }
      tblboard.push(<tr>{row}</tr>);
    }

    return (
      <div>
        {this.state.hasWon ?
          // if the game is won, just show a winning msg & render nothing else
          (<div className="Board-title">
            <div className="winner">
              <span className="neon-orange">You</span>
              <span className="neon-blue">Won!!!</span>
            </div>
          </div>)
          :
          (<div>
            <div className="Board-title">
              <div className="neon-orange">Lights</div>
              <div className="neon-blue">Out</div>
            </div>
            <table className="Board">
              <tbody>
                {tblboard}
              </tbody>
            </table>
          </div>
          )}
      </div>
    );
  }
}


export default Board;
