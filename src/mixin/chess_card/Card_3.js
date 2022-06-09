class Card_3{
    constructor(){
        this.card_id = 3;
        this.name = '七星天象';
        this.type = 'command';
        this.info = '指挥战法，令敌我双方都有可能失去一个象，敌方失去的概率更大';
        this.camp = '';
        this.imgSrc = require("../../assets/chess_skill_img/chess_skill_3.png");
        this.use = 1;
    }
    //获取自己的阵营
    GetCamp(value){
        this.camp = value;
    }

    Command(vue,camp){
        if(camp == 'black'){
            for(let i = 0;i < 16; i++){
                if(vue.red_chess[i].name == '象' && vue.red_chess[i].exist){
                    let rand = Math.floor(Math.random()*2);
                    if(rand == 0){
                        vue.red_chess[i].exist = false;
                        break;
                    }
                }
            }
            for(let i = 15;i >= 0; i--){
                if(vue.black_chess[i].name == '象' && vue.black_chess[i].exist){
                    let rand = Math.floor(Math.random()*3);
                    if(rand == 0){
                        vue.black_chess[i].exist = false;
                        break;
                    }
                }
            }
        }else{
            for(let i = 0;i < 16; i++){
                if(vue.red_chess[i].name == '象' && vue.red_chess[i].exist){
                    let rand = Math.floor(Math.random()*3);
                    if(rand == 0){
                        //25的几率
                        vue.red_chess[i].exist = false;
                        break;
                    }
                }
            }
            for(let i = 15;i >= 0; i--){
                if(vue.black_chess[i].name == '象' && vue.black_chess[i].exist){
                    let rand = Math.floor(Math.random()*2);
                    if(rand == 0){
                        //25的几率
                        vue.black_chess[i].exist = false;
                        break;
                    }
                }
            }
        }
    }
}

export default Card_3