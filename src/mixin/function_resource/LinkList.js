class Node{
    constructor(data){
        this.data = data;//数据域,可以保存武将的id值
        this.pre = null;//上一个节点指针域
        this.next = null;//下一个结点指针域
    }

}

//单链表
class  LinkList{
    constructor() {
        this.size = 0  //记录单链表的长度或节点个数
        this.head = new Node('head')  //记录链表的头指针：主要作用记录链表的起始地址
        this.rear = '' // 指向链表尾部
        this.currentNode = ''  //用来记录当前节点
    }
    //获取链表的长度
    GetLength(){
        return this.size;
    }
    //插入元素
    InsertNode(data){
        let ele = new Node(data);//获得一个新的结点
        if(this.size == 0){
            this.rear = ele;//直接让尾结点等于这个ele
            this.rear.pre = this.head;
            this.head.next = ele;
        }else{
            this.rear.next = ele;
            ele.pre = this.rear;
            this.rear = ele;
        }
        this.size ++;
    }

    //遍历整个单链表
    OrderLinkList(){
        let node = this.head;
        while(node.next != null){
            node = node.next;
            console.log(node);
        }
    }
}


export default LinkList

