let displayPatientList = (patientList) => {
	$("#patient-list").empty();
	if(!patientList || patientList.length<=0){
		$("#patient-list").html("<h3>You have no patient</h3>")
		return;
	}

	let table = document.createElement("table");
	table.className= "table table-striped";
	table.innerHTML = 
		"<thead class='thead-light'>" + 
			"<tr>" +
				"<td>First_name</td>" +
				"<td>Last_name</td>" +
				"<td>Username</td>" +
			"</tr>" +
		"</thead>";

	let tbody = document.createElement("tbody");

	patientList.map( (patient, index) => {
		let record_tr = document.createElement("tr");
		record_tr.style.cursor = "pointer";
		record_tr.addEventListener("dblclick", (evt) => {
			window.location.href = HOST + "/patient/detail?id=" + patient._id;
		})

		let first_name_td = document.createElement("td");
		first_name_td.innerHTML = patient.first_name;
		record_tr.appendChild(first_name_td);

		let last_name_td = document.createElement("td");
		last_name_td.innerHTML = patient.last_name;
		record_tr.appendChild(last_name_td);

		let username_td = document.createElement("td");
		username_td.innerHTML = patient.username;
		record_tr.appendChild(username_td);

		tbody.appendChild(record_tr);
	})

	table.appendChild(tbody);
	$("#patient-list").append(table);
}

let displayPatientDetail = (patientInfo) => {
	$("#personal-info").empty();

	let {first_name, last_name, tel, mail, username, emergency, insurance, address, note } = patientInfo;
	let first_col = document.createElement('div');
	first_col.className = "col-xs-6";

	$("#personal-info").html(
		"<div id='update_patient_error' style='color:red; margin-bottom:15px'></div>"+
		"<div class='row'>"+
			"<div class='col-xs-6'>" +
				"<div class='col-xs-3'>"+
					"First Name: " +
				"</div>" +
				"<div class='col-xs-9'>"+
					"<input type='text' placeholder='No info about first name recorded' name='patient_first_name' disabled value='" + 
						(first_name || "" )+ 
					"' />" +
				"</div>" +
			"</div>" +
			"<div class='col-xs-6'>" +
				"<div class='col-xs-3'>"+
					"Last Name: " +
				"</div>" +
				"<div class='col-xs-9'>"+
					"<input type='text' placeholder='No info about last name recorded' name='patient_last_name' disabled value='" + 
						(last_name || "" )+ 
					"' />" +
				"</div>" +
			"</div>" +
		"</div>"+
		"<div class='row'>"+
			"<div class='col-xs-6'>" +
				"<div class='col-xs-3'>"+
					"Tel: " +
				"</div>" +
				"<div class='col-xs-9'>"+
					"<input type='text' placeholder='No info about telephone recorded' name='patient_tel' disabled value='" + 
						(tel || "" )+
					"' />" +
				"</div>"+
			"</div>"+
			"<div class='col-xs-6'>" +
				"<div class='col-xs-3'>"+
					"Mail: " +
				"</div>" +
				"<div class='col-xs-9'>"+
					"<input type='text' placeholder='No info about mail recorded' name='patient_mail' disabled value='" + 
						(mail || "" )+
					"' />" +
				"</div>"+
			"</div>"+
		"</div>" +
		"<div class='row'>"+
			"<div class='col-xs-6'>" +
				"<div class='col-xs-3'>"+
					"In case of emergency: " +
				"</div>" +
				"<div class='col-xs-9'>"+
					"<input type='text' placeholder='No info about emergency contact recorded' name='patient_emergency' disabled value='" + 
						(emergency || "" )+
					"' />" +
				"</div>" +
			"</div>" +
			"<div class='col-xs-6'>" +
				"<div class='col-xs-3'>"+
					"Insurance: " +
				"</div>" +
				"<div class='col-xs-9'>"+
					"<input type='text' placeholder='No info about insurance recorded' name='patient_insurance' disabled value='" + 
						(insurance || "" )+
					"' />" +
				"</div>" +
			"</div>"+
		"</div>" +
		"<div class='row'>"+
			"<div class='col-xs-6'>" +
				"<div class='col-xs-3'>"+
					"Address: " +
				"</div>" +
				"<div class='col-xs-9'>"+
					"<input type='text' placeholder='No info about address recorded' name='patient_address' disabled value='" +
						(address || "" )+  
					"' />" +
				"</div>" +
			"</div>" +
			"<div class='col-xs-6'>" +
				"<div class='col-xs-3'>"+
					"Note: " +
				"</div>" +
				"<div class='col-xs-9'>"+
					"<input type='text' placeholder='Nothing recorded' name='patient_note' disabled value='" +
						(note || "" )+  
					"' />" +
				"</div>"+
			"</div>" +
		"</div>"
	)
	if(view=="patient_detail"){
		let changeButtonContainer = document.createElement('div');
		changeButtonContainer.className="col-xs-4 col-xs-offset-8";
		let changeButton = document.createElement('button');
		changeButton.className= "change-button"
		changeButton.innerHTML="Change user info";

		changeButton.addEventListener("click", () => {
			$("#personal-info input[disabled]").removeAttr("disabled");
			$("#personal-info .change-button").html("Submit");
			$("#personal-info .change-button").removeClass("change-button").addClass("submit-button");
			$("#personal-info .submit-button").on('click', function(){
				let first_name = $("#personal-info input[name='patient_first_name']").val();
				let last_name = $("#personal-info input[name='patient_last_name']").val();
				let tel = $("#personal-info input[name='patient_tel']").val();
				let mail = $("#personal-info input[name='patient_mail']").val();
				let emergency = $("#personal-info input[name='patient_emergency']").val();
				let insurance = $("#personal-info input[name='patient_insurance']").val();
				let address = $("#personal-info input[name='patient_address']").val();
				let note = $("#personal-info input[name='patient_note']").val();


				updatePatientInfo({
					first_name, last_name, tel, mail, emergency,
					insurance, address, note
				});
			});;
		})

		changeButtonContainer.appendChild(changeButton);
		$("#personal-info").append(changeButtonContainer);
	}
	//first col
	
}

