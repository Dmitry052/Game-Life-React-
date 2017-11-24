import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

class App extends Component {
  start() {
    var game = setInterval(() => {
      this.props.nextGeneration(game);
      if (this.props.field.paramGrid.stop) {
        clearInterval(game);
        alert("Game over");
      }
    }, 200);
  }
  stop() {
    clearInterval(this.props.field.paramGrid.game);
  }
  clear_cells() {
    this.props.createField();
  }
  setValueN(e) {
    this.props.setValueN(e.target.value);
  }
  setValueM(e) {
    this.props.setValueM(e.target.value);
  }
  setValueWH(e) {
    this.props.setValueWH(e.target.value);
  }
  setCell(e) {
    this.props.setCell({ n: e.target.getAttribute('data-n'), m: e.target.getAttribute('data-m') });
  }
  createField() {
    this.props.createField();
  }
  render() {
    console.log(this.props.field.paramGrid.valueWH);
    return (
      <div className="App">
        <Modal isOpen={this.props.field.showModal} style={{ content: { width: '600px', border: 0, margin: 'auto', 'backgroundColor': '#f5f5f5', height: '70px' } }}>
          <span>Введите размеры N и M игрового поля</span>
          <div id="start">
            <input type="number" defaultValue={this.props.field.paramGrid.valueN} onChange={this.setValueN.bind(this)} />
            <input type="number" defaultValue={this.props.field.paramGrid.valueM} onChange={this.setValueM.bind(this)} />
            <button onClick={this.createField.bind(this)}>Создать</button>
          </div>
        </Modal>
        <div style={{ display: this.props.field.paramGrid.btn }} className="btn">
          <button disabled={this.props.field.paramGrid.btnStart} onClick={this.start.bind(this)}>Старт</button>
          <button disabled={this.props.field.paramGrid.btnStop} onClick={this.stop.bind(this)}>Стоп</button>
          <button disabled={this.props.field.paramGrid.btnClear} onClick={this.clear_cells.bind(this)}>Очистить</button>
        </div>
        <span id="generation">Количество поколений: {this.props.field.paramGrid.countGeneration}
        </span>
        <table id="field" style={{ display: this.props.field.showField }}>
          <tbody border="1">
            {
              this.props.field.paramGrid.field.map((itemN, i) => {
                return <tr key={i}>
                  {
                    itemN.map((itemM, j) => {
                      return <td key={j} data-n={i} data-m={j} style={{ background: itemM }} onClick={this.setCell.bind(this)}></td>
                    })
                  }
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect(
  state => ({
    field: state.field
  }),
  dispatch => ({
    setValueN: (n) => {
      dispatch({ type: 'SET_VALUE_N', data: n });
    },
    setValueM: (m) => {
      dispatch({ type: 'SET_VALUE_M', data: m });
    },
    setCell: (cell) => {
      dispatch({ type: 'SET_CELL', data: cell });
    },
    createField: () => {
      dispatch({ type: 'CREATE_FIELD' });
    },
    nextGeneration: (game) => {
      dispatch({ type: 'NEXT_GENERATION', data: game });
    },
    stop: () => {
      dispatch({ type: 'NEXT_GENERATION' });
    }
  })
)(App);
