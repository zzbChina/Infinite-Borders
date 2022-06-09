class Minister {
    constructor(camp,id){
        this.id = id;
        this.camp = camp;
        this.name = (camp == 'red')?'相':'象';
        this.left = 0;
        this.height = 0;
        this.exist = true;
        this.actor = '';//扮演角色
    }

    //获取旗子初始位置
    InitPosition(camp,index){
        if(index){
            this.left = 66.6;
        }else {
            this.left = 22.2;
        }
        if(camp == 'red'){
            this.top = 99.9;
        }else{
            this.top = 0;
        }
    }
}

export default Minister