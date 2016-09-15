function getJSON(url, callback) {
    var id     = "_" + Date.now(),
        script = document.createElement("script"),
        head   = document.getElementsByTagName("head")[0];

    window[id] = function(data) {
        if ([].slice.call(head.childNodes).indexOf(script) !== -1)
            head.removeChild(script);
        callback && callback(data.data);
    }

    script.src = url+"?callback="+id;
    head.appendChild(script);
}

getJSON("https://api.github.com/users/GrandonBroseph", function (data){
    var status = document.querySelector("span.status"), description = document.querySelector(".description");
    status.innerText = data.public_repos+" projects on GitHub";
    description.innerText = data.bio;
    console.log(data);
});

getJSON("https://api.github.com/users/GrandonBroseph/repos", function (repos){
    var list = document.querySelector("ul.repos"), child;
    for (var i = 0, repo, item, icons, type; repo = repos[i++];) {
        console.log(i, repo.name, repo);
        item = document.createElement("li");
        item.className = "repo";
        item.innerHTML = "<a href='"+repo.html_url+"' title='"+repo.name+"' target='_blank'><h2>"+repo.name+"</h2></a><p>"+repo.description+"</p>";

        icons = document.createElement("ul");
        icons.className = "icons";

        list.appendChild(item);
        item.appendChild(icons);

        var counts = ["watchers_count", "stargazers_count", "forks_count"],
            types  = ["eye", "star", "repo-forked"];

        for (var j = types.length, icon, span; j --;) {
            icon = document.querySelector(".octicon-"+types[j]).cloneNode(true);

            item = document.createElement("li");
            item.className = "icon";

            span = document.createElement("span");
            span.innerText = repo[counts[j]];

            item.appendChild(icon);
            item.appendChild(span);

            icons.appendChild(item);
        }
    }
});
