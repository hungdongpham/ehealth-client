var allergie_severity = [ "Moderate", "Moderate to severe", "Severe"];

/******************************************************************
*********************** Display medical records *******************
******************************************************************/

/*********************** Display allergies *******************/


let displayAllergies = (allergies) => {
	$("#allergies-list").empty();
	$("#allergie-form select[name='new_allergie_severity']").empty();
	allergie_severity.map( (sev) => {
		$("#allergie-form select[name='new_allergie_severity']").append("<option value='"+ sev +"''>"+ sev +"</option>");
	})
	if(!allergies || allergies.length<=0){
		$("#allergies-list").html("<h3>No allergies recorded</h3>")
		return;
	}

	allergies.map( (allergie, index) => {
		let id = "allergie_" + index;
		let allergie_row = document.createElement("div");
		allergie_row.className = "row";
		allergie_row.id = id;

		//container
		let allergieContainer = document.createElement("div");
		allergieContainer.className = "allergie-container col-xs-10";

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
				"<select name='allergie_severity' disabled value='"+ allergie.severity +"'>";

		allergie_severity.map( (sev) => {
			if(sev == allergie.severity ){
				row_severity_HTML +=
					"<option selected value='"+ sev +"''>"+ sev +"</option>"
			} else{
				row_severity_HTML +=
					"<option value='"+ sev +"''>"+ sev +"</option>"
			}
			
		})

		row_severity_HTML +=
				"</select>"
			"</div>"
		row_severity.innerHTML = row_severity_HTML;
		allergieContainer.appendChild(row_severity);
		allergie_row.appendChild(allergieContainer);

		//button
		function enableEditAllergieInfo(){
			$("#" + id + " input[disabled]").removeAttr("disabled");
			$("#" + id + " select[disabled]").removeAttr("disabled");
			$("#" + id + " .edit-button").html("<span class='glyphicon glyphicon-ok'></span>");
			$("#" + id + " .edit-button").removeClass("edit-button").addClass("check-button");
			$("#" + id + " .check-button").on('click', function(){
				console.log("on click");
				submitChange();
				displayAllergies(allergies);
			});;
		}

		function deleteAllergie(){
			deleteMedicalRecord({
				allergies: allergies[index]
			});
			// allergies.splice(index,1);
			// to do: update new allergies list on server
		}

		function submitChange(){
			console.log(allergies[index]);
			let allergie_name = $("#" + id + " input[name='allergie_name']").val();
			let allergie_reaction = $("#" + id + " input[name='allergie_reaction']").val();
			let allergie_severity = $("#" + id + " select[name='allergie_severity']").val();
			allergies[index] = {
				name: allergie_name,
				reaction: allergie_reaction,
				severity: allergie_severity
			}
			updateMedicalRecord({
				allergies: allergies
			});
			// to do: update new allergies list on server
		}
		let allergieButtonList = document.createElement("div");
		allergieButtonList.className = "allergie-button col-xs-2";

		let editButtonContainer = document.createElement("div");
		editButtonContainer.className = "allergie-button-edit row";

		let editButton = document.createElement("button");
		editButton.type = "button";
		editButton.className = "btn btn-default btn-sm edit-button";
		editButton.innerHTML = "<span class='glyphicon glyphicon-edit'></span>";
		editButton.addEventListener("click", () => {
			enableEditAllergieInfo();
		})
		editButtonContainer.appendChild(editButton);
		allergieButtonList.appendChild(editButtonContainer);


		let deleteButtonContainer = document.createElement("div");
		deleteButtonContainer.className = "allergie-button-delete row";

		let deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.className = "btn btn-default btn-sm delete-button";
		deleteButton.innerHTML = "<span class='glyphicon glyphicon-trash'></span>";
		deleteButton.addEventListener("click", () => {
			deleteAllergie();
			// displayAllergies(allergies);
		})
		deleteButtonContainer.appendChild(deleteButton);
		allergieButtonList.appendChild(deleteButtonContainer);

		// allergieButtonList.innerHTML = 
		// 	"<div class='row'>" +
		// 		"<button type='button' class='btn btn-default btn-sm'>" +
  //         			"<span class='glyphicon glyphicon-edit'></span>" +
  //       		"</button>" +
		// 	"</div>" +
		// 	"<div class='row'>" +
		// 		"<button type='button' class='btn btn-default btn-sm'>" +
  //         			"<span class='glyphicon glyphicon-trash'></span>" +
  //       		"</button>" +
		// 	"</div>";

		allergie_row.appendChild(allergieButtonList);
		$("#allergies-list").append(allergie_row);
	})
}

