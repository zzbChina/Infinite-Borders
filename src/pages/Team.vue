<template>
    <div class="team_panel">

        <!-- 标头 -->
        <div class="panel_title">
            <img src="../assets/main/nav_03_84e7b5f.png" alt="">
        </div>

        <!-- 队伍总览 -->
        <div class="team_container">
            <div class="team_box" v-for="(t,t_index) in team" :key="t.index">
                <div class="team_warrior" v-for="(w,index) in team[t_index].warriors" :key="w.index">
                    <img :src="w.img.middle" alt="" v-show="w.id" class="warrior_middle_img">
                    
                    <img src="../assets/main/cost.png" alt="" class="cost_img" v-show="w.id">
                    <div class="black_tape" v-show="w.id"></div>
                    <!-- 武将的红星 -->
                    <ul class="red_list" v-show="w.id">
                        <li v-for="s in w.red" :key="s.index" class="red"><img src="../assets/main/red_star.png" alt=""></li>
                        <li v-for="s in (5-w.red)" :key="s.index"><img src="../assets/main/star.png" alt=""></li>
                    </ul>

                    <!-- 觉醒 -->
                    <transition name="bubble">
                    <img src="../assets/main/juexing.png" alt="" class="up_mark" v-show="w.isUp">
                    </transition>
                    <transition name="bubble">
                    <img src="../assets/main/blank_juexing.png" alt="" class="work_mark" v-show="w.isUpWork">
                    </transition>
                    <transition name="bubble">
                    <img src="../assets/main/red_juexing.png" alt="" class="up_work_mark" v-show="w.isUp && w.isUpWork">
                    </transition>

                    <!-- 武将标志 -->
                    <div class="warrior_sign">
                        <img src="../assets/main/new_s2.png" alt="" v-show="w.sign == 's2'">
                        <img src="../assets/main/new_s3.png" alt="" v-show="w.sign == 's3'">
                        <img src="../assets/main/new_sp.png" alt="" v-show="w.sign == 'sp'">
                        <img src="../assets/main/new_xp.png" alt="" v-show="w.sign == 'xp'">
                    </div>

                    <!-- 武将阵营 -->
                    <div class="camp" v-show="w.camp == '蜀'"><img :src="require('../assets/main/shu.png')" alt=""></div>
                    <div class="camp" v-show="w.camp == '吴'"><img :src="require('../assets/main/wu.png')" alt=""></div>
                    <div class="camp" v-show="w.camp == '魏'"><img :src="require('../assets/main/wei.png')" alt=""></div>
                    <div class="camp" v-show="w.camp == '群'"><img :src="require('../assets/main/qun.png')" alt=""></div>
                    <div class="camp" v-show="w.camp == '汉'"><img :src="require('../assets/main/han.png')" alt=""></div>

                    <div class="arm" v-show="w.id">
                        <img src="../assets/main/arm_bg.png" alt="" v-show="!w.isUpArm">
                        <img src="../assets/main/up_arm_bg.png" alt="" v-show="w.isUpArms">
                        <img src="../assets/main/b.png" alt="" v-show="w.arms == '步'">
                        <img src="../assets/main/q.png" alt="" v-show="w.arms == '骑'">
                        <img src="../assets/main/g.png" alt="" v-show="w.arms == '弓'">

                        <img src="../assets/main/q_red.png" alt="" v-show="w.arms == '骑' && w.isUpArms">
                        <img src="../assets/main/b_red.png" alt="" v-show="w.arms == '步' && w.isUpArms">
                        <img src="../assets/main/g_red.png" alt="" v-show="w.arms == '弓' && w.isUpArms">
                        <div class="arm_num">{{w.att}}</div>
                    </div>

                    <div class="position_sign">
                        <span v-show="index == 0">大营</span>
                        <span v-show="index == 1">中军</span>
                        <span v-show="index == 2">前锋</span>
                    </div>
                </div>
                <div class="build_team_btn" @touchstart='BuildTeamBtnAnimation(t_index)' @touchend='BuildTeam(t_index)' ref="build_team_btn">配置</div>
            </div>

            
        </div>
        <!-- 添加队伍 -->
        <div class="add_team_btn" @touchstart='$refs.add_team_btn.classList.add("active")'  @touchend='AddTeam'  ref="add_team_btn">
            <img src="../assets/main/redBtn_c45925e.png" alt="">
            <div class="text">添加队伍</div>
        </div>
        <!-- 保存队伍数据按钮 -->
        <div class="save_team_data_btn" @touchstart='$refs.save_team_data_btn.classList.add("active")' ref="save_team_data_btn" @touchend='SaveTeamData'>
            <img src="../assets/main/IMG_20220509_101030.png" alt="">
            <div class="text">保存</div>
        </div>


        <!-- 编辑单个队伍 -->
        <div class="edit_single_team" v-show="status.isShowEditTeam">
            <!-- 武将详细信息 -->
            <div class="edit_container">
                <!-- 队伍名称 -->
                <div class="team_name_tape" ref="team_name_tape">
                    <img src="../assets/main/name_bg_4316b2c.png" alt="">
                    <div class="name">队伍{{current + 1}}</div>
                </div>

                <!-- 删除队伍按钮 -->
                <div class="delete_team_btn" @click="DeleteThisTeam"></div>

                <!-- 武将展示或选择 -->
                <div class="team_exposition" ref="team_exposition">
                    <!-- 武将卡曹 -->
                    <div class="warrior_card_ipt" v-for="(w,w_index) in team[current].warriors" :key="w.index">
                        <img src="../assets/main/baowu-empty-0acd.png" alt="" class="warrior_card_img" v-show="w.id == ''" @click="SelectWarrior(w_index)">
                        <!-- 武将卡 -->
                        <div class="warrior_card" v-show="w.id != ''" @click="PreUnloadWarrior(w_index)">
                            <img :src="w.img.normal" alt="" class="card_img">
                            <img src="../assets/main/card-border5-large-23f1.png" alt="" class="card_img">
                            <img src="../assets/main/cost.png" alt="" class="cost_img">

                            <!-- 武将红度 -->
                            <ul class="red_list">
                                <li v-for="s in w.red" :key="s.index" class="red"><img src="../assets/main/red_star.png" alt=""></li>
                                <li v-for="s in (5-w.red)" :key="s.index"><img src="../assets/main/star.png" alt=""></li>
                            </ul>

                            <!-- 觉醒 -->
                            <transition name="bubble">
                            <img src="../assets/main/juexing.png" alt="" class="up_mark" v-show="w.isUp">
                            </transition>
                            <transition name="bubble">
                            <img src="../assets/main/blank_juexing.png" alt="" class="work_mark" v-show="w.isUpWork">
                            </transition>
                            <transition name="bubble">
                            <img src="../assets/main/red_juexing.png" alt="" class="up_work_mark" v-show="w.isUp && w.isUpWork">
                            </transition>

                            <!-- 武将阵营 -->
                            <div class="camp" v-show="w.camp == '蜀'"><img :src="require('../assets/main/shu.png')" alt=""></div>
                            <div class="camp" v-show="w.camp == '吴'"><img :src="require('../assets/main/wu.png')" alt=""></div>
                            <div class="camp" v-show="w.camp == '魏'"><img :src="require('../assets/main/wei.png')" alt=""></div>
                            <div class="camp" v-show="w.camp == '群'"><img :src="require('../assets/main/qun.png')" alt=""></div>
                            <div class="camp" v-show="w.camp == '汉'"><img :src="require('../assets/main/han.png')" alt=""></div>

                            
                            <!-- 武将名字 -->
                            <div class="name">{{w.name}}</div>

                            <!-- 武将标志 -->
                            <div class="warrior_sign">
                                <img src="../assets/main/new_s2.png" alt="" v-show="w.sign == 's2'">
                                <img src="../assets/main/new_s3.png" alt="" v-show="w.sign == 's3'">
                                <img src="../assets/main/new_sp.png" alt="" v-show="w.sign == 'sp'">
                                <img src="../assets/main/new_xp.png" alt="" v-show="w.sign == 'xp'">
                            </div>

                            <div class="arm">
                                <img src="../assets/main/arm_bg.png" alt="" v-show="!w.isUpArm">
                                <img src="../assets/main/up_arm_bg.png" alt="" v-show="w.isUpArms">
                                <img src="../assets/main/b.png" alt="" v-show="w.arms == '步'">
                                <img src="../assets/main/q.png" alt="" v-show="w.arms == '骑'">
                                <img src="../assets/main/g.png" alt="" v-show="w.arms == '弓'">

                                <img src="../assets/main/q_red.png" alt="" v-show="w.arms == '骑' && w.isUpArms">
                                <img src="../assets/main/b_red.png" alt="" v-show="w.arms == '步' && w.isUpArms">
                                <img src="../assets/main/g_red.png" alt="" v-show="w.arms == '弓' && w.isUpArms">
                                <div class="arm_num">{{w.att}}</div>
                            </div>

                        </div>

                        <!-- 位置 -->
                        <div class="warrior_position" v-show="w_index == 0">大 营</div>
                        <div class="warrior_position" v-show="w_index == 1">中 军</div>
                        <div class="warrior_position" v-show="w_index == 2">前 锋</div>
                    </div>
                </div>
                <!-- 安装战法 -->
                <div class="load_skill_part" ref="load_skill_part">
                    <!-- 战法安转武将槽 -->
                    <div class="load_warrior_tape" v-for="l in team[current].warriors" :key="l.index">
                        <div class="warrior_head_img">
                            <img :src="l.img.head" alt="" v-show="l.id">
                        </div>
                        <div class="skills" v-for="s in 2" :key="s.index"></div>
                    </div>
                </div>

                <!-- 切换按钮 -->
                <div class="switch_btn" @click="SwitchStatus">
                    <img src="../assets/main/icon_down_r_7c230e2.png" alt="" ref="switch_btn">
                    <div class="text" v-show="!status.switchWarriorOrSkill">配置武将的战法</div>
                    <div class="text" v-show="status.switchWarriorOrSkill">配置武将</div>
                </div>
            </div>
            <div class="confirm_edit_btn" @touchstart='ConfirmBtnAnimation(true)'  @touchend='ConfirmEdit' ref="confirm_edit_btn">确 认</div>
        </div>

        <!-- 选择武将面板 -->
        <div class="select_warrior_container" ref="select_warrior_container">
            <!-- 面罩 -->
            <div class="select_warrior_container_mask" @click="CloseSelectWarrior" ref="select_warrior_container_mask"></div>
            <!-- 武将池 -->
            <div class="warrior_pool" ref="warrior_pool">
                <div class="warrior_head" v-for="(h,index) in all_warriors" :key="h.index" v-show="h.own" @click="IptThisWarrior(index)">
                    <img :src="h.img.head" alt="" >
                    <!-- 武将阵营 -->
                    <div class="camp" v-show="h.camp == '蜀'"><img :src="require('../assets/main/shu.png')" alt=""></div>
                    <div class="camp" v-show="h.camp == '吴'"><img :src="require('../assets/main/wu.png')" alt=""></div>
                    <div class="camp" v-show="h.camp == '魏'"><img :src="require('../assets/main/wei.png')" alt=""></div>
                    <div class="camp" v-show="h.camp == '群'"><img :src="require('../assets/main/qun.png')" alt=""></div>
                    <div class="camp" v-show="h.camp == '汉'"><img :src="require('../assets/main/han.png')" alt=""></div>
                    <!-- 武将红星 -->
                    <ul class="red_list">
                        <li v-for="s in h.red" :key="s.index" class="red"><img src="../assets/main/red_star.png" alt=""></li>
                        <li v-for="s in (5-h.red)" :key="s.index"><img src="../assets/main/star.png" alt=""></li>
                    </ul>
                    <!-- 武将标志 -->
                    <div class="warrior_sign">
                        <img src="../assets/main/new_s2.png" alt="" v-show="h.sign == 's2'">
                        <img src="../assets/main/new_s3.png" alt="" v-show="h.sign == 's3'">
                        <img src="../assets/main/new_sp.png" alt="" v-show="h.sign == 'sp'">
                        <img src="../assets/main/new_xp.png" alt="" v-show="h.sign == 'xp'">
                    </div>
                </div>
            </div>
        </div>


        <!-- 卸载武将的提示框 -->
        <div class="unload_warrior_prompt" v-show="status.isUnloadWarrior">
            <div class="unload_container">
                <img src="../assets/main/dec_4_a669c265.png" alt="">
                是否卸下该武将？
                <div class="confirm_unload_btn" @touchstart='$refs.confirm_unload_btn.classList.add("active")' @touchend='ConfirmUnload' ref="confirm_unload_btn">确认</div>
                <div class="cancel_unload_btn" @touchstart='$refs.cancel_unload_btn.classList.add("active")' @touchend='CancelUnload' ref="cancel_unload_btn">取消</div>
            </div>
        </div>

        <!-- 删除队伍提示框 -->
        <div class="delete_team_prompt" v-show="status.isDeleteThisTeam">
            <div class="delete_team_container">
                <img src="../assets/main/role_a555903.png" alt="">
                是否删除这支队伍？
                <div class="confirm_btn" @touchstart='$refs.confirm_btn.classList.add("active")' @touchend='ConfirmDeleteThisTeam' ref="confirm_btn">确认</div>
                <div class="cancel_btn" @touchstart='$refs.cancel_btn.classList.add("active")' @touchend='CancelDeleteThisTeam' ref="cancel_btn">取消</div>
            </div>
        </div>

      
    </div>
  
