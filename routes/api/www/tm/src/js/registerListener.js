function ready() {
	document.addEventListener('click', function (e) {
		let tar = e.target;
		if(tar.classList.contains("button")) {
			let form = document.forms[0];
			let registerData = {
				name: form.elements.name,
				login: form.elements.email,
				password: form.elements.password,
			};
			$post('/register', registerData);
		}
	})
}
document.addEventListener("DOMContentLoaded", ready);
