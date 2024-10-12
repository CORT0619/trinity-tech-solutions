const submit = document.getElementById('submitButton');
const form = document.getElementById('contactForm');

const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const comments = document.getElementById('message');

function inputListener() {
	const nameValue = name.value.trim();
	const emailValue = email.value.trim();
	const phoneValue = phone.value.trim();
	const commentsValue = comments.value.trim();

	const enableButton = nameValue && emailValue && phoneValue && commentsValue;
	if (enableButton) {
		submit.classList.remove(['disabled']);
	}
}

function resetForm() {
	name.value = '';
	email.value = '';
	phone.value = '';
	comments.value = '';
}

name.addEventListener('keyup', inputListener);
email.addEventListener('keyup', inputListener);
phone.addEventListener('keyup', inputListener);
comments.addEventListener('keyup', inputListener);

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const nameValue = e.target[0].value.trim();
	const emailValue = e.target[1].value.trim();
	const phoneValue = e.target[2].value.trim();
	const commentsValue = e.target[3].value.trim();

	const form = {};
	form['name'] = nameValue;
	form['email'] = emailValue;
	form['phone'] = phoneValue;
	form['comment'] = commentsValue;

	await makeApiRequest(form);

	// reset all form fields
	resetForm();
});

async function makeApiRequest(details) {
	const url =
		'https://zokqqz5lwwcpml5t3peev3yjf40nzikm.lambda-url.us-east-1.on.aws/';

	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	try {
		await fetch(url, {
			method: 'POST',
			body: JSON.stringify(details),
			headers
		});
	} catch (error) {
		// console.log('error ', error);
		throw new Error('there was an issue sending the email.');
	}
}
