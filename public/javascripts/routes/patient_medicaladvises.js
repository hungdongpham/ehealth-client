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
	medicalAdviseDate.innerHTML = (medicalAdvise && medicalAdvise.date)? 
		moment(medicalAdvise.date).format("DD/MM/YYYY") : "";

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
			let avatar = (answer.author && answer.author.avatar && answer.author.avatar.trim()!="")? 
				answer.author.avatar : "images/default-avatar.png"
			let avatarImg = document.createElement("img");
			avatarImg.setAttribute("src", avatar);
			avatarImg.style.width="100%";
			avatarContainer.appendChild(avatarImg);

			let adviseContainer = document.createElement("div");
			adviseContainer.className = "col-xs-10 answer-detail";
			adviseContainer.innerHTML= 
				"<div class='row answer-info'>" +
					"<div class='col-xs-10'>Dr. " +
						answer.author.name +
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
		let content = "Your question are was sent";
		if(medicalAdvise && medicalAdvise.assignedTo && medicalAdvise.assignedTo.name)
			content += " to Dr. "  + medicalAdvise.assignedTo.name;
		content += "! Please patiently wait for the answer.";

		answersContent.innerHTML = content;
	}

	medicalAdviseDetail.appendChild(answersContent);
	return medicalAdviseDetail;
}

let displayMedicalAdvises = (listMedicalAdvisesArray) => {
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

		$("#medical-advises").append(medicalAdviseItem);
	}
}

$(document).ready(function() {
  /*
	call api get medical_advises
  */
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

  displayMedicalAdvises(listMedicalAdvisesArray);
});

