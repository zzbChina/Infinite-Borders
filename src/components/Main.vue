<template>
  <div class="main_panel">
        

        <img src="../assets/main/bg2_f5bc4fb.jpg" alt="" class="bg" ref="bg_img">
        <!-- logo -->
        <div class="logo" ref="logo"></div>
        <div class="black_mask" @click="CloseBlackMask" v-show="status.isShowBlackMask"></div>
        <!-- 返回主界面 -->
        <div class="back_home_btn" @click="BackHome" v-show="status.current_part != 'home'"></div>

        <!-- 我的武将按钮 -->
        <div class="my_warriors" @click="MyWarrior" ref="my_warrior">我的武将</div>
        <!-- 我的战法按钮 -->
        <div class="my_skill" ref="my_skill" @click="MySkill">我的战法</div>
        <!-- 我的队伍按钮 -->
        <div class="my_team" ref="my_team" @click="MyTeam">我的队伍</div>
        
        <!-- 头部的横条 -->
        <div class="app_head" ref="app_head"></div>

        <!-- 武将容器 -->
        <transition name="to_big">
        <div class="warrior_container" ref="warrior_container">
            <!-- 武将卡 -->
            <div class="warrior_card" v-for="(c,index) in all_warriors" :key="c.index" @click="SelectThisWarrior(index)" v-show="status.filterCamp == c.camp || status.filterCamp ==''">
                <img :src="c.img.normal" alt="" class="img_card">
                <img src="../assets/main/card-border5-large-23f1.png" alt="" class="img_card">
                <img src="../assets/main/cost.png" alt="" class="cost_img">
                <div class="dark_tape"></div>
                <!-- 觉醒 -->
                <img src="../assets/main/juexing.png" alt="" class="up_mark" v-show="c.isUp">
                <img src="../assets/main/blank_juexing.png" alt="" class="work_mark" v-show="c.isUpWork">
                <img src="../assets/main/red_juexing.png" alt="" class="up_work_mark" v-show="c.isUp && c.isUpWork">
                <!-- 兵种 -->
                <div class="arm">
                    <img src="../assets/main/arm_bg.png" alt="" v-show="!c.isUpArm">
                    <img src="../assets/main/up_arm_bg.png" alt="" v-show="c.isUpArms">
                    <img src="../assets/main/b.png" alt="" v-show="c.arms == '步' && !c.isUpArms">
                    <img src="../assets/main/q.png" alt="" v-show="c.arms == '骑' && !c.isUpArms">
                    <img src="../assets/main/g.png" alt="" v-show="c.arms == '弓' && !c.isUpArms">

                    <img src="../assets/main/q_red.png" alt="" v-show="c.arms == '骑' && c.isUpArms">
                    <img src="../assets/main/b_red.png" alt="" v-show="c.arms == '步' && c.isUpArms">
                    <img src="../assets/main/g_red.png" alt="" v-show="c.arms == '弓' && c.isUpArms">
                    <div class="arm_num">{{c.att}}</div>
                </div>

                <div class="camp" v-show="c.camp == '蜀'"><img :src="require('../assets/main/shu.png')" alt=""></div>
                <div class="camp" v-show="c.camp == '吴'"><img :src="require('../assets/main/wu.png')" alt=""></div>
                <div class="camp" v-show="c.camp == '魏'"><img :src="require('../assets/main/wei.png')" alt=""></div>
                <div class="camp" v-show="c.camp == '群'"><img :src="require('../assets/main/qun.png')" alt=""></div>
                <div class="camp" v-show="c.camp == '汉'"><img :src="require('../assets/main/han.png')" alt=""></div>
                
                <ul class="red_list">
                    <li v-for="s in c.red" :key="s.index" class="red"><img src="../assets/main/red_star.png" alt=""></li>
                    <li v-for="s in (5-c.red)" :key="s.index"><img src="../assets/main/star.png" alt=""></li>
                </ul>

                <div class="name">{{c.name}}</div>

                <!-- 武将标志 -->
                <div class="warrior_sign">
                    <img src="../assets/main/new_s2.png" alt="" v-show="c.sign == 's2'">
                    <img src="../assets/main/new_s3.png" alt="" v-show="c.sign == 's3'">
                    <img src="../assets/main/new_sp.png" alt="" v-show="c.sign == 'sp'">
                    <img src="../assets/main/new_xp.png" alt="" v-show="c.sign == 'xp'">
                </div>
                
                <div class="warrior_mask" v-show="!c.own"></div>
            </div>
        </div>
        </transition>


        <!-- 武将筛选器 -->
        <div class="warrior_filter" v-show="status.current_part == 'my_warrior'">
            <div class="camp_select_btn" v-for="(b,index) in 6" :key="b.index" @click="FilterWarriorCamp(index)" ref="camp_select_btn">
                <div class="text" v-show="index == 0">全</div>
                <div class="text bg_qun_color" v-show="index == 1">群</div>
                <div class="text bg_qun_color" v-show="index == 2">魏</div>
                <div class="text bg_qun_color" v-show="index == 3">蜀</div>
                <div class="text bg_qun_color" v-show="index == 4">吴</div>
                <div class="text bg_qun_color" v-show="index == 5">汉</div>
            </div>
        </div>

        <!-- 武将信息面板 -->
        <transition name="bubble">
        <div class="warrior_info_panel" v-show="status.isShowWarriors">
            <!-- 武将卡 -->
            <div class="select_warrior_card">
                <img :src="select_warrior.img.normal" alt="" class="img_card">
                <img src="../assets/main/card-border5-large-23f1.png" alt="" class="img_card">
                <img src="../assets/main/cost.png" alt="" class="cost_img">

                <!-- 觉醒 -->
                <transition name="bubble">
                <img src="../assets/main/juexing.png" alt="" class="up_mark" v-show="select_warrior.isUp">
                </transition>
                <transition name="bubble">
                <img src="../assets/main/blank_juexing.png" alt="" class="work_mark" v-show="select_warrior.isUpWork">
                </transition>
                <transition name="bubble">
                <img src="../assets/main/red_juexing.png" alt="" class="up_work_mark" v-show="select_warrior.isUp && select_warrior.isUpWork">
                </transition>
                <!-- 兵种 -->
                <!-- 兵种 -->
                <div class="arm">
                    <img src="../assets/main/arm_bg.png" alt="" v-show="!select_warrior.isUpArm">
                    <img src="../assets/main/up_arm_bg.png" alt="" v-show="select_warrior.isUpArms">
                    <img src="../assets/main/b.png" alt="" v-show="select_warrior.arms == '步'">
                    <img src="../assets/main/q.png" alt="" v-show="select_warrior.arms == '骑'">
                    <img src="../assets/main/g.png" alt="" v-show="select_warrior.arms == '弓'">

                    <img src="../assets/main/q_red.png" alt="" v-show="select_warrior.arms == '骑' && select_warrior.isUpArms">
                    <img src="../assets/main/b_red.png" alt="" v-show="select_warrior.arms == '步' && select_warrior.isUpArms">
                    <img src="../assets/main/g_red.png" alt="" v-show="select_warrior.arms == '弓' && select_warrior.isUpArms">
                    <div class="arm_num">{{select_warrior.att}}</div>
                </div>

                <div class="camp" v-show="select_warrior.camp == '蜀'"><img :src="require('../assets/main/shu.png')" alt=""></div>
                <div class="camp" v-show="select_warrior.camp == '吴'"><img :src="require('../assets/main/wu.png')" alt=""></div>
                <div class="camp" v-show="select_warrior.camp == '魏'"><img :src="require('../assets/main/wei.png')" alt=""></div>
                <div class="camp" v-show="select_warrior.camp == '群'"><img :src="require('../assets/main/qun.png')" alt=""></div>
                <div class="camp" v-show="select_warrior.camp == '汉'"><img :src="require('../assets/main/han.png')" alt=""></div>

                <ul class="red_list">
                    <li v-for="s in select_warrior.red" :key="s.index" class="red"><img src="../assets/main/red_star.png" alt=""></li>
                    <li v-for="s in (5-select_warrior.red)" :key="s.index"><img src="../assets/main/star.png" alt=""></li>
                </ul>

                <div class="name">{{select_warrior.name}}</div>

                <!-- 武将标志 -->
                <div class="warrior_sign">
                    <img src="../assets/main/new_s2.png" alt="" v-show="select_warrior.sign == 's2'">
                    <img src="../assets/main/new_s3.png" alt="" v-show="select_warrior.sign == 's3'">
                    <img src="../assets/main/new_sp.png" alt="" v-show="select_warrior.sign == 'sp'">
                    <img src="../assets/main/new_xp.png" alt="" v-show="select_warrior.sign == 'xp'">
                </div>
            </div>

            <!-- 阵营背景标 -->
            <div class="camp_sign_bg" v-show="select_warrior.camp == '蜀'"><img :src="require('../assets/main/shu_filter.png')" alt=""></div>
            <div class="camp_sign_bg" v-show="select_warrior.camp == '吴'"><img :src="require('../assets/main/wu_filter.png')" alt=""></div>
            <div class="camp_sign_bg" v-show="select_warrior.camp == '魏'"><img :src="require('../assets/main/wei_filter.png')" alt=""></div>
            <div class="camp_sign_bg" v-show="select_warrior.camp == '群'"><img :src="require('../assets/main/qun_filter.png')" alt=""></div>
            <div class="camp_sign_bg" v-show="select_warrior.camp == '汉'"><img :src="require('../assets/main/han_filter.png')" alt=""></div>

            <!-- 调整红星程度 -->
            <transition name="fade_in">
            <div class="change_star_panel" v-show="select_warrior.own">
                <div class="left_btn" @click="ChangeStar(false)"></div>
                <div class="right_btn" @click="ChangeStar(true)"></div>
                <div class="star_panel">
                    <div class="star" v-for="s in select_warrior.red" :key="s.index">
                        <img src="../assets/main/red_star.png" alt="">
                    </div>
                    <div class="star" v-for="s in (5-select_warrior.red)" :key="s.index">
                        <img src="../assets/main/star.png" alt="">
                    </div>
                </div>
            </div>
            </transition>

            <!-- 升级觉醒按钮组 -->
            <div class="up_btn_assemble" v-show="select_warrior.own">
                <div class="up_btn_arr" v-for="(b,index) in 3" :key="b.index" 
                ref="up_btn"
                @touchend="UpThisWarrior(index)"
                @touchstart="TouchStartAction('up_btn',index)">
                    <span v-show="index == 0">{{select_warrior.isUp?"取消觉醒":"觉醒"}}</span>
                    <span v-show="index == 1">{{select_warrior.isUpWork?"取消深造":"深造"}}</span>
                    <span v-show="index == 2">{{select_warrior.isUpArms?"还原兵种":"进阶兵种"}}</span>
                </div>
            </div>

            <!-- 解锁上锁按钮 -->
            <div class="undo_lock_btn" @touchend="UndoThisLockWarrior" @touchstart="TouchStartAction('undo_lock')" ref="undo_lock_btn" v-show="!select_warrior.own">
                <img src="../assets/main/btn_on.4fe89da0.png" alt="">
                <span>解 锁 </span>
            </div>
            <div class="undo_lock_btn" @touchend="LockWarrior" @touchstart="TouchStartAction('lock_btn')" ref="lock_btn" v-show="select_warrior.own">
                <img src="../assets/main/btn_on.4fe89da0.png" alt="">
                <span>上 锁 </span>
            </div>


        </div>
        </transition>

        <!-- 设置 -->
        <div class="set_up" ref="set_up" @touchstart="TouchStartAction('setup')"
        @touchend="OpenSetUp">
            <img src="../assets/main/setup.png" alt="">
            <div class="text">设置</div>
        </div>

        <!-- 象棋 -->
        <div class="chinese_chess" ref="chinese_chess" @touchstart='$refs.chinese_chess.classList.add("active")' @touchend='IntoChessPart'>
            <div class="small_box"></div>
            <div class="text">象</div>
        </div>

        
        
        <!-- 接受路由 -->
        <router-view :all_warriors="all_warriors"/>
  </div>
