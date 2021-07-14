$(document).ready(
	function () {

		var uid;
	$('#reservet').submit(function (e) {


		e.preventDefault();

		var editDatacontact = {
		
			fullname: $('#fullname').val(),
			email: $('#email').val(),
			phoneno: $('#phoneno').val(),
			address: $('#address').val(),
			departure: $('#departure').val(),
			destination: $('#destination').val(),
			people: $('#people').val(),
		}
		console.log(editDatacontact);
		$.ajax({

			url: 'http://localhost:3003/v1/reserve/' + uid, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
			method: "PUT",
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(editDatacontact),
			success: function (result) {
				console.log(result)
				window.location.href = "admindashboard.html";
			},
			error: function () {
				window.location.href = "admindashboard.html";
			}

		})

		

	})






	$('#reservelist').on('click', '#edit', function () {
		//this is the userid 
		uid = $(this)[0].attributes.uid.nodeValue;
		//cid = $(this).attr('cid');
		// var uid = $(this).attr('uid');
		$.ajax({

			url: 'http://localhost:3003/v1/reserve/' + uid,
			method: 'GET',
			dataType: 'json',
			success: function (result) {
				// console.log(result.username)
				
				$('#fullname').val(result.fullname)
				$('#email').val(result.email)
				$('#phoneno').val(result.phoneno)
				$('#address').val(result.address)
				$('#departure').val(result.departure)
				$('#destination').val(result.destination)
				$('#people').val(result.people)
			
				// window.location.href = "admindashboard.html";

			},
			error: function () {

			}
		})


	})

	$('#reservelist').on('click', '#delete', function () {

		console.log('delete pressed');
		console.log($(this)[0].attributes.uid.nodeValue);
		console.log($(this));
		// uid = $(this)[0].attributes.vid.nodeValue;
		var uid = $(this).attr('uid');
		console.log(uid);
		var isDelete = confirm("Are your sure you want to delete ? ");

		if (isDelete == true) {
			$.ajax({

				url: 'http://localhost:3003/v1/reserve/' + uid,
				method: 'delete',
				dataType: 'json',
				success: function () {
					window.location.href = "admindashboard.html";

				},
				error: function () {
					window.location.href = "admindashboard.html";

				}
			})

		} else { // handle else 

		}

	})






		$.ajax({


			url: 'http://localhost:3003/v1/reserve',
			method: 'GET',
			dataType: 'json',
			// headers: { authorization: window.localStorage.getItem('token') },
			success: function (result, status) {
				console.log(result);
				for (key in result) {
	
					// console.log(result[key].Name)
					// console.log(result[key].email)
					// console.log(result[key].Phoneno)
					// console.log(result[key].Message)
				
	
	
					$('#reservelist').append('<tr> ]\
						<td>' + result[key].id + '</td> \
						<td>' + result[key].fullname + '</td> \
						<td>' + result[key].email + '</td> \
						<td>' + result[key].phoneno + '</td> \
                        <td>' + result[key].address + '</td> \
                        <td>' + result[key].departure + '</td> \
                        <td>' + result[key].destination + '</td> \
                        <td>' + result[key].people + '</td> \
						<td><button type="button" uid="' + result[key].id + '" data-toggle="modal" data-target="#exampleModals1" \
						id="edit"  class="btn btn-primary">Edit</button></td>\
						<td><button type="button" uid="' + result[key].id + '"  id="delete" class="btn btn-danger">Delete</button></td>\
						</tr>')
				}
			},
			error: function (jqXHR, status) {
	
			}
	
	
		})

	
		

		
		
	})


	$(document).on('submit', '#reserveForm', function(e){
		e.preventDefault();
		var myFormData = {
				fullname: $('#fullname').val(),
				email: $('#email').val(),
                phoneno: $('#phoneno').val(),
                address: $('#address').val(),
                departure: $('#departure').val(),
                destination: $('#destination').val(),
                people: $('#people').val(),
			}
			$.ajax({
				url: 'http://localhost:3003/v1/reserve',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(myFormData),

				success: function (result, status) {
					
					alert('Registered');
					
				},
				error: function (jqXHR, status) {
					console.log(jqXHR);
				
					alert('milyena');
				}
			})







		

			
	});






	
	