let addNewAllergie = () => {
	//after this I need an API for submit new allergie
	// let { allergies } = mecialRecords_dumb_data;
	// if(!allergies){
	// 	allergies = [];
	// }
	let new_allergie_name = $("#allergie-form input[name='new_allergie_name']").val();
	let new_allergie_reaction = $("#allergie-form input[name='new_allergie_reaction']").val();
	let new_allergie_severity = $("#allergie-form select[name='new_allergie_severity']").val();
	if(!new_allergie_name 
		|| !_.isString(new_allergie_name) 
		|| new_allergie_name.trim()==""){
		
		$("#allergie-form .add-allergie-error").html("Enter allergie name");
		return false;

	}

	if(!new_allergie_reaction 
		|| !_.isString(new_allergie_reaction) 
		|| new_allergie_reaction.trim()==""){
		
		$("#allergie-form .add-allergie-error").html("Enter allergie reaction");
		return false;

	}

	if(!new_allergie_severity 
		|| !_.isString(new_allergie_severity) 
		|| new_allergie_severity.trim()==""){
		
		$("#allergie-form .add-allergie-error").html("Enter allergie severity");
		return false;

	}
	addMedicalRecord({
		allergies: {
			name: new_allergie_name,
			reaction: new_allergie_reaction,
			severity: new_allergie_severity
		}
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
			deleteMedicalRecord({
				immunizations: immunizations[index]
			});
			// immunizations.splice(index,1);
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
			updateMedicalRecord({
				immunizations: immunizations
			});
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
			// displayImmunizations(immunizations);
		})
		deleteButtonContainer.appendChild(deleteButton);
		immunizationButtonList.appendChild(deleteButtonContainer);

		immunization_row.appendChild(immunizationButtonList);
		$("#immunizations-list").append(immunization_row);
	})

}

let addNewImmunization = () => {
	//after this I need an API for submit new allergie
	// let { immunizations } = mecialRecords_dumb_data;
	// if(!immunizations){
	// 	immunizations = [];
	// }
	let new_immunization_name = $("#immunization-form input[name='new_immunization_name']").val();
	let new_immunization_date = $("#immunization-form input[name='new_immunization_date']").val();
	let new_immunization_type = $("#immunization-form input[name='new_immunization_type']").val();
	let new_immunization_dose = $("#immunization-form input[name='new_immunization_dose']").val();
	let new_immunization_instructions = $("#immunization-form input[name='new_immunization_instructions']").val();

	if(!new_immunization_name 
		|| !_.isString(new_immunization_name) 
		|| new_immunization_name.trim()==""){
		
		$("#immunization-form .add-immunization-error").html("Enter immunization name");
		return false;

	}

	if(!new_immunization_date
		|| !_.isString(new_immunization_date) 
		|| new_immunization_date.trim()==""){
		
		$("#immunization-form .add-immunization-error").html("Enter immunization date");
		return false;

	}

	if(!new_immunization_type
		|| !_.isString(new_immunization_type) 
		|| new_immunization_type.trim()==""){
		
		$("#immunization-form .add-immunization-error").html("Enter immunization type");
		return false;

	}

	if(!new_immunization_dose 
		|| !_.isString(new_immunization_dose) 
		|| new_immunization_dose.trim()==""){
		
		$("#immunization-form .add-immunization-error").html("Enter immunization dose");
		return false;

	}

	if(!new_immunization_instructions 
		|| !_.isString(new_immunization_instructions) 
		|| new_immunization_instructions.trim()==""){
		
		$("#immunization-form .add-immunization-error").html("Enter immunization instructions");
		return false;

	}
	addMedicalRecord({
		immunizations: {
			name: new_immunization_name,
			date: new_immunization_date,
			type: new_immunization_type,
			dose: new_immunization_dose,
			instructions: new_immunization_instructions
		}
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
			deleteMedicalRecord({
				procedures: procedures[index]
			});
			// procedures.splice(index,1);
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
			updateMedicalRecord({
				procedures: procedures
			});
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
			// displayProcedures(procedures);
		})
		deleteButtonContainer.appendChild(deleteButton);
		procedureButtonList.appendChild(deleteButtonContainer);

		procedure_row.appendChild(procedureButtonList);
		$("#procedures-list").append(procedure_row);
	})

}

