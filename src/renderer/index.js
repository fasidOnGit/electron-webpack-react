require('../main/index');

const {ipcRenderer} = require('electron')
const React = require('react');
const ReactDOM = require('react-dom');

let working = false;

let span = document.getElementById("timer");
ipcRenderer.on("timer-start", (event, args)=>{
    let time=args.timer.hours+":"+args.timer.minutes;
    ReactDOM.render(
       time ,span
    );
    working = args.working;
    renderImgSrc(working);
});

document.getElementById('hide').addEventListener('click' , _=>{
    ipcRenderer.send('hide');
});

document.getElementById('play-pause').addEventListener('click' , _=>{
    working = !working;
    renderImgSrc(working);
    ipcRenderer.send('timer-state-change' , {working});
})

function renderImgSrc(working){
    let src;
    let playPoint = document.getElementById('playPoint');
    if(working){
        src="../img/stop.svg";
        playPoint.className = 'glow';
    }else{
        src="../img/play.svg";
        playPoint.className = 'not-glow';
    }

    ReactDOM.render(
        React.createElement(
            "img",
            {src , id:'playStop'}
        )
        ,document.getElementById('play-pause')
    )
}

function onClick(evt){
    working = !working;
    playPause(working);
    ipcRenderer.send("timer-state-change" , {working})
}
// playPause(working);

function playPause(work){
    let img = document.getElementById('play-pause');
    if(work){
        img.src="../img/stop.svg"
    }else{
        img.src="../img/play.svg"
    }
}


