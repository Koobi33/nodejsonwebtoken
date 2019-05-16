var mongoManager = (function () {
    return {
        addElem: function (value) {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "/api/tasks", true);
		xhr.setRequestHeader("x-auth-token", localStorage.getItem('token'));
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
		//		console.log(xhr.responseText);
			}
		};
		xhr.send(JSON.stringify(value));
	},

        getAllElems:  function () {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/tasks", false);
		xhr.setRequestHeader("x-auth-token", localStorage.getItem('token'));
		xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {	
		//	console.log(xhr.responseText);
			//return (xhr.responseText);
			}
			
		};
		xhr.send();
		return (xhr.responseText);
		
        },

        getOneElem: function (key) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/tasks/' + encodeURIComponent(key), false);
		xhr.setRequestHeader("x-auth-token", localStorage.getItem('token'));
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
		//		console.log(xhr.responseText);
			}
		};
            	xhr.send()
                return xhr.responseText;
        },
        
        refactorElem: function (oldKey, newKey, newValue) {
		let xhr = new XMLHttpRequest();
		xhr.open("PUT", '/api/tasks/' + encodeURIComponent(oldKey), false);
		xhr.setRequestHeader("x-auth-token", localStorage.getItem('token'));
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
		//	console.log(xhr.responseText);
		}
		};

		xhr.send(JSON.stringify(newValue));
        },

        completeElem: {
            complete: function (key) {
                let elem = JSON.parse(mongoManager.getOneElem(key));
                elem.taskIsComplete = "true";
		    elem.oldTaskName = elem.taskName;
                $.post('/tasks/' + encodeURIComponent(elem.taskName) + '/edit', elem);
            },
            inProgress: function (key) {
                let elem = JSON.parse(mongoManager.getOneElem(key));
                elem.taskIsComplete = "false";
		    elem.oldTaskName = elem.taskName;
                $.post('/tasks/' + encodeURIComponent(elem.taskName) + '/edit', elem);
            }
        },

        delElem: function (key) {
		let xhr = new XMLHttpRequest();
		xhr.open('DELETE', '/api/tasks/' + encodeURIComponent(key), false);
		xhr.setRequestHeader("x-auth-token", localStorage.getItem('token'));
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
		//		console.log(xhr.responseText);
			}
		};
		xhr.send();
		return (xhr.resposeText);

        }

    }
})();
