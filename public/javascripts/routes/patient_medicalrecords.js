

/******************************************************************
*********************** Display medical records *******************
******************************************************************/

/*********************** Display allergies *******************/


let displayAllergies = (allergies) => {
	$("#allergies-list").empty();
	if(!allergies || allergies.length<=0){
		$("#allergies-list").html("<h3>No allergies recorded</h3>")
		return;
	}
	let new_row;
	allergies.map( (allergie, index) => {
		if(index%2==0){
			new_row = document.createElement("div");
			new_row.className = "row";
			$("#allergies-list").append(new_row);
		}
		let id = "allergie_" + index;
		let allergie_col = document.createElement("div");
		allergie_col.className = "col-xs-6";
		// allergie_row.id = id;

		//container
		let allergieContainer = document.createElement("div");
		allergieContainer.className = "allergie-container col-xs-11";

		let row_name = document.createElement("div");
		row_name.className = "row";
		row_name.innerHTML =
			"<div class='col-xs-3'>"+
				"Name: " +
			"</div>" +
			"<div class='col-xs-9 allergie-name'>"+
				"<input type='text' name='allergie_name' disabled value='" + allergie.name +  "' />" +
			"</div>"
		allergieContainer.appendChild(row_name);

		let row_reaction = document.createElement("div");
		row_reaction.className = "row";
		row_reaction.innerHTML =
			"<div class='col-xs-3'>"+
				"Reaction: " +
			"</div>" +
			"<div class='col-xs-9 allergie-reaction'>"+
				"<input type='text' name='allergie_reaction' disabled value='" + allergie.reaction +  "' />" +
			"</div>";
		allergieContainer.appendChild(row_reaction);

		let row_severity = document.createElement("div");
		row_severity.className = "row";
		let row_severity_HTML =
			"<div class='col-xs-3'>"+
				"Severity: " +
			"</div>" +
			"<div class='col-xs-9 allergie-severity'>"+
				"<input type='text' name='allergie_severity' disabled value='"+ allergie.severity +"' />" +
			"</div>"
		row_severity.innerHTML = row_severity_HTML;
		allergieContainer.appendChild(row_severity);
		allergie_col.appendChild(allergieContainer);
		new_row.appendChild(allergie_col);
		
	})
}

