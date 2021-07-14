$(document).ready(
	function () {

		var uid;
	$('#Contactt').submit(function (e) {


		e.preventDefault();

		var editDatacontact = {
			Name: $('#Name').val(),
			email: $('#email').val(),
			Phoneno: $('#Phoneno').val(),
			Message: $('#Message').val(),
			
		}

		console.log(editDatacontact);
		$.ajax({

			url: 'http://localhost:3003/v1/contact/' + uid, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
			method: "PUT",
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(editDatacontact),
			success: function (result) {
				console.log(result)
				window.location.href="admindashboard.html";
				// your logic here , redirect to another page or show message etc
			},
			error: function () {
				window.location.href="admindashboard.html";

			}

		})

	})





	$('#contactlist').on('click', '#edit', function () {
		//this is the userid 
		 uid = $(this)[0].attributes.uid.nodeValue;
		// console.log($(this));
		// var uid = $(this).attr('uid');
		$.ajax({

			url: 'http://localhost:3003/v1/contact/' + uid,
			method: 'GET',
			dataType: 'json',
			success: function (result) {
				// console.log(result.username)
				$('#Name').val(result.Name)
				$('#email').val(result.email)
				$('#Phoneno').val(result.Phoneno)

				$('#Message').val(result.Message)
			
				// window.location.href = "admindashboard.html";

			},
			error: function () {

			}
		})


	})

	$('#contactlist').on('click', '#delete', function () {

		console.log('delete pressed');
		console.log($(this)[0].attributes.uid.nodeValue);
		console.log($(this));
		// uid = $(this)[0].attributes.vid.nodeValue;
		var uid = $(this).attr('uid');
		console.log(uid);
		var isDelete = confirm("Are your sure you want to delete ? ");

		if (isDelete == true) {
			$.ajax({

				url: 'http://localhost:3003/v1/contact/' + uid,
				method: 'delete',
				dataType: 'json',
				success: function () {
					window.location.href = "admindashboard.html";

				},
				error: function () {
				window.location.href="admindashboard.html";


				}
			})

		} else { // handle else 

		}

	})

	

	



		$.ajax({


			url: 'http://localhost:3003/v1/contact',
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
				
	
	
					$('#contactlist').append('<tr> ]\
						<td>' + result[key].id + '</td> \
						<td>' + result[key].Name + '</td> \
						<td>' + result[key].email + '</td> \
						<td>' + result[key].Phoneno + '</td> \
						<td>' + result[key].Message + '</td> \
						<td><button type="button" uid="' + result[key].id + '" data-toggle="modal" data-target="#exampleModals" \
						id="edit"  class="btn btn-primary">Edit</button></td>\
						<td><button type="button" uid="' + result[key].id + '"  id="delete" class="btn btn-danger">Delete</button></td>\
						</tr>')
				}
			},
			error: function (jqXHR, status) {
	
			}
	
	
		})

	
		

		
	})


	$(document).on('submit', '#suggestionForm', function(e){
		e.preventDefault();
		var myFormData = {
				Name: $('#Name').val(),
				email: $('#email').val(),
                Phoneno: $('#Phoneno').val(),
                Message: $('#Message').val(),
			}
			$.ajax({
				url: 'http://localhost:3003/v1/contact',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(myFormData),

				success: function (result, status) {
					// console.log(result);
					// console.log(result.message); 
					// console.log(status);
					alert('Registered');
					// $('#message').html(result.message)


					// $('#rform').hide();
					// $('#lform').show()
				},
				error: function (jqXHR, status) {
					console.log(jqXHR);
					// console.log(jqXHR.responseJSON.message);
					// $('#message').html(jqXHR.responseJSON.message)
					alert('Error');
				}
			})







			
	});






	
	