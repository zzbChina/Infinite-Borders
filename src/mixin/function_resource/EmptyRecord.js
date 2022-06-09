// import Soldier from '../chess/Soldier';
// import Chariot from '../chess/Chariot';
// import Minister from '../chess/Minister';
// import Bachelor from '../chess/Bachelor';
// import Horse from '../chess/Horse';
// import King from '../chess/King';
// import Cannon from '../chess/Cannon';

class RecordItem{
    constructor(){
        this.left = 0;
        this.top = 0;
        this.exist = true;
        this.actor = '';
    }
}

class EmptyRecord{
    constructor(){
        this.red_chess = [],
        this.black_chess = [];
    }
    //初始化结构体
    InitData(){
        for(let i =0;i<32;i++){
            let item = new RecordItem();
            if(i < 16){
                this.black_chess.push(item);
            }else{
                this.red_chess.push(item);
            }
        }
    }
    
}

export default EmptyRecord