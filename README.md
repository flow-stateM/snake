# snake
一个贪吃蛇小游戏
将地图数据化并储存（分为两个地图，渲染地图和数据地图，渲染地图是实际的span的集合，利用class区分这个格子目前的状态，数据地图是对应的数据）,蛇前进时候分碰撞和没碰撞两种情况，再细分为碰撞了食物，自己，墙，而且需要注意的是在蛇前进的时候首先将尾巴去掉1格再将头增加一格，否则在判定是否吃自己时出现问题。还需要注意用键盘控制前进方向的时候，首先不能直接反方向移动，其次在改变方向数据时候需要判定此时能否进行方向数据的改变，否则会出现快速按键盘导致蛇可以反向移动的bug
