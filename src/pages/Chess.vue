<template>
    <div class="chinese_chess_panel">

        <!-- 棋盘 -->
        <img src="../assets/main/IMG_20220512_152509_edit_1258888100961552.jpg" alt="" class="chess_container_img">
        <div class="chess_container">
            <transition-group name="bubble">
            <div class="chess" v-for="(c,b_index) in black_chess" :key="c.id" ref="black_chess" v-show="c.exist"
            @touchstart="$refs.black_chess[b_index].classList.add('select')"
            @touchend='SelectThisChess("black",b_index)'>
                <!-- <transition name="bubble"> -->
                <div class="chess_item" style="background:black;" >
                    <div class="name">{{c.name}}</div>
                </div>
                <!-- </transition> -->
            </div>
            </transition-group>

            <transition-group name="bubble">
            <div class="chess" v-for="(c,r_index) in red_chess" :key="c.id" ref="red_chess"  v-show="c.exist"
            @touchstart="$refs.red_chess[r_index].classList.add('select')"
            @touchend='SelectThisChess("red",r_index)'>
                <div class="chess_item">
                    <div class="name">{{c.name}}</div>
                </div>
            </div>
            </transition-group>
        </div>

        <!-- 数据控制面板 -->
        <div class="data_control_panel">
            <img src="../assets/main/ny_titBg_9583403.png" alt="" class="data_control_panel_bg">
            <div class="turn_num_box">当前回合:{{control.turn_num}}</div>
            <div class="which_turn_box">
                <span>出手方：</span>
                <span v-show="control.turn == 'red'" style="color:darkred;">红色方</span>
                <span v-show="control.turn == 'black'" style="color:black">黑色方</span>
            </div>
        </div>

        <!-- 移动面板 -->
        <div class="move_panel" v-show="control.select">
            <div class="place" v-for="(p,p_index) in 90" :key="p.index" @touchend="MoveHere(p_index)"></div>
        </div>

        <!-- 对局控制面板，重开,悔棋 -->
        <div class="game_control_panel">
            <!-- 悔棋按钮 -->
            <div class="return_last_btn" ref="return_last_btn" @touchstart='$refs.return_last_btn.classList.add("active")'
            @touchend='ReturnLastHistory'>
                <img src="../assets/main/IMG_20220509_101030.png" alt="">
                <div class="text">悔棋</div>
            </div>
            <!-- 重开按钮 -->
            <div class="remake_btn" ref="remake_btn" @touchstart='$refs.remake_btn.classList.add("active")'
            @touchend='RemakeGame'>
                <img src="../assets/main/redBtn_c45925e.png" alt="">
                <div class="text">重开</div>
            </div>
        </div>

        <!-- 游戏开始结束提示板 -->
        <transition name="game_alert_panel">
        <div class="game_alert_panel" v-show="control.begin || control.over">
            <img src="../assets/main/btn_on_bz_13cb23b.png" alt="" class="left_tape">
            <div class="text">
                <span v-show="control.begin">游戏开始</span>
                <span v-show="winner == 'red'">红色棋手获胜</span>
                <span v-show="winner == 'black'">黑色棋手获胜</span>
            </div>
        </div>
        </transition>

        <!-- 系统象棋事件提示，吃，将军 -->
        <div class="event_alert_panel" v-show="control.event.status">
            <img src="../assets/main/chess_event_bg.png" alt="" class="event_alert_panel_bg_img">
            <img src="../assets/main/PIC_1652427771050.jpg" alt="" class="chess_eat_img">
        </div>

        <!-- 开局棋子天赋面板 -->
        <div class="chess_instinct_panel" ref="chess_instinct_panel">
            <div class="container">

                <!-- 黑色方面板 -->
                <div class="black_page" ref="black_page">
                    <img src="../assets/main/tit_box_aa291f2.jpg" alt="" class="title_img">
                    <div class="card_container">
                        <div class="skill_card" v-for="s in black_skill_queue" :key="s.index">
                            <img :src="s.imgSrc" alt="" class="skill_post">
                            <div class="skill_name">{{s.name}}</div>
                        </div>
                    </div>
                    <!-- 抽奖按钮 -->
                    <div class="get_card_btn" ref="get_card_btn_black" @touchstart='$refs.get_card_btn_black.classList.add("active")' @touchend='GetSkillCardByRandom(false)'>抽取</div>
                </div>

                <!-- 红色方面板 -->
                <div class="red_page show" ref="red_page">
                    <img src="../assets/main/tit_box_aa291f2.jpg" alt="" class="title_img">
                    <!-- 获得的卡牌容器 -->
                    <div class="card_container">
                        <div class="skill_card" v-for="s in red_skill_queue" :key="s.index">
                            <img :src="s.imgSrc" alt="" class="skill_post">
                            <div class="skill_name">{{s.name}}</div>
                        </div>
                    </div>
                    <!-- 抽奖按钮 -->
                    <div class="get_card_btn" ref="get_card_btn_red" @touchstart='$refs.get_card_btn_red.classList.add("active")' @touchend='GetSkillCardByRandom(true)'>抽取</div>
                    
                </div>

                <!-- 势力头像 -->
                <div class="camp_head">
                    <div class="red active" @click="TurnCampForSkill(true)" ref="red_camp_head">
                        <div class="chess">
                            <div class="text">帅</div>
                        </div>
                    </div>
                    <div class="current_camp">当前势力 : {{control.current.skill_camp == 'red'?'红方':'黑方'}}</div>
                    <div class="black" @click="TurnCampForSkill(false)" ref="black_camp_head">
                        <div class="chess">
                            <div class="text">将</div>
                        </div>
                    </div>
                </div>

                <!-- 进入游戏按钮 -->
                <div class="begin_game_btn" ref="begin_game_btn" @touchstart='$refs.begin_game_btn.classList.add("active")' @touchend='BeginGame'>开始游戏</div>

                <!-- 黑色方卡牌包 -->
                <div class="black_card_packet_btn" @click="OpenMySkillPacket(false)">战法</div>
                <div class="black_card_packet" ref="black_card_packet">
                    <div class="mask" @click="$refs.black_card_packet.classList.remove('active');
            $refs.use_my_skill_btn.classList.remove('emerge');"></div>
                    <div class="my_container">
                        <img src="../assets/main/btn_on_bz_13cb23b.png" alt="" class="title_img">
                        <div class="card_container">
                            <div class="skill_card" v-for="(s,s_index) in black_skill_queue" :key="s.index"
                            @touchstart='ShowThisMessage(false,s_index)'
                            @touchend='control.skill_card.isShow = false'
                            v-show="s.use > 0">
                                <img :src="s.imgSrc" alt="" class="skill_post">
                                <div class="skill_name">{{s.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 红色方卡牌包 -->
                <div class="red_card_packet_btn" @click="OpenMySkillPacket(true)">战法</div>
                <div class="red_card_packet" ref="red_card_packet">
                    <div class="mask" @click="$refs.red_card_packet.classList.remove('active');$refs.use_my_skill_btn.classList.remove('emerge');"></div>
                    <div class="my_container">
                        <img src="../assets/main/btn_on_bz_13cb23b.png" alt="" class="title_img">
                        <!-- 获得的卡牌容器 -->
                        <div class="card_container">
                            <div class="skill_card" v-for="(s,s_index) in red_skill_queue" :key="s.index" 
                            @touchstart='ShowThisMessage(true,s_index)'
                            @touchend='control.skill_card.isShow = false'
                            v-show="s.use > 0">
                                <img :src="s.imgSrc" alt="" class="skill_post">
                                <div class="skill_name">{{s.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 卡牌信息描述 -->
                <transition name="fade">
                <div class="skill_card_msg_box" ref="skill_card_msg_box" v-show="control.skill_card.isShow">
                    <div class="info">{{control.skill_card.msg}}</div>
                </div>
                </transition>

                <!-- 使用主动技能按钮 -->
                
                <div class="use_my_skill_btn" ref="use_my_skill_btn" 
                @touchstart='$refs.use_my_skill_btn.classList.add("active")'
                @touchend='UseThisSkill'>使用战法 : {{control.skill_card.title}}</div>
                
            
            
            </div>
            
        </div>



    </div>
    
</template>

<script>

import Soldier from '../mixin/chess/Soldier';
import Chariot from '../mixin/chess/Chariot';
import Minister from '../mixin/chess/Minister';
import Bachelor from '../mixin/chess/Bachelor';
import Horse from '../mixin/chess/Horse';
import King from '../mixin/chess/King';
import Cannon from '../mixin/chess/Cannon';

//导入卡牌
import Card_1 from '../mixin/chess_card/Card_1'
import Card_2 from '../mixin/chess_card/Card_2'
import Card_3 from '../mixin/chess_card/Card_3'
import Card_4 from '../mixin/chess_card/Card_4'
import Card_5 from '../mixin/chess_card/Card_5'
import Card_6 from '../mixin/chess_card/Card_6'

//导入历史保存需要的类
import EmptyRecord from '../mixin/function_resource/EmptyRecord'

//导入战法的全局控制包
import SkillStatusControl from '../mixin/function_resource/SkillStatusControl'

export default {
    name:'Chess',
    data(){
        return {
            black_chess:[],//黑色旗子
            red_chess:[],//红色旗子

            //状态控制
            control:{
                turn_num:1,//回合数
                turn : 'red',//当前回合出手方
                select: false,//当前回合时是选择旗子还是放下旗子
                begin:false,//游戏开始
                over:false,//游戏结束
                current: {
                    camp : '',
                    index : 0,
                    skill_camp : 'red',//当前选中的势力，为该势力抽取战法卡
                } ,//当前旗子
                event:{
                    status : false,//事件是否发生
                    info : '',//事件描述
                },
                //战法卡牌信息控制
                skill_card:{
                    camp : '',//当前战法阵营
                    title:'',
                    isShow : false,
                    msg : '',
                    index:'',//当前战法卡索引
                }
            },

            //历史记录,记录每一步,用栈的方式
            history:[],
            first_time:true,
            winner:'',

            //战法卡池
            skill_pool : [],
            red_skill_queue:[],//红色方获得技能卡队列
            black_skill_queue:[],//黑色方获取的技能卡队列

            //战法全局控制
            skill_control:'',

        }
    },
    methods:{
        //初始化
        InitChess(){
            //黑色方添加旗子
            for(let i = 0;i< 17;i++){
                if(i < 5){
                    let soldier = new Soldier('black',i);
                    soldier.InitPosition('black',i);
                    this.black_chess.push(soldier);
                }else if(i >= 5 && i<7){
                    let chariot = new Chariot('black',i);
                    chariot.InitPosition('black',i - 5);
                    this.black_chess.push(chariot);
                }else if(i >= 7 && i <9){
                    let horse = new Horse('black',i);
                    horse.InitPosition('black',i - 7);
                    this.black_chess.push(horse);
                }else if(i >= 9 && i < 11){
                    let minister = new Minister('black',i);
                    minister.InitPosition('black',i - 9);
                    this.black_chess.push(minister);
                }else if(i >= 11 && i < 13){
                    let bachelor = new Bachelor('black',i);
                    bachelor.InitPosition('black',i - 11);
                    this.black_chess.push(bachelor);
                }else if(i == 14){
                    let king = new King('black',i);
                    king.InitPosition('black');
                    this.black_chess.push(king);
                }else if(i > 14 && i < 17){
                    let cannon = new Cannon('black',i);
                    cannon.InitPosition('black',i-15);
                    this.black_chess.push(cannon); 
                }
                
            }
            //红色方添加五个卒
            for(let i = 0;i< 17;i++){
                if(i < 5){
                    let soldier = new Soldier('red',i);
                    soldier.InitPosition('red',i);
                    this.red_chess.push(soldier);
                }else if(i >= 5 && i<7){
                    let chariot = new Chariot('red',i);
                    chariot.InitPosition('red',i - 5);
                    this.red_chess.push(chariot);
                }else if(i >= 7 && i <9){
                    let horse = new Horse('red',i);
                    horse.InitPosition('red',i - 7);
                    this.red_chess.push(horse);
                }
                else if(i >= 9 && i < 11){
                    let minister = new Minister('red',i);
                    minister.InitPosition('red',i - 9);
                    this.red_chess.push(minister);
                }else if(i >= 11 && i < 13){
                    let bachelor = new Bachelor('red',i);
                    bachelor.InitPosition('red',i - 11);
                    this.red_chess.push(bachelor);
                }else if(i == 14){
                    let king = new King('red',i);
                    king.InitPosition('red');
                    this.red_chess.push(king);
                }else if(i > 14 && i < 17){
                    let cannon = new Cannon('red',i);
                    cannon.InitPosition('red',i-15);
                    this.red_chess.push(cannon); 
                }
                
            }
            
            
        },
        //初始化棋子位置
        InitAllChessPosition(){
            for(let i = 0;i < 16; i ++ ){
                this.$refs.red_chess[i].style.left = this.red_chess[i].left + 'vw';
                this.$refs.red_chess[i].style.top = this.red_chess[i].top + 'vw';
            }
            for(let i = 0;i < 16;i ++){
                this.$refs.black_chess[i].style.left = this.black_chess[i].left + 'vw';
                this.$refs.black_chess[i].style.top = this.black_chess[i].top + 'vw';
            }
        },
        //选择这个旗子
        SelectThisChess(camp,index){
            if(this.winner == ''){
                if(camp == this.control.turn){
                    //先把先前选中的棋子选中状态取消
                    if(this.control.current.camp != ''){
                        if(this.control.current.camp == 'black'){
                            this.$refs.black_chess[this.control.current.index].classList.remove('current');
                        }else{
                            this.$refs.red_chess[this.control.current.index].classList.remove('current');
                        }
                    }
                    //修改状态为选择状态
                    this.control.select = true;
                    if(camp == 'black'){
                        //状态修改
                        this.control.current.camp = 'black';
                        this.control.current.index = index;

                        //棋子动画
                        this.$refs.black_chess[index].classList.remove('select');//棋子点击动画移除
                        this.$refs.black_chess[index].classList.add('current');
                    }else{
                        this.control.current.camp = 'red';
                        this.control.current.index = index;

                        this.$refs.red_chess[index].classList.remove('select')
                        this.$refs.red_chess[index].classList.add('current');
                    }
                }else{
                    if(camp == 'black'){
                        //棋子动画
                        this.$refs.black_chess[index].classList.remove('select');//棋子点击动画移除
                    }else{
                        this.$refs.red_chess[index].classList.remove('select')
                    }
                }
            }else{
                if(camp == 'red'){
                    this.$refs.red_chess[index].classList.remove('select');//棋子点击动画移除
                }else{
                    this.$refs.black_chess[index].classList.remove('select');//棋子点击动画移除
                }
            }

        },
        //扮演角色完成一次吃子
        DisplayCompleteEat(camp,obj){
            //枭雄
            if(camp == 'black'){
                if(this.black_chess[this.control.current.index].actor == 'caocao'){
                    for(let i=0;i<this.black_skill_queue.length;i++){
                        if(this.black_skill_queue[i].name == '枭雄'){
                            this.black_skill_queue[i].Attack(this,'black');
                            return;
                        }
                    }
                }
            }else{
                if(this.red_chess[this.control.current.index].actor == 'caocao'){
                    for(let i=0;i<this.red_skill_queue.length;i++){
                        if(this.red_skill_queue[i].name == '枭雄'){
                            this.red_skill_queue[i].Attack(this,'red');
                            return;
                        }
                    }
                }
            }

            //威震逍遥
            if(camp == 'black'){
                if(this.black_chess[this.control.current.index].actor == 'Liao'){
                    for(let i=0;i<this.black_skill_queue.length;i++){
                        if(this.black_skill_queue[i].name == '威震逍遥'){
                            this.black_skill_queue[i].Attack(this,'black',obj);
                        }
                    }
                }
            }else{
                if(this.red_chess[this.control.current.index].actor == 'Liao'){
                    for(let i=0;i<this.red_skill_queue.length;i++){
                        if(this.red_skill_queue[i].name == '威震逍遥'){
                            this.red_skill_queue[i].Attack(this,'red',obj);
                            return;
                        }
                    }
                }
            }
        },

        //移动到这个位置
        MoveHere(p_index){
            let left = 0 + (p_index%9) * 11.1;//获得当前格子left偏移量
            let top = 0;
            if(p_index < 9){
                top = 0;
            }else if(p_index < 18){
                top = 11.1;
            }else if(p_index < 27){
                top = 22.2
            }else if(p_index < 36){
                top = 33.3
            }else if(p_index < 45){
                top = 44.4
            }else if(p_index < 54){
                top = 55.5
            }else if(p_index < 63){
                top = 66.6
            }else if(p_index < 72){
                top = 77.7
            }else if(p_index < 81){
                top = 88.8
            }else if(p_index < 90){
                top = 99.9
            }
            //棋子移动
            let isEmpty = true;
            //检测是否有友军的棋子
            if(this.control.current.camp == 'black'){
                for(let i = 0;i < this.black_chess.length;i++){
                    if(this.black_chess[i].top == top && this.black_chess[i].left == left && this.black_chess[i].exist){
                        //说明该位置有友军棋子
                        isEmpty = false;
                        //并且选中这个友军棋子
                        this.SelectThisChess('black',i);
                        return;
                    }
                }
                
            }else{
                for(let i = 0;i < this.red_chess.length;i++){
                    if(this.red_chess[i].top == top && this.red_chess[i].left == left && this.red_chess[i].exist){
                        //说明该位置有友军棋子
                        isEmpty = false;
                        //并且选中这个友军棋子
                        this.SelectThisChess('red',i);
                        return;
                    }
                }
                
            }
            
            
            //如果该位置为空，开始判断位置是否是棋子合法移动位置
            if(isEmpty){
                //开始判断位置是否是棋子合法移动位置
                let res = true;
                if(this.control.current.camp == 'black'){
                    res = this.IsRightPlace(this.black_chess[this.control.current.index],left,top);
                }else{
                    res = this.IsRightPlace(this.red_chess[this.control.current.index],left,top);
                }
                
                if(!res){
                    //返回值为false表示位置不合法
                    return;
                }
                    
                //真正在这个位置落下棋子
                if(this.control.current.camp == 'black'){
                    //开始检测该位置上是否有敌军棋子
                    for(let i = 0;i < this.red_chess.length;i++){
                        if(this.red_chess[i].top == top && this.red_chess[i].left == left && this.red_chess[i].exist){
                            //吃掉该棋子
                            this.red_chess[i].exist = false;
                            this.DisplayCompleteEat('black',this.red_chess[i]);
                            this.ChessEatAnimation();//调用吃棋子动画函数
                            //判断是否将军
                            if(this.red_chess[i].name == '帅'){
                                setTimeout(()=>{
                                    this.control.over = true;
                                    this.winner = 'black';
                                    setTimeout(()=>{
                                        this.control.over = false;
                                    },2000)
                                },1000)
                            }
                            
                        }
                    }
                    //移动棋子
                    this.$refs.black_chess[this.control.current.index].style.left = left + 'vw';
                    this.$refs.black_chess[this.control.current.index].style.top = top + 'vw';

                    //修改棋子数据结构
                    this.black_chess[this.control.current.index].left = left;
                    this.black_chess[this.control.current.index].top = top;

                    this.$refs.black_chess[this.control.current.index].classList.remove('current');
                }else{
                    //开始检测该位置上是否有敌军棋子
                    for(let i = 0;i < this.black_chess.length;i++){
                        if(this.black_chess[i].top == top && this.black_chess[i].left == left && this.black_chess[i].exist){
                            //吃掉该棋子
                            this.black_chess[i].exist = false;
                            this.DisplayCompleteEat('red',this.black_chess[i]);
                            this.ChessEatAnimation();//调用吃棋子函数

                            //判断是否将军
                            if(this.black_chess[i].name == '将'){
                                setTimeout(()=>{
                                    this.control.over = true;
                                    this.winner = 'red';
                                    setTimeout(()=>{
                                        this.control.over = false;
                                    },2000)
                                },1000)
                            }
                        }
                    }

                    this.$refs.red_chess[this.control.current.index].style.left = left + 'vw';
                    this.$refs.red_chess[this.control.current.index].style.top = top + 'vw';

                    this.red_chess[this.control.current.index].left = left;
                    this.red_chess[this.control.current.index].top = top;

                    this.$refs.red_chess[this.control.current.index].classList.remove('current');
                }
                

                this.control.select = false;
                //切换出手方
                if(this.control.turn == 'red'){
                    this.control.turn = 'black';
                }else{
                    this.control.turn = 'red';
                }
                //回合数增加
                this.control.turn_num ++;
                //保存本次历史记录
                this.SaveChessStatus();

            }
            
            
        },

        //判断位置是否合法
        IsRightPlace(item,left,top){
            //横坐标差值
            let left_space = left - item.left;
            let top_space = top - item.top;
            let left_space_abs = Math.abs(left - item.left);
            let top_space_abs = Math.abs(top - item.top);
            //如果是卒
            if(item.name == '卒'){
                //left和top坐标差值必须小于1
                if(left_space_abs + top_space_abs < 12){
                    if(top > 55){
                        //过河卒可以向左边走
                        if(top_space >= 0){
                            return true;
                        }else{
                            this.$bus.$emit('alert','位置不合法');
                            return false;
                        }
                    }else{
                        //未过河卒不可以向左边走
                        if(top_space > 0){
                            return true;
                        }else{
                            this.$bus.$emit('alert','位置不合法');
                            return false;
                        }
                    }
                }else{
                    this.$bus.$emit('alert','位置不合法');
                    return false;
                }
                
            }
            else if(item.name == '兵'){
                if(left_space_abs + top_space_abs < 12){
                    if(top < 45){
                        //过河卒可以向左边走
                        if(top_space <= 0){
                            return true;
                        }else{
                            this.$bus.$emit('alert','位置不合法');
                            return false;
                        }
                    }else{
                        //未过河卒不可以向左边走
                        if(top_space < 0){
                            return true;
                        }else{
                            this.$bus.$emit('alert','位置不合法');
                            return false;
                        }
                    }
                    
                }else{
                    this.$bus.$emit('alert','位置不合法');
                    return false;
                }
            }
            //如果是車
            else if(item.name == '車'){
                //1.检查是否直线
                if(left_space == 0 || top_space == 0){
                    //检查竖向移动不能与障碍
                    if(left_space == 0){
                        //判断竖线
                        for(let i = 0;i< this.red_chess.length;i++){
                            if(this.red_chess[i].left == item.left && this.red_chess[i].exist){
                                if(this.red_chess[i].exist && (this.red_chess[i].top < item.top && this.red_chess[i].top > top) || (this.red_chess[i].top > item.top && this.red_chess[i].top < top)){
                                    return false;
                                }
                            }
                        }
                        for(let i = 0;i< this.black_chess.length;i++){
                            if(this.black_chess[i].left == item.left && this.black_chess[i].exist){
                                if((this.black_chess[i].top < item.top && this.black_chess[i].top > top) || (this.black_chess[i].top > item.top && this.black_chess[i].top < top)){
                                    return false;
                                }
                            }
                        }

                        return true;
                    }
                    //检查横向移动不能有障碍
                    else{
                        for(let i = 0;i< 16;i++){
                            if(this.red_chess[i].top == item.top && this.red_chess[i].exist){
                                if((this.red_chess[i].left < item.left && this.red_chess[i].left > left) || (this.red_chess[i].left > item.left && this.red_chess[i].left < left)){
                                    console.log('找到障碍',this.red_chess[i]);
                                    return false;
                                }
                            }
                        }
                        for(let i = 0;i< 16;i++){
                            if(this.black_chess[i].top == item.top && this.black_chess[i].exist){
                                if((this.black_chess[i].left < item.left && this.black_chess[i].left > left) || (this.black_chess[i].left > item.left && this.black_chess[i].left < left) ){
                                    console.log('找到障碍',this.black_chess[i]);
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                    
                }else{
                    this.$bus.$emit('alert','位置不合法');
                    return false;
                }
            }
            //如果是士
            else if(item.name == '士'){
                //红色
                if(item.camp == 'red'){
                    if(left_space_abs + top_space_abs > 12 && left_space_abs + top_space_abs < 23 && left_space_abs != 0 && top_space_abs != 0){
                        //再判断是否在九宫格
                        if(top > 67 && left > 33 && left  < 66){
                            return true;
                        }else{
                            this.$bus.$emit('alert','不可出九宫');
                            return false;
                        }
                    }else{
                        this.$bus.$emit('alert','位置不合法');
                        return false;
                    }
                }else{
                    if(left_space_abs + top_space_abs > 12 && left_space_abs + top_space_abs < 23 && left_space_abs != 0 && top_space_abs != 0){
                        if(top < 33 && left > 33 && left  < 66){
                            return true;
                        }else{
                            this.$bus.$emit('alert','不可出九宫');
                            return false;
                        }
                    }else{
                        this.$bus.$emit('alert','位置不合法');
                        return false;
                    }
                }
            }
            //如果是象
            else if(item.name == '象' || item.name == '相'){
                if(left_space_abs > 22 && left_space_abs < 23 && top_space_abs > 22 && top_space_abs < 23){
                    return true;
                }else{
                    return false;
                }
            }
            //如果是馬
            else if(item.name == '馬'){
                if((left_space_abs > 22 && left_space_abs < 23 && top_space_abs > 11 && top_space_abs < 12) || (left_space_abs > 11 && left_space_abs < 12 && top_space_abs > 22 && top_space_abs < 23)){
                    //判断有没有别马脚的,先判断横向
                    if(left_space_abs > 22 && left_space_abs < 23 && top_space_abs > 11 && top_space_abs < 12){
                        for(let i = 0;i<this.black_chess.length;i++){
                            if(this.black_chess[i].top == item.top){
                                //和item同一行
                                if(left_space < 0){
                                    //说明可能的马脚在左边
                                    if(this.black_chess[i].left > item.left - 12 && this.black_chess[i].left < item.left && this.black_chess[i].exist){
                                        //马脚存在
                                        this.$bus.$emit('alert','左马脚')
                                        return false;
                                    }
                                }else{
                                    if(this.black_chess[i].left > item.left && this.black_chess[i].left < item.left + 12 && this.black_chess[i].exist){
                                        //马脚存在
                                        this.$bus.$emit('alert','右马脚')
                                        return false;
                                    }
                                }
                            }
                        }
                        for(let i = 0;i<this.red_chess.length;i++){
                            if(this.red_chess[i].top == item.top){
                                //和item同一行
                                if(left_space < 0){
                                    //说明可能的马脚在左边
                                    if(this.red_chess[i].left > item.left - 11.2 && this.red_chess[i].left < item.left && this.red_chess[i].exist){
                                        //马脚存在
                                        this.$bus.$emit('alert','左马脚')
                                        return false;
                                    }
                                }else{
                                    if(this.red_chess[i].left > item.left && this.red_chess[i].left < item.left + 12 && this.red_chess[i].exist){
                                        //马脚存在
                                        this.$bus.$emit('alert','右马脚')
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                    //判断纵向
                    else if(left_space_abs > 11 && left_space_abs < 12 && top_space_abs > 22 && top_space_abs < 23){
                        for(let i = 0;i<this.black_chess.length;i++){
                            if(this.black_chess[i].left == item.left){
                                //和item同一列
                                if(top_space < 0){
                                    //说明可能的马脚在上面
                                    if(this.black_chess[i].top > item.top - 12 && this.black_chess[i].top < item.top && this.black_chess[i].exist){
                                        //马脚存在
                                        this.$bus.$emit('alert','上马脚')
                                        return false;
                                    }
                                }else{
                                    if(this.black_chess[i].top > item.top && this.black_chess[i].top < item.top + 12 && this.black_chess[i].exist){
                                        //马脚存在
                                        this.$bus.$emit('alert','下马脚')
                                        return false;
                                    }
                                }
                            }
                        }
                        for(let i = 0;i<this.red_chess.length;i++){
                            if(this.red_chess[i].left == item.left){
                                //和item同一行
                                if(top_space < 0){
                                    //说明可能的马脚在上面
                                    if(this.red_chess[i].top > item.top - 12 && this.red_chess[i].top < item.top && this.red_chess[i].exist){
                                        //马脚存在
                                        this.$bus.$emit('alert','上马脚')
                                        return false;
                                    }
                                }else{
                                    if(this.red_chess[i].top > item.top && this.red_chess[i].top < item.top + 12 && this.red_chess[i].exist){
                                        //马脚存在
                                        this.$bus.$emit('alert','下马脚')
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                    return true;
                }else{
                    return false;
                }
            }
            //如果是帅
            else if(item.name == '帅' || item.name == '将'){
                if((left_space_abs > 11 && left_space_abs < 12 && top_space_abs == 0) || (top_space_abs > 11 && top_space_abs < 12 && left_space_abs == 0)){
                    //再判断是否在九宫格
                    if(item.camp == 'red'){
                        if(top > 67 && left > 33 && left  < 66){
                            return true;
                        }else{
                            this.$bus.$emit('alert','不可出九宫');
                            return false;
                        }
                    }else{
                        if(top < 33 && left > 33 && left  < 66){
                            return true;
                        }else{
                            this.$bus.$emit('alert','不可出九宫');
                            return false;
                        }
                    }
                }else{
                    return false;
                }
            }
            //如果是炮
            else if(item.name == '炮'){
                let jump_num = 0;//跳板个数
                //black
                if(item.camp == 'black'){
                    //检查这一处是否有敌人
                    for(let i=0;i<16;i++){
                        if(this.red_chess[i].top == top && this.red_chess[i].left == left && this.red_chess[i].exist){
                            //找到敌人，那么必须保证在我和他之间有且只有一颗棋子,this.red_chess[i]是目标棋子
                            //判断敌人和自己的位置
                            if(left_space_abs == 0){
                                //说明目标和自己是同一列
                                if(top_space > 0){
                                    //说明在自己下面
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.red_chess[j].left == item.left && this.red_chess[j].top > 11 + item.top && this.red_chess[j].top < top - 10 && this.red_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.black_chess[j].left == item.left && this.black_chess[j].top > 11 + item.top && this.black_chess[j].top < top - 10 && this.black_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                }else{
                                    //说明目标在自己上方
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.red_chess[j].left == item.left && this.red_chess[j].top > top + 11 && this.red_chess[j].top < item.top - 11 && this.red_chess[j].exist){
                                            //说明找到跳板
                                            //console.log('找到一个红子',this.red_chess[j])
                                            jump_num ++ ;
                                        }
                                    }
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.black_chess[j].left == item.left && this.black_chess[j].top > top + 11 && this.black_chess[j].top < item.top - 11 && this.black_chess[j].exist){
                                            //说明找到跳板
                                            //console.log('找到一个黑子',this.black_chess[j])
                                            jump_num ++ ;
                                        }
                                    }
                                }
                            }else if(top_space_abs == 0){
                                //说明目标和自己是同一行
                                if(left_space > 0){
                                    //右边
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.red_chess[j].top == item.top && this.red_chess[j].left > 11 + item.left && this.red_chess[j].left < left - 11 && this.red_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.black_chess[j].top == item.top && this.black_chess[j].left > 11 + item.left && this.black_chess[j].left < left - 11 && this.black_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                }else{
                                    //左边
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.red_chess[j].top == item.top && this.red_chess[j].left > left + 11 && this.red_chess[j].left < item.left - 11 && this.red_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.black_chess[j].top == item.top && this.black_chess[j].left > left + 11 && this.black_chess[j].left < item.left - 11 && this.black_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                }
                            }
                            if(jump_num == 0){
                                //找到敌人，到时没有跳板，不能飞过去
                                this.$bus.$emit('alert','没有跳板');
                                return false;
                            }
                        }
                        if(i == 15){
                            //说明找到最后一个了，还是没有敌方棋子,说明是空处，按照车的判断方式
                            if(jump_num == 0){
                                //没有跳板
                                if(left_space == 0 || top_space == 0){
                                    //检查竖向移动不能与障碍
                                    if(left_space == 0){
                                        for(let i = 0;i< this.red_chess.length;i++){
                                            if(this.red_chess[i].left == item.left){
                                                if((this.red_chess[i].top < item.top && this.red_chess[i].top > top) || (this.red_chess[i].top > item.top && this.red_chess[i].top < top) ){
                                                    return false;
                                                }
                                            }
                                        }
                                        for(let i = 0;i< this.black_chess.length;i++){
                                            if(this.black_chess[i].left == item.left){
                                                if((this.black_chess[i].top < item.top && this.black_chess[i].top > top) || (this.black_chess[i].top > item.top && this.black_chess[i].top < top) ){
                                                    return false;
                                                }
                                            }
                                        }

                                        return true;
                                    }
                                    //检查横向移动不能有障碍
                                    else{
                                        for(let i = 0;i< this.red_chess.length;i++){
                                            if(this.red_chess[i].top == item.top){
                                                if((this.red_chess[i].left < item.left && this.red_chess[i].left > left) || (this.red_chess[i].left > item.left && this.red_chess[i].left < left) ){
                                                    return false;
                                                }
                                            }
                                        }
                                        for(let i = 0;i< this.black_chess.length;i++){
                                            if(this.black_chess[i].top == item.top){
                                                if((this.black_chess[i].left < item.left && this.black_chess[i].left > left) || (this.black_chess[i].left > item.left && this.black_chess[i].left < left) ){
                                                    return false;
                                                }
                                            }
                                        }
                                        return true;
                                    }
                                    
                                }else{
                                    this.$bus.$emit('alert','位置不合法');
                                    return false;
                                }
                            }else if(jump_num > 1){
                                //跳板数目过大
                                this.$bus.$emit('alert','不可跨越');
                                return false;
                            }else{
                                return true;
                            }
                            
                        }
                    }
                }else if(item.camp == 'red'){
                    //检查这一处是否有敌人
                    for(let i=0;i<16;i++){
                        if(this.black_chess[i].top == top && this.black_chess[i].left == left && this.black_chess[i].exist){
                            //找到敌人，那么必须保证在我和他之间有且只有一颗棋子,this.black_chess[i]是目标棋子
                            //判断敌人和自己的位置
                            if(left_space_abs == 0){
                                //说明目标和自己是同一列
                                if(top_space > 0){
                                    //说明在自己下面
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.red_chess[j].left == item.left && this.red_chess[j].top > 11 + item.top && this.red_chess[j].top < top - 10 && this.red_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.black_chess[j].left == item.left && this.black_chess[j].top > 11 + item.top && this.black_chess[j].top < top - 10 && this.black_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                }else{
                                    //说明目标在自己上方
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.red_chess[j].left == item.left && this.red_chess[j].top > top + 11 && this.red_chess[j].top < item.top - 11 && this.red_chess[j].exist){
                                            //说明找到跳板
                                            //console.log('找到一个红子',this.red_chess[j])
                                            jump_num ++ ;
                                        }
                                    }
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.black_chess[j].left == item.left && this.black_chess[j].top > top + 11 && this.black_chess[j].top < item.top - 11 && this.black_chess[j].exist){
                                            //说明找到跳板
                                            //console.log('找到一个黑子',this.black_chess[j])
                                            jump_num ++ ;
                                        }
                                    }
                                }
                            }else if(top_space_abs == 0){
                                //说明目标和自己是同一行
                                if(left_space > 0){
                                    //右边
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.red_chess[j].top == item.top && this.red_chess[j].left > 11 + item.left && this.red_chess[j].left < left - 11 && this.red_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.black_chess[j].top == item.top && this.black_chess[j].left > 11 + item.left && this.black_chess[j].left < left - 11 && this.black_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                }else{
                                    //左边
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.red_chess[j].top == item.top && this.red_chess[j].left > left + 11 && this.red_chess[j].left < item.left - 11 && this.red_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                    for(let j = 0;j < 16 ;j++){
                                        if(this.black_chess[j].top == item.top && this.black_chess[j].left > left + 11 && this.black_chess[j].left < item.left - 11 && this.black_chess[j].exist){
                                            //说明找到跳板
                                            jump_num ++ ;
                                        }
                                    }
                                }
                            }
                            if(jump_num == 0){
                                //找到敌人，到时没有跳板，不能飞过去
                                this.$bus.$emit('alert','没有跳板');
                                return false;
                            }
                        }
                        if(i == 15){
                            //说明找到最后一个了，还是没有敌方棋子,说明是空处，按照车的判断方式
                            if(jump_num == 0){
                                //没有跳板
                                if(left_space == 0 || top_space == 0){
                                    //检查竖向移动不能与障碍
                                    if(left_space == 0){
                                        for(let i = 0;i< this.red_chess.length;i++){
                                            if(this.red_chess[i].left == item.left){
                                                if((this.red_chess[i].top < item.top && this.red_chess[i].top > top) || (this.red_chess[i].top > item.top && this.red_chess[i].top < top) ){
                                                    return false;
                                                }
                                            }
                                        }
                                        for(let i = 0;i< this.black_chess.length;i++){
                                            if(this.black_chess[i].left == item.left){
                                                if((this.black_chess[i].top < item.top && this.black_chess[i].top > top) || (this.black_chess[i].top > item.top && this.black_chess[i].top < top) ){
                                                    return false;
                                                }
                                            }
                                        }

                                        return true;
                                    }
                                    //检查横向移动不能有障碍
                                    else{
                                        for(let i = 0;i< this.red_chess.length;i++){
                                            if(this.red_chess[i].top == item.top){
                                                if((this.red_chess[i].left < item.left && this.red_chess[i].left > left) || (this.red_chess[i].left > item.left && this.red_chess[i].left < left) ){
                                                    return false;
                                                }
                                            }
                                        }
                                        for(let i = 0;i< this.black_chess.length;i++){
                                            if(this.black_chess[i].top == item.top){
                                                if((this.black_chess[i].left < item.left && this.black_chess[i].left > left) || (this.black_chess[i].left > item.left && this.black_chess[i].left < left) ){
                                                    return false;
                                                }
                                            }
                                        }
                                        return true;
                                    }
                                    
                                }else{
                                    this.$bus.$emit('alert','位置不合法');
                                    return false;
                                }
                            }else if(jump_num > 1){
                                //跳板数目过大
                                this.$bus.$emit('alert','不可跨越');
                                return false;
                            }else{
                                return true;
                            }
                            
                        }
                    }
                }
                
            }
            return false;
        },

        //保存这一次的棋子位置和状态
        SaveChessStatus(){
            let record = new EmptyRecord();
            record.InitData();//先初始化记录结构 
            //把数据压入
            for(let i=0;i<16;i++){
                let top = this.red_chess[i].top;
                let exist = this.red_chess[i].exist;
                let left = this.red_chess[i].left;
                let actor = this.red_chess[i].actor;

                record.red_chess[i].left = left;
                record.red_chess[i].top = top;
                record.red_chess[i].exist = exist;
                record.red_chess[i].actor = actor;
            }
            for(let i = 0;i<16;i++){
                let top = this.black_chess[i].top;
                let exist = this.black_chess[i].exist;
                let left = this.black_chess[i].left;
                let actor = this.red_chess[i].actor;

                record.black_chess[i].left = left;
                record.black_chess[i].top = top;
                record.black_chess[i].exist = exist;
                record.black_chess[i].actor = actor;
            }
            this.history.push(record);//把本次记录压入栈中
        },

        //调出吃事件动画
        ChessEatAnimation(){
            this.control.event.status = true;
            setTimeout(()=>{
                this.control.event.status = false;
            },1000)
        },
         

        //悔棋
        ReturnLastHistory(){
            //上局获胜者清除
            this.$refs.return_last_btn.classList.remove('active');
            this.winner = '';
            if(this.history.length > 1){
                
                //回合数减少
                this.control.turn_num--;
                //出手方改变
                this.control.turn = (this.control.turn == 'red')?'black':'red';
                //第一次出栈的本次界面
                this.history.pop();

                //上一帧
                let his_item = this.history[this.history.length-1];
                 
                //console.log(his_item);
                //更新位置数据
                for(let i=0;i<16;i++){
                    this.red_chess[i].left = his_item.red_chess[i].left;
                    this.red_chess[i].top = his_item.red_chess[i].top;
                    this.red_chess[i].exist = his_item.red_chess[i].exist;
                    this.red_chess[i].actor = his_item.red_chess[i].actor;
                }
                for(let i =0;i<16;i++){
                    this.black_chess[i].left = his_item.black_chess[i].left;
                    this.black_chess[i].top = his_item.black_chess[i].top;
                    this.black_chess[i].exist = his_item.black_chess[i].exist;
                    this.black_chess[i].actor = his_item.black_chess[i].actor;
                }


                //解除当前棋子选中
                
                if(this.control.current.camp == 'black'){
                    this.$refs.black_chess[this.control.current.index].classList.remove('current');
                }else{
                    this.$refs.red_chess[this.control.current.index].classList.remove('current');
                }
                this.control.select = false;
                this.control.current.camp = '';
                this.control.current.index = 0;
                
                this.InitAllChessPosition();//棋子位置
                
            }else{
                this.$bus.$emit('alert','没有悔棋条件')
            }
            
        },

        //重开
        RemakeGame(){
            //上局获胜者清除
            this.winner = '';

            this.$refs.remake_btn.classList.remove('active');
            this.black_chess = [];
            this.red_chess = [];
            this.InitChess();
            setTimeout(()=>{
                    this.InitAllChessPosition();//初始化棋子位置
            },100)
            //解除当前棋子选中
                
            if(this.control.current.camp == 'black'){
                this.$refs.black_chess[this.control.current.index].classList.remove('current');
            }else{
                this.$refs.red_chess[this.control.current.index].classList.remove('current');
            }
            this.control.select = false;
            this.control.current.camp = '';
            this.control.current.index = 0;
            //重置回合数
            this.control.turn_num = 1;
            this.control.turn = 'red';
            //清空历史记录
            this.history = [];
            //开局保存一次记录
             this.SaveChessStatus();

             //双方战法卡清空
             this.red_skill_queue= [];
             this.black_skill_queue = [];
             this.OpenChessInstinctPanel(true);

             this.control.begin = true;
             setTimeout(()=>{
                 this.control.begin = false;
             },2000)

        },

        //打开棋子天赋选择版
        OpenChessInstinctPanel(status){
            if(status){
                this.$refs.chess_instinct_panel.classList.add('active');
            }else{
                this.$refs.chess_instinct_panel.classList.remove('active');
            }
        },
        //初始化战法卡
        InitSkillCard(){
            let skill_card_1 = new Card_1();
            let skill_card_2 = new Card_2();
            let skill_card_3 = new Card_3();
            let skill_card_4 = new Card_4();
            let skill_card_5 = new Card_5();
            let skill_card_6 = new Card_6();

            this.skill_pool.push(skill_card_1);
            this.skill_pool.push(skill_card_2);
            this.skill_pool.push(skill_card_3);
            this.skill_pool.push(skill_card_4);
            this.skill_pool.push(skill_card_5);
            this.skill_pool.push(skill_card_6);
        },

        //返回空卡
        ReturnNewCard(id){
            //战法卡id
            let empty_card;
            if(id == 1){
                empty_card = new Card_1();
            }else if(id == 2){
                empty_card = new Card_2();
            }else if(id == 3){
                empty_card = new Card_3();
            }else if(id == 4){
                empty_card = new Card_4();
            }else if(id == 5){
                empty_card = new Card_5();
            }else if(id == 6){
                empty_card = new Card_6();
            }
            return empty_card;
        },

        //随机获取战法卡
        GetSkillCardByRandom(isRed){
            //获取随机数
            let get_num = Math.floor(Math.random()*this.skill_pool.length);
            if(isRed){
                //解除动画
                this.$refs.get_card_btn_red.classList.remove('active');
                if(this.red_skill_queue.length == 5){
                    //表示抽取卡牌数目已达上限
                    this.$bus.$emit('alert','最多抽取五张战法卡');
                    return;
                }
                let empty_card = this.ReturnNewCard(this.skill_pool[get_num].card_id);
                this.red_skill_queue.push(empty_card);//加入红色队列
                this.red_skill_queue[this.red_skill_queue.length - 1].GetCamp('red');
                
            }else{
                this.$refs.get_card_btn_black.classList.remove('active');
                if(this.black_skill_queue.length == 5){
                    this.$bus.$emit('alert','最多抽取五张战法卡');
                    return ;
                }
                let empty_card = this.ReturnNewCard(this.skill_pool[get_num].card_id);
                this.black_skill_queue.push(empty_card);//加入黑色队列
                this.black_skill_queue[this.black_skill_queue.length - 1].GetCamp('black');
            }
        },
        //切换抽取得势力
        TurnCampForSkill(isRed){
            if(isRed){
                this.$refs.red_camp_head.classList.add('active');
                this.$refs.black_camp_head.classList.remove('active');
                //切换状态控制
                this.control.current.skill_camp = 'red';

                this.$refs.black_page.classList.remove('show');
                this.$refs.red_page.classList.add('show');
            }else{
                this.$refs.red_camp_head.classList.remove('active');
                this.$refs.black_camp_head.classList.add('active');
                //切换状态控制
                this.control.current.skill_camp = 'black';

                this.$refs.black_page.classList.add('show');
                this.$refs.red_page.classList.remove('show');
            }
        },
        //正式开始游戏
        BeginGame(){
            this.$refs.begin_game_btn.classList.remove("active");
            //执行双方的战法牌中的指挥战法
            for(let i = 0;i<this.red_skill_queue.length;i++){
                if(this.red_skill_queue[i].type == 'command'){
                    this.red_skill_queue[i].Command(this,'red');//调用指挥战法
                }
            }
            for(let i = 0;i<this.black_skill_queue.length;i++){
                if(this.black_skill_queue[i].type == 'command'){
                    this.black_skill_queue[i].Command(this,'black');//调用指挥战法
                }
            }
            //关闭战法抽取面板
            this.OpenChessInstinctPanel(false);
            //开局保存一次记录
            this.SaveChessStatus();
        },

        //打开我的卡牌包
        OpenMySkillPacket(isRed){
            if(isRed){
                //打开红色方卡牌包
                this.$refs.red_card_packet.classList.add('active');
            }else{
                //打开黑色方卡牌包
                this.$refs.black_card_packet.classList.add('active');
            }
        },

        //展示这张卡的信息
        ShowThisMessage(isRed,index){
            this.control.skill_card.isShow = true;
            this.control.skill_card.index = index;//保存索引
            if(isRed){
                this.control.skill_card.msg = this.red_skill_queue[index].info;
                this.control.skill_card.title = this.red_skill_queue[index].name;

                this.control.skill_card.camp = 'red';
                if(this.red_skill_queue[index].type == 'active'){
                    //调出使用战法的按钮,主动战法才弹出
                    this.$refs.use_my_skill_btn.classList.add('emerge');
                }else{
                    this.$refs.use_my_skill_btn.classList.remove('emerge');
                }
            }else{
                this.control.skill_card.msg = this.black_skill_queue[index].info;
                this.control.skill_card.title = this.black_skill_queue[index].name;

                this.control.skill_card.camp = 'black';
                if(this.black_skill_queue[index].type == 'active'){
                    this.$refs.use_my_skill_btn.classList.add('emerge');
                }else{
                    this.$refs.use_my_skill_btn.classList.remove('emerge');
                }
            }
            
            
            
            
            
        },

        //使用这个战法
        UseThisSkill(){
            this.$refs.use_my_skill_btn.classList.remove('active');
            if(this.control.skill_card.camp != this.control.turn){
                //必须是自己的回合才可以使用战法
                this.$bus.$emit('alert','只能在自己回合释放')
                return;
            }else{
                this.$refs.use_my_skill_btn.classList.remove('emerge');
                if(this.control.skill_card.camp == 'red'){
                    //战法持有者是红色
                    if(this.red_skill_queue[this.control.skill_card.index].type == 'active'){
                        this.red_skill_queue[this.control.skill_card.index].Active(this,'red');//调用主动效果
                    }
                    
                }else{
                    //战法持有者是黑色
                    if(this.black_skill_queue[this.control.skill_card.index].type == 'active'){
                        this.black_skill_queue[this.control.skill_card.index].Active(this,'black');//调用主动效果
                    }
                }
            }
            
            
        }
    },
    mounted(){
        this.InitChess();//初始化

        setTimeout(()=>{
            this.OpenChessInstinctPanel(true);
        },100);

        setTimeout(()=>{
                this.InitAllChessPosition();//初始化棋子位置
        },100)

        
        //初始化战法卡
        this.InitSkillCard();
        
        //初始化全局控制
        this.skill_control = new SkillStatusControl();
        console.log(this.skill_control)
        
    }

}
</script>

<style lang='less'>
.chinese_chess_panel{
    position: absolute; left: 0; top: 50vh;
    margin: -55vw 0 0 0;
    width: 100%;
    height: 111vw;
    //background: rgb(71, 71, 71);
    animation: chinese_chess_panel .3s 1;
    @keyframes chinese_chess_panel {
       0%{
          transform: rotate(-30deg);
          margin: -55vw 0 0 -50vw;
          opacity: 0;
       }
       100%{
          transform: rotate(0);
          margin: -55vw 0 0 0;
          opacity: 1;
       }
    }
    .chess_container_img{
        position: absolute; left: 3vw; top: 3vw;
        width: 94vw;
        height: 104vw;
        
    }
    .chess_container{
        position: absolute; left: 0; top: 0;
        width: 100vw;
        height: 110vw;
        //background: rgba(0, 0, 0, 0.1);
        .chess{
            position: absolute;
            width: 11.1vw;
            height: 11.1vw;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0);
            transition: all .3s;
            //background: rgba(0, 0, 0, 0.442);
            .chess_item{
                position: absolute; left: 50%; top : 50%;
                margin: -5vw 0 0 -5vw;
                width: 10vw;
                height: 10vw;
                background: rgb(81, 2, 2);
                border-radius: 50%;
                text-align: center;
                line-height: 10vw;
                font-weight: bold;
                font-size: 4vw;
                box-shadow: .2vw .2vw 1vw rgb(22, 22, 22),inset .2vw .2vw rgb(125, 125, 125);
                color: white;
                box-sizing: border-box;
                transition: all .2s;
                .name{
                    position: absolute; left: 50%; top : 50%;
                    transform : translate(-50%,-50%);
                    width: 8vw;
                    height: 8vw;
                    text-align: center;
                    line-height: 6vw;
                    border-radius:4vw;
                    border: .5vw solid rgb(125, 125, 125);
                    color: rgb(219, 219, 219);
                    box-sizing: border-box;
                }
            }
        }

        .chess.select{
            .chess_item{
                opacity: .5;
                
            }
        }
        .chess.current{
            //background: rgb(28, 28, 28);
            //box-shadow: .3vw .3vw 1vw rgb(28, 28, 28);
            .chess_item{
                .name{
                    color: rgb(255, 255, 255);
                    border-color: white;
                }
                margin: -7vw 0 0 -5vw;
                transform: scale(1.1);
                box-shadow: 0 2vw 3vw black;
                z-index: 2;
            }
            
        }
        
    }
    .data_control_panel{
        position: absolute; left: 2vw; top: -13vw;
        width: 96vw;
        height: 10vw;
        //background: rgba(0, 0, 0, 0.274);
        .data_control_panel_bg{
            position: absolute; left: 0; top: 0;
            width: 100%;
            height: 100%;
        }
        .turn_num_box{
            position: absolute; left: 0; top: 0;
            width: 25vw;
            height: 10vw;
            text-align: center;
            font-size: 3vw;
            color: rgb(110, 110, 110);
            font-weight: bold;
            line-height: 10vw;
        }
        .which_turn_box{
            position: absolute; left: 30vw; top: 0;
            width: 30vw;
            height: 10vw;
            text-align: center;
            font-size: 3vw;
            font-weight: bold;
            line-height: 10vw;
        }
    }
    .move_panel{
        position: absolute; left: 0; top: 0;
        width: 100vw;
        height: 110vw;
        //background: rgba(0, 0, 0, 0.5);
        .place{
            float: left;
            width: 11.1vw;
            height: 11.1vw;
            box-sizing: border-box;
        }
    }
    .event_alert_panel{
        position: absolute; left: 50%; top : 50%;
        transform : translate(-50%,-50%);
        width: 40vw;
        height: 40vw;
        //background: url('../assets/main/chess_event_bg.png')no-repeat;
       // background-size: cover;
        .event_alert_panel_bg_img{
            position: absolute; left: 0; top: 0;
            width: 100%;
            height: 100%;
            animation: event_alert_panel_bg_img 1s 1;
            @keyframes event_alert_panel_bg_img {
               0%{
                  transform: rotate(180deg);
                  opacity: 0;
               }
               100%{
                  transform: rotate(0);
                  opacity: 1;
               }
            }
        }
        .chess_eat_img{
            position: absolute; left: 0; top: 0;
            width: 100%;
            height: 100%;
            animation: chess_eat_img 1s 1;
            @keyframes chess_eat_img {
               0%{
                  transform: scale(2.5);
                  opacity: 0;
               }
               100%{
                  transform: scale(1);
                  opacity: 1;
               }
            }
        }
    }
    //对局控制
    .game_control_panel{
        position: absolute; left: 5vw; top: 118vw;
        width: 90vw;
        height: 10vw;
        .return_last_btn,.remake_btn{
            position: absolute; left: 10vw; top: 1vw;
            width: 24vw;
            height: 8vw;
            transition: all .15s;
            img{
                position: absolute; left: 0; top: 0;
                width: 100%;
                height: 100%;
            }
            .text{
                position: absolute; left: 0; top: 0;
                width: 100%;
                height: 100%;
                text-align: center;
                line-height: 8vw;
                font-size: 3vw;
                font-weight: bold;
                color: white;
            }
        }
        .remake_btn{
            position: absolute; left:56vw;
        }
        .return_last_btn.active, .remake_btn.active{
            transform: scale(.8);
        }
    }

    //游戏开局结束提示板
    .game_alert_panel{
        position: fixed; left: 50%; top : 50%;
        margin:-10vw 0 0 -35vw;
        width: 70vw;
        height: 20vw;
        background: rgb(255, 255, 255);
        box-shadow: 0 0 1vw black;
        transition: all .6s;
        .left_tape{
            position: absolute; left: 0; top: 0;
            height: 100%;
        }
        .text{
            position: absolute; left: 0; top: 0;
            width: 100%;
            height: 100%;
            font-size: 3vw;
            font-weight: bold;
            text-align: center;
            line-height: 20vw;
        }
    }
    .use_my_skill_btn{
        position: fixed; bottom: -10vw; left: 50%;
        margin: 0 0 0 -25vw;
        width: 50vw;
        height: 8vw;
        line-height: 8vw;
        background:linear-gradient(to right bottom,rgb(46, 0, 0),rgb(158, 0, 0));
        box-shadow: 4px 4px 10px rgb(65, 65, 65);
        text-align: center;
        color: white;
        font-size: 2.5vw;
        font-weight: bold;
        opacity: 0;
        transition: all .2s;
        z-index: 5;
    }
    .use_my_skill_btn.emerge{
        opacity: 1;
        bottom: 45vw
    }
    .use_my_skill_btn.active{
        transform: scale(.8);
        opacity: .8;
    }
    .skill_card_msg_box{
        position: fixed; left: 50%; top : 50%;
        transform : translate(-50%,-50%);
        width: 90vw;
        height: 40vw;
        background: rgb(255, 255, 255);
        transition: all .2s;
        z-index: 15;
        .info{
            position: fixed; left: 50%; top : 50%;
            transform : translate(-50%,-50%);
            width: 70vw;
            height: 20vw;
            text-align: center;
            font-size: 3vw;
            color: rgb(100, 100, 100);
            font-weight: bold;
        }
        
    }
    //天赋面板
    .chess_instinct_panel{
        position: fixed; left: 0; top: 100vh;
        width: 100vw;
        height: 100vh;
        transition: all .3s;
        .container{
            position: absolute; left: 50%; top : 50%;
            margin: 200vw 0 0 -45vw;
            width: 90vw;
            height: 120vw;
            background: white;
            box-shadow: 0 0 10vw white;
            transition: all .3s;
            .camp_head{
                position: absolute; left: 0; top: 15vw;
                width: 100%;
                height: 15vw;
                background: rgb(255, 255, 255);
                .red,.black{
                    position: absolute; left: 2vw; top: 0;
                    width: 15vw;
                    height: 15vw;
                    transition: all .2s;
                    .chess{
                        position: absolute; left: 0; top: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 7.5vw;
                        background: rgb(71, 0, 0);
                        box-shadow: 0 .3vw 1vw black;
                        transition: all .2s;
                        .text{
                            position: absolute; left: 50%; top : 50%;
                            transform : translate(-50%,-50%);
                            width: 12vw;
                            height: 12vw;
                            border-radius: 6vw;
                            border: 1vw solid rgb(175, 175, 175);
                            text-align: center;
                            line-height: 9vw;
                            box-sizing: border-box;
                            color: rgb(175, 175, 175);
                            font-weight: bolder;
                            font-size: 4vw;
                            transition: all .2s;
                        }
                    }
                }
                .black{
                    position: absolute; left: 73vw; top: 0;
                    width: 15vw;
                    height: 15vw;
                    .chess{
                        background: #000;
                    }
                }
                .red.active{
                    .chess{
                        background: rgb(189, 0, 0);
                        transform: translateY(-2vw);
                        box-shadow: 0 2vw 1.2vw rgb(56, 56, 56);
                        .text{
                            color: white;
                            border-color: white;
                        }
                    }
                }
                .black.active{
                    .chess{
                        background: rgb(52, 52, 52);
                        transform: translateY(-2vw);
                        .text{
                            color: white;
                            border-color: white;
                        }
                    }
                }
                .current_camp{
                    position: absolute; left: 50%; top : 50%;
                    transform : translate(-50%,-50%);
                    width: 30vw;
                    height: 8vw;
                    line-height: 8vw;
                    background: darkred;
                    text-align: center;
                    color: white;
                    font-weight: bold;
                    font-size: 2vw;
                }
            }
            .begin_game_btn{
                position: absolute; bottom: 10vw; left: 32vw;
                text-align: center;
                line-height: 10vw;
                letter-spacing: 1vw;
                color: white;
                font-size: 2.5vw;
                width: 26vw;
                height: 10vw;
                background:linear-gradient(to right bottom,rgb(65, 0, 0),rgb(133, 0, 0),rgb(192, 0, 0));
                box-shadow: 0 1vw 3vw rgb(72, 72, 72);
                transition: all .2s;
                border-radius: .3vw;
            }
            .begin_game_btn.active{
                opacity: .8;
                transform: scale(.8);
            }
            .red_page,.black_page{
                position: absolute; left: 0; top : 0;
                width: 90vw;
                height: 120vw;
                display: none;
                .title_img{
                    position: absolute; left: 0; top: 0;
                    width: 100%;
                    height: 12vw;
                }
                .card_container{
                    position: absolute; left: 0; top: 30vw;
                    width: 100%;
                    height: 40vw;
                    overflow: hidden;
                    .skill_card{
                        margin: 9vw 0 0 2.5vw;
                        width: 15vw;
                        height: 22vw;
                        float: left;
                        background: rgb(131, 0, 160);
                        border: .6vw solid rgb(131, 0, 160);
                        box-sizing: border-box;
                        position: relative;
                        box-shadow: 0 .4vw 1vw black;
                        animation: skill_card .2s 1 ;
                        @keyframes skill_card {
                        0%{
                            margin: 9vw 0 0 5vw;
                        }
                        100%{
                            margin: 9vw 0 0 2.5vw;
                        }
                        }
                        .skill_post{
                            position: absolute; left: 0; top: 0;
                            width: 100%;
                            height: 100%;
                        }
                        .skill_name{
                            position: absolute; bottom: 0; left: 0;
                            width: 100%;
                            height: 3vw;
                            background: #000;
                            text-align: center;
                            line-height: 3vw;
                            color: white;
                            font-size: 2vw;
                        }
                    }
                }
                .get_card_btn{
                    position: absolute; bottom: 25vw; left: 32vw;
                    text-align: center;
                    line-height: 10vw;
                    letter-spacing: 1vw;
                    color: white;
                    font-size: 2.5vw;
                    width: 26vw;
                    height: 10vw;
                    background:linear-gradient(to right bottom,rgb(65, 0, 0),rgb(133, 0, 0),rgb(192, 0, 0));
                    box-shadow: 0 1vw 3vw rgb(72, 72, 72);
                    transition: all .2s;
                    border-radius: .3vw;
                }
                .get_card_btn.active{
                    transform: scale(.8);
                    opacity: .8;
                }
                
            }
            .red_page.show,.black_page.show{
                display: block;
            }
            .black_card_packet_btn{
                position: fixed; bottom: 0; left: 0;
                width: 24vw;
                height: 8vw;
                text-align: center;
                line-height: 8vw;
                font-size: 2.5vw;
                background: #000;
                color: white;
            }
            .black_card_packet{
                position: fixed; bottom: 0; left: -100vw;
                width: 100vw;
                height: 100vh;
                z-index: 2;
                transition: all .3s;
                .mask{
                    position: absolute;left: 0;top: 0;
                    width: 100vw;
                    height: 100vh;
                }
                .my_container{
                    position: absolute;left: 0;bottom: 0;
                    width: 100vw;
                    height: 40vw;
                    background: rgb(255, 255, 255);
                    .title_img{
                        position: absolute;right: 0;top: 0;
                        width: 7vw;
                        height: 30vh;
                    }
                    .card_container{
                        position: absolute; left: 0; top: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        .skill_card{
                            margin: 9vw 0 0 2.5vw;
                            width: 15vw;
                            height: 22vw;
                            float: left;
                            background: rgb(131, 0, 160);
                            border: .6vw solid rgb(131, 0, 160);
                            box-sizing: border-box;
                            position: relative;
                            box-shadow: 0 .4vw 1vw black;
                            animation: skill_card .2s 1 ;
                            @keyframes skill_card {
                            0%{
                                margin: 9vw 0 0 5vw;
                            }
                            100%{
                                margin: 9vw 0 0 2.5vw;
                            }
                            }
                            .skill_post{
                                position: absolute; left: 0; top: 0;
                                width: 100%;
                                height: 100%;
                            }
                            .skill_name{
                                position: absolute; bottom: 0; left: 0;
                                width: 100%;
                                height: 3vw;
                                background: #000;
                                text-align: center;
                                line-height: 3vw;
                                color: white;
                                font-size: 2vw;
                            }
                        }
                    }
                }
            }
            .black_card_packet.active{
                left: 0;
            }
            .red_card_packet_btn{
                position: fixed; bottom: 0; right: 0;
                width: 24vw;
                height: 8vw;
                text-align: center;
                line-height: 8vw;
                font-size: 2.5vw;
                color: white;
                background: rgb(98, 0, 0);
            }
            .red_card_packet{
                position: fixed; bottom: 0; right: -100vw;
                width: 100vw;
                height: 100vh;
                z-index: 2;
                transition: all .3s;
                .mask{
                    position: absolute;left: 0;top: 0;
                    width: 100vw;
                    height: 100vh;
                }
                .my_container{
                    position: absolute;left: 0;bottom: 0;
                    width: 100vw;
                    height: 40vw;
                    background: rgb(255, 255, 255);
                    .title_img{
                        position: absolute;left: 0;top: 0;
                        width: 5vw;
                        height: 30vh;
                    }
                    .card_container{
                        position: absolute; left: 5vw; top: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        .skill_card{
                            margin: 9vw 0 0 2.5vw;
                            width: 15vw;
                            height: 22vw;
                            float: left;
                            background: rgb(131, 0, 160);
                            border: .6vw solid rgb(131, 0, 160);
                            box-sizing: border-box;
                            position: relative;
                            box-shadow: 0 .4vw 1vw black;
                            animation: skill_card .2s 1 ;
                            @keyframes skill_card {
                            0%{
                                margin: 9vw 0 0 5vw;
                            }
                            100%{
                                margin: 9vw 0 0 2.5vw;
                            }
                            }
                            .skill_post{
                                position: absolute; left: 0; top: 0;
                                width: 100%;
                                height: 100%;
                            }
                            .skill_name{
                                position: absolute; bottom: 0; left: 0;
                                width: 100%;
                                height: 3vw;
                                background: #000;
                                text-align: center;
                                line-height: 3vw;
                                color: white;
                                font-size: 2vw;
                            }
                        }
                    }
                }
            }
            .red_card_packet.active{
                right: 0;
            }
            
            
        }
    }
    .chess_instinct_panel.active{
        top: 0;
        .container{
            margin: -60vw 0 0 -45vw;
        }
    }
    
    
    
}


.game_alert_panel-enter,.game_alert_panel-leave-to{
    transform: rotateY(90deg);
    opacity: 0;
}
.game_alert_panel-enter-to,.game_alert_panel-leave{
    transform: rotateY(0);
    opacity: 1;
}
</style>