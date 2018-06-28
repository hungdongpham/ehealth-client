var medicalAdvises_doctor_list_dumb_data = [
	{
		patient: {
			id: "fsdkkwe239",
			first_name: "Giacomo",
			last_name: "Guilizzoni"
		},
		name: "5 years headache",
		category: "Cardiology",
		created_at: 1525859932000,
		updated_at: 1525859932000,
		status: 1,
		created_by:{
			id: "fsdfewwej",
			first_name: "Tam",
			last_name: "Nguyen",
			speciality: "Orthodontic"
		}
	},
	{
		patient: {
			id: "fsdkkwe239",
			first_name: "Hung",
			last_name: "Nguyen"
		},
		name: "Heart is broken",
		category: "Cardiology",
		created_at: 1525859932000,
		updated_at: 1525859932000,
		status: 0,
		created_by:{
			id: "fsdfewwej",
			first_name: "Tam",
			last_name: "Nguyen",
			speciality: "Orthodontic"
		}
	},
	{
		patient: {
			id: "fsdkkwe239",
			first_name: "Lam",
			last_name: "Nguyen"
		},
		name: "Patient's lung fall out",
		category: "Cardiology",
		created_at: 1525859932000,
		updated_at: 1525859932000,
		status: 0,
		created_by:{
			id: "fsdfewwej",
			first_name: "Tam",
			last_name: "Nguyen",
			speciality: "Orthodontic"
		}
	}
]
var mecialAdvises_dumb_data = {
	_das3dsda: {
		category: "Dietician",
		content:"Whats the diet to get rid of Pcos?",
		assignedTo: {
			id: "_kjkjkkmsd",
			name: "Nasim Arshad"
		},
		date: 1519867829000,
		status: 1,
		answers: [
			{
				content: "Eat healthy!",
				date: 1519902353000,
				author: {
					id: "_kjkjkkmsd",
					name: "Nasim Arshad",
					avatar: ""
				}
			},
			{
				content: "LOL no way",
				date: 1520036226000,
				author: {
					id: "_ssmbciey",
					name: "John Baldwin",
					avatar: ""
				}
			}
		]
	},
	_fsfkrwerm: {
		category: "Neurosurgeon",
		content:"A really long question about neurosurgeon",
		date: 1520757686000,
		status: 0,
		assignedTo: {
			id: "_kjkjkkmsd",
			name: "Nasim Arshad"
		}
	}
}

/******************************************************************
*********************** Display medical advises *******************
******************************************************************/
let createMedicalAdviseDate = (medicalAdvise) => {
	let medicalAdviseDateContainer = document.createElement("div");
	let medicalAdviseImg = document.createElement("img");
	let medicalAdviseDate = document.createElement("span");
	medicalAdviseDate.innerHTML = (medicalAdvise && medicalAdvise.created_at)? 
		moment(medicalAdvise.created_at).format("DD/MM/YYYY") : "";

	medicalAdviseDateContainer.appendChild(medicalAdviseImg);
	medicalAdviseDateContainer.appendChild(medicalAdviseDate);

	return medicalAdviseDateContainer;
}