/********************* Display immunizations *****************/
let displayImmunizations = (immunizations) => {
	$("#immunizations-list").empty();
	if(!immunizations || immunizations.length<=0){
		$("#immunizations-list").html("<h3>No immunizations recorded</h3>")
		return;
	}

	immunizations.map( (immunization, index) => {
		let id = "immunization_" + index;
		let immunization_row = document.createElement("div");
		immunization_row.className = "row";
		immunization_row.id = id;

		//container
		let immunizationContainer = document.createElement("div");
		immunizationContainer.className = "immunization-container col-xs-10";

		let row_name = document.createElement("div");
		row_name.className = "row";
		row_name.innerHTML =
			"<div class='col-xs-3'>"+
				"Name: " +
			"</div>" +
			"<div class='col-xs-9 immunization-name'>"+
				"<input type='text' name='immunization_name' disabled value='" + immunization.name +  "' />" +
			"</div>"
		immunizationContainer.appendChild(row_name);

		let row_date = document.createElement("div");
		row_date.className = "row";
		row_date.innerHTML =
			"<div class='col-xs-3'>"+
				"Date: " +
			"</div>" +
			"<div class='col-xs-9 immunization-date'>"+
				"<input type='text' name='immunization_date' disabled value='" + immunization.date +  "' />" +
			"</div>";
		immunizationContainer.appendChild(row_date);

		let row_type = document.createElement("div");
		row_type.className = "row";
		row_type.innerHTML =
			"<div class='col-xs-3'>"+
				"Type: " +
			"</div>" +
			"<div class='col-xs-9 immunization-type'>"+
				"<input type='text' name='immunization_type' disabled value='" + immunization.type +  "' />" +
			"</div>";
		immunizationContainer.appendChild(row_type);

		let row_dose = document.createElement("div");
		row_dose.className = "row";
		row_dose.innerHTML =
			"<div class='col-xs-3'>"+
				"Dose: " +
			"</div>" +
			"<div class='col-xs-9 immunization-dose'>"+
				"<input type='text' name='immunization_dose' disabled value='" + immunization.dose +  "' />" +
			"</div>";
		immunizationContainer.appendChild(row_dose);

		let row_instructions = document.createElement("div");
		row_instructions.className = "row";
		row_instructions.innerHTML =
			"<div class='col-xs-3'>"+
				"Dose: " +
			"</div>" +
			"<div class='col-xs-9 immunization-instructions'>"+
				"<input type='text' name='immunization_instructions' disabled value='" + immunization.instructions +  "' />" +
			"</div>";
		immunizationContainer.appendChild(row_instructions);

		immunization_row.appendChild(immunizationContainer);

		//button
		function enableEditImmunizationInfo(){
			$("#" + id + " input[disabled]").removeAttr("disabled");
			$("#" + id + " .edit-button").html("<span class='glyphicon glyphicon-ok'></span>");
			$("#" + id + " .edit-button").removeClass("edit-button").addClass("check-button");
			$("#" + id + " .check-button").on('click', function(){
				console.log("on click");
				submitChange();
				displayImmunizations(immunizations);
			});;
		}

		function deleteImmunization(){
			immunizations.splice(index,1);
			// to do: update new allergies list on server
		}

		function submitChange(){
			console.log(immunizations[index]);
			let immunization_name = $("#" + id + " input[name='immunization_name']").val();
			let immunization_date = $("#" + id + " input[name='immunization_date']").val();
			let immunization_type = $("#" + id + " input[name='immunization_type']").val();
			let immunization_dose = $("#" + id + " input[name='immunization_dose']").val();
			let immunization_instructions = $("#" + id + " input[name='immunization_instructions']").val();

			immunizations[index] = {
				name: immunization_name,
				date: immunization_date,
				type: immunization_type,
				dose: immunization_dose,
				instructions: immunization_instructions
			}
			// to do: update new allergies list on server
		}
		let immunizationButtonList = document.createElement("div");
		immunizationButtonList.className = "immunization-button col-xs-2";

		let editButtonContainer = document.createElement("div");
		editButtonContainer.className = "immunization-button-edit row";

		let editButton = document.createElement("button");
		editButton.type = "button";
		editButton.className = "btn btn-default btn-sm edit-button";
		editButton.innerHTML = "<span class='glyphicon glyphicon-edit'></span>";
		editButton.addEventListener("click", () => {
			enableEditImmunizationInfo();
		})
		editButtonContainer.appendChild(editButton);
		immunizationButtonList.appendChild(editButtonContainer);


		let deleteButtonContainer = document.createElement("div");
		deleteButtonContainer.className = "immunization-button-delete row";

		let deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.className = "btn btn-default btn-sm delete-button";
		deleteButton.innerHTML = "<span class='glyphicon glyphicon-trash'></span>";
		deleteButton.addEventListener("click", () => {
			deleteImmunization();
			displayImmunizations(immunizations);
		})
		deleteButtonContainer.appendChild(deleteButton);
		immunizationButtonList.appendChild(deleteButtonContainer);

		immunization_row.appendChild(immunizationButtonList);
		$("#immunizations-list").append(immunization_row);
	})

}

