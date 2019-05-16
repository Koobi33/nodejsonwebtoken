function ready() {
	document.addEventListener('click', function (e) {
		let tar = e.target;
		if(tar.classList.contains("button")) {
				let name = document.getElementById('nameform').value;
				let email = document.getElementById('emailform').value;
				let password = document.getElementById('passwordform').value;
				let password2 = document.getElementById('passwordform2').value;
				let agree = document.getElementById('agree');
			if(name && email && password && password2 && agree.checked) {
			let registerData = {
				name: name,
				email: email,
				password: password
			};
			var xhr = new XMLHttpRequest();
			var url = "http://35.204.124.30:3012/api/signup";
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4 && xhr.status === 200) {
					var json = JSON.parse(xhr.responseText);
					localStorage.setItem('token', json.token);
						window.location.href = json.redirect;
				}
			};
				xhr.send(JSON.stringify(registerData));
			}
		}
	})
}
document.addEventListener("DOMContentLoaded", ready);