let createAnswerForm = (medicalAdvise) => {
	let div = document.createElement('div');
	div.className= 'answer-form';
	div.style.textAlign = "center";

	if(medicalAdvise.status==1){
		let reopenButton = document.createElement('button');
		reopenButton.innerHTML = "Re-open question";

		let reopenButtonContainer = document.createElement("div");
		reopenButtonContainer.className = "col-xs-4 col-xs-offset-4";
		reopenButton.addEventListener('click', (evt) => {
			updateMedicalAdvise({
				status: 0
			})
		})

		div.innerHTML="<div class='row'>"+
			"This question has been close. Do you want to re-open it?" +
			"</div>";
		reopenButtonContainer.appendChild(reopenButton);
		div.appendChild(reopenButtonContainer);
	} else{
		div.innerHTML = 
			"<div class='row'>" +
				"<div class='col-xs-12'> " +
					"<div id='add-answer-error' style='color:red'></div>"
				"</div>"
			"</div>"
		let textArea = document.createElement("textarea");
		textArea.setAttribute("cols", "40");
		textArea.setAttribute("rows", "5");
		textArea.setAttribute("name", "new_advise_answer");
		textArea.setAttribute("placeholder", "Answer....")
		div.appendChild(textArea);

		let buttonContainer = document.createElement("div");
		buttonContainer.className = "col-xs-2 col-xs-offset-10";
		let submitButton = document.createElement("button");
		submitButton.innerHTML="Submit";

		submitButton.addEventListener('click', (evt) => {
			let new_advise_answer =  $(".answer-form textarea[name='new_advise_answer']").val();
			if(!new_advise_answer 
				|| !_.isString(new_advise_answer) 
				|| new_advise_answer.trim()==""){
					
				$("#add-answer-error").html("Enter answer");
				return ;
			}
			answerMedicalAdvise({
				content: new_advise_answer
			})

		})
		buttonContainer.appendChild(submitButton);
		div.appendChild(buttonContainer);

		let closeButtonContainer = document.createElement("div");
		closeButtonContainer.className = "col-xs-4 col-xs-offset-4";
		let closeButton = document.createElement("button");
		closeButton.innerHTML="Close question";

		closeButton.addEventListener('click', (evt) => {
			updateMedicalAdvise({
				status: 1
			})

		})
		closeButtonContainer.appendChild(closeButton);
		div.appendChild(closeButtonContainer);
	}

	return div;
}
let createMedicalAdvisePanel = (medicalAdvise) => {
	let medicalAdvisePanel = document.createElement("div");
	medicalAdvisePanel.className = "panel panel-default";

	let medicalAdvisePanelHeading = document.createElement("div");
	medicalAdvisePanelHeading.className = "panel-heading";
	medicalAdvisePanelHeading.innerHTML = (medicalAdvise && medicalAdvise.category && _.isString(medicalAdvise.category))? 
		"Category : " + medicalAdvise.category : "";
	medicalAdvisePanel.appendChild(medicalAdvisePanelHeading);

	let medicalAdvisePanelBody = document.createElement("div");
	medicalAdvisePanelBody.className = "panel-body";
	medicalAdvisePanelBody.appendChild(createMedicalAdviseDetail(medicalAdvise));
	medicalAdvisePanelBody.appendChild(createAnswerForm(medicalAdvise));

	medicalAdvisePanel.appendChild(medicalAdvisePanelBody);


	let medicalAdvisePanelFooter = document.createElement("div");
	medicalAdvisePanelFooter.className = "panel-footer";
	let status = "InProgress";
	switch (medicalAdvise.status){
		case 1:
			status="Completed";
			break;
		case -1:
			status="Aborted"
			break;
		default:
			break;
	}

	medicalAdvisePanelFooter.innerHTML = "<div class='row'><div class='col-xs-2 col-xs-offset-10'>" + status + "</div></div>"
	medicalAdvisePanel.appendChild(medicalAdvisePanelFooter);

	return medicalAdvisePanel;

}

