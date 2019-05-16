var elem = {
	taskName: "Hello",
	taskDate: "April 30, 2019 10:50 AM",
	taskType: "Личная задача ",
	taskIsComplete: false
}

$.post('/tasks/add', elem, function (data) {
	                console.log(data);
	            });
