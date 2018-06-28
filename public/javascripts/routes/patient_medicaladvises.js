

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
				answer.doctor.avatar : "images/default-avatar.png"
			let avatarImg = document.createElement("img");
			avatarImg.setAttribute("src", avatar);
			avatarImg.style.width="100%";
			avatarContainer.appendChild(avatarImg);

			let adviseContainer = document.createElement("div");
			adviseContainer.className = "col-xs-10 answer-detail";
			adviseContainer.innerHTML= 
				"<div class='row answer-info'>" +
					"<div class='col-xs-10'>Dr. " +
						answer.doctor.last_name + " " + answer.doctor.first_name +
					"</div>"+
					"<div class='col-xs-2'>" +
						moment(answer.created_at).format("DD/MM/YYYY") +
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
		let content = "Your question was sent";
		if(medicalAdvise && medicalAdvise.assignedTo && medicalAdvise.assignedTo.name)
			content += " to Dr. "  + medicalAdvise.assignedTo.name;
		content += "! Please patiently wait for the answer.";

		answersContent.innerHTML = content;
	}

	medicalAdviseDetail.appendChild(answersContent);
	return medicalAdviseDetail;
}

let displayMedicalAdvises = (listMedicalAdvisesArray) => {
	$("#medical-advises-list").empty();
	for(let i=0; i<listMedicalAdvisesArray.length; i++){
		let medicalAdvise = listMedicalAdvisesArray[i];
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

		$("#medical-advises-list").append(medicalAdviseItem);
	}
}

let createAdvise = () => {
	let new_advise_category = $("#medical-advises input[name='new_advise_category']").val();
	let new_advise_content = $("#medical-advises textarea[name='new_advise_content']").val();

	if(!new_advise_category 
		|| !_.isString(new_advise_category) 
		|| new_advise_category.trim()==""){
		
		$("#create_advise_error").html("Enter category");
		return false;

	}

	if(!new_advise_content
		|| !_.isString(new_advise_content) 
		|| new_advise_content.trim()==""){
		
		$("#create_advise_error").html("Enter content");
		return false;

	}
	
	let value = {
		category: new_advise_category,
		content: new_advise_content
	}
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/patient/medical_advises/create',
	    	type: "post",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    data : JSON.stringify(value),
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('patient-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		console.log(result);
	    		displayMedicalAdvises(result);
	    		$("#medical-advises input[name='new_advise_category']").val("");
	    		$("#medical-advises textarea[name='new_advise_content']").val("");
	    		// $("#create_new_patient_success").html("Patient with username " +
	    		// 	result.username + " and password " + result.password 
	    		// 	+ " is created. They now can log in and change their password");
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#create_advise_error").html("There is something wrong, please try sign out and sign in again ");
	    	}
	    });

	} else {
		$("#create_advise_error").html("There is something wrong, please try sign out and sign in again ");
	}
	return false;
}
let getPatientMedicalAdvises = () => {
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/patient/medical_advises',
	    	type: "get",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('patient-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		if(result.length<=0){
	    			$("#medical-advises-list").html("<h3>No advises asked.</h3>");
	    		} else
	    			displayMedicalAdvises(result);
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#medical-advises-list").html("<h3>"+err.responseJSON.message+"</h3>");
	    	}
	    });

	} else {
		$("#medical-advises-list").html("<h3>There is something wrong, please try sign out and sign in again </h3>");
	}
}
$(document).ready(function() {
  /*
	call api get medical_advises
  */
  console.log(user);
  $("#patient_navbar li.active").removeClass("active");
  $("#navbar_medicaladvises").addClass("active");
  getPatientMedicalAdvises();
});

