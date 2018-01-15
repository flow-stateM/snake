//单列模式
const RetroSnaker = {
    x:20,//地图X大小
    y:20,//地图Y大小
    snake:[],//蛇的数据
    snakeLen:4,
    viewMap:[],//用来绘制蛇以及其他物品的  其实就是所有span  地图
    dataMap:[],//存放所有的数据
    direction:39,//存储方向
    changeDirAble:true,//能否改变方向
    speed:200,
    score:0,
    scoreInfo:document.querySelector('.score'),
    initMap(){
        this.createMap();;
    },
    initGame(){
        this.initSnake();
        this.addObject('food');
        this.changeDir();
        this.walk();

    },
    createData(){
        let {x,y} = this;
        let map  =new Array(y);
        for (let i = 0;i<map.length;i++){
            map[i] = new Array(x).fill(false);
        }
        
        return map;
    },
    createMap(){
        let gameMap = document.querySelector('.map');
        window.removeEventListener('keydown',this.changeDir.fn);
        clearInterval(this.gameTimer);
        this.scoreInfo.innerHTML = this.score = 0;
        gameMap.innerHTML ='';
        this.changeDirAble =true;
        this.direction=39;
        this.snake =[];
        this.viewMap = this.createData();
        this.dataMap = this.createData();
        let{x,y,viewMap,dataMap} = this;
        for(let i =0;i<y;i++){
            const row = document.createElement('div');
            for(let j = 0;j<x;j++){
                const col= document.createElement('span');
                viewMap[i][j] = row.appendChild(col);
            }
            gameMap.appendChild(row);
        }
    },
    createPoint(startX,startY,endX,endY){
        let{x,y,dataMap} = this;
        // startX = startX ||0;
        // startY = startY ||0;
        let p = [];
        let X = this.rp([startX,endX]);
        let Y =this.rp([startY,endY]);
        //这个点不能生成到蛇身上
        if(dataMap[Y][X]){
            return this.createPoint(startX,startY,endX,endY);
        }
        p.push(Y,X)
        return p ;
    },
    //随机数
    rp(arr){
        const min = Math.min(...arr);
        const max =Math.max(...arr);
        return Math.round(Math.random()*(max - min) + min)
    },
    initSnake(){
        let {snake,snakeLen,x,y,viewMap,dataMap} = this;
        let p= this.createPoint(snakeLen-1,0,x-snakeLen,y-1);
        for(let i=0;i<snakeLen;i++){
            let x = p[1] -i;
            let y = p[0];
            snake.push([y,x]);
            viewMap[y][x].className = !i?'head':'snake';
            dataMap[y][x] = 'snake';
        }
    },
    addObject(name){
        let {x,y,viewMap,dataMap} =this;
        let p =this.createPoint(0,0,x-1,y-1);
        viewMap[p[0]][p[1]].className = name;
        dataMap[p[0]][p[1]]= name;
    },
    walk(){
        clearInterval(this.gameTimer);
        this.gameTimer = setInterval(this._walk.bind(this),this.speed);
    },
    _walk(){
        let {snake,viewMap,dataMap} = this;
        let headX = snake[0][1];
        let headY = snake[0][0];
        viewMap[headY][headX].className = 'snake';
        //检测方向
        switch(this.direction){
            case 37:
                headX -=1;
                break;
            case 38:
                headY -=1;
                break;
            case 39:
                headX +=1;
                break;
            case 40:
                headY +=1;
                break;
        }
        //如果不是食物就不增加长度
        //判断下一个格子是不是墙壁或者自己
        if(headY>19||headY<0||headX>19||headX<0){//是墙壁
            this.endFn('撞墙啦！');
            return;
        }
        if(dataMap[headY][headX]!=='food'){
            let lastIndex = snake.length-1;
            let lastX=  snake[lastIndex][1];
            let lastY=  snake[lastIndex][0];
            snake.pop();
            viewMap[lastY][lastX].className = '';
            dataMap[lastY][lastX] = false;
            if(viewMap[headY][headX].classList.contains('snake')){
                this.endFn('吃了自己啦！');
            }
        }else{
            this.addObject('food');
            this.scoreInfo.innerHTML = ++this.score;
        }
        snake.unshift([headY,headX]);
        viewMap[headY][headX].className = 'snake head';
        dataMap[headY][headX] = 'snake';
        this.changeDirAble =true;
    },
    changeDir(){
        const fn = this.changeDir.fn = this._changeDIr.bind(this);
        window.addEventListener('keydown',fn);
    },
    _changeDIr(e){
        if(!this.changeDirAble) return;
        const {keyCode} = e;
        if(keyCode >36 && keyCode <41 &&Math.abs(this.direction-keyCode)!==2){
            this.direction = keyCode;
            this.changeDirAble =false;
        }
    },
    endFn(text){
        this.initMap();
        alert(text+'  '+'游戏结束');
    }
}
var start = document.querySelector('.startBtn');
RetroSnaker.initMap();
start.onclick = function(){
    RetroSnaker.initMap();
    RetroSnaker.initGame();
}