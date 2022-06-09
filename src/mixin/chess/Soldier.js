class Soldier{
    constructor(camp,id){
        this.id = id
        this.camp = camp;
        this.name = (camp == 'red')?'兵':'卒';
        this.left = 0;
        this.top = 0;
        this.exist = true;
        this.actor = '';//扮演角色
    }

    //获取旗子初始位置
    InitPosition(camp,index){
        if(camp == 'red'){
            this.top = 66.6;
            this.left = 0 + index * 22.2;
        }else{
            this.top = 33.3;
            this.left = 0 + index * 22.2;
        }
    }
}

export default Soldier