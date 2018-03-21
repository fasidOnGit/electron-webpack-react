import React, { Component } from 'react';
import logo from './img/logo.png';
import play from './img/play.svg';
import stop from './img/stop.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import momentTz from 'moment-timezone';
import * as startActions  from './actions/startWorkingActions';
import timer from './timer';
import './App.css';

// //workaround for accessing Electron modules;
// const electron = window.require('electron');
// const ipc = electron.ipcRenderer;

class App extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      timer : {
        hours: '00',
        minutes: '00',
        seconds: '00'
      },
      working:false,
      start:'',
      end:''
    }
    this.startWorking = this.startWorking.bind(this);
    this.stopWorking = this.stopWorking.bind(this);
    this.onClick = this.onClick.bind(this);
    this.checkTime = this.checkTime.bind(this);
    this.timer = this.timer;
  }

  timer = '';
  onClick(){
    let state = JSON.parse(JSON.stringify(this.state));
    state.start = (state.start)? state.start : moment();
    state.working = true;
    this.setState(state , ()=>{
      this.props.actions.startWork(this.state.start);
      this.props.actions.isWorking(this.state.working)
      this.props.actions.saveTimer('start' , this.state.start);
    });
    this.startWorking();
  }
  checkTime(time){
    let timeInt = parseInt(time, 10);
    return timeInt ? true : false;
  }
  startWorking(){
    this.timer = setInterval(()=>{
      let track = Object.assign({}, this.state.timer); 
      const timerState =  timer(track.hours, track.minutes, track.seconds);
      // ipc.send('timer' , () => timerState);
      let state = {
        hours: Dec2Converter(timerState.hours),
        minutes: Dec2Converter(timerState.minutes),
        seconds: Dec2Converter(timerState.seconds)
      }
      this.setState({timer: state,
        working:true});
      this.props.actions.startWorking(this.state.timer);
    },1000)
  }
  stopWorking(){
    clearInterval(this.timer);
    this.setState({
      working : false,
      end:moment()
    }, _=>{
      this.props.actions.endWork(this.state.end);
      this.props.actions.isWorking(this.state.working)
      this.props.actions.saveTimer('end', this.state.end);
    });
  }
  componentDidMount(){
    this.props.actions.loadTimer();
    this.setState({
      companyTime: momentTz().tz('Asia/Manila').format('hh:m A')
    })
    this.props.ipc.on('timer-state-change' , (event, args)=>{
      this.setState({
        working: args.working
      });
      if(args.working){
        this.onClick()
      }else{
        this.stopWorking()
      }
      
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" src={logo} alt="Time Doctor Logo"/>
          <label> Time Doctor</label>
        </header>
        <main className="App-main">
          <h1>
            <time><label>{this.props.timer.hours}</label>:<label>{this.props.timer.minutes}</label>:<label>{this.props.timer.seconds}</label></time> 
            {!this.state.working && <img src={play} alt="Start Working" onClick={this.onClick}/>}
            {this.state.working && <img src={stop} alt="Stop Working" onClick={this.stopWorking}/>}
          </h1>
          <div className="today-stats">
            <h3>Worked Today: {this.checkTime(this.props.timer.hours) && this.props.timer.hours + 'hr'} {this.props.timer.minutes}m</h3>
            <h5>Company Time: {this.state.companyTime} GMT+08:00</h5>
          </div>
        </main>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps){
  return {
    ...state.start
  };
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(startActions, dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);

function Dec2Converter(time){
  let timer  = time.toString();
  return (timer.length !== 2) ? `0${timer}` : timer.toString();
}