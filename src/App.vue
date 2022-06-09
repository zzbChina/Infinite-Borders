<template>
    <div id="app">
    
    <Main/>
    

    <!-- <transition name='click_a'>
    <div class="click_animation" ref="clickImg" v-show="isClick"></div>
    </transition> -->
        <!-- 状态提示 -->
        <transition name="bottom_to_top">
        <div class="message_alert" v-show="alert.isShow">
          {{alert.msg}}
        </div>
        </transition>
    </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  },
  data(){
    return{
        alert:{
           isShow : false,
           msg : '删除成功'
        },
        success:{
          isShow : false,
          msg : ''
        },
        isClick : false,
    }
  },
  methods: {
    alertPanel(info){
        this.alert.msg = info
        this.alert.isShow = true
        setTimeout(()=>{
          this.alert.isShow = false
        },1200)
        console.log(2);
    },
    successPanel(info){
      this.success.msg = info
      this.success.isShow = true
      setTimeout(()=>{
        this.success.isShow = false
      },1200)
    },
    //点击动画
    // clickAnimation(e){
    //   if(!this.isClick){
    //     this.isClick = true
    //     let h = e.clientX
    //     let w = e.clientY
    //     this.$refs.clickImg.style.left = (h-25) + 'px'
    //     this.$refs.clickImg.style.top = (w-25) + 'px'
    //     setTimeout(()=>{
    //       this.isClick = false
    //     },150)
    //   }
      
    // }
  },
  
  mounted() {
     //提示框的事件总线
     this.$bus.$on('alert',this.alertPanel)
     this.$bus.$on('success',this.successPanel)
  },
}
</script>

<style lang='less'>
#app {
  position: absolute; left: 0; top: 0;
  width: 100vw;
  height: 100vh;
  user-select: none;
  overflow: hidden;
  .click_animation{
    position: fixed;top: 0; left: 0;
    width: 46px;
    height: 46px;
    background:linear-gradient(to bottom right,rgba(255, 28, 28, 0.486),rgba(255, 220, 220, 0)); 
    border-radius: 50%;
    z-index: 10;
    animation: click_a .15s ease-out 1;
    // transition: all .15s;
  }
  
  .success{
    position: absolute; top: 0; left: 50%;
      // margin: 0 0 0 -50%;
      transform: translateX(-50%);
      text-align: center;
      padding: 0 5vw;
      height: 5vw;
      line-height: 5vw;
      color: rgb(255, 255, 255);
      font-size: 1vw;
      font-weight: bold;
      z-index: 10;
      background: linear-gradient(to bottom,rgb(0, 255, 0),rgba(255, 0, 0, 0));
      transition: all .2s ease-out;
  }
  .message_alert{
    position:absolute; left: 30vw; bottom: 5vh;
    width: 40vw;
    height: 10vw;
    line-height: 10vw;
    background: rgba(93, 93, 93, 0.6);
    text-align: center;
    color: white;
    font-size: 3vw;
    border-radius: 3vw;
    z-index: 10;
    transition: all .3s;
  }
}
</style>
