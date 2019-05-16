function ready() {
	document.addEventListener('click', function (e) {
		let tar = e.target;
		if(tar.classList.contains("button")) {
			let registerData = {
				name: document.getElementById('nameform').value,
				email: document.getElementById('emailform').value,
				password: document.getElementById('passwordform').value,
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
	})
}
document.addEventListener("DOMContentLoaded", ready);