let createMedicalAdviseDetail = (medicalAdvise) => {
	let medicalAdviseDetail = document.createElement("div");

	let request = document.createElement("div");
	request.className = "row advise-request";
	request.innerHTML = medicalAdvise.content;
	medicalAdviseDetail.appendChild(request);

	let answersContent = document.createElement("div");
	answersContent.className = "list-answers";
	if(medicalAdvise.answers 
		&& _.isArray(medicalAdvise.answers)
		&& medicalAdvise.answers.length > 0){
		for(let i=0; i<medicalAdvise.answers.length; i++){
			let answer = medicalAdvise.answers[i];
			let answerRow = document.createElement("div");
			answerRow.className = "row answer";

			let avatarContainer = document.createElement("div");
			avatarContainer.className = "col-xs-1 answer-avatar";
			let avatar = (answer.doctor && answer.doctor.avatar && answer.doctor.avatar.trim()!="")? 
				answer.author.avatar : "/images/default-avatar.png"
			let avatarImg = document.createElement("img");
			avatarImg.setAttribute("src", avatar);
			avatarImg.style.width="100%";
			avatarContainer.appendChild(avatarImg);

			let adviseContainer = document.createElement("div");
			adviseContainer.className = "col-xs-10 answer-detail";
			adviseContainer.innerHTML= 
				"<div class='row answer-info'>" +
					"<div class='col-xs-10'>Dr. " +
						answer.doctor.first_name + " " + answer.doctor.last_name +
					"</div>"+
					"<div class='col-xs-2'>" +
						moment(answer.date).format("DD/MM/YYYY") +
					"</div>" +
				"</div>" +
				"<div class='row answer-content'>" +
					"<div class='col-xs-12'>" +
						answer.content +
					"</div>" +
				"</div>";

			answerRow.appendChild(avatarContainer);
			answerRow.appendChild(adviseContainer);

			answersContent.appendChild(answerRow);
		}
	} else{
		// let content = "This question has no answer yet.";

		// answersContent.innerHTML = content;
	}

	medicalAdviseDetail.appendChild(answersContent);
	return medicalAdviseDetail;
}

let displayMedicalAdvise = (medicalAdvise) => {
	$("#medical-advises").html("");
	// for(let i=0; i<listMedicalAdvisesArray.length; i++){
		let medicalAdviseItem = document.createElement("div");
		medicalAdviseItem.className = "item";

		let col_date = document.createElement("div");
		col_date.className="col-xs-2";
		let medicalAdviseDateContainer = document.createElement("div");
		medicalAdviseDateContainer.className = "date";
		let medicalAdviseDate = createMedicalAdviseDate(medicalAdvise);
		medicalAdviseDateContainer.appendChild(medicalAdviseDate);
		col_date.appendChild(medicalAdviseDateContainer);
		medicalAdviseItem.appendChild(col_date);

		let col_detail = document.createElement("div");
		col_detail.className="col-xs-10";
		let medicalAdviseDetailContainer = document.createElement("div");
		medicalAdviseDetailContainer.className = "details";
		let medicalAdviseDetail = createMedicalAdvisePanel(medicalAdvise);
		medicalAdviseDetailContainer.appendChild(medicalAdviseDetail);
		col_detail.appendChild(medicalAdviseDetailContainer);
		medicalAdviseItem.appendChild(col_detail);

		$("#medical-advises").append(medicalAdviseItem);
	// }
}

let displayMedicalAdvisesList = (medicalAdvisesList) => {
	$("#medical-advises").empty();
	if(!medicalAdvisesList || medicalAdvisesList.length<=0){
		$("#medical-advises").html("<h3>No medical advises recorded</h3>")
		return;
	}

	let table = document.createElement("table");
	table.className= "table table-striped";
	table.innerHTML = 
		"<thead class='thead-light'>" + 
			"<tr>" +
				"<td>Content</td>" +
				"<td>Patient</td>" +
				"<td>Created date</td>" +
				"<td>Modified date</td>" +
				"<td>Speciality</td>" +
				"<td>Status</td>" +
			"</tr>" +
		"</thead>";

	let tbody = document.createElement("tbody");

	medicalAdvisesList.map( (advise, index) => {
		let record_tr = document.createElement("tr");
		record_tr.style.cursor = "pointer";
		record_tr.addEventListener("dblclick", (evt) => {
			window.location.href = HOST + "/medicaladvises/detail?id=" + advise._id;
		})

		let name_td = document.createElement("td");
		name_td.innerHTML = advise.content;
		record_tr.appendChild(name_td);

		let patient_td = document.createElement("td");
		patient_td.innerHTML = advise.patient.first_name + " " + advise.patient.last_name;
		record_tr.appendChild(patient_td);

		let createdDate_td = document.createElement("td");
		createdDate_td.innerHTML = moment(advise.created_at).format('DD/MM/YYYY');;
		record_tr.appendChild(createdDate_td);

		let updatedDate_td = document.createElement("td");
		updatedDate_td.innerHTML = moment(advise.updated_at).format('DD/MM/YYYY');
		record_tr.appendChild(updatedDate_td);

		let speciality_td = document.createElement("td");
		speciality_td.innerHTML = advise.category;
		record_tr.appendChild(speciality_td);

		let status_td = document.createElement("td");
		status_td.innerHTML = (advise.status==1)? "Completed" : "In progress";
		record_tr.appendChild(status_td);

		tbody.appendChild(record_tr);
	})

	table.appendChild(tbody);
	$("#medical-advises").append(table);
}