/********************** Display procedures *******************/
let displayProcedures = (procedures) => {
	$("#procedures-list").empty();
	if(!procedures || procedures.length<=0){
		$("#procedures-list").html("<h3>No procedures recorded</h3>")
		return;
	}

	procedures.map( (procedure, index) => {
		let id = "procedure_" + index;
		let procedure_row = document.createElement("div");
		procedure_row.className = "row";
		procedure_row.id = id;

		//container
		let procedureContainer = document.createElement("div");
		procedureContainer.className = "procedure-container col-xs-10";

		let row_name = document.createElement("div");
		row_name.className = "row";
		row_name.innerHTML =
			"<div class='col-xs-3'>"+
				"Procedure: " +
			"</div>" +
			"<div class='col-xs-9 procedure-name'>"+
				"<input type='text' name='procedure_name' disabled value='" + procedure.procedure +  "' />" +
			"</div>"
		procedureContainer.appendChild(row_name);

		let row_date = document.createElement("div");
		row_date.className = "row";
		row_date.innerHTML =
			"<div class='col-xs-3'>"+
				"Date: " +
			"</div>" +
			"<div class='col-xs-9 procedure-date'>"+
				"<input type='text' name='procedure_date' disabled value='" + procedure.date +  "' />" +
			"</div>";
		procedureContainer.appendChild(row_date);

		let row_provider = document.createElement("div");
		row_provider.className = "row";
		row_provider.innerHTML =
			"<div class='col-xs-3'>"+
				"Provider: " +
			"</div>" +
			"<div class='col-xs-9 procedure-provider'>"+
				"<input type='text' name='procedure_provider' disabled value='" + procedure.provider +  "' />" +
			"</div>";
		procedureContainer.appendChild(row_provider);

		let row_address = document.createElement("div");
		row_address.className = "row";
		row_address.innerHTML =
			"<div class='col-xs-3'>"+
				"Address: " +
			"</div>" +
			"<div class='col-xs-9 procedure-address'>"+
				"<input type='text' name='procedure_address' disabled value='" + procedure.address +  "' />" +
			"</div>";
		procedureContainer.appendChild(row_address);

		procedure_row.appendChild(procedureContainer);

		//button
		function enableEditProcedureInfo(){
			$("#" + id + " input[disabled]").removeAttr("disabled");
			$("#" + id + " .edit-button").html("<span class='glyphicon glyphicon-ok'></span>");
			$("#" + id + " .edit-button").removeClass("edit-button").addClass("check-button");
			$("#" + id + " .check-button").on('click', function(){
				console.log("on click");
				submitChange();
				displayProcedures(procedures);
			});;
		}

		function deleteProcedures(){
			procedures.splice(index,1);
			// to do: update new allergies list on server
		}

		function submitChange(){
			console.log(procedures[index]);
			let procedure_name = $("#" + id + " input[name='procedure_name']").val();
			let procedure_date = $("#" + id + " input[name='procedure_date']").val();
			let procedure_provider = $("#" + id + " input[name='procedure_provider']").val();
			let procedure_address= $("#" + id + " input[name='procedure_address']").val();

			procedures[index] = {
				procedure: procedure_name,
				date: procedure_date,
				provider: procedure_provider,
				address: procedure_address
			}
			// to do: update new allergies list on server
		}
		let procedureButtonList = document.createElement("div");
		procedureButtonList.className = "procedure-button col-xs-2";

		let editButtonContainer = document.createElement("div");
		editButtonContainer.className = "procedure-button-edit row";

		let editButton = document.createElement("button");
		editButton.type = "button";
		editButton.className = "btn btn-default btn-sm edit-button";
		editButton.innerHTML = "<span class='glyphicon glyphicon-edit'></span>";
		editButton.addEventListener("click", () => {
			enableEditProcedureInfo();
		})
		editButtonContainer.appendChild(editButton);
		procedureButtonList.appendChild(editButtonContainer);


		let deleteButtonContainer = document.createElement("div");
		deleteButtonContainer.className = "procedure-button-delete row";

		let deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.className = "btn btn-default btn-sm delete-button";
		deleteButton.innerHTML = "<span class='glyphicon glyphicon-trash'></span>";
		deleteButton.addEventListener("click", () => {
			deleteProcedures();
			displayProcedures(procedures);
		})
		deleteButtonContainer.appendChild(deleteButton);
		procedureButtonList.appendChild(deleteButtonContainer);

		procedure_row.appendChild(procedureButtonList);
		$("#procedures-list").append(procedure_row);
	})

}

