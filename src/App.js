import React, { Component } from 'react'
import './App.css'

import Board from './board'
import Clock from './clock'

class App extends Component {
    constructor () {
        super()
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    calculateWinner (squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null
    }

    handleClick (i) {
        const history = this.state.history
        const current = history[history.length - 1]
        // 深拷贝数据到新的数组,而不是修改已有的数组,react中不可变形的重要性
        // 不可变形便于做撤销 历史事件行驶等复杂... 便于判断是否变化和优化
        // const squares = this.state.squares.slice()
        const squares = [...current.squares]

        //胜利之后或者已经有过了棋子 不允许再下棋
        if (this.calculateWinner(squares) || squares[i]) {
            return false
        }
        squares[i] = this.state.xIsNext ? 'X' : 'o'
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    }
    render () {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares)

        let status
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }

        const moves = history.map((step, move) => {
            const desc = move ? 'Move #' + move : 'Game start'
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            )
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <Clock/>
                <Clock/>
                <Clock/>

            </div>
        )
    }
}

export default App
