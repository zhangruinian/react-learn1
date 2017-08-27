import React, {Component} from 'react'

class Clock extends Component {
    constructor (props){
        super(props)
        this.state = {
            date: new Date()
        }
    }
    render() {
        return (
            <div>
                <h2>it is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
    componentDidMount(){
        /*注意我们如何在 this 中保存定时器ID。虽然 this.props 由React本身设置以及this.state 具有特殊的含义，
        但如果需要存储不用于视觉输出的东西，则可以手动向类中添加其他字段。
        如果你不在 render() 中使用某些东西，它就不应该在状态中。*/
        this.timer = setInterval(
            () =>{this.tick()},
            1000
        )
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
}

export default Clock