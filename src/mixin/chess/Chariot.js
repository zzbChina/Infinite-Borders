class Chariot{
    constructor(camp,id){
        this.id = id;
        this.camp = camp;
        this.name = '車';
        this.top = 0;
        this.left = 0;
        this.exist = true;
        this.actor = '';//扮演角色
    }

    //获取旗子初始位置
    InitPosition(camp,index){
        if(camp == 'red'){
            this.top = 99.9;
            this.left = 0 + index * 88.8;
        }else{
            this.top = 0;
            this.left = 0 + index * 88.8;
        }
    }
}

export default Chariot