</template>

<script>
//import all_warriors from '../mixin/warrior_resource/warriors'//获取所有武将

import TeamWarrior from '../mixin/function_resource/TeamWarrior'//导入创建空武将的类

import TeamWarriorNode from '../mixin/function_resource/TeamWarriorNode'//导入用于保存队伍数据的结点

export default {
    name:'Team',
    //mixins:[all_warriors],
    props:['all_warriors'],
    data(){
        return{
            status:{
                //打开编辑武将面板
                isShowEditTeam : false,
                //选择武将
                isSelectWarriors:false,
                //切换安转战法或者武将
                switchWarriorOrSkill : false,
                //卸下武将的提示框
                isUnloadWarrior:false,
                //删除队伍提示框
                isDeleteThisTeam : false,
            },
            team:[
                {
                    warriors:[
                        {
                            id:'',
                            name:'',
                            red:0,
                            camp:'',
                            att:"",
                            arms:'',
                            isUp:false,
                            isUpWork:false,
                            isUpArms:false,
                            img:{
                                normal:"",
                                middle:"",
                                head:"",
                            },
                            skill:[],
                        },
                        {
                            id:'',
                            name:'',
                            red:0,
                            camp:'',
                            att:"",
                            arms:'',
                            isUp:false,
                            isUpWork:false,
                            isUpArms:false,
                            img:{
                                normal:"",
                                middle:"",
                                head:"",
                            },
                            skill:[],
                        },
                        {
                            id:'',
                            name:'',
                            red:0,
                            camp:'',
                            att:"",
                            arms:'',
                            isUp:false,
                            isUpWork:false,
                            isUpArms:false,
                            img:{
                                normal:"",
                                middle:"",
                                head:"",
                            },
                            skill:[],
                        }
                    ],//武将集合（前锋，中军，大营）
                    
                }
            ],
            
            current : 0,//当前队伍序号
            current_warrior:0,//当前武将在队伍中的序号

            dirty:false,//脏位
        }
    },
    methods:{
        //配置队伍的按钮效果
        BuildTeamBtnAnimation(index){
            this.$refs.build_team_btn[index].classList.add('active');
        },
        //配置队伍按钮
        BuildTeam(index){
            //解除动画
            this.$refs.build_team_btn[index].classList.remove('active');
            this.status.isShowEditTeam = true;
            //修改对应的队伍序号
            this.current = index;
        },
        //确认按钮效果
        ConfirmBtnAnimation(status){
            if(status){
                this.$refs.confirm_edit_btn.classList.add('active');
            }else{
                this.$refs.confirm_edit_btn.classList.remove('active');

            }
        },
        //确认调整
        ConfirmEdit(){
            this.status.isShowEditTeam = false;
            this.ConfirmBtnAnimation(false);            
            //修改脏位
            this.dirty = true;
        },
        //选择武将
        SelectWarrior(w_index){
            //let warrior = new TeamWarrior();
            this.status.isSelectWarriors = true;
            this.current_warrior = w_index;//把序号赋值给current对象

            this.$refs.select_warrior_container_mask.classList.add('active');
            this.$refs.warrior_pool.classList.add('active');
            this.$refs.select_warrior_container.classList.add('active')
            
        },
        //把这个武将放到武将槽里
        IptThisWarrior(index){
            //this.all_warriors[index]是放入的武将对象
            //this.team[this.current].warriors[this.current_warrior]是武将放入位置
            
            //检查武将是否重复
            let repeat = false;
            for(let i = 0;i<this.team.length;i++){
                for(let j= 0;j<3;j++){
                    if(this.team[i].warriors[j].id == this.all_warriors[index].id || this.team[i].warriors[j].id + 1 == this.all_warriors[index].id || this.team[i].warriors[j].id -1  == this.all_warriors[index].id){
                        //找到相同武将，不能放入
                        repeat = true;
                    }
                }
            }
            //检查武将的cost值是否超过上限
            if(this.all_warriors[index].cost + this.team[this.current].warriors[(this.current_warrior + 1)%3].cost + this.team[this.current].warriors[(this.current_warrior + 2)%3].cost > 10){
                this.$bus.$emit('alert','队伍统帅值过高');
                return;
            }
            if(!repeat){
                this.team[this.current].warriors[this.current_warrior] = this.all_warriors[index];
                //修改脏位
                this.dirty = true;
                //关闭遮罩层
                this.$refs.select_warrior_container_mask.classList.remove('active');
                this.$refs.warrior_pool.classList.remove('active');
                this.$refs.select_warrior_container.classList.remove('active')
                this.status.switchWarriorOrSkill = !this.status.switchWarriorOrSkill;
                this.status.switchWarriorOrSkill = !this.status.switchWarriorOrSkill;
            }else{
                this.$bus.$emit('alert','存在相同武将');
            }
            
            
            
        },
        //切换安转武将或者战法
        SwitchStatus(){
            if(this.status.switchWarriorOrSkill){
                this.$refs.team_exposition.classList.remove('active');
                this.$refs.load_skill_part.classList.remove('active');
                this.$refs.switch_btn.classList.remove('active');
                this.$refs.team_name_tape.classList.remove('active');

            }else{
                this.$refs.team_exposition.classList.add('active');
                this.$refs.load_skill_part.classList.add('active');
                this.$refs.switch_btn.classList.add('active');
                this.$refs.team_name_tape.classList.add('active');

            }
            this.status.switchWarriorOrSkill = !this.status.switchWarriorOrSkill;
        },
        //添加一个队伍
        AddTeam(){
            this.$refs.add_team_btn.classList.remove('active');
            let new_team = new TeamWarrior();
            //修改脏位
            this.dirty = true;
            this.team.push(new_team);
        },
        //卸下这个武将
        PreUnloadWarrior(w_index){
            this.current_warrior = w_index;
            //弹出提示框
            this.status.isUnloadWarrior = true;
        },
        //取消卸载武将
        CancelUnload(){
            this.$refs.cancel_unload_btn.classList.remove('active');
            this.status.isUnloadWarrior = false;
            //修改脏位
            this.dirty = true;
        },
        //确认卸载武将
        ConfirmUnload(){
            this.$refs.confirm_unload_btn.classList.remove('active');
            this.status.isUnloadWarrior = false;
            this.team[this.current].warriors[this.current_warrior] = {
                            id:'',
                            name:'',
                            red:0,
                            camp:'',
                            att:"",
                            arms:'',
                            isUp:false,
                            isUpWork:false,
                            isUpArms:false,
                            img:{
                                normal:"",
                                middle:"",
                                head:"",
                            },
                            skill:[],
            };
            //修改脏位
            this.dirty = true;
            
        },
        //删除这个队伍
        DeleteThisTeam(){
            //打开提示框
            this.status.isDeleteThisTeam = true;
        },
        //确认删除
        ConfirmDeleteThisTeam(){
            this.$refs.confirm_btn.classList.remove("active");
            //先关闭武将编辑界面
            this.status.isShowEditTeam = false;
            //删除队伍
            if(this.team.length != 1){
                this.team.splice(this.current,1);
                this.current = 0;
            }else{
                //队伍不足一队，无法删除
                this.$bus.$emit('alert','队伍至少留一队');
            }
            
            //关闭提示框
            this.status.isDeleteThisTeam = false;
        },
        //取消删除队伍
        CancelDeleteThisTeam(){
            this.$refs.cancel_btn.classList.remove("active")
            //关闭提示框
            this.status.isDeleteThisTeam = false;
        },
        //关闭武将选择面板
        CloseSelectWarrior(){
            this.$refs.select_warrior_container_mask.classList.remove('active');
            this.$refs.warrior_pool.classList.remove('active');
            this.$refs.select_warrior_container.classList.remove('active')
        },
        //保存队伍数据
        SaveTeamData(){
            let queue = [];//准备一个空队列
            this.$refs.save_team_data_btn.classList.remove('active');
            //保存队伍数据
            for(let i=0;i<this.team.length;i++){
                for(let j=0;j<this.team[i].warriors.length;j++){
                    if(this.team[i].warriors[j].id){
                        //说明该位置有武将
                        let item = new TeamWarriorNode(false,i,j,this.team[i].warriors[j].id)
                        this.InsertNodeIntoTeamQueue(item,queue)
                    }else{
                        let item = new TeamWarriorNode(true,i,j,this.team[i].warriors[j].id)
                        this.InsertNodeIntoTeamQueue(item,queue)
                    }
                    
                }
            }
            localStorage.setItem('stzb_my_team',JSON.stringify(queue));
            this.$bus.$emit('alert','保存成功');
        },
        //插入队列
        InsertNodeIntoTeamQueue(item,queue){
            if(queue.length == 0){
                queue.push(item);
                return;
            }else{
                for(let i =0 ;i< queue.length;i++){
                    if(item.warrior_id <= queue[i].warrior_id){
                        queue.splice(i,0,item);
                        return;
                        //插入元素
                    }
                    if(i == queue.length - 1){
                        queue.push(item);
                        return;
                    }
                }
            }
            

        },
        //把local的数据加载到界面
        UpdateIntoInterface(){
            let queue = JSON.parse(localStorage.getItem('stzb_my_team'));
            let queue_index = 0;
            for(let i=0;i<queue.length;i++){
                if(queue[i].empty){
                    queue_index += 1;
                }
            }
            for(let i=0;i<this.all_warriors.length;i++){
                //匹配到对应武将
                if(queue[queue_index].warrior_id == this.all_warriors[i].id){
                    if(queue[queue_index].team_index + 1 > this.team.length){
                        //如果说匹配到的武将在第n队，但是现在team数组没有n队，那么需要拓展队伍
                        let length = this.team.length;
                        for(let j=0;j<(queue[queue_index].team_index + 1) - length;j++){
                            let new_team = new TeamWarrior();
                            this.team.push(new_team);
                        }
                    }
                    this.team[queue[queue_index].team_index].warriors[queue[queue_index].warrior_index] = this.all_warriors[i];
                    queue_index++;
                    
                }
                if(queue_index == queue.length){
                    return;
                }
            }

        }

    },
    mounted(){
        if(localStorage.getItem('stzb_my_team')){
            //把local的数据加载到界面
            this.UpdateIntoInterface();
        }
    }

}
</script>

