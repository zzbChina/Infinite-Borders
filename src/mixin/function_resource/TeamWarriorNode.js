class TeamWarriorNode {
    constructor(empty,team_index,warrior_index,warrior_id){
        this.empty = empty;//标志该位置是否为空，为空则为true
        this.team_index = team_index;
        this.warrior_index = warrior_index;
        this.warrior_id = warrior_id;
    }
}

export default TeamWarriorNode