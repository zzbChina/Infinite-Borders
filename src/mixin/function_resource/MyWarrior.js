class MyWarrior{
    //构造基本属性
    constructor(data){
        this.id = data.id;
        this.red = data.red;
        this.isUp = data.isUp;
        this.isUpWork = data.isUpWork;
        this.isUpArms =  data.isUpArms;
        this.own = true;
    }
    //同步状态
    getSomeValue(data){
        this.red = data.red;
        this.isUp = data.isUp;
        this.isUpWork = data.isUpWork;
        this.isUpArms =  data.isUpArms;
    }

    //增加红星
    addRed(){
        this.red++;
    }
    //减少红星
    subRed(){
        this.red--;
    }
    //觉醒
    isUpSign(status){
        if(status){
            this.isUp = true;
        }else{
            this.isUp = false;
        }
    }
    //内政觉醒
    isUpWorkSign(status){
        if(status){
            this.isUpWork = true;
        }else{
            this.isUpWork = false;
        }
    }
    //进阶兵种
    isUpArmsSign(status){
        if(status){
            this.isUpArms = true;
        }else{
            this.isUpArms = false;
        }
    }
}


export default MyWarrior