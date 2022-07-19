function links(linksMap) {
    linksHTML = "";
    if(linksMap){
        const linksList = Object.keys(linksMap);
        linksList.forEach(link => {
            linksHTML += /*html*/  
            `
                <li>
                    <a href="${link}">${linksMap[link].name}</a>
                </li>
            `
        })
    }
    return linksHTML
}

module.exports = links;