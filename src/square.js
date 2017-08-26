import React from 'react'
/*import React, { Component } from 'react'

class Square extends Component {
    render () {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        )
    }
}*/

//  函数定义组件thi.props  --> props
// 应用中的大部分简单组件都可以通过函数定义的方式来编写，并且 React 在将来还会对函数定义组件做出更多优化
function Square(props) {
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

export default Square