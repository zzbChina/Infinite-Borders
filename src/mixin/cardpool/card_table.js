let card_table = {
    data(){
        return{
            //getLevel = x
            //getLevel = 1 ;getLevel.length= a
            //getLevel = 2 ;getLevel.length= b
            //getLevel = 3 ;getLevel.length= c
            //武将获取概率= if(x==1){1/6 * 1/a}
            //7卡模式
            // 2 3 2分配策略，每张优秀武将的概率为 8.3% |每张普通武将的概率为11% | 每张简单武将的概率为25%（线性分配）
            // 2 2 3分配策略，每张优秀武将的概率为 8.3% |每张普通武将的概率为16% | 每张简单武将的概率为16%（突出分配）
            // 1 3 3分配策略，每张优秀武将的概率为 16% |每张普通武将的概率为11% | 每张简单武将的概率为16%（均衡分配）
            // 1 2 4分配策略，每张优秀武将的概率为 16% |每张普通武将的概率为16% | 每张简单武将的概率为12.5%（均衡分配）
            //8卡模式
            // 2 3 3分配策略，每张优秀武将的概率为 8.3% |每张普通武将的概率为11% | 每张简单武将的概率为16%（线性分配）
            // 2 2 4分配策略，每张优秀武将的概率为 8.3% |每张普通武将的概率为16% | 每张简单武将的概率为12.5%（线性分配）
            // 2 1 5分配策略，每张优秀武将的概率为 8.3% |每张普通武将的概率为33% | 每张简单武将的概率为10%（极端分配）
            card_table:[
                //第一赛季
                {
                    season : '第一赛季',
                    current : true,
                    pages:[
                        //名将
                        {
                            name : '名将',
                            type : 'all',
                            img : require('../../assets/look/Screenshot_20220114_123408_com.netease.stzb.netea.jpg') ,
                            except : [
                                {
                                    type : 's3',
                                },
                                {
                                    type  : 's2'
                                },
                                {
                                    type  : 'hy'
                                },
                                {
                                    type : 'xp'
                                },
                                {
                                    type  : 'ex'
                                },
                                {
                                    type : 'sp'
                                }
                            ]
                        },
                        //黄天当立
                        {
                            name : '黄天当立',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155329_com.netease.stzb.netea.jpg') ,
                            content:[
                                {
                                    name:'张宁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '灵帝',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '卢植',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '何太后',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '董卓',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '张角',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '潘凤',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 1
                                }
                            ]
                        },
                        //汉室衰微
                        {
                            name : '汉室衰微',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155302_com.netease.stzb.netea.jpg'), 
                            content : [
                                {
                                    name : '许褚',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '貂蝉',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '法正',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '袁绍',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '贾诩',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '董卓',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '大乔&小乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 1
                                },
                            ]
                        },
                        //天下大乱
                        {
                            name : '天下大乱',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154040_com.netease.stzb.netea.jpg'), 
                            content:[
                                {
                                    name : '甄洛',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                                {
                                    name : '郝昭',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2,
                                },
                                {
                                    name : '灵帝',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2,
                                },
                                {
                                    name : '蔡文姬',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3,
                                },
                                {
                                    name : '孙坚',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3,
                                },
                                {
                                    name : '吕姬',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1,
                                },
                                {
                                    name : '张辽',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '赵云',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2,
                                },
                            ]
                        },
                        //厉兵秣马
                        {
                            name : '厉兵秣马',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154233_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '司马懿',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '马超',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '荀攸',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '甘宁',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '马云禄',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张郃',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '周姬',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //群雄割据
                        {
                            name : '群雄割据',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154110_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '关羽',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '曹丕',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '吕蒙',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '关银屏',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '孙尚香',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //乱世英雄
                        {
                            name : '乱世英雄',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155321_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '貂蝉',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '姜维',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '华佗',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '卞夫人',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张春华',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '夏侯渊',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '黄月英',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                            ]
                        },
                        //南蛮入侵
                        {
                            name : '南蛮入侵',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154152_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '孟获',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '司马懿',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '祝融夫人',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孙鲁班',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '诸葛亮',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '赵云',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                            ]
                        },
                    ]
                },
                //第二赛季
                {
                    season : '第二赛季',
                    pages:[
                        //名将
                        {
                            name : '名将',
                            type : 'all',
                            img : require('../../assets/look/Screenshot_20220114_124912_com.netease.stzb.netea.jpg') ,
                            except : [
                                {
                                    type : 's3',
                                },
                                {
                                    type  : 'hy'
                                },
                                {
                                    type : 'xp'
                                },
                                {
                                    type  : 'ex'
                                },
                                {
                                    type : 'sp'
                                }
                            ]
                        },
                        //赛季名将
                        {
                            name : '赛季名将',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124927_com.netease.stzb.netea.jpg') ,
                            content:[
                                {
                                    name:'吕布',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '董卓',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '吕布',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '陆逊',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '庞统',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '郭嘉',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '周瑜',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '董卓',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '诸葛亮',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '荀彧',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 3
                                }
                            ]
                        },
                        //黄天当立
                        {
                            name : '黄天当立',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155329_com.netease.stzb.netea.jpg') ,
                            content:[
                                {
                                    name:'张宁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '灵帝',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '卢植',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '何太后',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '董卓',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '张角',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '潘凤',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 1
                                }
                            ]
                        },
                        //汉室衰微
                        {
                            name : '汉室衰微',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155302_com.netease.stzb.netea.jpg'), 
                            content : [
                                {
                                    name : '许褚',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '貂蝉',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '法正',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '袁绍',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '贾诩',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '董卓',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '大乔&小乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 1
                                },
                            ]
                        },
                        //天下大乱
                        {
                            name : '天下大乱',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220125_111804_com.netease.stzb.netea.jpg'), 
                            content:[
                                {
                                    name : '甄洛',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 2,
                                },
                                {
                                    name : '郝昭',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3,
                                },
                                {
                                    name : '蔡文姬',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 2,
                                },
                                {
                                    name : '孙坚',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3,
                                },
                                {
                                    name : '吕姬',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3,
                                },
                                {
                                    name : '张辽',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '赵云',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3,
                                },
                                {
                                    name : '董卓',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 1,
                                },
                            ]
                        },
                        //厉兵秣马
                        {
                            name : '厉兵秣马',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220125_002954_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '司马懿',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '郭嘉',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '马超',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '荀攸',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '甘宁',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '马云禄',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '周姬',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //群雄割据
                        {
                            name : '群雄割据',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220125_111656_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '关羽',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '曹丕',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '吕蒙',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '关银屏',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '孙尚香',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '陆逊',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                            ]
                        },
                        //乱世英雄
                        {
                            name : '乱世英雄',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/3CA0F0F271E962FE25A56AE277BBFD95.jpg'),
                            content : [
                                {
                                    name : '貂蝉',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '姜维',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '华佗',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '卞夫人',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '诸葛恪',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '吕布',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '黄月英',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //南蛮入侵
                        {
                            name : '南蛮入侵',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220125_111818_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '孟获',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '沙摩柯',
                                    camp : '蜀',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '祝融夫人',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孙鲁班',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '诸葛亮',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '兀突骨',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '庞统',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                            ]
                        },
                    ]
                },
                //第三赛季
                {
                    season : '第三赛季',
                    pages:[
                        //赛季名将
                        {
                            name : '赛季名将',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_125003_com.netease.stzb.netea.jpg') ,
                            content:[
                                {
                                    name:'诸葛亮',
                                    camp : '蜀',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '曹纯',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '马云禄',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '孟获',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '貂蝉',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '步皇后',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '颜良&文丑',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '曹丕',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '孙尚香',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                }
                            ]
                        },
                        //厉兵秣马
                        {
                            name : '厉兵秣马',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/syimg.3dmgame_edit_708848227934542.jpg'),
                            content : [
                                {
                                    name : '司马懿',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '曹纯',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '马超',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '荀攸',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '甘宁',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '马云禄',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '周姬',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //群雄割据
                        {
                            name : '群雄割据',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220125_111749_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '关羽',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '曹丕',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '吕蒙',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '关银屏',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '孙尚香',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '颜良&文丑',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                            ]
                        },
                        //乱世英雄
                        {
                            name : '乱世英雄',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/buhuanghou.jpg'),
                            content : [
                                {
                                    name : '貂蝉',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '姜维',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '华佗',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '卞夫人',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '诸葛恪',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '步皇后',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '黄月英',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //南蛮入侵
                        {
                            name : '南蛮入侵',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220125_114257_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '孟获',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '沙摩柯',
                                    camp : '蜀',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '祝融夫人',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孙鲁班',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '诸葛亮',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '兀突骨',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '诸葛亮',
                                    camp : '蜀',
                                    arms : '弓',
                                    getLevel : 1
                                },
                            ]
                        },
                    ]
                },
                //备战区
                {
                    season : '备战区',
                    pages : [
                        //名将
                        {
                            name : '名将',
                            type : 'all',
                            img : require('../../assets/look/Screenshot_20220114_124654_com.netease.stzb.netea.jpg') ,
                            except : [
                                {
                                    type : 's3',
                                },
                                {
                                    type  : 's2'
                                },
                                {
                                    type  : 'hy'
                                }
                            ]
                        },
                        //赛季名将
                        {
                            name : '赛季名将',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124806_com.netease.stzb.netea.jpg') ,
                            content : [
                                {
                                    name:'陆抗',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name:'马岱',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name:'大乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name:'关羽',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name:'皇甫嵩',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name:'严颜',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name:'张机',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name:'陈宫',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name:'刘表',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name:'科比能',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name:'凌统',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name:'孙策',
                                    camp : '吴',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name:'于吉',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name:'夏侯惇',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name:'庞德',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name:'徐晃',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name:'华雄',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name:'夏侯霸',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name:'张昭',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name:'典韦',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name:'张郃',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name:'董白',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name:'李儒',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name:'黄盖',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name:'张绣',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name:'曹仁',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name:'木鹿大王',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name:'关兴&张苞',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name:'高顺',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name:'蒋欣',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                            ]
                        }
                    ]
                },
                //群雄逐鹿
                {
                    season : '群雄逐鹿',
                    pages:[
                        //火起洛阳
                        {
                            name : '火起洛阳',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155254_com.netease.stzb.netea.jpg') ,
                            content:[
                                {
                                    name:'陈宫',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '皇甫嵩',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '王朗',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '朱儁',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '张绣',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '张梁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '潘凤',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 1
                                }
                            ]
                        },
                        //太师败亡
                        {
                            name : '太师败亡',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155302_com.netease.stzb.netea.jpg'), 
                            content : [
                                {
                                    name : '张宁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '貂蝉',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '严颜',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '蔡文姬',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '华雄',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '李儒',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '张宝',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '刘表',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 1
                                },
                            ]
                        },
                        //魏武之将
                        {
                            name : '魏武之将',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154326_com.netease.stzb.netea.jpg'), 
                            content:[
                                {
                                    name : '卞夫人',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '夏侯惇',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2,
                                },
                                {
                                    name : '张春华',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 2,
                                },
                                {
                                    name : '曹丕',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                                {
                                    name : '张辽',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '邓艾',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3,
                                },
                                
                            ]
                        },
                        //蜀川人杰
                        {
                            name : '蜀川人杰',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154417_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '姜维',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '夏侯霸',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '徐庶',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '关羽',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '诸葛亮',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '赵云',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '关兴&张苞',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                            ]
                        },
                        //江东虎臣
                        {
                            name : '江东虎臣',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124951_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '大乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '孙策',
                                    camp : '吴',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '吕蒙',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '甘宁',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '黄盖',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '大乔&小乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '张昭',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                            ]
                        },
                        //逐鹿中原
                        {
                            name : '逐鹿中原',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124826_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '司马懿',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '荀攸',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '华佗',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '马超',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '庞德',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '于吉',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '甄洛',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //贼寇为患
                        {
                            name : '贼寇为患',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124901_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '木鹿大王',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '沙摩柯',
                                    camp : '蜀',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '祝融夫人',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孙鲁班',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '法正',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '科比能',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '张郃',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '吕姬',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                            ]
                        },
                        //逆取顺守
                        {
                            name : '逆取顺守',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124645_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '关银屏',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '凌统',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '张机',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '诸葛恪',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '典韦',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '徐晃',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '许褚',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                            ]
                        },
                    ]
                },
                //英雄纵横
                {
                    season : '英雄纵横',
                    pages:[
                        //黄天当立
                        {
                            name : '黄天当立',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124814_com.netease.stzb.netea.jpg') ,
                            content:[
                                {
                                    name:'张宁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '皇甫嵩',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '张梁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '高顺',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张绣',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张角',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '潘凤',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3
                                }
                            ]
                        },
                        //汉室衰微
                        {
                            name : '汉室衰微',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155234_com.netease.stzb.netea.jpg'), 
                            content : [
                                {
                                    name : '法正',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '刘表',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '严颜',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '大乔&小乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '貂蝉',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '李儒',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '董卓',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '张宝',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //天下大乱
                        {
                            name : '天下大乱',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154413_com.netease.stzb.netea.jpg'), 
                            content:[
                                {
                                    name : '张辽',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '徐庶',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '王朗',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 2,
                                },
                                {
                                    name : '吕姬',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2,
                                },
                                {
                                    name : '于吉',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 2,
                                },
                                {
                                    name : '朱儁',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                                {
                                    name : '蔡文姬',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3,
                                },
                                {
                                    name : '甄洛',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                            ]
                        },
                        //厉兵秣马
                        {
                            name : '厉兵秣马',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154221_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '司马懿',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '马超',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '庞德',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '荀攸',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '孙策',
                                    camp : '吴',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '甘宁',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '周姬',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //群雄割据
                        {
                            name : '群雄割据',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_153922_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '关羽',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '吕蒙',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '大乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '华雄',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '蒋钦',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '黄盖',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //诸国并起
                        {
                            name : '诸国并起',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154322_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '张机',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '关银屏',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '徐晃',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '关兴&张苞',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '凌统',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '诸葛恪',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '许褚',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '典韦',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //乱世英雄
                        {
                            name : '乱世英雄',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155006_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '貂蝉',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '陈宫',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '夏侯惇',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '夏侯霸',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '孙鲁班',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '卞夫人',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '姜维',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '华佗',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //披荆斩棘
                        {
                            name : '披荆斩棘',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155354_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '曹植',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '祝融夫人',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '木鹿大王',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张昭',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '科比能',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孟获',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '张郃',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                            ]
                        },
                    ]
                },
                //群雄讨董
                {
                    season : '群雄讨董',
                    pages:[
                        //黄天当立
                        {
                            name : '黄天当立',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124909_com.netease.stzb.netea.jpg') ,
                            content:[
                                {
                                    name:'张宁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '皇甫嵩',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '张梁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '张绣',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张角',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '潘凤',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '卢植',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3
                                },
                            ]
                        },
                        //汉室衰微
                        {
                            name : '汉室衰微',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155234_com.netease.stzb.netea.jpg'), 
                            content : [
                                {
                                    name : '法正',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '刘表',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '严颜',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '大乔&小乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '貂蝉',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '李儒',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '董卓',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '张宝',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //天下大乱
                        {
                            name : '天下大乱',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154413_com.netease.stzb.netea.jpg'), 
                            content:[
                                {
                                    name : '张辽',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '徐庶',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '王朗',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 2,
                                },
                                {
                                    name : '吕姬',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2,
                                },
                                {
                                    name : '于吉',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 2,
                                },
                                {
                                    name : '朱儁',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                                {
                                    name : '蔡文姬',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3,
                                },
                                {
                                    name : '甄洛',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                            ]
                        },
                        //厉兵秣马
                        {
                            name : '厉兵秣马',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154221_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '司马懿',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '马超',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '庞德',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '荀攸',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '孙策',
                                    camp : '吴',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '甘宁',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '周姬',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //群雄割据
                        {
                            name : '群雄割据',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124850_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '关羽',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '吕蒙',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '大乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '华雄',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '曹丕',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '黄盖',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //诸国并起
                        {
                            name : '诸国并起',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154322_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '张机',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '关银屏',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '徐晃',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '关兴&张苞',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '凌统',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '诸葛恪',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '许褚',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '典韦',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //乱世英雄
                        {
                            name : '乱世英雄',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155006_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '貂蝉',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '陈宫',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '夏侯惇',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '夏侯霸',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '孙鲁班',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '卞夫人',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '姜维',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '华佗',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //贼寇为祸
                        {
                            name : '贼寇为祸',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154053_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '沙摩柯',
                                    camp : '蜀',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '祝融夫人',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '木鹿大王',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张昭',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '科比能',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孟获',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '张郃',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                            ]
                        },
                        //逐鹿中原
                        {
                            name : '逐鹿中原',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155221_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '马岱',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '陆抗',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '曹仁',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '郭皇后',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '马云禄',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孙尚香',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '董白',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                    ]
                },
                //决胜中原
                {
                    season : '决胜中原',
                    pages:[
                        //作战一
                        {
                            name : '作战一',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154221_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '司马懿',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '马超',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '庞德',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '荀攸',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '孙策',
                                    camp : '吴',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '甘宁',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '周姬',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //作战二
                        {
                            name : '作战二',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124850_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '关羽',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '吕蒙',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '大乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '华雄',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '曹丕',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '黄盖',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //作战三
                        {
                            name : '作战三',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154405_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '貂蝉',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '陈宫',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '夏侯惇',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '马岱',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孙鲁班',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '卞夫人',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '姜维',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '华佗',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //始战一
                        {
                            name : '始战一',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155317_com.netease.stzb.netea.jpg') ,
                            content:[
                                {
                                    name:'张宁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '皇甫嵩',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '张梁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '张绣',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张角',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '潘凤',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '卢植',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '董白',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 2
                                },
                            ]
                        },
                        //始战二
                        {
                            name : '始战二',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154249_com.netease.stzb.netea.jpg'), 
                            content : [
                                {
                                    name : '法正',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '曹仁',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '严颜',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '大乔&小乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '貂蝉',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '李儒',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '董卓',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '张宝',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //军争一
                        {
                            name : '军争一',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154229_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '沙摩柯',
                                    camp : '蜀',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '祝融夫人',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '陆抗',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '木鹿大王',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张昭',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '科比能',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孟获',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '张郃',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                            ]
                        },
                        //军争二
                        {
                            name : '军争二',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154322_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '张机',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '关银屏',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '徐晃',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '关兴&张苞',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '凌统',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '诸葛恪',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '许褚',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '典韦',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //决胜一
                        {
                            name : '决胜一',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155221_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '马岱',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '陆抗',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '曹仁',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '郭皇后',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '马云禄',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孙尚香',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '董白',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                    ]
                },
                //兴平烽烟
                {
                    season : '兴平烽烟',
                    pages:[
                        //兖州兵变
                        {
                            name : '兖州兵变',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154208_com.netease.stzb.netea.jpg') ,
                            content:[
                                {
                                    name:'高顺',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '皇甫嵩',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '张绣',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张梁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '张宁',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '张角',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '潘凤',
                                    camp : '汉',
                                    arms : '骑',
                                    getLevel : 3
                                }
                            ]
                        },
                        //烽烟四起
                        {
                            name : '烽烟四起',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154401_com.netease.stzb.netea.jpg'), 
                            content : [
                                {
                                    name : '严颜',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '法正',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '刘表',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '大乔&小乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '李儒',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '貂蝉',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '董卓',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '张宝',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //天下大乱
                        {
                            name : '天下大乱',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_132836_com.netease.stzb.netea.jpg'), 
                            content:[
                                {
                                    name : '张辽',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '徐庶',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '王朗',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 2,
                                },
                                {
                                    name : '吕姬',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 2,
                                },
                                {
                                    name : '于吉',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                                {
                                    name : '朱儁',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                                {
                                    name : '袁绍',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 2,
                                },
                                {
                                    name : '甄洛',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                            ]
                        },
                        //厉兵秣马
                        {
                            name : '厉兵秣马',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154233_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '司马懿',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '马超',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '庞德',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '荀攸',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '孙策',
                                    camp : '吴',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '甘宁',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '周姬',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                            ]
                        },
                        //群雄割据
                        {
                            name : '群雄割据',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_153922_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '关羽',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '吕蒙',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '大乔',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '华雄',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '蒋钦',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '黄盖',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //乱世英雄
                        {
                            name : '乱世英雄',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155006_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '貂蝉',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '陈宫',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '夏侯惇',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '夏侯霸',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '孙鲁班',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '卞夫人',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 3
                                },
                                {
                                    name : '姜维',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '华佗',
                                    camp : '汉',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //贼寇为乱
                        {
                            name : '贼寇为乱',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_155325_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '曹植',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '祝融夫人',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 1
                                },
                                {
                                    name : '木鹿大王',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '张昭',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '科比能',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '孟获',
                                    camp : '群',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '张郃',
                                    camp : '群',
                                    arms : '骑',
                                    getLevel : 3
                                },
                            ]
                        },
                        //逐鹿中原
                        {
                            name : '逐鹿中原',
                            type : 'ex',
                            img : require('../../assets/warrior_cards/Screenshot_20220122_154354_com.netease.stzb.netea.jpg'),
                            content : [
                                {
                                    name : '张机',
                                    camp : '汉',
                                    arms : '弓',
                                    getLevel : 1
                                },
                                {
                                    name : '关银屏',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 1
                                },
                                {
                                    name : '徐晃',
                                    camp : '魏',
                                    arms : '骑',
                                    getLevel : 2
                                },
                                {
                                    name : '关兴&张苞',
                                    camp : '蜀',
                                    arms : '步',
                                    getLevel : 2
                                },
                                {
                                    name : '凌统',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 2
                                },
                                {
                                    name : '诸葛恪',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3
                                },
                                {
                                    name : '许褚',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                                {
                                    name : '典韦',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 3
                                },
                            ]
                        },
                        //席卷天下
                        {
                            name : '席卷天下',
                            type : 'ex',
                            img : require('../../assets/look/Screenshot_20220114_124931_com.netease.stzb.netea.jpg'), 
                            content:[
                                {
                                    name : '马岱',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 1,
                                },
                                {
                                    name : '陆抗',
                                    camp : '吴',
                                    arms : '步',
                                    getLevel : 1,
                                },
                                {
                                    name : '曹仁',
                                    camp : '魏',
                                    arms : '步',
                                    getLevel : 2,
                                },
                                {
                                    name : '郭皇后',
                                    camp : '魏',
                                    arms : '弓',
                                    getLevel : 2,
                                },
                                {
                                    name : '马云禄',
                                    camp : '蜀',
                                    arms : '骑',
                                    getLevel : 2,
                                },
                                {
                                    name : '董白',
                                    camp : '群',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                                {
                                    name : '孙尚香',
                                    camp : '吴',
                                    arms : '弓',
                                    getLevel : 3,
                                },
                                
                            ]
                        },
                        
                    ]
                },

            ]
        }
    }
}


export default card_table