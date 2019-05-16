function ready() {
	document.addEventListener('click', function (e) {
		let tar = e.target;
		if(tar.classList.contains("button")) {
			let form = document.forms[0];
			let loginData = {
				login: form.elements.email,
				password: form.elements.password,
			};
			$post('/login', loginData);
		}
	})
}
document.addEventListener("DOMContentLoaded", ready);
