import React, { Component } from 'react'

import Square from './square'

class Board extends Component {
    constructor () {
        super()
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    renderSquare (i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
        /*在 JSX 元素的最外层套上了一小括号，以防止 JavaScript 代码在解析时自动在换行处添加分号*/
    }

    handleClick (i) {
        // 深拷贝数据到新的数组,而不是修改已有的数组,react中不可变形的重要性
        // 不可变形便于做撤销 历史事件行驶等复杂... 便于判断是否变化和优化
        // const squares = this.state.squares.slice()
        const squares = [...this.state.squares]
        squares[i] = this.state.xIsNext ? 'X' : 'o'
        this.setState({
            squares,
            xIsNext: !this.state.xIsNext
        })
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

    render () {
        // const status = 'Next player:' + (this.state.xIsNext ? 'x' : 'o')
        const winner = this.calculateWinner(this.state.squares)
        let status
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

export default Board