let createNewPatient = (event) => {
	console.log(event);
	$("#create_new_patient_error").html("");
	$("#create_new_patient_success").html("");
	let form = event.target;
	let first_name = $("input[name='patient_fist_name']").val();
	let last_name = $("input[name='patient_last_name']").val();
	let tel = $("input[name='patient_tel']").val();
	let username = $("input[name='patient_username']").val();
	let address = $("input[name='patient_address']").val();
	let insurance = $("input[name='patient_insurance']").val();
	let mail = $("input[name='patient_mail']").val();
	let password = $("input[name='patient_password']").val();
	let emergency = $("input[name='patient_emergency']").val();
	let note = $("input[name='patient_note']").val();

	var data = {
		first_name, last_name, tel, username, address, 
		insurance, mail, password, emergency, note
	}
	console.log(data);	
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/doctor/create_patient',
	    	type: "post",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    data : JSON.stringify(data),
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('doctor-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		$("#create_new_patient_success").html("Patient with username " +
	    			result.username + " and password " + result.password 
	    			+ " is created. They now can log in and change their password");
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#create_new_patient_error").html(err.responseJSON.message);
	    	}
	    });

	}
	return false;
}

let getPatientList = ()=>{
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/doctor/patient_list',
	    	type: "get",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('doctor-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		displayPatientList(result);
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

let getPatientInfo = () =>{
	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/patient',
	    	type: "get",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('patient-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		displayPatientDetail(result);
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#personal_info").html(err.responseJSON.message);
	    	}
	    });

	} else {
		$("#personal_info").html("There is something wrong, please try sign out and sign in again ");
	}
}

let updatePatientInfo = (value) =>{
	let patient_id = getParameterByName('id')
	$.ajax({
	    url: API_URL + '/patient',
	    type: "post",
	    dataType: 'json',
	    contentType: 'application/json',
		data : JSON.stringify(value),
		beforeSend: function(xhr){ 
    		xhr.setRequestHeader('patient-auth', patient_id);
    	},
	    success: function( result ) {
	    	displayPatientDetail(result);
	    },
	    error: function( err ) {
	    	console.log( "ERROR:  " + JSON.stringify(err) );
	    	console.log(err.responseJSON);
	    	if(err.responseJSON && err.responseJSON.message)
	    		$("#update_patient_error").html(err.responseJSON.message);
	   	}
	});
}

let getPatientDetail = (id) =>{
	$.ajax({
	    url: API_URL + '/patient',
	    type: "get",
	    dataType: 'json',
	    contentType: 'application/json',
		beforeSend: function(xhr){ 
    		xhr.setRequestHeader('patient-auth', id);
    	},
	    success: function( result ) {
	    	displayPatientDetail(result);
	    },
	    error: function( err ) {
	    	console.log( "ERROR:  " + JSON.stringify(err) );
	    	console.log(err.responseJSON);
	    	if(err.responseJSON && err.responseJSON.message)
	    		$("#personal_info").html(err.responseJSON.message);
	   	}
	});
}
$(document).ready(function() {
  /*
	call api get medical_records
  */
  /*
	call api get severity_list
  */
  $("#patient_navbar li.active").removeClass("active");
  $("#navbar_patient").addClass("active");
  if(view=="patient_list"){
  	getPatientList();
  	// displayMedicalAdvisesList(medicalAdvises_doctor_list_dumb_data);
  }

  if(view=="personal_info"){
  	getPatientInfo();
  }
  if(view=="patient_detail"){
  	let patient_id = getParameterByName('id')
  	getPatientDetail(patient_id);
  }
});

