const url = 'https://600ff44f6c21e1001704fac2.mockapi.io/minor-web/api'
const main = document.querySelector('main')

fetchMembers()

async function fetchMembers () {
    const squads = await fetch(`${url}/squads/`)
    const squadsJSON = await squads.json()

    prerenderSquads(squadsJSON);

    
    const teamsJSON = squadsJSON.map(async squad => {
        const prefetchTeams = await fetch(`${url}/squads/${squad.id}/teams`)
        return prefetchTeams.json();
    })
    
    const teams = await Promise.all(teamsJSON)
    
    prerenderTeams(teams)
    
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

    prerenderMembers(allMembersPerTeam);
}

function prerenderSquads(squads) {
    squads.forEach(squad => {
        const section = document.createElement('section')
        const heading = document.createElement('h2')
        heading.textContent = squad.name;
        section.append(heading)
        main.append(section)
    })
}

function prerenderTeams(teams) {
    teams.forEach((team,i) => {
        team.map(t => {
            const squadSections = [...document.querySelectorAll('main > section')];
            const section = document.createElement('section')
            const heading = document.createElement('h3')
            heading.textContent = t.name;
            section.append(heading)
    
            
            squadSections[i].append(section)
        })
        
    })
}

function prerenderMembers(teams) {
    teams.forEach((team,i)=> {
        const sections = [...document.querySelectorAll('section > section')]
        
        team.map(member => {
            const name = `${member.name} ${member.prefix} ${member.surname}`
            const html = `
            <article>
                <h4>${name}</h4>
                <img src='${member.mugshot}' alt='${name}'>
                <a href='https://github.com/${member.githubHandle}'>@${member.githubHandle}</a>
            </article>
            `
            sections[i].insertAdjacentHTML('beforeEnd', html)
        })
    })
}   