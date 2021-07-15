const alfy = require("alfy");

const username = alfy.userConfig.get("username");
const accessToken = alfy.userConfig.get("accessToken");
const url = `https://api.github.com/users/${username}/starred?per_page=2000`;
const options = {
  maxAge: 1000 * 60 * 60,
  transform: (body) =>
    body.map((element) => ({
      title: element.full_name,
      subtitle: element.description,
      arg: element.svn_url,
      search: `${element.full_name} ${element.description}`,
    })),
};

if (accessToken) {
  options.username = username;
  options.password = accessToken;
}

const data = await alfy.fetch(url, options);
const items = alfy.inputMatches(data, "search");

alfy.output(items);
