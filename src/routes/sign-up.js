const { layout, signUpForm } = require('../templates/template');

function get(request, response) {
	const title = 'Sign up | I :heart: food!';
    const signUpTitle = 'Sign up';
	const content = /*html*/ `
        ${signUpForm(signUpTitle)}
      `;
	response.send(layout({ title, content }));
}

function post (request, response) {
    const { name, email, password } = request.body;

    if (!username || !password) {
      response.status(400).send('<h1>Login Failed.</h1>');
    }
}

module.exports = { get };