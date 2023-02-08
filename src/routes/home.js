const { layout, home } = require("../templates/template");

function get(request, response) {
	const title = "Home | I :heart: Food!";
	const content = home();
	const html = layout({ title, content });
	response.send(html);
}

module.exports = { get };
