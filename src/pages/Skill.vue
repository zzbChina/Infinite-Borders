<template>
    <div class="skills_panel">
       
       <!-- 全部战法容器 -->
       <div class="skill_container">
           <!-- 指挥战法 -->
           <div class="title">
               <div style="float:left;background:green;width:1.5vw;height:100%;"></div>
               <div class="text" style="float:left;font-size:2.5vw;black:white;font-weight:bold;line-height:7vw;text-align:center;width:15vw;height:100%;">指挥战法</div>
           </div>
           <div class="command_skill_container">
               <div class="skill_box" v-for="(c,c_index) in command_skills" :key="c.index" @click="UnlockThisSkill('command',c_index)">
                   <img src="../assets/main/skill-type-2-96b0.png" alt="" class="skill_image">
                   <img src="../assets/main/skill-quality-s-4894.png" alt="" class="skill_frame" v-show="c.quality == 'S'">
                   <img src="../assets/main/skill-quality-a-8b11.png" alt="" class="skill_frame" v-show="c.quality == 'A'">
                   <img src="../assets/main/skill-quality-b-0d28.png" alt="" class="skill_frame" v-show="c.quality == 'B'">
                   <div class="name">{{c.name}}</div>
                   <!-- 未拥有的遮罩层 -->
                   <transition name="small_to_big_fade">
                   <div class="skill_mask" v-show="!c.acquired"></div>
                   </transition>
               </div>
           </div>
           <!-- 主动战法 -->
           <div class="title">
               <div style="float:left;background:darkred;width:1.5vw;height:100%;"></div>
               <div class="text" style="float:left;font-size:2.5vw;black:white;font-weight:bold;line-height:7vw;text-align:center;width:15vw;height:100%;">主动战法</div>
           </div>
           <div class="active_skill_container">
               <div class="skill_box" v-for="(c,c_index) in active_skills" :key="c.index" @click="UnlockThisSkill('active',c_index)">
                   <img src="../assets/main/skill-type-3-834a.png" alt="" class="skill_image">
                   <img src="../assets/main/skill-quality-s-4894.png" alt="" class="skill_frame" v-show="c.quality == 'S'">
                   <img src="../assets/main/skill-quality-a-8b11.png" alt="" class="skill_frame" v-show="c.quality == 'A'">
                   <img src="../assets/main/skill-quality-b-0d28.png" alt="" class="skill_frame" v-show="c.quality == 'B'">
                   <div class="name">{{c.name}}</div>
                   <!-- 未拥有的遮罩层 -->
                   <transition name="small_to_big_fade">
                   <div class="skill_mask" v-show="!c.acquired"></div>
                   </transition>
               </div>
           </div>
           <!-- 追击战法 -->
           <div class="title">
               <div style="float:left;background:rgb(107, 0, 153);width:1.5vw;height:100%;"></div>
               <div class="text" style="float:left;font-size:2.5vw;black:white;font-weight:bold;line-height:7vw;text-align:center;width:15vw;height:100%;">追击战法</div>
           </div>
           <div class="combo_skill_container">
               <div class="skill_box" v-for="(c,c_index) in combo_skills" :key="c.index" @click="UnlockThisSkill('combo',c_index)">
                   <img src="../assets/main/skill-type-4-311c.png" alt="" class="skill_image">
                   <img src="../assets/main/skill-quality-s-4894.png" alt="" class="skill_frame" v-show="c.quality == 'S'">
                   <img src="../assets/main/skill-quality-a-8b11.png" alt="" class="skill_frame" v-show="c.quality == 'A'">
                   <img src="../assets/main/skill-quality-b-0d28.png" alt="" class="skill_frame" v-show="c.quality == 'B'">
                   <div class="name">{{c.name}}</div>
                   <!-- 未拥有的遮罩层 -->
                   <transition name="small_to_big_fade">
                   <div class="skill_mask" v-show="!c.acquired"></div>
                   </transition>
               </div>
           </div>
           <!-- 被动战法 -->
           <div class="title">
               <div style="float:left;background:rgb(0, 64, 153);width:1.5vw;height:100%;"></div>
               <div class="text" style="float:left;font-size:2.5vw;black:white;font-weight:bold;line-height:7vw;text-align:center;width:15vw;height:100%;">被动战法</div>
           </div>
           <div class="passive_skill_container">
               <div class="skill_box" v-for="(c,c_index) in passive_skills" :key="c.index" @click="UnlockThisSkill('passive',c_index)">
                   <img src="../assets/main/skill-type-2-96b0.png" alt="" class="skill_image">
                   <img src="../assets/main/skill-quality-s-4894.png" alt="" class="skill_frame" v-show="c.quality == 'S'">
                   <img src="../assets/main/skill-quality-a-8b11.png" alt="" class="skill_frame" v-show="c.quality == 'A'">
                   <img src="../assets/main/skill-quality-b-0d28.png" alt="" class="skill_frame" v-show="c.quality == 'B'">
                   <div class="name">{{c.name}}</div>
                   <!-- 未拥有的遮罩层 -->
                   <transition name="small_to_big_fade">
                   <div class="skill_mask" v-show="!c.acquired"></div>
                   </transition>
               </div>
           </div>
       </div>

        <!-- 控制是否解锁技能 -->
       <div class="unlock_skill_control">
           <div class="slide_block" ref="slide_block"></div>
           <div class="view_model" @click="ViewSkill">预览模式</div>
           <div class="unlock_model" @click="UnlockSkill">解锁技能</div>
           
       </div>
    </div>
