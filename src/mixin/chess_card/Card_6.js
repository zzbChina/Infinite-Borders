class Card_6{
    constructor(){
        this.card_id = 6;
        this.name = '单骑救主';
        this.type = 'active';
        this.info = '主动战法，若我方还有馬棋子，随机选中自己的一个马棋子，并且馬棋子的原始位置上没有其他棋子，那么让该马棋子回到原始位置点';
        this.camp = '';
        this.imgSrc = require("../../assets/chess_skill_img/Screenshot_20220515_103255.jpg");
        this.use = 1;
    }

    //获取自己的阵营
    GetCamp(value){
        this.camp = value;
    }

    Active(vue,camp){
        if(this.use == 0){
            return 0;
        }else{
            this.use--;
        }
        //检查还有没有剩余的马
        let horses = [];
        if(camp == 'red'){
            for(let i=0;i<16;i++){
                if(vue.red_chess[i].name == '馬' && vue.red_chess[i].exist){
                    horses.push(i);
                }
            }
        }else{
            for(let i=0;i<16;i++){
                if(vue.black_chess[i].name == '馬' && vue.black_chess[i].exist){
                    horses.push(i);
                }
            }
        }
        //没有马棋子了
        if(horses.length == 0){
            return ;
        }

        //抽取一只馬
        let rand = Math.floor(Math.random()*horses.length);
        //抽取一个靠近将军的空地
        let left_empty = 1;
        let right_empty = 1;
        if(camp == 'black'){
            for(let i=0;i<16;i++){
                if(vue.black_chess[i].left > 11 && vue.black_chess[i].left < 12 && vue.black_chess[i].top == 0){
                    //说明这个位置上有自己的棋子
                    left_empty--;
                }
                if(vue.black_chess[i].left > 77 && vue.black_chess[i].left < 78 && vue.black_chess[i].top == 0){
                    right_empty--;
                }
            }
            for(let i=0;i<16;i++){
                if(vue.red_chess[i].left > 11 && vue.red_chess[i].left < 12 && vue.red_chess[i].top == 0){
                    //说明这个位置上有敌人的棋子
                    left_empty--;
                }
                if(vue.red_chess[i].left > 77 && vue.red_chess[i].left < 78 && vue.red_chess[i].top == 0){
                    right_empty--;
                }
            }
        }else{
            for(let i=0;i<16;i++){
                if(vue.black_chess[i].left > 11 && vue.black_chess[i].left < 12 && vue.black_chess[i].top > 99 && vue.black_chess[i].top < 100){
                    //说明这个位置上有自己的棋子
                    left_empty--;
                }
                if(vue.black_chess[i].left > 77 && vue.black_chess[i].left < 78 && vue.black_chess[i].top > 99 && vue.black_chess[i].top < 100){
                    right_empty--;
                }
            }
            for(let i=0;i<16;i++){
                if(vue.red_chess[i].left > 11 && vue.red_chess[i].left < 12 && vue.red_chess[i].top > 99 && vue.red_chess[i].top < 100){
                    //说明这个位置上有敌人的棋子
                    left_empty--;
                }
                if(vue.red_chess[i].left > 77 && vue.red_chess[i].left < 78 && vue.red_chess[i].top > 99 && vue.red_chess[i].top < 100){
                    right_empty--;
                }
            }
        }
        if(left_empty==0 && right_empty == 0){
            return;
        }else{
            if(left_empty > 0){
                //说明左边位置空出
                if(camp == 'red'){
                    vue.red_chess[horses[rand]].left = 11.1;
                    vue.red_chess[horses[rand]].top = 99.9;
                    vue.InitAllChessPosition();
                }else{
                    vue.black_chess[horses[rand]].left = 11.1;
                    vue.black_chess[horses[rand]].top = 0;
                    vue.InitAllChessPosition();
                }
            }else{
                //说明右边位置空出
                if(camp == 'red'){
                    vue.red_chess[horses[rand]].left = 77.7;
                    vue.red_chess[horses[rand]].top = 99.9;
                    vue.InitAllChessPosition();
                }else{
                    vue.black_chess[horses[rand]].left = 77.7;
                    vue.black_chess[horses[rand]].top = 0;
                    vue.InitAllChessPosition();
                }
            }
        }
        
    }
}

export default Card_6