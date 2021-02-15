import { loading } from './ui.js'

const url = 'https://600ff44f6c21e1001704fac2.mockapi.io/minor-web/api'

export async function fetchTribe () {
    const tribe = {}
    loading(true)

    const squads = await fetch(`${url}/squads/`)
    const squadsJSON = await squads.json()

    tribe.squads = squadsJSON

    const teamsJSON = squadsJSON.map(async squad => {
        const prefetchTeams = await fetch(`${url}/squads/${squad.id}/teams`)
        return prefetchTeams.json();
    })
    
    const teams = await Promise.all(teamsJSON)
    tribe.teams = teams
    
    const membersJSON = teams.map(async teamsPerSquad => {
        const membersPerSquad =  await teamsPerSquad.map(async team => {
            const prefetchMembers = await fetch(`${url}/squads/${team.squadId}/teams/${team.id}/members`)
            return prefetchMembers.json()
        }) 
        const members = await Promise.all(membersPerSquad)
        return members
    })

    const allMembersPerSquad = await Promise.all(membersJSON)
    const allMembersPerTeam = await [].concat(...allMembersPerSquad);
    tribe.members = allMembersPerTeam
    
    localStorage.setItem('tribe', JSON.stringify(tribe))

    return Promise.resolve(tribe)
    
}