let getMedicalAdvisesList = () => {
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/doctor/medical_advises',
	    	type: "get",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('doctor-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		displayMedicalAdvisesList(result);
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#medical-advises").html(err.responseJSON.message);
	    	}
	    });

	} else {
		$("#medical-advises").html("There is something wrong, please try sign out and sign in again ");
	}
}

let getMedicalAdviseDetail= (advise_id) => {
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/medical_advise/' + advise_id,
	    	type: "get",
	    	dataType: 'json',
	    	contentType: 'application/json',
	    	success: function( result ) {
	    		displayMedicalAdvise(result);
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#medical-records-list").html(err.responseJSON.message);
	    	}
	    });

	} else {
		$("#medical-advises").html("There is something wrong, please try sign out and sign in again ");
	}
}

let updateMedicalAdvise = (value) => {
	let advise_id = getParameterByName('id')
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/medical_advise/' + advise_id +"/update",
	    	type: "post",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    data : JSON.stringify(value),
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('doctor-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		console.log(result);
	    		displayMedicalAdvise(result);
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#medical-advises").html("There is something wrong, please try sign out and sign in again ");
	    	}
	    });

	} else {
		$("#medical-advises").html("There is something wrong, please try sign out and sign in again ");
	}
	return false;
}

let answerMedicalAdvise = (value) => {
	let advise_id = getParameterByName('id')
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/medical_advise/' + advise_id +"/answer",
	    	type: "post",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    data : JSON.stringify(value),
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('doctor-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		console.log(result);
	    		displayMedicalAdvise(result);
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#medical-advises").html("There is something wrong, please try sign out and sign in again ");
	    	}
	    });

	} else {
		$("#medical-advises").html("There is something wrong, please try sign out and sign in again ");
	}
	return false;
}
$(document).ready(function() {
  /*
	call api get medical_advises
  */
  console.log(user);
  $("#patient_navbar li.active").removeClass("active");
  $("#navbar_medicaladvises").addClass("active");
  let listMedicalAdvisesArray = []
  let listMedicalAdvisesIds = Object.keys(mecialAdvises_dumb_data);
  for(let i =0; i<listMedicalAdvisesIds.length; i++){
  	let medical_advise = mecialAdvises_dumb_data[listMedicalAdvisesIds[i]];
  	medical_advise.id = listMedicalAdvisesIds[i];
  	listMedicalAdvisesArray.push(medical_advise);
  }

  listMedicalAdvisesArray = _.sortBy(listMedicalAdvisesArray, (advise) => {
  	return -advise.date
  });

  if(view=="advises_list"){
  	getMedicalAdvisesList();
  	// displayMedicalAdvisesList(medicalAdvises_doctor_list_dumb_data);
  }
  if(view=="advise_detail"){
  	let advise_id = getParameterByName('id')
  	getMedicalAdviseDetail(advise_id);
  }

  
});