/********************** Display problems list *****************/
let displayProblemsList = (problems) => {
	$("#problems-list").empty();
	if(!problems || problems.length<=0){
		$("#problems-list").html("<h3>No problems recorded</h3>")
		return;
	}

	problems.map( (problem, index) => {
		let id = "problem_" + index;
		let problem_row = document.createElement("div");
		problem_row.className = "row";
		problem_row.id = id;

		//container
		let problemContainer = document.createElement("div");
		problemContainer.className = "problem-container col-xs-10";

		let row_observation = document.createElement("div");
		row_observation.className = "row";
		row_observation.innerHTML =
			"<div class='col-xs-3'>"+
				"Observation: " +
			"</div>" +
			"<div class='col-xs-9 problem-observation'>"+
				"<input type='text' name='problem_observation' disabled value='" + problem.observation +  "' />" +
			"</div>"
		problemContainer.appendChild(row_observation);

		let row_status = document.createElement("div");
		row_status.className = "row";
		row_status.innerHTML =
			"<div class='col-xs-3'>"+
				"Status: " +
			"</div>" +
			"<div class='col-xs-9 problem-status'>"+
				"<input type='text' name='problem_status' disabled value='"  +
					// + (problem.status)? "Resolved" : "Active"+  
					 problem.status +
				"' />" +
			"</div>";
		problemContainer.appendChild(row_status);

		let row_date = document.createElement("div");
		row_date.className = "row";
		row_date.innerHTML =
			"<div class='col-xs-3'>"+
				"Date: " +
			"</div>" +
			"<div class='col-xs-9 problem-date'>"+
				"<input type='text' name='problem_date' disabled value='" + problem.date +  "' />" +
			"</div>";
		problemContainer.appendChild(row_date);

		let row_comments = document.createElement("div");
		row_comments.className = "row";
		row_comments.innerHTML =
			"<div class='col-xs-3'>"+
				"Comments: " +
			"</div>" +
			"<div class='col-xs-9 problem-comments'>"+
				"<input type='text' name='problem_comments' disabled value='" + problem.comments +  "' />" +
			"</div>";
		problemContainer.appendChild(row_comments);

		problem_row.appendChild(problemContainer);

		//button
		function enableEditProblemInfo(){
			$("#" + id + " input[disabled]").removeAttr("disabled");
			$("#" + id + " .edit-button").html("<span class='glyphicon glyphicon-ok'></span>");
			$("#" + id + " .edit-button").removeClass("edit-button").addClass("check-button");
			$("#" + id + " .check-button").on('click', function(){
				console.log("on click");
				submitChange();
				displayProblemsList(problems);
			});;
		}

		function deleteProblem(){
			problems.splice(index,1);
			// to do: update new allergies list on server
		}

		function submitChange(){
			console.log(problems[index]);
			let problem_observation = $("#" + id + " input[name='problem_observation']").val();
			let problem_status = $("#" + id + " input[name='problem_status']").val();
			let problem_date = $("#" + id + " input[name='problem_date']").val();
			let problem_comments= $("#" + id + " input[name='problem_comments']").val();

			problems[index] = {
				observation: problem_observation,
				status: problem_status,
				date: problem_date,
				comments: problem_comments
			}
			// to do: update new allergies list on server
		}
		let problemButtonList = document.createElement("div");
		problemButtonList.className = "problem-button col-xs-2";

		let editButtonContainer = document.createElement("div");
		editButtonContainer.className = "problem-button-edit row";

		let editButton = document.createElement("button");
		editButton.type = "button";
		editButton.className = "btn btn-default btn-sm edit-button";
		editButton.innerHTML = "<span class='glyphicon glyphicon-edit'></span>";
		editButton.addEventListener("click", () => {
			enableEditProblemInfo();
		})
		editButtonContainer.appendChild(editButton);
		problemButtonList.appendChild(editButtonContainer);


		let deleteButtonContainer = document.createElement("div");
		deleteButtonContainer.className = "problem-button-delete row";

		let deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.className = "btn btn-default btn-sm delete-button";
		deleteButton.innerHTML = "<span class='glyphicon glyphicon-trash'></span>";
		deleteButton.addEventListener("click", () => {
			deleteProblem();
			displayProblemsList(problems);
		})
		deleteButtonContainer.appendChild(deleteButton);
		problemButtonList.appendChild(deleteButtonContainer);

		problem_row.appendChild(problemButtonList);
		$("#problems-list").append(problem_row);
	})

}

let displayMedicalRecords = (medicalRecords) => {
	if(!medicalRecords){
		mecialRecords_dumb_data = {
			allergies: [],
			immunizations: [],
			procedures: [],
			lab_results: [],
			problem_list: []
		}

	}

	let { allergies, immunizations, procedures, lab_results, problem_list } = medicalRecords;
	displayAllergies(allergies);
	displayImmunizations(immunizations);
	displayProcedures(procedures);
	displayProblemsList(problem_list);
}	

let getMedicalRecordsList = () => {
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/patient/medical_records',
	    	type: "get",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('patient-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		displayMedicalRecords(result);
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#medical-records").html(err.responseJSON.message);
	    	}
	    });

	} else {
		$("#medical-records").html("There is something wrong, please try sign out and sign in again ");
	}
}
$(document).ready(function() {
  /*
	call api get medical_records
  */
  /*
	call api get severity_list
  */
  $("#patient_navbar li.active").removeClass("active");
  $("#navbar_medicalrecords").addClass("active");
  getMedicalRecordsList();
  // displayMedicalRecords(mecialRecords_dumb_data);
});

