//引入路由
import VueRouter from 'vue-router'

import Skill from '../pages/Skill'
import Team from '../pages/Team'

import Setup from '../pages/Setup'

import Chess from '../pages/Chess'

export default new VueRouter({
    routes:[
        //我的战法
        {
            path : '/my_skill',
            component : Skill
        },
        //我的设置
        {
            path : '/my_setup',
            component: Setup,
        },
        //我的队伍
        {
            path : '/my_team',
            component: Team,
        },
        //中国象棋
        {
            path : '/chinese_chess',
            component: Chess,
        }
        
    ]
})