</template>

<script>
import all_warriors from '../mixin/warrior_resource/warriors'//获取所有武将

import common_functions from '../mixin/function_resource/common_functions'

import MyWarrior from '../mixin/function_resource/MyWarrior'

//import LinkList from '../mixin/function_resource/LinkList'
export default {
    name : 'Main',
    mixins:[
        all_warriors,
        common_functions,
    ],
    data(){
        return {
            status:{
                current_part:'home',
                isShowWarriors:false,
                isShowBlackMask : false,
                isShowSetUp:false,
                filterCamp:'',
            },

            select_warrior:{
                camp:'',
                red:0,
                isUp:false,
                isUpArms:false,
                isUpWork:false,
                img:{
                    normal:'',
                }
            },
            
            warrior_dirty:false,//脏位，值为true表示该页面武将被修改
            user:{
                warriors: [],//我的武将队列
            }
        }
    },
    beforeCreate() {
        
    },
    methods: {
        //返回主界面函数
        BackHome(){
            this.status.current_part = 'home';
            this.BackLogoAndBtnAction();
            if(this.$route.path != '/home'){
                this.$router.push('/home');
            }
            //当武将数据被修改时，才存储数据
            if(this.warrior_dirty){
                this.SaveWarriorsData();
                //存储数据到local
                localStorage.setItem('stzb_my_warriors',JSON.stringify(this.user.warriors));
                //重置脏位
                this.warrior_dirty = false;
            }
        },
        //打开我的武将
        MyWarrior(){
            this.LogoAndBtnAction();
            //切换位置到我的武将
            this.status.current_part = 'my_warrior';
            this.$refs.warrior_container.classList.add('active');
            
        },
        //查看我的战法
        MySkill(){
            this.LogoAndBtnAction();
            //切换位置到我的武将
            this.status.current_part = 'my_skill';
            setTimeout(()=>{
                this.$router.push('/my_skill')
            },400)

        },
        //查看我的队伍
        MyTeam(){
            this.LogoAndBtnAction();
            //切换位置到我的武将
            this.status.current_part = 'my_team';
            setTimeout(()=>{
                this.$router.push('/my_team')
            },500)
        },
        //解锁这个武将按钮
        UndoThisLockWarrior(){
            this.$refs.undo_lock_btn.classList.remove('active');
            this.select_warrior.own = true;
            //把这个武将插入到我武将的单链表中
            //初始化一个武将
            let my_warrior = new MyWarrior(this.select_warrior);
            if(this.user.warriors == []){
                //如果我的武将为空，直接插入
                this.user.warriors.push(my_warrior);
            }else{
                let insert_index = 0;
                for(let i = 0;i<this.user.warriors.length;i++){
                    if(my_warrior.id > this.user.warriors[i].id){
                        insert_index++;
                    }
                    else if(my_warrior.id < this.user.warriors[i].id){
                        break;
                    }
                }
                //插入到正确的位置
                this.user.warriors.splice(insert_index,0,my_warrior);
            }
            //修改脏位
            this.warrior_dirty = true;
        },
        //给这个武将上锁
        LockWarrior(){
            this.select_warrior.red = 0;
            this.select_warrior.isUp = false;
            this.select_warrior.isUpWork = false;
            this.select_warrior.isUpArm = false;
            this.select_warrior.own = false;
            this.$refs.lock_btn.classList.remove('active');
            for(let i=0;i < this.user.warriors.length;i++){
                if(this.user.warriors[i].id == this.select_warrior.id){
                    //删除这个武将
                    this.user.warriors.splice(i,1);
                    break;
                }
            }
            //修改脏位
            this.warrior_dirty = true;
        },
        //保存武将数据
        SaveWarriorsData(){
            if(this.user.warriors.length != 0){
                let index = 0;
                for(let j = 0;j<this.all_warriors.length;j++){
                    //找到第一个相同的武将
                    if(this.user.warriors[0].id == this.all_warriors[j].id){
                        index = j;//记录这个起始地址
                    }
                }
                for(let i = 0;i<this.user.warriors.length;i++){
                    for(let k = index;k<this.all_warriors.length;k++){
                        if(this.user.warriors[i].id == this.all_warriors[k].id){
                            index = k+1;//下一次循环查找从k+1开始找
                            if(index > this.all_warriors.length - 1){
                                //越界控制
                                index  = this.all_warriors.length-1;
                            }
                            //同步属性
                            this.user.warriors[i].red = this.all_warriors[k].red;
                            this.user.warriors[i].isUp = this.all_warriors[k].isUp;
                            this.user.warriors[i].isUpWork = this.all_warriors[k].isUpWork;
                            this.user.warriors[i].isUpArms = this.all_warriors[k].isUpArms;
                            break;
                        }
                    }
                }
            }
        },
        //清空武将表
        ClearWarriorList(){
            let last_id = this.user.warriors[this.user.warriors.length - 1].id;//获取我武将队列最后一个武将的id
            for(let i=0;i<this.all_warriors.length;i++){
                if(this.all_warriors[i].own){
                    this.all_warriors[i].red = 0;
                    this.all_warriors[i].isUp = false;
                    this.all_warriors[i].isUpArms = false;
                    this.all_warriors[i].isUpWork = false;
                    this.all_warriors[i].own = false;
                }
                if(this.all_warriors[i].id == last_id){
                    break;
                }
            }

            this.user.warriors = [];//清空我的武将队列数据
        },
        //进入象棋面板
        IntoChessPart(){
            this.$refs.chinese_chess.classList.remove('active');
            this.LogoAndBtnAction();
            //切换位置到我的武将
            this.status.current_part = 'chinese_chess';
            setTimeout(()=>{
                this.$router.push('/chinese_chess')
            },400)
        }
        
    },
    mounted(){
        //返回首页，恢复logo等动画状态
        this.$bus.$on('back_main',this.BackLogoAndBtnAction);

        //初始化武将筛选的选中状态
        this.$refs.camp_select_btn[0].classList.add('active');

        //检查是否有我的武将数据
        if(localStorage.getItem('stzb_my_warriors')){
            //如果我有保存的数据
            this.user.warriors = JSON.parse(localStorage.getItem('stzb_my_warriors'));//获得数据
            //并且更新展示表的数据
            let index = 0;
            for(let i = 0;i<this.all_warriors.length;i++){
                if(this.user.warriors[0].id == this.all_warriors[i].id){
                    index = i;
                }
            }
            for (let i = 0; i < this.user.warriors.length; i++) {
                for (let j = index; j < this.all_warriors.length; j++) {
                    if(this.all_warriors[j].id == this.user.warriors[i].id){
                        this.all_warriors[j].red = this.user.warriors[i].red;
                        this.all_warriors[j].isUp = this.user.warriors[i].isUp;
                        this.all_warriors[j].isUpWork = this.user.warriors[i].isUpWork;
                        this.all_warriors[j].isUpArms = this.user.warriors[i].isUpArms;
                        this.all_warriors[j].own = true;
                        break;
                    }
                }
            }
        }

        //更新武将表
        this.$bus.$on('ClearWarriorList',this.ClearWarriorList);

        
        
    },
    
    
}
</script>

