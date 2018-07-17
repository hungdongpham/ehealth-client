let createNewDoctor = (event) => {
	$("#create_new_doctor_error").html("");
	$("#create_new_doctor_success").html("");
	let form = event.target;
	let first_name = $("input[name='doctor_first_name']").val();
	let last_name = $("input[name='doctor_last_name']").val();
	let tel = $("input[name='doctor_tel']").val();
	let username = $("input[name='doctor_username']").val();
	let address = $("input[name='doctor_address']").val();
	let hospital = $("input[name='doctor_hospital']").val();
	let mail = $("input[name='doctor_mail']").val();
	let password = $("input[name='doctor_password']").val();
	let speciality = $("input[name='doctor_speciality']").val();
	let note = $("input[name='doctor_note']").val();

	var data = {
		first_name, last_name, tel, username, address, 
		hospital, mail, password, speciality, note
	}

	if(getCookie("ehealth_id")){
		$.ajax({
	    	url: API_URL + '/doctor/create_patient',
	    	type: "post",
	    	dataType: 'json',
	    	contentType: 'application/json',
		    data : JSON.stringify(data),
		    beforeSend: function(xhr){ 
    			xhr.setRequestHeader('admin-auth', getCookie("ehealth_id"));
    		},
	    	success: function( result ) {
	    		$("#create_new_doctor_success").html("Patient with username " +
	    			result.username + " and password " + result.password 
	    			+ " is created. They now can log in and change their password");
	    	},
	    	error: function( err ) {
	    		console.log( "ERROR:  " + JSON.stringify(err) );
	    		console.log(err.responseJSON);
	    		if(err.responseJSON && err.responseJSON.message)
	    			$("#create_new_doctor_error").html(err.responseJSON.message);
	    	}
	    });

	}
	return false;
}