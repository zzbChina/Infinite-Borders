

let functions = {
    methods:{  
        //logo的动画函数
        LogoAndBtnAction(){
            this.$refs.set_up.classList.add('active');
            this.$refs.app_head.classList.add("active");
            this.$refs.logo.classList.add('active');
            this.$refs.bg_img.classList.add('active');
            this.$refs.my_warrior.classList.add('active');
            this.$refs.chinese_chess.classList.add('leave');
            setTimeout(()=>{
                this.$refs.my_skill.classList.add('active');
            },50);
            setTimeout(()=>{
                this.$refs.my_team.classList.add('active');
            },100);
        },
        //恢复首页动画
        BackLogoAndBtnAction(){
            this.$refs.app_head.classList.remove("active");
            this.$refs.logo.classList.remove('active');
            this.$refs.my_warrior.classList.remove('active');
            this.$refs.bg_img.classList.remove('active');
            this.$refs.set_up.classList.remove('active');
            this.$refs.chinese_chess.classList.remove('leave');
            this.$refs.warrior_container.classList.remove('active');
            setTimeout(()=>{
                this.$refs.my_skill.classList.remove('active');
            },50);
            setTimeout(()=>{
                this.$refs.my_team.classList.remove('active');
            },100);
        },
        //选择这个武将
        SelectThisWarrior(id){
            this.status.isShowWarriors = true;
            this.status.isShowBlackMask = true;
            this.select_warrior = this.all_warriors[id];

        },

        //关闭黑色遮罩
        CloseBlackMask(){
            this.status.isShowWarriors = !this.status.isShowWarriors;
            this.status.isShowBlackMask = false;
        },
        
        
        //手指按住事件
        TouchStartAction(value,id){
            if(value == 'undo_lock'){
                //解锁按钮
                this.$refs.undo_lock_btn.classList.add('active');
            }else if(value == 'lock_btn'){
                //上锁按钮
                this.$refs.lock_btn.classList.add('active');
            }else if(value == 'up_btn'){
                //觉醒或者深造等
                this.$refs.up_btn[id].classList.add('active');
            }else if(value == 'setup'){
                this.$refs.set_up.classList.add('touch');
            }else if(value == 'create_new_role'){
                this.$refs.setup_btn.classList.add('touch');
            }
            
        },
        //觉醒，深造，兵种进阶这个武将
        UpThisWarrior(index){
            if(index == 0){
                //表示觉醒
                this.select_warrior.isUp = !this.select_warrior.isUp;
            }else if(index == 1){
                this.select_warrior.isUpWork = !this.select_warrior.isUpWork;
            }else{
                this.select_warrior.isUpArms = !this.select_warrior.isUpArms;
            }
            for(let i = 0;i < 3 ;i ++){
                this.$refs.up_btn[i].classList.remove('active');
            }
            //修改脏位
            this.warrior_dirty = true;
        },
        //调整武将红度
        ChangeStar(value){
            if(value){
                if(this.select_warrior.red < 5){
                    this.select_warrior.red++;
                }
            }else{
                if(this.select_warrior.red > 0){
                    this.select_warrior.red--;
                }
            }
            //修改脏位
            this.warrior_dirty = true;
        },

        //打开设置面板
        OpenSetUp(){
            this.$refs.set_up.classList.remove('touch');
            this.LogoAndBtnAction();
            this.status.current_part = 'setup';
            this.$router.push('/my_setup');
        },
        //筛选物件的阵营
        FilterWarriorCamp(index){
            //阵容筛选按钮
            for(let i =0 ;i<6;i++){
                this.$refs.camp_select_btn[i].classList.remove('active');
            }
            this.$refs.camp_select_btn[index].classList.add('active');
            if(index == 0){
                this.status.filterCamp = '';
            }else if(index == 1){
                this.status.filterCamp = '群';
            }else if(index == 2){
                this.status.filterCamp = '魏';
            }else if(index == 3){
                this.status.filterCamp = '蜀';
            }else if(index == 4){
                this.status.filterCamp = '吴';
            }else if(index == 5){
                this.status.filterCamp = '汉';
            }
            
        },


        
    }
}

export default functions