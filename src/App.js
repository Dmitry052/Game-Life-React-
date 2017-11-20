import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

class App extends Component {
  setValueN(e) {
    this.props.setValueN(e.target.value * 20);
  }
  setValueM(e) {
    this.props.setValueM(e.target.value * 20);
  }
  location(e) {
    const ctx = this.refs.canvas.getContext('2d');
    const startField = (document.body.clientWidth / 2) - (this.props.field.paramGrid.valueN / 2);
    const posX = Math.floor((e.clientX - startField) / 20) + 1;
    const posY = Math.floor(e.clientY / 20) * this.props.field.paramGrid.valueN / 20;
    const currentPos = posX + posY;

    this.props.currentCell(currentPos - 1);
    this.clear();
    for (let i = 0; i < this.props.field.paramGrid.map.length; i++) {
      if (this.props.field.paramGrid.map[i] === 1) {
        const x = (i % (this.props.field.paramGrid.valueN / 20)) * 20 + 10;
        const y = ~~(i / (this.props.field.paramGrid.valueN / 20)) * 20 + 10;
        ctx.beginPath()
        ctx.lineWidth = 1;
        ctx.arc(x, y, 8, 20, Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
  }
  drawField() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.beginPath();
    const n = this.props.field.paramGrid.valueN;
    const m = this.props.field.paramGrid.valueM;
    ctx.strokeStyle = "#000";

    for (let i = 0; i <= m; i += 20) {
      ctx.moveTo(0, i);
      ctx.lineTo(n, i);
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    for (let i = 0; i <= n; i += 20) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, m);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  setParams() {
    this.props.createField();
    this.drawField();
  }
  clear() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.props.field.paramGrid.valueN, this.props.field.paramGrid.valueM);
    this.drawField();
  }
  render() {
    // console.log(this.props.field);
    return (
      <div className="App">
        <Modal isOpen={this.props.field.showModal} style={{ content: { width: '600px', border: 0, margin: 'auto', 'backgroundColor': '#f5f5f5', height: '40px' } }}>
          <span>Введите размеры N и M игрового поля</span>
          <div id="start">
            <input type="number" defaultValue={this.props.field.paramGrid.valueN} onChange={this.setValueN.bind(this)} />
            <input type="number" defaultValue={this.props.field.paramGrid.valueM} onChange={this.setValueM.bind(this)} />
            <button onClick={this.setParams.bind(this)}>Создать</button>
          </div>
        </Modal>
        <canvas ref="canvas" width={this.props.field.paramGrid.valueN} height={this.props.field.paramGrid.valueM} onClick={this.location.bind(this)}></canvas>
      </div>
    );
  }
}
export default connect(
  state => ({
    field: state.field
  }),
  dispatch => ({
    createField: () => {
      dispatch({ type: 'SHOW_MODAL' });
    },
    setValueN: (value) => {
      dispatch({ type: 'SET_VALUE_N', data: value });
    },
    setValueM: (value) => {
      dispatch({ type: 'SET_VALUE_M', data: value });
    },
    currentCell: (value) => {
      dispatch({ type: 'SET_CELL_VALUE', data: value });
    },

  })
)(App);
