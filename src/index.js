import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

//workaround for accessing Electron modules;
const electron = window.require('electron');
const ipc = electron.ipcRenderer;

const store = configureStore();

store.subscribe(()=>{
    ipc.send("timer" , store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App ipc={ipc}/> 
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