</template>

<script>
import skills from '../mixin/skill_resource/skills'
export default {
    name  :'Skill',
    mixins:[
        skills,
    ],
    data(){
        return{
            status:{
                //解锁技能
                isUnlockSkill:false,
            },
            dirty:false,//脏位
        }
    },
    methods: {
        //解锁技能
        UnlockSkill(){
            this.$refs.slide_block.classList.add('active');
            //打开解锁技能状态控制
            this.status.isUnlockSkill = true;
        },
        //预览技能
        ViewSkill(){
            this.$refs.slide_block.classList.remove('active');
            this.status.isUnlockSkill = false;
        },

        //正式解锁技能
        UnlockThisSkill(type,index){
            //前提是处于解锁技能的状态
            if(this.status.isUnlockSkill){
                if(type == 'command'){
                    this.command_skills[index].acquired = !this.command_skills[index].acquired;
                }else if(type == 'active'){
                    this.active_skills[index].acquired = !this.active_skills[index].acquired;
                }else if(type == 'combo'){
                    this.combo_skills[index].acquired = !this.combo_skills[index].acquired
                }else{
                    this.passive_skills[index].acquired = !this.passive_skills[index].acquired
                }
                //修改脏位
                if(!this.dirty){
                    this.dirty = true;
                }

            }
        },

        //加载界面时更新数据
        UpDataSkills(){
            if(localStorage.getItem('stzb_my_skill')){
                //如果有被保存的技能
                let get = JSON.parse(localStorage.getItem('stzb_my_skill'));
                if(get.length > 0){
                    //只有有数据的时候才执行
                    let index = 0;
                    for(let i = 0;i<this.command_skills.length;i++){
                        if(this.command_skills[i].id == get[index]){
                            index ++;//匹配到一个，index指针后移
                            this.command_skills[i].acquired = true;
                            if(index == get.length){
                                //表示说get数组的最后一个数据已经匹配完成，那么就可以终止运行
                                return;
                            }
                        }
                    }
                    for(let i = 0;i<this.active_skills.length;i++){
                        if(get[index]>= 7000){
                            //说明没有主动战法
                            i = this.active_skills.length-1;
                            break;
                        }
                        if(this.active_skills[i].id == get[index]){
                            index ++;//匹配到一个，index指针后移
                            this.active_skills[i].acquired = true;
                            if(index == get.length){
                                //表示说get数组的最后一个数据已经匹配完成，那么就可以终止运行
                                return;
                            }
                        }
                    }
                    for(let i = 0;i<this.passive_skills.length;i++){
                        if(get[index]>= 10000){
                            //说明没有被动战法
                            i = this.passive_skills.length-1;
                            break;
                        }
                        if(this.passive_skills[i].id == get[index]){
                            index ++;//匹配到一个，index指针后移
                            this.passive_skills[i].acquired = true;
                            if(index == get.length){
                                //表示说get数组的最后一个数据已经匹配完成，那么就可以终止运行
                                return;
                            }
                        }
                    }
                    for(let i = 0;i<this.combo_skills.length;i++){
                        if(this.combo_skills[i].id == get[index]){
                            index ++;//匹配到一个，index指针后移
                            this.combo_skills[i].acquired = true;
                            if(index == get.length){
                                //表示说get数组的最后一个数据已经匹配完成，那么就可以终止运行
                                return;
                            }
                        }
                    }
                }
                
            }
        }
      
    },
    mounted(){
        //该组件被加载时候，获取自己的解锁的技能
        this.UpDataSkills();
        
    },
    beforeDestroy() {
        //当组件被销毁时，保存数据,脏位变脏才会存储
        if(this.dirty){
            let res = [];
            for(let i = 0;i<this.command_skills.length;i++){
                if(this.command_skills[i].acquired){
                    //说明这个技能被获取
                    res.push(this.command_skills[i].id);
                }
            }
            for(let i = 0;i<this.active_skills.length;i++){
                if(this.active_skills[i].acquired){
                    //说明这个技能被获取
                    res.push(this.active_skills[i].id);
                }
            }
            for(let i = 0;i<this.passive_skills.length;i++){
                if(this.passive_skills[i].acquired){
                    //说明这个技能被获取
                    res.push(this.passive_skills[i].id);
                }
            }
            for(let i = 0;i<this.combo_skills.length;i++){
                if(this.combo_skills[i].acquired){
                    //说明这个技能被获取
                    res.push(this.combo_skills[i].id);
                }
            }
            if(res.length >= 0){
                //说明我有技能数据上传
                localStorage.setItem('stzb_my_skill',JSON.stringify(res));
            }else{
                //不然销毁这个数据
                localStorage.removeItem('stzb_my_skill');
            }
            
        }
    },
}
</script>