<style lang='less'>
.main_panel{
    position: absolute;top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    user-select: none;
    overflow: hidden;
    .bg{
        width: 100%;
        height: 100%;

        transition: all .5s;
    }
    .bg.active{
        transform: scale(2);
    }
    .set_up_panel{
        position: fixed; top: 0; left:0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0);
        .roles_panel{
            position: absolute; top: 50%;left:50%;
            margin: -50vw 0 0 -40vw;
            width: 80vw;
            height: 100vw;
            .role{
                float: left;
                position: relative;
                margin:6vw 0 0 3.5vw;
                width: 22vw;
                height: 41vw;
                box-shadow: 3px 3px 5px rgb(54, 54, 54);
                border-radius: 3vw;
                img{
                    position: absolute; top: 0; left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 2vw;
                }
                .name{
                    position: absolute; left: 0;top:18vw;
                    width: 100%;
                    height: 6vw;
                    line-height: 6vw;
                    text-align: center;
                    font-size: 2vw;
                    color: white;
                    background: rgb(124, 4, 4);
                }
            }
        }
        .add_new_role{
            position:absolute; top:75vh;left: 25vw;
            width: 50vw;
            height: 12vw;
            border-radius: 3vw;
            border: .5vw solid rgba(196, 178, 178, 1);
            box-sizing: border-box;
            background: rgba(196, 178, 178, 1);
            box-shadow: 2px 2px 5px rgb(115, 115, 115);
            .small_tape{
                position: absolute; top: o; left: 0;
                width: 0;
                height: 11vw;
                border-radius: 3vw;
                background: rgb(121, 8, 8);
                transition: all .3s;
            }
            .add_new_role_text{
                position: absolute; top: o; left: 0;
                width: 50vw;
                height: 12vw;
                text-align: center;
                color: white;
                line-height: 11vw;
                font-size: 2.5vw;
            }
        }
        .add_new_role.touch .small_tape{
            width: 100%;
        }
    }
    .app_head{
        position: absolute;top: -12vh;left: 0;
        width: 100vw;
        height: 12vh;
        transition: all .2s;
        background: linear-gradient(to bottom,rgb(97, 0, 0),rgba(0, 0, 0, 0));
    }
    .app_head.active{
        top: 0;
    }
    .logo{
        width: 50vw;
        height: 20vw;
        position: absolute; left: 25vw; top: 15vh;
        background: url('../assets/main/logo.webp')no-repeat;
        background-size: 100%;
        transition: all .5s;
        z-index: 10;
    }
    .logo.active{
        width: 25vw;
        height: 10vw;
        background: url('../assets/main/200.webp')no-repeat;
        background-size: 100%;
        position: absolute; left: 5vw; top: 5vh;
    }
    .my_warriors,.my_skill,.my_team{
        position: absolute;bottom: 5vh;left: 0;
        height: 10vw;
        width: 40vw;
        font-size: 4vw;
        text-align: center;
        color: white;
        font-weight: bolder;
        line-height: 10vw;
        background: url('../assets/main/tit-bg_506313d.png')center no-repeat;
        background-size: 100%;
        transition: all .3s ease-in;
    }
    .my_warriors.active,.my_skill.active,.my_team.active{
        transform: translateX(-20vh);
        opacity: 0;
    }
    .my_warriors{
        bottom:9vh;
        margin: 0 0 20vw 0;
    }
    .my_skill{
        bottom:7vh;
        margin: 0 0 10vw 0;
    }
    .warrior_filter{
        position: absolute; bottom: 2vh; left: 20vw;
        width: 60vw;
        height: 10vw;
        animation: warrior_filter 1s 1;
        @keyframes warrior_filter {
           0%{
              bottom: -15vw;
              opacity: 0;
           }
           100%{
              bottom: 2vh;
              opacity: 1;
           }
        }
        .camp_select_btn{
            position: relative;
            float: left;
            width: 10vw;
            height: 10vw;
            background:linear-gradient(to bottom,rgb(166, 166, 166),rgb(79, 79, 79));
            color: rgb(183, 183, 183);
            text-align: center;
            line-height: 10vw;
            font-weight: bold;
            font-size: 4vw;
            transition: all .1s;
            
        }
        .camp_select_btn:nth-of-type(1){
            border-radius: 2vw 0 0 2vw;
        }
        .camp_select_btn:nth-of-type(6){
            border-radius: 0 2vw 2vw 0;
        }
        .camp_select_btn.active{
            background:linear-gradient(to bottom,rgb(52, 52, 52),rgb(7, 7, 7));
        }
        .camp_select_btn:nth-of-type(2).active{
            color: rgb(255, 255, 255);
        }
        .camp_select_btn:nth-of-type(3).active{
            color: rgb(62, 107, 255);
        }
        .camp_select_btn:nth-of-type(4).active{
            color: rgb(3, 160, 0);
        }
        .camp_select_btn:nth-of-type(5).active{
            color: rgb(186, 0, 0);
        }
        .camp_select_btn:nth-of-type(6).active{
            color: rgb(110, 0, 194);
        }
    }
    .warrior_card .name,.select_warrior_card .name{
        position: absolute; bottom: -3.6vw;left: 0;
        width: 100%;
        height: 3vw;
        color: rgb(255, 227, 149);
        line-height: 3vw;
        text-align: center;
        font-size: 1.8vw;
        background: url('../assets/main/warrior_name.png')no-repeat;
        background-size: 100%;
    }
    
    // 武将面板
    .warrior_info_panel{
        position: fixed;top: 50%; left: 50%;
        width: 80vw;
        height: 90vw;
        margin: -45vw 0 0 -40vw;
        background: url('../assets/main/blank_box.jpg')center no-repeat;
        background-size: cover;
        z-index: 10;
        transition: all .3s;
        .select_warrior_card .name{
            bottom: -5.2vw;
            line-height: 4vw;
            height: 4vw;
            animation: slideFromBottom .5s 1;
        }
        .select_warrior_card{
            .warrior_sign{
                position: absolute;left: .2vw; bottom: 3.5vw;
                width: 4.7vw;
                height: 4.7vw;
            }
        }
        .select_warrior_card .warrior_sign img{
            position: absolute; left: 0; top: 0;
            width: 100%;
            height: 100%;
        }
        .up_btn_assemble{
            position: absolute;top: 50vw; left: 0;
            width: 100%;
            height: 15vw;
            .up_btn_arr{
                float: left;
                position: relative;
                width: 20vw;
                height: 6vw;
                border-radius: 2vw;
                box-sizing: border-box;
                border: .5vw solid rgb(161, 12, 12);
                background:linear-gradient(to right bottom,darkred,rgb(72, 0, 0));
                color: rgb(255, 255, 255);
                text-align: center;
                line-height: 5vw;
                font-size: 2vw;
                margin: 4vw 0 0 5vw;
                transition: all .3s;
                animation: lively_emerge .2s linear 1;
            }
            .up_btn_arr.active{
                transform: scale(.7);
                background: linear-gradient(to right bottom,rgb(190, 0, 0),rgb(72, 0, 0));
            }
        }
        .undo_lock_btn{
            position: absolute; top: 70vw; left: 25vw;
            width: 30vw;
            height: 8vw;
            transition: all .2s;
            animation: undo_lock_btn .7s 1;
            @keyframes undo_lock_btn {
               0%{
                  margin: 12vw 0 0 0;
                  opacity: 0;
               }
               100%{
                  margin: 0 0 0 0;
                  opacity: 1;
               }
            }
            img{
                width: 100%;
                height: 100%;
            }
            span{
                position: absolute; top: 0; left: 0;
                width: 100%;
                height: 100%;
                font-size: 3vw;
                color: rgb(77, 59, 2);
                font-weight: bold;
                text-align: center;
                line-height: 8vw;
            }
        }
        .undo_lock_btn.active{
            opacity: .8;
            transform: scale(.6);
        }
        .camp_sign_bg{
            position: absolute; top: 0; left: 0;
            width: 26vw;
            height: 26vw;
            opacity: .3;
            animation: camp_sign_bg 1s 1;
            @keyframes camp_sign_bg {
               0%{
                  opacity: 0;
               }
               100%{
                  opacity: .3;
               }
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }

    //象棋
    .chinese_chess{
        position: absolute; right: 10vw; bottom: 8vh;
        width: 18vw;
        height: 18vw;
        background:linear-gradient(to bottom,rgb(101, 101, 101),rgb(78, 78, 78));
        box-shadow: .5vw .5vw 1vw rgb(27, 27, 27);
        transform: rotate(45deg);
        transition: all .2s;
        .small_box{
            position: absolute; left: 2.5vw; top: 2.5vw;
            width: 13vw;
            height: 13vw;
            background: rgb(118, 0, 0);
            box-shadow: 1px 1px 1px black,inset 1px 1px rgb(139, 139, 139);
            transition: all .2s;
            //transform: rotate(90deg);
        }
        .text{
            position: absolute; left: 2.5vw; top: 2.5vw;
            width: 13vw;
            height: 13vw;
            font-size: 6vw;
            text-align: center;
            line-height: 12vw;
            font-weight: bold;
            color: rgb(196, 196, 196);
            transform: rotate(-45deg);
        }
    }
    .chinese_chess.active{
        transform: rotate(0);
    }
    .chinese_chess.active .small_box{
        background: rgb(211, 0, 0);
        transform: rotate(90deg);
    }
    .chinese_chess.active .text{
        color: white;
        transform: rotate(0deg);
    }
    .chinese_chess.leave{
        opacity: 0;
        right: -25vw;
    }
}
</style>