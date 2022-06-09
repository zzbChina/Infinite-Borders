class Card_4{
    constructor(){
        this.card_id = 4;
        this.name = '枭雄';
        this.type = 'command';
        this.info = '指挥战法，令我方将军化作一代枭雄，获得身份“枭雄曹操”，曹操每吃掉对方一个棋子，就额外随机消灭敌方一个非将军棋子';
        this.camp = '';
        this.imgSrc = require("../../assets/chess_skill_img/Screenshot_20220515_103323.jpg");
        this.use = 1;
    }
    //获取自己的阵营
    GetCamp(value){
        this.camp = value;
    }

    Command(vue,camp){
        if(camp == 'red'){
            vue.red_chess[13].actor = 'caocao';
        }else{
            vue.black_chess[13].actor = 'caocao';
        }
    }
    Attack(vue,camp){
        let enemy_queue = [];//敌方存活棋子索引队列
        if(camp == 'black'){
            for(let i =0;i<16;i++){
                if(vue.red_chess[i].exist && vue.red_chess[i].name != '帅'){
                    enemy_queue.push(i);
                }
            }
        }else{
            for(let i =0;i<16;i++){
                if(vue.black_chess[i].exist && vue.black_chess[i].name != '帅'){
                    enemy_queue.push(i);
                }
            }
        }

        if(enemy_queue.length == 0){
            return;
        }
        let rand_num = Math.floor(Math.random()*enemy_queue.length);
        if(camp == 'black'){
            vue.red_chess[enemy_queue[rand_num]].exist = false;
        }else{
            vue.black_chess[enemy_queue[rand_num]].exist = false;
        }
    }
}

export default Card_4