<style lang='less'>
.skills_panel{
    position: absolute; left: 0; top: 0;
    width: 100vw;
    height: 100vh;

    //全部战法容器
    .skill_container{
        position: absolute; left: 50%; top : 50%;
        margin: -35vh 0 0 -45vw;
        width: 90vw;
        height: 70vh;
        overflow-y: scroll;
        overflow-x: hidden;
        animation: skill_emerge .2s ease-out 1;
        @keyframes  skill_emerge{
           0%{
              opacity: 0;
              transform: translateY(5vh);
           }
           100%{
              opacity: 1;
              transform: translateY(0);
           }
        }
        //战法图像
        .skill_image,.skill_mask{
            position: absolute; top: 0; left: 1.5vw;
            width: 12vw;
            height: 12vw;
        }
        .skill_frame{
            position: absolute; top: 0; left: 0;
            width: 100%;
            height: 100%;
        }
        //遮罩层
        .skill_mask{
            text-align: right;
            line-height: 12vw;
            font-size: 2vw;
            color: rgb(122, 122, 122);
            border-radius: 6vw;
            background: rgba(0, 0, 0, 0.8);
            box-shadow: 0 0 2vw rgb(64, 64, 64);
            transition: all .2s;
        }
        //标题
        .title{
            position: relative;
            width: 100%;
            height: 7vw;
            background: rgb(207, 207, 207);
            float: left;
            margin: 5vw 0 0 0;
        }
        //战法
        .command_skill_container,.active_skill_container,.combo_skill_container,.passive_skill_container{
            width: 100%;
            .skill_box{
                position: relative;
                width: 15vw;
                height: 15vw;
                float: left;
                margin: 2.5vw 0 0 2.5vw;
                .name{
                    position: absolute; bottom: 0; left: 0;
                    width: 100%;
                    height: 4vw;
                    font-size: 2vw;
                    color: rgb(255, 255, 200);
                    text-align: center;
                    line-height: 4vw;
                }
            }
            

        }
        

    }

    .unlock_skill_control{
        width: 40vw;
        height: 8vw;
        text-align: center;
        line-height: 8vw;
        position: absolute; left: 30vw; bottom: 8vh;
        border-radius: 2vw;
        box-shadow: 0 2px 2px rgb(64, 64, 64);
        .view_model,.unlock_model{
            position: absolute;
            left: 0;top: 0;
            width: 20vw;
            height: 8vw;
            color: white;
            background: rgba(48, 48, 48, 0.366);
            font-size: 2vw;
            border-radius: 2vw 0 0 2vw;
        }
        .unlock_model{
            left: 20vw;
            border-radius: 0 2vw 2vw 0;
        }
        
        .slide_block{
            position: absolute;
            left: 0;top: 0;
            width: 20vw;
            height: 8vw;
            color: white;
            background: rgb(103, 0, 0);
            font-size: 2vw;
            border-radius: 2vw 0 0 2vw;
            transition: all .3s;
        }
        .slide_block.active{
            position: absolute;
            left: 20vw;top: 0;
            border-radius: 0 2vw 2vw 0;
        }

    }
}
</style>