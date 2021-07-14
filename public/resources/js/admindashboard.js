
$(document).ready(function () {
	var uid;
	$('#editUserr').submit(function (e) {


		e.preventDefault();

		var editData = {
			Firstname: $('#Firstname').val(),
			Lastname: $('#Lastname').val(),
			Phoneno: $('#Phoneno').val(),
			username: $('#username').val(),
			address: $('#address').val()
		}

		$.ajax({

			url: 'http://localhost:3003/v1/users/' + uid, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
			method: "PUT",
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(editData),
			success: function (result) {
				console.log(result)
				window.location.href = "admindashboard.html";
				
				// your logic here , redirect to another page or show message etc
			},
			error: function () {

			}

		})

	})





	$('#userslist').on('click', '#edit', function () {
		//this is the userid 
		uid = $(this)[0].attributes.uid.nodeValue;
		// var uid = $(this).attr('uid');
		$.ajax({

			url: 'http://localhost:3003/v1/users/' + uid,
			method: 'GET',
			dataType: 'json',
			success: function (result) {
				console.log(result.username)
				$('#id').val(result.id)
				$('#Firstname').val(result.Firstname)
				$('#Lastname').val(result.Lastname)
				$('#Phoneno').val(result.Phoneno)

				$('#username').val(result.username)
				$('#address').val(result.address)
				// window.location.href = "admindashboard.html";

			},
			error: function () {

			}
		})


	})

	$('#userslist').on('click', '#delete', function () {

		console.log('delete pressed');
		console.log($(this)[0].attributes.uid.nodeValue);
		// console.log($(this));
		uid = $(this)[0].attributes.uid.nodeValue;
		var isDelete = confirm("Are your sure you want to delete ? ");

		if (isDelete == true) {
			$.ajax({

				url: 'http://localhost:3003/v1/users/' + uid,
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


		url: 'http://localhost:3003/v1/users',
		method: 'GET',
		dataType: 'json',
		// headers: { authorization: window.localStorage.getItem('token') },
		success: function (result, status) {
			// console.log(result);
			for (key in result) {

				


				$('#userslist').append('<tr> ]\
					<td>' + result[key].id + '</td> \
					<td>' + result[key].Firstname + '</td> \
					<td>' + result[key].Lastname + '</td> \
					<td>' + result[key].Phoneno + '</td> \
					<td>' + result[key].username + '</td> \
					<td>' + result[key].address + '</td> \
					<td><button type="button" uid="' + result[key].id + '" data-toggle="modal" data-target="#exampleModal" \
					id="edit"  class="btn btn-primary">Edit</button></td>\
					<td><button type="button" uid="' + result[key].id + '"  id="delete" class="btn btn-danger">Delete</button></td>\
					</tr>')
			}
		},
		error: function (jqXHR, status) {

		}


	})
	$(document).on('submit', '#addPic', function (event) {
		event.preventDefault();
		// first uploads register profile photo
		// console.log($('#locationphoto')[0]);
		var userRegisterFormPhoto = 
		$('#locationphoto')[0].files[0];

		var formdata = new FormData();
		formdata.append("locationphoto", userRegisterFormPhoto);
		// ajax for storing photo of user
		$.ajax({
			url: 'http://localhost:3003/user/add/locationphoto',
			method: 'POST',
			contentType: false,
			processData: false,
			data: formdata,
			dataType: 'json',
			success: function (result, status) {
				console.log(status);
				console.log(result.name);
				console.log(result.message)
				var name = result.name;
				uploadText(name);
				
			},
			error: function (jqXHR, status) {
				// console.log(jqXHR.responseJSON.message);
				console.log('upload failed');
			}
		});
	});

function uploadText(name){
	var formdata = new FormData();
		var myFormData = {
				Image: name,
				Name: $('#Name').val(),
                Price: $('#Price').val(),
                Description: $('#Description').val()
			}
			// console.log(myFormData);
			$.ajax({
				url: 'http://localhost:3003/v1/book',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(myFormData),
				success: function (result, status) {
					// console.log(result);
					console.log(result.message); 
					console.log(status);
					alert(result.message);
					// $('#message').html(result.message)
					// $('#rform').hide();
					// $('#lform').show()
				},
				error: function (jqXHR, status) {
					console.log(jqXHR);
					// console.log(jqXHR.responseJSON.message);
					$('#message').html(jqXHR.responseJSON.message)
					// alert('milyena');
				}
			});
}
	

			
})