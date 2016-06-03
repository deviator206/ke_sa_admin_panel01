<%@page import="java.util.Properties"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" import="java.io.*"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>[KeSa]Admin Panel</title>
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" >

<!-- Optional theme -->
<link rel="stylesheet" href="bootstrap/css/bootstrap-theme.min.css" >
<link rel="stylesheet" href="date-picker/css/bootstrap-datetimepicker.min.css" >
<style type="text/css">
.bs-wizard {margin-top: 40px;}

/*Form Wizard*/
.bs-wizard {border-bottom: solid 1px #e0e0e0; padding: 0 0 10px 0;}
.bs-wizard > .bs-wizard-step {padding: 0; position: relative;}
.bs-wizard > .bs-wizard-step + .bs-wizard-step {}
.bs-wizard > .bs-wizard-step .bs-wizard-stepnum {color: #595959; font-size: 16px; margin-bottom: 5px;}
.bs-wizard > .bs-wizard-step .bs-wizard-info {color: #999; font-size: 14px;}
.bs-wizard > .bs-wizard-step > .bs-wizard-dot {position: absolute; width: 30px; height: 30px; display: block; background: #fbe8aa; top: 45px; left: 50%; margin-top: -15px; margin-left: -15px; border-radius: 50%;} 
.bs-wizard > .bs-wizard-step > .bs-wizard-dot:after {content: ' '; width: 14px; height: 14px; background: #fbbd19; border-radius: 50px; position: absolute; top: 8px; left: 8px; } 
.bs-wizard > .bs-wizard-step > .progress {position: relative; border-radius: 0px; height: 8px; box-shadow: none; margin: 20px 0;}
.bs-wizard > .bs-wizard-step > .progress > .progress-bar {width:0px; box-shadow: none; background: #fbe8aa;}
.bs-wizard > .bs-wizard-step.complete > .progress > .progress-bar {width:100%;}
.bs-wizard > .bs-wizard-step.active > .progress > .progress-bar {width:50%;}
.bs-wizard > .bs-wizard-step:first-child.active > .progress > .progress-bar {width:0%;}
.bs-wizard > .bs-wizard-step:last-child.active > .progress > .progress-bar {width: 100%;}
.bs-wizard > .bs-wizard-step.disabled > .bs-wizard-dot {background-color: #f5f5f5;}
.bs-wizard > .bs-wizard-step.disabled > .bs-wizard-dot:after {opacity: 0;}
.bs-wizard > .bs-wizard-step:first-child  > .progress {left: 50%; width: 50%;}
.bs-wizard > .bs-wizard-step:last-child  > .progress {width: 50%;}
.bs-wizard > .bs-wizard-step.disabled a.bs-wizard-dot{ pointer-events: none; }
/*END Form Wizard*/



</style>
<!-- Latest compiled and minified JavaScript -->
<script src="bootstrap/js/jquery-2.2.4.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>

<script src="date-picker/js/bootstrap-datetimepicker.min.js"></script>


</head>

<body>
<div class="container">
	<div class="pager"> 
		<h1> Admin Panel </h1>
	</div>
		<%
		 final String value = System.getenv("JAVA_HOME");
		 System.out.println(value);
		 File f1 = new File(value);
		 
		 System.out.println(f1);
		 System.out.println(f1.list());
		 String[] fileNames = f1.list();
		 File[] fileObjects = f1.listFiles();
		 %> 
            <div class="row bs-wizard" style="border-bottom:0;">
                
                <div class="col-xs-3 bs-wizard-step active" id="step_1">
                  <div class="text-center bs-wizard-stepnum">Step 1 : Select File Path & Time </div>
                  <div class="progress"><div class="progress-bar"></div></div>
                  <a href="#" class="bs-wizard-dot"></a>
                  <div class="bs-wizard-info text-center">
                  Select file from list displayed below
                  </div>
                </div>
                
                <div class="col-xs-3 bs-wizard-step disabled" id="step_2"><!-- complete -->
                  <div class="text-center bs-wizard-stepnum">Step 2 : Extension & Email Ids </div>
                  <div class="progress"><div class="progress-bar"></div></div>
                  <a href="#" class="bs-wizard-dot"></a>
                  <div class="bs-wizard-info text-center">
                  		Select Time & date for triggering the File
                  </div>
                </div>
                
                <div class="col-xs-3 bs-wizard-step disabled" id="step_3"><!-- active -->
                  <div class="text-center bs-wizard-stepnum">Step 3 : Confirmation </div>
                  <div class="progress"><div class="progress-bar"></div></div>
                  <a href="#" class="bs-wizard-dot"></a>
                  <div class="bs-wizard-info text-center"> 
                  	Confirmation
                  </div>
                </div>
            </div>
        
        
 

	<div id="step_panel_1" class="panel panel-default" name="my_sec_panel"> 
		 	<form role="form" class="panel-body">
				<% 
			 for(int i=0;i<fileObjects.length;i++){
				 %>
				 <% if(!fileObjects[i].isDirectory()) {%>
				 <div class="radio">
				 	<label><input type="radio" name="optFilePathRadio" value="<%= fileObjects[i]%>" checked="checked"><%= fileObjects[i]%></label>
					 
				</div>	 
				<%  
					}
				 }
				 %>
				 
				 
				 
				 <h1> Extension Panel</h1>
				
			
		
			</form>
			
			
			
	  </div>  
        
        
        
	  
	  <div id="step_panel_2" class="panel panel-default" name="my_sec_panel"> 
		 	<div  class="panel-body">
				<h3> Select Date & Time </h3>	
				<div class="well">
				  <div id="datetimepicker1" class="input-append date">
				    <input data-format="dd/MM/yyyy" type="text"></input>
				    <span class="add-on">
				      <i data-time-icon="icon-time" data-date-icon="icon-calendar">
				      </i>
				    </span>
				  </div>
				</div>
				
				
				
				<h3> Select Date & Time </h3>	
				<div class="well">
				<div id="datetimepicker2" class="input-append date">
				    <input data-format="hh:mm:ss" type="text"></input>
				    <span class="add-on">
				      <i data-time-icon="icon-time" data-date-icon="icon-calendar">
				      </i>
				    </span>
				  </div>
				 </div> 
				
			</div>
	  </div>
	  
	  <div id="step_panel_3" class="panel panel-default" name="my_sec_panel"> 
		 	<div  class="panel-body">
				<h1> Confirmation</h1>
			</div>
	  </div>
	  
        

	<div class="pager">
		<button type="button" class="btn btn-default btn-lg" onclick="moveToPreviousStep()">
		  <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>Previous
		</button>
		<button type="button" class="btn btn-default btn-lg" onclick="moveToNextStep()">
		  <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> Next
		</button>
	</div>

</div>

<script>

var currentStep = 1 ;
var totalSteps =4;
function moveToPreviousStep(){
	if(currentStep <= 1){
		//do nothing
	}
	else{
		currentStep--;
	}
	
	showViewAsPerStep(currentStep);
	markCompleteOrActivePrev(currentStep);
}


function moveToNextStep(){
	if(checkValidity()){
		if(currentStep >= totalSteps){
			currentStep = totalSteps;
		}
		else{
			currentStep++;
		}
		
		showViewAsPerStep(currentStep);
		markCompleteOrActive(currentStep);
	}
}

var FILE_PATH = ""

function markCompleteOrActivePrev(cStep){

	$("#step_"+cStep).removeClass("disabled");
	$("#step_"+cStep).addClass("active");
		
	cStep = cStep + 1;
	$("#step_"+cStep).addClass("disabled");
	$("#step_"+cStep).removeClass("active");
	$("#step_"+cStep).removeClass("complete");
	
}


function markCompleteOrActive(cStep){

	$("#step_"+cStep).removeClass("disabled");
	$("#step_"+cStep).addClass("active");
	cStep = cStep -1;
	$("#step_"+cStep).addClass("complete");
	$("#step_"+cStep).removeClass("active");
	
}


function showViewAsPerStep(cStep){
	var panels = document.getElementsByName('my_sec_panel');
	for(var i = 0; i < panels.length; i++){
		panels[i].style.display="none";
	}
	document.getElementById("step_panel_"+cStep).style.display="block";
	
	
}

function checkValidity(){
	var bReturn  = true;
	switch(currentStep){
	case 1:
		
		var rates = document.getElementsByName('optFilePathRadio');
		var rate_value="";
		for(var i = 0; i < rates.length; i++){
		    if(rates[i].checked){
		        rate_value = rates[i].value;
		    }
		}
		if(rate_value != ""){
			FILE_PATH = rate_value;
			bReturn = true;
		}
		break;
	case 2:
		break;
	case 3:
		break;
	case 4:
		break;
	}
	
	return bReturn;
}


  

$(function() {
    $('#datetimepicker1').datetimepicker({
    	 format: 'dd/MM/yyyy',
    	 pickTime: false
        
    });
    
    $('#datetimepicker2').datetimepicker({
   	 format: 'hh:mm:ss',
   	 pickDate: false
       
   });
  
    showViewAsPerStep(1)
  
  });
  
  
  
  

</script>
</body>
</html>