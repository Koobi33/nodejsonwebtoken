function ready() {
	document.addEventListener('click', function (e) {
		let tar = e.target;
		if(tar.classList.contains("button")) {
			let loginData = {
				email: document.getElementById('emailform').value,
				password: document.getElementById('passwordform').value,
			};
			var xhr = new XMLHttpRequest();
			var url = "http://35.204.124.30:3012/api/auth";
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function () {
				    if (xhr.readyState === 4 && xhr.status === 200) {
					          var json = JSON.parse(xhr.responseText); 
					            console.log(json.redirect + ", " + json.token);
					    localStorage.setItem('token', json.token);
					    window.location.href = json.redirect;
					        }
			};
			xhr.send(JSON.stringify(loginData));
		}
	})
}
document.addEventListener("DOMContentLoaded", ready);
