$(function() {
	'use strict';
	
  $('.form-control').on('input', function() {
	  var $field = $(this).closest('.form-group');
	  if (this.value) {
	    $field.addClass('field--not-empty');
	  } else {
	    $field.removeClass('field--not-empty');
	  }
	});

});
//Confirm password
var check = function() {
	if (document.getElementById('password').value ==
	  document.getElementById('confirm_password').value) {
	  document.getElementById('message').style.color = 'green';
	  document.getElementById('message').innerHTML = 'matching';
	} else {
	  document.getElementById('message').style.color = 'red';
	  document.getElementById('message').innerHTML = 'not matching';
	}
  }