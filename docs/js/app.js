const url = 'https://600ff44f6c21e1001704fac2.mockapi.io/minor-web/api/'

// GET REQUEST
const teams = fetch(`${url}/squads/1/teams/3/members/`)
                .then(response => response.json())
                .then(data => console.log('fetch', data));

// PUT REQUEST
const putData = {
    id:1,
    teamId:1,
    name:'Sanne',
    prefix:'',
    surname:'Duinker',
    mugshot:'',
    githubHandle:'',
    other: {
        sport: '',
        muziek: '',
        werkplek: ''
    }
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
  
postData(`${url}/squads/1/teams/1/members/1`, putData)
    .then(data => {
        console.log('put', data);
    });