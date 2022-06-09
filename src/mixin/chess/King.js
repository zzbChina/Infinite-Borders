class King{
    constructor(camp,id){
        this.id = id;
        this.camp = camp;
        this.name = (camp == 'red')?'帅':'将';
        this.left = 44.4;
        this.top = 0;
        this.exist = true;
        this.actor = '';
        
    }

    //获取旗子初始位置
    InitPosition(camp){
        if(camp == 'red'){
            this.top = 99.9;
        }else{
            this.top = 0;
        }
    }
}

export default King