let addNewProcedure = () => {
	//after this I need an API for submit new allergie
	// let { procedures } = mecialRecords_dumb_data;
	// if(!procedures){
	// 	procedures = [];
	// }
	let new_procedure_name = $("#procedure-form input[name='new_procedure_name']").val();
	let new_procedure_date = $("#procedure-form input[name='new_procedure_date']").val();
	let new_procedure_provider = $("#procedure-form input[name='new_procedure_provider']").val();
	let new_procedure_address = $("#procedure-form input[name='new_procedure_address']").val();

	if(!new_procedure_name 
		|| !_.isString(new_procedure_name) 
		|| new_procedure_name.trim()==""){
		
		$("#procedure-form .add-procedure-error").html("Enter procedure name");
		return false;

	}

	if(!new_procedure_date
		|| !_.isString(new_procedure_date) 
		|| new_procedure_date.trim()==""){
		
		$("#procedure-form .add-procedure-error").html("Enter procedure date");
		return false;

	}
	if(!new_procedure_provider 
		|| !_.isString(new_procedure_provider) 
		|| new_procedure_provider.trim()==""){
		
		$("#procedure-form .add-procedure-error").html("Enter procedure provider");
		return false;

	}
	if(!new_procedure_address 
		|| !_.isString(new_procedure_address) 
		|| new_procedure_address.trim()==""){
		
		$("#procedure-form .add-procedure-error").html("Enter procedure address");
		return false;

	}
	addMedicalRecord({
		procedures: {
			procedure: new_procedure_name,
			date: new_procedure_date,
			provider: new_procedure_provider,
			address: new_procedure_address,
		}
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
			deleteMedicalRecord({
				problem_list: problems[index]
			});
			// problems.splice(index,1);
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
			updateMedicalRecord({
				problem_list: problems
			});
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
			// displayProblemsList(problems);
		})
		deleteButtonContainer.appendChild(deleteButton);
		problemButtonList.appendChild(deleteButtonContainer);

		problem_row.appendChild(problemButtonList);
		$("#problems-list").append(problem_row);
	})

}

let addNewProblem = () => {
	//after this I need an API for submit new allergie
	// let  problems  = mecialRecords_dumb_data.problem_list;
	// if(!problems){
	// 	problems = [];
	// }
	let new_problem_observation = $("#problem-form input[name='new_problem_observation']").val();
	let new_problem_status = $("#problem-form  input[name='new_problem_status']").val();
	let new_problem_date = $("#problem-form  input[name='new_problem_date']").val();
	let new_problem_comments= $("#problem-form 	 input[name='new_problem_comments']").val();

	if(!new_problem_observation 
		|| !_.isString(new_problem_observation) 
		|| new_problem_observation.trim()==""){
		
		$("#problem-form .add-problem-error").html("Enter problem observation");
		return false;

	}

	if(!new_problem_status
		|| !_.isString(new_problem_status) 
		|| new_problem_status.trim()==""){
		
		$("#problem-form .add-problem-error").html("Enter problem status");
		return false;

	}
	if(!new_problem_date 
		|| !_.isString(new_problem_date) 
		|| new_problem_date.trim()==""){
		
		$("#problem-form .add-problem-error").html("Enter problem date");
		return false;

	}
	if(!new_problem_comments 
		|| !_.isString(new_problem_comments) 
		|| new_problem_comments.trim()==""){
		
		$("#problem-form .add-problem-error").html("Enter problem comments");
		return false;

	}
	addMedicalRecord({
		problem_list: {
			observation: new_problem_observation,
			status: new_problem_status,
			date: new_problem_date,
			comments: new_problem_comments,
		}
	})
}

/********************** Display patient info *****************/
let displayPatientInfo = (patientInfo) => {
	$("#patient_info").empty();
	if(!patientInfo){
		$("#patient_info").html("<h3>No personal info recorded</h3>")
		return;
	}

	let row_lastName = document.createElement("div");
	row_lastName.className = "row";
	row_lastName.innerHTML =
		"<div class='col-xs-3'>"+
			"Last name: " +
		"</div>" +
		"<div class='col-xs-9 last_name'>"+
			patientInfo.last_name +
		"</div>"
	$("#patient_info").append(row_lastName);

	let row_firstName= document.createElement("div");
	row_firstName.className = "row";
	row_firstName.innerHTML =
		"<div class='col-xs-3'>"+
			"Last name: " +
		"</div>" +
		"<div class='col-xs-9 first_name'>"+
			patientInfo.first_name +
		"</div>"
	$("#patient_info").append(row_firstName);
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

	let { patient, allergies, immunizations, procedures, lab_results, problem_list } = medicalRecords;
	displayPatientInfo(patient);
	displayAllergies(allergies);
	displayImmunizations(immunizations);
	displayProcedures(procedures);
	displayProblemsList(problem_list);
}	

