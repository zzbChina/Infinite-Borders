class Card_2 {
    constructor(){
        this.card_id = 2;
        this.name = '苍天已死';
        this.type = 'active';
        this.info = '主动战法，如果己方已经没有所有进攻型的棋子，車，馬，炮，那么直接随机消灭一个敌方棋子';
        this.camp = '';
        this.imgSrc = require("../../assets/chess_skill_img/chess_skill_2.png");
        this.use = 1;
    }
    //获取自己的阵营
    GetCamp(value){
        this.camp = value;
    }
    Active(vue,camp){
        if(this.use == 0){
            //说明已经没有使用次数了
            return;
        }else{
            this.use--;
        }
        if(camp == 'red'){
            if(vue.red_chess[5].exist || vue.red_chess[6].exist || vue.red_chess[7].exist || vue.red_chess[8].exist || vue.red_chess[14].exist || vue.red_chess[15].exist){
                //只要有一颗进攻型棋子存活，就不能执行
                return false;
            }
        }else{
            if(vue.black_chess[5].exist || vue.black_chess[6].exist || vue.black_chess[7].exist || vue.black_chess[8].exist || vue.black_chess[14].exist || vue.black_chess[15].exist){
                //只要有一颗进攻型棋子存活，就不能执行
                return false;
            }
        }
        //敌方存活棋子索引队列
        let enemy_queue = [];
        //获取当前对方的存活非将军棋子的id,放入队列
        if(camp == 'black'){
            for(let i=0;i<16;i++){
                if(vue.red_chess[i].exist && vue.red_chess[i].name != '帅'){
                    enemy_queue.push(i);//放入id就可以
                }
            }
        }else{
            for(let i=0;i<16;i++){
                if(vue.black_chess[i].exist && vue.red_chess[i].name != '将'){
                    enemy_queue.push(i);//放入id就可以
                }
            }
        }
        if(enemy_queue.length == 0){
            //表示说对方的已经没有目标了
            return;
        }
        //获取随机数
        let get_rand = Math.floor(Math.random()*enemy_queue.length);

        //消灭该棋子
        if(camp == 'red'){
            vue.black_chess[enemy_queue[get_rand]].exist = false;
        }else{
            vue.red_chess[enemy_queue[get_rand]].exist = false;
        }

        
    }
}

export default Card_2