<style lang='less'>
.team_panel{
    position: absolute; left: 0; top : 0;
    width: 100vw;
    height: 100vh;
    .panel_title{
        width: 30vw;
        height: 7vw;
        position: absolute; left: 35vw;
        top: 16vh;
        animation: panel_title .3s 1;
        @keyframes panel_title {
           0%{
              transform: rotateY(90deg);
           }
           100%{
              transform: rotateY(0);
           }
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
    //队伍总览
    .team_container{
        position: absolute; left: 50%; top : 50%;
        transform : translate(-50%,-50%);
        width: 90vw;
        height: 100vw;
        overflow-y: scroll;
        overflow-x: hidden;
        //background: #000;
        .team_box{
            width: 100%;
            height: 20vw;
            //background:url('../assets/main/tab_sjld.0d441c54.jpg')no-repeat;;
            //background-size: cover;
            background: rgb(78, 78, 78);
            box-sizing: border-box;
            border-top: .2vw solid rgb(176, 176, 176);
            position: relative;
            animation:team_box_animation .5s linear 1 ;
            @keyframes team_box_animation {
            0%{
                transform:rotateY(90deg);
            }
            100%{
                transform:rotateY(0);
            }
            }
            //武将的middle画像
            .team_warrior{
                float: left;
                width: 22vw;
                height: 12.5vw;
                box-sizing: border-box;
                border: .3vw solid rgb(116, 116, 116);
                background:linear-gradient(to right bottom,rgb(49, 49, 49),black);
                margin:2vw 0 0 1.5vw;
                position: relative;
                .position_sign{
                    position: absolute; left: 0; bottom: -4vw;
                    width: 100%;
                    height: 3vw;
                    text-align: center;
                    background: rgb(54, 54, 54);
                    color: rgb(149, 149, 149);
                    font-size: 2vw;
                    line-height: 3vw;
                }
                .warrior_middle_img{
                    width: 100%;
                    height: 100%;
                }
                .black_tape{
                    position: absolute; left: 0; top: 0;
                    width: 4vw;
                    height: 100%;
                    background:linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0));
                }
                .red_list{
                    position: absolute;left: 4vw; top: 0;
                    width: 10vw;
                    height: 3vw;
                    padding: 0 .9vw 0 6.5vw;
                    background:linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0));
                    li{
                        float: left;
                        margin: 0.6vw 0 0 0;
                        width: 2vw;
                        height: 2vw;
                        position: relative;
                        img{
                            position: absolute; left: 0; top: 0;
                            width: 100%;
                            height: 100%;
                        }
                    }

                }
                .up_mark,.work_mark,.up_work_mark{
                    position: absolute; right: -2vw; top: -2vw;
                    width: 4vw;
                    height: 4vw;
                }
                .cost_img{
                    position: absolute; left:11vw; top: 9vw;
                    width: 5vw;
                    height: 2.5vw;
                }
                .warrior_sign{
                    position: absolute; left: .3vw; bottom: .3vw;
                    width: 4vw;
                    height: 4vw;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .camp{
                    position: absolute; left: 0; top: 0;
                    width: 4vw;
                    height: 4vw;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .arm{
                    position: absolute; right: .1vw; bottom: .1vw;
                    width: 4.2vw;
                    height: 4.2vw;
                    
                    img{
                        position: absolute; left: 0; top: 0;
                        width: 100%;
                        height: 100%;
                    }
                    .arm_num{
                        position: absolute; right: 0; bottom: 0;
                        width: 4.2vw;
                        height: 4.2vw;
                        text-align: right;
                        line-height: 5.5vw;
                        font-size: 2vw;
                        color: white;
                    }
                    
                }
            }
            .team_warrior:nth-of-type(1){
                margin:2vw 0 0 2vw;
            }
            
            .build_team_btn{
                position: absolute; right: 2vw; top: 8vw;
                width: 15vw;
                height: 6vw;
                box-sizing: border-box;
                border: .5vw solid rgb(106, 6, 6);
                background:linear-gradient(to right bottom,rgb(71, 0, 0),rgb(136, 5, 5));
                
                text-align: center;
                line-height: 5vw;
                color: rgb(255, 226, 226);
                font-size: 2vw;

            }
            .build_team_btn.active{
                border: .5vw solid rgb(198, 5, 5);
                background:linear-gradient(to right bottom,rgb(124, 0, 0),rgb(177, 3, 3));
            }
        }
        .team_box:nth-of-type(1){
            animation-delay: -.2s;
        }
        .team_box:nth-of-type(2){
            animation-delay: -.15s;
        }
        .team_box:nth-of-type(3){
            animation-delay: -.1s;
        }
        .team_box:nth-of-type(4){
            animation-delay: -.05s;
        }
        
        
    }

    //添加队伍按钮
    .add_team_btn,.save_team_data_btn{
        position: absolute; bottom: 10vh; left: 55vw;
        width: 30vw;
        height: 10vw;
        animation: add_team_btn .2s 1;
        transition: all .2s;
        @keyframes  add_team_btn{
           0%{
              opacity: 0;
              transform: translateY(30px);
           }
           100%{
              transform: translateY(0);
              opacity: 1;
           }
        }
        img{
            position: absolute; left: 0; top: 0;
            width: 100%;
            height: 100%;
        }
        .text{
            position: absolute; left: 0; top: 0;
            width: 30vw;
            height: 10vw;
            text-align: center;
            line-height: 10vw;
            color: white;
            font-weight: bold;
            font-size: 4vw;
        }
    }
    .add_team_btn.active,.save_team_data_btn.active{
        transform: scale(.8);
    }

    //保存队伍数据按钮
    .save_team_data_btn{
        left: 15vw;
    }

    //编辑面板
    .edit_single_team{
        position: absolute; left: 0; top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 2;
        background: rgba(0, 0, 0, 0.9);
        //编辑容器
        .edit_container{
            position: absolute; left: 50%; top : 50%;
            transform : translate(-50%,-50%);
            width: 90vw;
            height: 100vw;
            background: url('../assets/main/IMG_20220507_201042.jpg')no-repeat;
            background-size: cover;
            overflow: hidden;
            box-shadow: 0 0 10px white;
            .team_name_tape{
                position: absolute; left: -1vw; top:5vw;
                width: 40vw;
                height: 10vw;
                transition: all .3s;
                img{
                    position: absolute; left: 0; top:0;
                    width: 100%;
                    height: 100%;
                }
                .name{
                    position: absolute; left: 0; top:0;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 10vw;
                    color: white;
                    font-weight: bold;
                    font-size: 4vw;
                }
            }
            .team_name_tape.active{
                left: -40vw;
            }
            //删除队伍按钮
            .delete_team_btn{
                position: absolute; right: 2vw; top: 2vw;
                width: 10vw;
                height: 10vw;
                text-align: center;
                line-height: 10vw;
                font-size: 8vw;
                color: rgb(129, 0, 0);
                animation: delete_team_btn .4s 1;
                @keyframes delete_team_btn {
                   0%{
                      transform: scale(0);
                   }
                   100%{
                      transform: scale(1);
                   }
                }
            }
            
            
            //武将展示
            .team_exposition{
                position: absolute; left: 0; top: 20vw;
                width: 100vw;
                height: 40vw;
                transition: all .3s ease-out;
                .warrior_card_ipt{
                    position: relative;
                    float: left;
                    width: 20vw;
                    height: 30vw;
                    background: #000;
                    margin: 5vw 0 0 2vw;
                    .warrior_card_img{
                        position: absolute; left: 0; top: 0;
                        width: 100%;
                        height: 100%;
                    }
                    .warrior_card{
                        position: absolute; left: 0; top: 0;
                        margin: 0;
                        width: 20vw;
                        height: 30vw;
                        .card_img{
                            position: absolute; left: 0; top: 0;
                            width: 20vw;
                            height: 30vw;
                        }
                        .cost_img{
                            width: 5vw;
                            height: 2.2vw;
                        }
                        .camp{
                            position: absolute; left: 0.3vw; top: .3vw;
                            width: 3.7vw;
                            height: 3.7vw;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .red_list{
                            position: absolute; left: 0; top: 0;
                            width: 100%;
                            height: 3vw;
                            background:linear-gradient(to bottom,black,rgba(0, 0, 0, 0));
                            li{
                                float: left;
                                width: 2.2vw;
                                height: 2.2vw;
                                margin: .5vw 0 0 0;
                            }
                            li:nth-of-type(1){
                                margin: .5vw 0 0 8vw;
                            }
                        }
                        .warrior_sign{
                            position: absolute; left: .2vw; bottom: 4vw;
                            width: 5vw;
                            height: 5vw;
                        }
                        .name{
                            position: absolute; left: 1vw; top: 5vw;
                            width: 1.5vw;
                            height: 10vw;
                            color: rgb(255, 227, 136);
                            font-size: 1.5vw;

                        }
                        .arm{
                            position: absolute; right: .3vw; bottom: .3vw;
                            width: 4.2vw;
                            height: 4.2vw;
                            img{
                                position: absolute; left: 0; top: 0;
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .warrior_position{
                        position: absolute; bottom: -7vw; left: 0;
                        width: 100%;
                        height: 5vw;
                        background: rgb(66, 0, 0);
                        text-align: center;
                        font-size: 2vw;
                        line-height: 5vw;
                        color: white;
                    }
                    
                }
                .warrior_card_ipt:nth-of-type(1){
                    margin: 5vw 0 0 14vw;
                }
            }
            .team_exposition.active{
                position: absolute; left: 0; top: -45vw;
            }
            //战法安转
            .load_skill_part{
                position: absolute; left: 0; top: 100vw;
                width: 80vw;
                height: 60vw;
                transition: all .3s ease-out;
                .load_warrior_tape{
                    float: left;
                    width: 100%;
                    height: 20vw;

                    .warrior_head_img{
                        float: left;
                        width: 18vw;
                        height: 18vw;
                        background: rgb(82, 0, 0);
                        border: 1vw solid rgb(82, 0, 0);
                        box-sizing: border-box;
                        margin: 1vw 5vw 0 15vw;
                        img{
                            width: 100%;
                            height: 100%;
                            
                        }
                    }
                    .skills{
                        float: left;
                        width: 16vw;
                        height: 16vw;
                        margin: 2vw 0 0 2vw;
                        background:rgb(0, 0, 0);
                        border-radius: 8vw;
                    }
                }
            }
            .load_skill_part.active{
                position: absolute; left: 0; top: 20vw;
            }
            //切换按钮
            .switch_btn{
                position: absolute; left: 0; bottom: 2vw;
                width: 100%;
                height: 5vw;
                img{
                    position: absolute; left: 41vw; bottom: 5vw;
                    width: 8vw;
                    height: 5vw;
                    transition: all .3s;
                }
                .text{
                    position: absolute; left: 0; top: 0;
                    width: 100%;
                    height: 5vw;
                    text-align: center;
                    line-height: 5vw;
                    font-size: 4vw;
                    font-weight: bold;
                }
            }
            .switch_btn img.active{
                transform: rotate(180deg);
                position: absolute; left: 41vw; bottom: 5vw;
                width: 8vw;
                height: 5vw;
            }
        }
        .confirm_edit_btn{
            position: absolute; left: 37vw; bottom: 10vh;
            width: 26vw;
            height: 9vw;
            text-align: center;
            line-height: 9vw;
            color: white;
            font-size: 2vw;
            font-weight: bold;
            background: rgb(43, 43, 43);
            transition: all .15s;
            animation: confirm_edit_btn .2s 1;
        }
        @keyframes confirm_edit_btn {
           0%{
              transform: scale(.6);
           }
           100%{
              transform: scale(1);
           }
        }
        .confirm_edit_btn.active{
            transform: scale(.8);
            background: rgb(154, 154, 154);
        }
    }
    .select_warrior_container{
        position: absolute;left: 0; top: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        .select_warrior_container_mask{
            position: absolute;left: 0; top: 0;
            display: none;
            width: 100%;
            height: 100%;
            z-index: 2;
            background: rgba(0, 0, 0, .5);
            transition: all .1s;
        }
        .select_warrior_container_mask.active{
            display: block;
        }
        .warrior_pool{
            position: absolute; left: 0; bottom: -50vh;
            width: 100%;
            height: 50vh;
            background: white;
            z-index: 2;
            overflow-y: scroll;
            overflow-x: hidden;
            //transition: all .2s;
            //武将头像表
            .warrior_head{
                float: left;
                width: 15vw;
                height: 15vw;
                box-sizing: border-box;
                background: rgb(69, 0, 0);
                border: .5vw solid rgb(69, 0, 0);
                border-radius: 2vw;
                margin: 1.1vw 0 0 1.3vw;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 2.1vw;
                }
                .camp{
                    position: absolute; left: 0; top: 0;
                    width: 4vw;
                    height: 4vw;
                    border-radius: 2vw 0 2vw 0;
                    background: rgba(0, 0, 0, 0.797);
                    img{
                        position: absolute;left: 0;bottom: 0;
                        width: 100%;
                        height: 100%;
                    }
                }
                .red_list{
                    position: absolute; left: 4vw; top: 0;
                    width: 10vw;
                    height: 3vw;
                    background:linear-gradient(to bottom,rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0));
                    li{
                        float: left;
                        width: 2vw;
                        height: 2vw;
                        position: relative;
                        img{
                            position: absolute;left: 0;bottom: 0;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .warrior_sign{
                    position: absolute;left: 0;bottom: .1vw;
                    width: 5vw;
                    height: 5vw;
                    img{
                        position: absolute;left: 0;bottom: 0;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .warrior_pool.active{
            bottom: 0;
        }
    }
    .select_warrior_container.active{
        z-index: 2;
    }
    //卸载武将提示板
    .unload_warrior_prompt{
        position: absolute; left: 0; top : 0;
        width: 100vw;
        height: 100vh;
        z-index: 3;
        //background: white;
        background: rgba(255, 255, 255, 0.8);
        .unload_container{
            position: absolute; left: 50%; top : 50%;
            margin: -15vw 0 0 -30vw;
            width: 60vw;
            height: 30vw;
            text-align: center;
            line-height: 30vw;
            color: rgb(222, 222, 222);
            font-weight: bold;
            font-size: 5vw;
            border-radius: 0 0 5vw 5vw;
            background: rgb(21, 21, 21);
            animation: unload_container .4s ease-out 1;
            @keyframes unload_container {
               0%{
                  transform: translateY(10vw);
                  opacity: .3;
               }
               100%{
                  transform: translateY(0);
                  opacity: 1;
               }
            }
            img{
                position: absolute; left: 0; top: -52vw;
                width: 60vw;
                height: 60vw;
            }
            //确认卸载
            .confirm_unload_btn,.cancel_unload_btn{
                position: absolute; left: 5vw; bottom: -15vw;
                width: 20vw;
                height: 10vw;
                text-align: center;
                line-height: 10vw;
                font-size: 4vw;
                background: #000;
                color: white;
                transition: all .1s;
            }
            //取消
            .cancel_unload_btn{
                position: absolute; left: 35vw; bottom: -15vw;
                background: rgb(90, 0, 0);
            }
            .confirm_unload_btn.active,.cancel_unload_btn.active{
                transform: scale(.8);
            }
        }

        
    }

    //卸载队伍提示板
    .delete_team_prompt{
        position: absolute; left: 0; top : 0;
        width: 100vw;
        height: 100vh;
        z-index: 3;
        //background: white;
        background: rgba(255, 255, 255, 0.8);
        .delete_team_container{
            position: absolute; left: 50%; top : 50%;
            margin: -15vw 0 0 -30vw;
            width: 60vw;
            height: 30vw;
            text-align: center;
            line-height: 30vw;
            color: rgb(231, 231, 231);
            font-weight: bold;
            font-size: 5vw;
            border-radius: 5vw 5vw;
            background: rgb(40, 40, 40);
            animation: unload_container .4s ease-out 1;
            @keyframes unload_container {
               0%{
                  transform: translateY(10vw);
                  opacity: .3;
               }
               100%{
                  transform: translateY(0);
                  opacity: 1;
               }
            }
            img{
                position: absolute; left: 10vw; top: -34vw;
                width: 60vw;
                height: 40vw;
            }
            //确认卸载
            .confirm_btn,.cancel_btn{
                position: absolute; left: 35vw; bottom: -15vw;
                width: 20vw;
                height: 10vw;
                text-align: center;
                line-height: 10vw;
                font-size: 4vw;
                background: rgb(90, 0, 0);
                color: white;
                transition: all .1s;
            }
            //取消
            .confirm_btn{
                position: absolute; left: 5vw; bottom: -15vw;
                background: #000;
            }
            .confirm_btn.active,.cancel_btn.active{
                transform: scale(.8);
            }
        }
    }
}
</style>