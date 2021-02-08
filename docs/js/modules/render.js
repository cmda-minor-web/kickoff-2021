const main = document.querySelector('main')

export function renderTribe (tribe) {
    renderSquads(tribe.squads)
    renderTeams(tribe.teams)
    renderMembers(tribe.members)
}

function renderSquads(squads) {
    squads.forEach(squad => {
        const section = document.createElement('section')
        const heading = document.createElement('h2')
        heading.textContent = `Squad ${squad.name}`;
        section.append(heading)
        main.append(section)
    })
}

function renderTeams(teams) {
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

function renderMembers(teams) {
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