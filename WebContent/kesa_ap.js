/**
 * 
 */
	var NEW_PROCESS_STATE = {
			
		//test connection not intiated
		"1":{
			"NXT":"HIDE",
			"PREV":"HIDE",
			"DONE":"HIDE"
		},
		// test connection successful
		"2":{
			"NXT":"SHOW",
			"PREV":"HIDE",
			"DONE":"HIDE"
		},
		//configuration filled
		"3":{
			"NXT":"SHOW",
			"PREV":"SHOW",
			"DONE":"HIDE"
		},
		//confirmation screen
		"4":{
			"NXT":"HIDE",
			"PREV":"SHOW",
			"DONE":"SHOW"
		}
	}
	

var kesa = kesa || {};

$(function(){

	KESA = new kesa.AdminPanelController();
});
	


kesa.AdminPanelView = function(){
	this.allUIPagesClassIdentifier = "kesa-page";
	this.hideMeClassIdentifier="kesa-hide-me";
	this.pageVisibilityStateMapper =  {
		"1":"loginPage",
		"2":"dashBoardPage",
		"3":"newProcessPage"
	};
	this.pageVisibilityState= 1;
	this.processStep = 1;
	
	this.serviceMgr = new kesa.AdminPanelServiceLayer();
	
	this.configurationObject={
			"SERVER_FILE_PATH":"",
			"TIME":"",
			"DATE":"",
			"EXTENSION":"",
			"EMAIL":""
			
	};
	
}	
kesa.AdminPanelView.prototype={
		
		onAppLoaded :function(){
			this.pageVisibilityState =1 ;
			this.showPageAsPerState();
			this.addLoginListeners();
			
		},
		hideAll:function(){
			$("."+this.allUIPagesClassIdentifier).addClass(this.hideMeClassIdentifier);
			
		},
		showPageAsPerState :function(){
			this.hideAll();
			$("#"+this.pageVisibilityStateMapper[this.pageVisibilityState]).removeClass(this.hideMeClassIdentifier);
			
			if(this.pageVisibilityState === 3){
				this.processStep = 1;
				this.renderProcessSteps();
			}
			
		},
		renderProcessSteps :function(){
			this.renderUIBtns(NEW_PROCESS_STATE[this.processStep]);
			switch(this.processStep){
			case 1:
			case 2:
				$("#process2").removeClass("btn-info");
				$("#process3").removeClass("btn-info");
				$("#process1").addClass("btn-info");
				$("#menu2").removeClass("active");
				$("#menu3").removeClass("active");
				$("#menu1").addClass("active");
				break;
			case 3:
				$("#process1").removeClass("btn-info");
				$("#process3").removeClass("btn-info");
				$("#process2").addClass("btn-info");
				$("#menu2").addClass("active");
				
				$("#menu1").removeClass("active");
				$("#menu3").removeClass("active");
				break;
			case 4:	
				$("#process1").removeClass("btn-info");
				$("#process2").removeClass("btn-info");
				$("#process3").addClass("btn-info");
				$("#menu3").addClass("active");
				
				$("#menu2").removeClass("active");
				$("#menu1").removeClass("active");
				
				break;
			}
		},
		renderUIBtns:function(obj){
			//nxt
			if(obj["NXT"] === "SHOW" ){
				$("#kesaNextBtn").removeClass(this.hideMeClassIdentifier)
			}else {
				$("#kesaNextBtn").addClass(this.hideMeClassIdentifier)
			}
			
			
			//nxt
			if(obj["PREV"] === "SHOW" ){
				$("#kesaBackBtn").removeClass(this.hideMeClassIdentifier)
				
			}else {
				$("#kesaBackBtn").addClass(this.hideMeClassIdentifier)
			}
			
			
			//nxt
			if(obj["DONE"] === "SHOW" ){
				$("#kesaDoneBtn").removeClass(this.hideMeClassIdentifier)
				
			}else {
				$("#kesaDoneBtn").addClass(this.hideMeClassIdentifier)
			}
			
			
		},
		addLoginListeners:function(){
			
			$("#kesaLoginBtn").on("click",this.loginClicked.bind(this));
			
			$("#kesaDashboardNewProcess").on("click",this.dashboardOptionClicked.bind(this));
			$("#kesaDashboardEalierProcess").on("click",this.dashboardOptionClicked.bind(this));
			$("#kesaDashboardEditUserDetails").on("click",this.dashboardOptionClicked.bind(this));
			$("#kesaDashboardCreateMoreUsers").on("click",this.dashboardOptionClicked.bind(this));
			
			$("#kesaNavigateToHome").on("click",this.navigateToHome.bind(this));
			
			$("#kesaTestConnectionBtn").on("click",this.testConnectivity.bind(this));
			
			$("#kesaNextBtn").on("click",this.processStepNextBtnClicked.bind(this));
			$("#kesaBackBtn").on("click",this.processStepPrevBtnClicked.bind(this));
			$("#kesaDoneBtn").on("click",this.processStepDoneBtnClicked.bind(this));
			
			$("#kesaFetchFileList").on("click",this.fetchFileListClicked.bind(this));
			
		},
		processStepDoneBtnClicked :function(){
			this.serviceMgr.triggerConfigSubmission(this.configurationObject, this.onConfigSubmissionResponse);
			this.onConfigSubmissionResponse();
			
		},
		onConfigSubmissionResponse :function(){
			$("#postConfigSubmissionMsg").html("Sucessfully Submitted the configuration");
		},
		fetchFileListClicked :function(){
			this.serviceMgr.triggerConnectivity({}, this.onfileNamesFetchedResponse);
			this.onfileNamesFetchedResponse();
			
		},
		onfileNamesFetchedResponse :function(){
			$("#kesaFileRadioList").empty();
			var resp =[
			          {
			        	  "fileName":"kuchBhi"
			          },
			          {
			        	  "fileName":"kuchBhi2"
			          },
			          
			          {
			        	  "fileName":"kuchBhi3"
			          }
			          ];
			
			var strHTML =""
			for(var i =0;i<resp.length;i++){
				strHTML += '<div><input type="radio" name="optFilePathRadio" value="'+resp[i]["fileName"]+'" checked="checked">'+resp[i]["fileName"]+'</div>'
			}
			$("#kesaFileRadioList").append(strHTML);
			this.configurationObject["SERVER_FILE_PATH"] = ""; 
			
			//this.configurationObject
			//this.validateConfigurationSetting()
		},
		validateConfigurationSetting :function(){
			
			var rates = document.getElementsByName('optFilePathRadio');
			this.configurationObject["SERVER_FILE_PATH"] = "";
			this.configurationObject["TIME"] = "";
			this.configurationObject["DATE"] = "";
			this.configurationObject["EXTENSION"] = "" ;
			this.configurationObject["EMAIL"] = "" ;
				
			//populate file path
			for(var i = 0; i < rates.length; i++){
			    if(rates[i].checked){
			    	this.configurationObject["SERVER_FILE_PATH"] = rates[i].value;
			    }
			}
			
			//populate date
			this.configurationObject["DATE"] = $("#kesaConfigDate").val();
			this.configurationObject["TIME"] = $("#kesaConfigTime").val();
			this.configurationObject["EMAIL"] = $("#kesaEmailIds").val();
			this.configurationObject["EXTENSION"] = $("#kesaExtensionRadioList").val();
			$("#configurationNotFilledMsg").html("")
			
			if(this.configurationObject["SERVER_FILE_PATH"] != undefined &&
					this.configurationObject["TIME"] != undefined &&
					this.configurationObject["DATE"] != undefined &&
					this.configurationObject["EXTENSION"] != undefined &&
					this.configurationObject["EMAIL"] !=  undefined &&
					this.configurationObject["SERVER_FILE_PATH"] != "" && 
					this.configurationObject["TIME"] != "" &&
					this.configurationObject["DATE"] != "" &&
					this.configurationObject["EXTENSION"] != "" &&
					this.configurationObject["EMAIL"] != "" ){
				
				
				
			
				this.processStep++;
				this.renderProcessSteps();
				
				$("#filePathConfirmation").html(this.configurationObject["SERVER_FILE_PATH"]);
				$("#dateConfirmation").html(this.configurationObject["DATE"]);
				$("#timeConfirmation").html(this.configurationObject["TIME"]);
				$("#outputConfirmation").html(this.configurationObject["EXTENSION"]);
				$("#emailsConfirmation").html(this.configurationObject["EMAIL"]);
				
				
			}
			else{
				$("#configurationNotFilledMsg").html("Please fill in all the configuration")
			}
			
		},
		processStepPrevBtnClicked :function(){
			console.log(this.processStep)
			this.processStep--;
			this.renderProcessSteps();
			
			
		},
		processStepNextBtnClicked :function(){
			if(this.processStep === 3)
				{
					this.validateConfigurationSetting();
				}
			else{
					this.processStep++;
					this.renderProcessSteps();
				}
		},
		
		testConnectivity:function(){
			this.serviceMgr.triggerConnectivity({}, this.onConnectivityResponse);
			this.onConnectivityResponse();
		},
		onConnectivityResponse:function(){
			
			this.processStep = 2;
			this.renderProcessSteps();
		},
		navigateToHome :function(){
			$("#connectionResultMessage").html("");
			$("#kesaFileRadioList").empty();
			$("#kesaConfigDate").val("");
			$("#kesaConfigTime").val("");
			$("#kesaEmailIds").val("");
			$("#kesaServerURL").val("");
			
			this.pageVisibilityState =2 ;
			this.showPageAsPerState();
			
		},
		dashboardOptionClicked:function(evt){
			switch($(evt.currentTarget).attr("data-map")){
				case "kesa_dashboard_01":
					this.pageVisibilityState =3 ;
					this.showPageAsPerState();
					break;
			}
		},
		loginClicked:function(){
			$("#kesaLoginValidationMsg").html("")
			if($("#kesaUserName").val() === "" || $("#kesaPassword").val() === ""){
				$("#kesaLoginValidationMsg").html(" Please verify username & password ")
				return;
			}
			else{
				this.serviceMgr.triggerLogin({
					"userName":$("#kesaUserName").val(),
					"userPassword":$("#kesaPassword").val()
				}, this.onLoginResponse);
				
				this.onLoginResponse();
			}
			
		},
		onLoginResponse:function(response){
			this.pageVisibilityState =2 ;
			this.showPageAsPerState();
		}
}




kesa.AdminPanelServiceLayer = function(){
	
}

kesa.AdminPanelServiceLayer.prototype={
		triggerLogin :function(data,loginCallBack,loginCallBackError){
			/*$.ajax({
				url:"",
				data:data,
				type:"POST",
				success:loginCallBack,
				error:loginCallBackError,
				timeout:loginCallBackError
			});*/
		},
		triggerConnectivity:function(data,connectivityCallBack,connectivityCallBackError){
			$.ajax({
				url:"",
				data:data,
				type:"GET",
				success:connectivityCallBack,
				error:connectivityCallBackError,
				timeout:connectivityCallBackError
				
			});
		},
		triggerConfigSubmission:function(data,submissionCallBack,submissionCallBackError){
			$.ajax({
				url:"",
				data:data,
				type:"POST",
				success:submissionCallBack,
				error:submissionCallBackError,
				timeout:submissionCallBackError
				
			});
		}
		
}


kesa.AdminPanelController= function(){
	this.viewMgr ;
	this.createViewInstance();
	
}  


kesa.AdminPanelController.prototype={
		
		createViewInstance :function(){
			console.log("view Instance");
			viewMgr = new kesa.AdminPanelView();
			viewMgr.onAppLoaded();
		},
		
}