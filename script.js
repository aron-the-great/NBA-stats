(async () => {
    let counter = 1;
    const response = await fetch(`https://www.balldontlie.io/api/v1/players?page=${counter}per_page=10`);
    const playerStats = (await response.json()).data;
    const container = document.querySelector('.container')
    for (const playerStat of playerStats) {
        const markup = generatePlayerCard(playerStat);
        const playerCard = document.createElement("div")
        playerCard.classList.add("player-card")
        playerCard.innerHTML = markup;
        container.appendChild(playerCard)
    }
    counter++;
    window.onscroll = async function (ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            const response = await fetch(`https://www.balldontlie.io/api/v1/players?page=${counter}per_page=10`);
            const playerStats = (await response.json()).data;
            const container = document.querySelector('.container')
            for (const playerStat of playerStats) {
                const markup = generatePlayerCard(playerStat);
                const playerCard = document.createElement("div")
                playerCard.classList.add("player-card")
                playerCard.innerHTML = markup;
                container.appendChild(playerCard)
            }
            counter++;
        }
    };
})();

const generatePlayerCard = (data) => {
    let fullHeight = 'Unknown'
    let heightFeet = data.height_feet
    if (heightFeet != null) {
        fullHeight = `${heightFeet}'`
    }
    let heightInches = data.height_inches
    if (heightInches != null) {
        fullHeight += ` ${heightInches}"`
    }
    let position = data.position
    if (position === '') {
        position = 'Unknown'
    }

    return `
    <div class='player-card-name'>
        <p class="body-font">${data.first_name} ${data.last_name}</p>
    </div>
    <div class='player-card-stats'>
        <p class="player-body-font">Team: ${data.team.full_name}</p>
        <p class="player-body-font">Position: ${position}</p>
        <p class="player-body-font">Height: ${fullHeight} </p>
    </div>
    `
}