let displayMedicalRecordsList = (medicalRecordsList) => {
	$("#medical-records-list").empty();
	if(!medicalRecordsList || medicalRecordsList.length<=0){
		$("#medical-records-list").html("<h3>No medical recorded</h3>")
		return;
	}

	let table = document.createElement("table");
	table.className= "table table-striped";
	table.innerHTML = 
		"<thead class='thead-light'>" + 
			"<tr>" +
				"<td>Patient</td>" +
				"<td>Created date</td>" +
				"<td>Modified date</td>" +
				"<td>Created by</td>" +
			"</tr>" +
		"</thead>";

	let tbody = document.createElement("tbody");

	medicalRecordsList.map( (record, index) => {
		let record_tr = document.createElement("tr");
		record_tr.style.cursor = "pointer";
		record_tr.addEventListener("dblclick", (evt) => {
			window.location.href = HOST + "/medicalrecords/detail?id=" + record._id;
		})

		let patient_td = document.createElement("td");
		patient_td.innerHTML = record.patient.first_name + " " + record.patient.last_name;
		record_tr.appendChild(patient_td);

		let createdDate_td = document.createElement("td");
		createdDate_td.innerHTML = moment(record.created_at).format('DD/MM/YYYY');;
		record_tr.appendChild(createdDate_td);

		let updatedDate_td = document.createElement("td");
		updatedDate_td.innerHTML = moment(record.updated_at).format('DD/MM/YYYY');
		record_tr.appendChild(updatedDate_td);

		let doctor_td = document.createElement("td");
		doctor_td.innerHTML = record.created_by.first_name + " " + record.created_by.last_name;
		record_tr.appendChild(doctor_td);

		tbody.appendChild(record_tr);
	})

	table.appendChild(tbody);
	$("#medical-records-list").append(table);
}

let getMedicalRecordsList = () => {
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/doctor/medical_records',
	    	type: "get",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('doctor-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		displayMedicalRecordsList(result);
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#medical-records-list").html(err.responseJSON.message);
	    	}
	    });

	} else {
		$("#medical-records-list").html("There is something wrong, please try sign out and sign in again ");
	}
}

let getMedicalRecordDetail = (record_id) => {
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/medical_record/' + record_id,
	    	type: "get",
	    	dataType: 'json',
	    	contentType: 'application/json',
	    	success: function( result ) {
	    		displayMedicalRecords(result);
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			displayMedicalRecords();
	    	}
	    });

	} else {
		$("#medical-records").html("There is something wrong, please try sign out and sign in again ");
	}
}

let addMedicalRecord = (value) => {
	let record_id = getParameterByName('id')
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/medical_record/' + record_id,
	    	type: "post",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    data : JSON.stringify(value),
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('doctor-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		console.log(result);
	    		displayMedicalRecords(result);
	    		// $("#create_new_patient_success").html("Patient with username " +
	    		// 	result.username + " and password " + result.password 
	    		// 	+ " is created. They now can log in and change their password");
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#medical-records-list").html("There is something wrong, please try sign out and sign in again ");
	    	}
	    });

	} else {
		$("#medical-records-list").html("There is something wrong, please try sign out and sign in again ");
	}
	return false;
}

let deleteMedicalRecord = (value) => {
	let record_id = getParameterByName('id')
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/medical_record/' + record_id +"/delete",
	    	type: "post",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    data : JSON.stringify(value),
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('doctor-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		console.log(result);
	    		displayMedicalRecords(result);
	    		// $("#create_new_patient_success").html("Patient with username " +
	    		// 	result.username + " and password " + result.password 
	    		// 	+ " is created. They now can log in and change their password");
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#medical-records-list").html("There is something wrong, please try sign out and sign in again ");
	    	}
	    });

	} else {
		$("#medical-records-list").html("There is something wrong, please try sign out and sign in again ");
	}
	return false;
}

let updateMedicalRecord = (value) => {
	let record_id = getParameterByName('id')
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/medical_record/' + record_id +"/update",
	    	type: "post",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    data : JSON.stringify(value),
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('doctor-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		console.log(result);
	    		displayMedicalRecords(result);
	    		// $("#create_new_patient_success").html("Patient with username " +
	    		// 	result.username + " and password " + result.password 
	    		// 	+ " is created. They now can log in and change their password");
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#medical-records-list").html("There is something wrong, please try sign out and sign in again ");
	    	}
	    });

	} else {
		$("#medical-records-list").html("There is something wrong, please try sign out and sign in again ");
	}
	return false;
}

$(document).ready(function() {
  /*
	call api get medical_records
  */
  /*
	call api get severity_list
  */
  console.log(user);
  console.log(view);

  $("#patient_navbar li.active").removeClass("active");
  $("#navbar_medicalrecords").addClass("active");
  if(view=="records_list"){
  	getMedicalRecordsList();
  	// displayMedicalRecordsList(medicalRecords_doctor_list_dumb_data);
  }
  if(view=="record_detail"){
  	let record_id = getParameterByName('id')
  	getMedicalRecordDetail(record_id);
  	// displayMedicalRecords(mecialRecords_dumb_data);
  } 
});

