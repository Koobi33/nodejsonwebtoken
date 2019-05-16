var mongoManager = (function () {
    return {
        addElem: function (value) {
            $.post('/tasks/add', value);
        },

        getAllElems: function () {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/tasks', false);
		xhr.send();
		return JSON.parse(xhr.responseText);
        },

        getOneElem: function (key) {
		let keystr = encodeURIComponent(key.toString());
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/tasks/' + keystr, false);
            	xhr.send()
                return xhr.responseText;
        },
        
        refactorElem: function (oldKey, newKey, newValue) {
            let oldID = JSON.parse(mongoManager.getOneElem(oldKey));
            let newElem = JSON.parse(newValue);
            newElem.oldTaskName = oldID.taskName;
            $.post('/tasks/' + encodeURIComponent(newElem.oldTaskName) + '/edit', newElem);
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
            let elem = JSON.parse(mongoManager.getOneElem(key));
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/tasks/delete/' + encodeURIComponent(elem.taskName), elem.taskName, false);
		xhr.send();

        }

    }
})();
