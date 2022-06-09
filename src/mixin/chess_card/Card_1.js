class Card_1 {
    constructor(){
        this.card_id = 1;
        this.name = '雄兵破敌';
        this.type = 'command';
        this.info = '指挥战法，开局使得自己随机的一个兵向前移动一格';
        this.camp = '';//卡的归属阵营
        this.imgSrc = require("../../assets/chess_skill_img/chess_skill_1.jpg");
        this.use = 1;
    }
    //获取自己的阵营
    GetCamp(value){
        this.camp = value;
    }
    Command(vue,camp){
        //获取还没有收到战法增益的棋子的索引
        let soldier_chess = [];
        if(camp == 'red'){
            for(let i = 0;i<5;i++){
                if(vue.red_chess[i].top == 66.6){
                    soldier_chess.push(i);
                }
            }
        }else{
            for(let i = 0;i<5;i++){
                if(vue.black_chess[i].top == 33.3){
                    soldier_chess.push(i);
                }
            }
        }
        let rand = Math.floor(Math.random()*soldier_chess.length);

        //让一个棋子向前移动
        if(camp == 'red'){
            vue.red_chess[soldier_chess[rand]].top = 55.5;
        }else{
            vue.black_chess[soldier_chess[rand]].top = 44.4;
        }
        vue.InitAllChessPosition();
    }
}

export default Card_1