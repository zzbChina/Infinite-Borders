class Card_5{
    constructor(){
        this.card_id = 5;
        this.name = '威震逍遥';
        this.type = 'command';
        this.info = '指挥战法，令我方随机一颗还没有获得身份的马棋子，获得身份“五子良将张辽”，张辽每吃掉对方的一颗马棋子时，会消灭掉对方所有马棋子';
        this.camp = '';
        this.imgSrc = require("../../assets/chess_skill_img/Screenshot_20220515_103311.jpg");
        this.use = 1;
    }

    //获取自己的阵营
    GetCamp(value){
        this.camp = value;
    }

    Command(vue,camp){
        //获取自己马棋子的索引
        let horse_index = [];
        if(camp == 'red'){
            for(let i =0;i<16;i++){
                if(vue.red_chess[i].name == '馬' && vue.red_chess[i].actor != 'Liao'){
                    horse_index.push(i);
                }
            }
        }else{
            for(let i =0;i<16;i++){
                if(vue.black_chess[i].name == '馬'){
                    horse_index.push(i);
                }
            }
        }
        if(horse_index.length ==0){
            return;
        }
        let rand_num = Math.floor(Math.random()*horse_index.length);
        if(camp == 'red'){
            vue.red_chess[horse_index[rand_num]].actor = 'Liao';
        }else{
            vue.black_chess[horse_index[rand_num]].actor = 'Liao';
        }
    }

    Attack(vue,camp,obj){
        if(obj.name == '馬'){
            if(camp == 'red'){
                for(let i = 0;i <16;i++){
                    if(vue.black_chess[i].name == '馬' && vue.black_chess[i].exist){
                        vue.black_chess[i].exist = false;
                    }
                }
            }else{
                for(let i = 0;i <16;i++){
                    if(vue.red_chess[i].name == '馬' && vue.red_chess[i].exist){
                        vue.red_chess[i].exist = false;
                    }
                }
            }
        }
    }
}

export default Card_5