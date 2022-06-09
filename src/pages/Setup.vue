<template>
  <div class="setup_panel" ref="setup_panel">
      <div class="title"> 数据清理</div>
      <div class="clear_warrior_data_btn" ref="clear_warrior_data_btn" @touchstart='BtnAnimation(0,true)' @touchend='ClearData(0,"warrior")'>清除武将数据</div>
      <div class="clear_team_data_btn" ref="clear_team_data_btn">清除队伍数据</div>
      <div class="clear_skill_data_btn" ref="clear_skill_data_btn" @touchstart='BtnAnimation(2,true)' @touchend='ClearData(2,"skill")'>清除战法数据</div>
  </div>
</template>

<script>
export default {
    name:'Setup',
    methods:{
        //按钮动画
        BtnAnimation(item,status){
            if(status){
                if(item == 0){
                    this.$refs.clear_warrior_data_btn.classList.add('active');
                }else if(item == 1){
                    this.$refs.clear_team_data_btn.classList.add('active');
                }else{
                    this.$refs.clear_skill_data_btn.classList.add('active');
                }
            }else{
                if(item == 0){
                    this.$refs.clear_warrior_data_btn.classList.remove('active');
                }else if(item == 1){
                    this.$refs.clear_team_data_btn.classList.remove('active');
                }else{
                    this.$refs.clear_skill_data_btn.classList.remove('active');
                }
            }
        },
        //清除武将数据
        ClearData(item,type){
            if(type == 'warrior'){
                //清理武将数据
                if(localStorage.getItem('stzb_my_warriors')){
                    //存在数据,则删除
                    //console.log(localStorage.removeItem);
                    localStorage.removeItem('stzb_my_warriors');
                    //同时更新武将表状态
                    this.$bus.$emit('ClearWarriorList');
                    //状态反馈
                    this.$bus.$emit('alert','武将数据已清除');
                }else{
                    //状态反馈
                    this.$bus.$emit('alert','没有数据');
                }
            }else if(type == 'skill'){
                if(localStorage.getItem('stzb_my_skill')){
                    localStorage.removeItem('stzb_my_skill');
                    //状态反馈
                    this.$bus.$emit('alert','战法数据已清除');
                }else{
                    //状态反馈
                    this.$bus.$emit('alert','没有数据');
                }
            }
            
            this.BtnAnimation(item,false);
            
        }
    },
    mounted(){
        //this.$refs.setup_panel.classList.add('active');
    },
    beforeDestroy(){
        //this.$refs.setup_panel.classList.remove('active');
    }
}
</script>

<style lang='less'>
.setup_panel{
    position: absolute; left: 50%; top : 50%;
    margin: -30vh 0 0 -40vw;
    width: 80vw;
    height: 60vh;
    background: rgba(255, 255, 255, 0.374);
    box-shadow: 3px 3px 7px rgb(97, 97, 97),inset 2px 2px white;
    border-radius: 5vw;
    transition: all .3s;
    overflow-y: scroll;
    overflow-x: hidden;
    animation:setup_panel .4s ease-out 1;
    @keyframes setup_panel {
       0%{
          transform: rotate(70deg);
          margin: -30vh 0 0 40vw;
          opacity: 0;
       }
       100%{
          transform: rotate(0);
          margin: -30vh 0 0 -40vw;
          opacity: 1;
       }
    }
    .title{
        width: 100%;
        height: 15vw;
        line-height: 20vw;
        text-align: center;
        font-size: 5vw;
        font-weight: bold;
        color: rgb(80, 0, 0);
    }
    .clear_warrior_data_btn,.clear_team_data_btn,.clear_skill_data_btn{
        width: 60vw;
        height: 10vw;
        margin: 5vw 0 0 10vw;
        background: rgb(45, 45, 45);
        border-radius: 3vw;
        text-align: center;
        font-size: 3vw;
        line-height: 10vw;
        color: white;
        transition: all .15s;
    }
    // .clear_team_data_btn{
    //     background: rgb(0, 28, 98);
    // }
    // .clear_skill_data_btn{
    //     background: rgb(0, 101, 81);
    // }
    .clear_warrior_data_btn.active,.clear_team_data_btn.active,.clear_skill_data_btn.active{
        opacity: .8;
        transform: scale(.9);
    }
}
.setup_panel.active{
    transform: rotate(90deg);
}
</style>