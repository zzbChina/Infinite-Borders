class Cannon{
    constructor(camp,id){
        this.id = id;
        this.camp = camp;
        this.name = '炮'
        this.left = 0;
        this.height = 0;
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
            this.top = 77.7;
        }else{
            this.top = 22.2;
        }
    }

}

export default Cannon