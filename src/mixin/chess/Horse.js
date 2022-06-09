class Horse{
    constructor(camp,id){
        this.id = id;
        this.camp = camp;
        this.name = '馬';
        this.left = 0;
        this.top = 0;
        this.exist = true;
        this.actor = '';//扮演角色
    }

    //获取旗子初始位置
    InitPosition(camp,index){
        if(index){
            this.left = 77.7;
        }else {
            this.left = 11.1;
        }
        if(camp == 'red'){
            this.top = 99.9;
        }else{
            this.top = 0;
        }
    }

}

export default Horse