document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("github-form").addEventListener("submit", (event)=> {
        event.preventDefault();
        const searchTerm = document.getElementById("search").value;
        document.getElementById("search").value = "";
        const fetchURL = `https://api.github.com/search/users?q=${searchTerm}`;
        fetch(fetchURL)
        .then((response) => response.json())
        .then((responseInfo) => processSearch(responseInfo))
    })
    });

function processSearch(users) {
    for(user of users.items) {
        const userLine = document.createElement("li");
        document.getElementById("user-list").appendChild(userLine);

        const userLink = document.createElement("a");
        userLink.target = "#";
        userLink.textContent = user.login;
        userLine.appendChild(userLink);

        userLine.addEventListener("click", function (element) { 
            login = element.target.textContent;
            getRepositories(login)
        })
    }

function getRepositories(login) {
    const fetchURL = `https://api.github.com/users/${login}/repos`
    fetch(fetchURL)
    .then((response) => response.json())
    .then((responseInfo) => processRepoSearch(responseInfo))
    }

function processRepoSearch(repos)
    {
    document.getElementById("repos-list").innerHTML = "";
    for(repo of repos) {
        repoLine = document.createElement("li");
        console.log(repo);
        repoLine.textContent = repo.full_name;
        document.getElementById("repos-list").appendChild(repoLine);
    }
    }
}