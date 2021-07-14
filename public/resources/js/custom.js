$(document).ready(
	function () {

		// $('#lform').hide();
		$('#registerForm').submit(function (event) {
			event.preventDefault();
			var myFormData = {
				id: $('#id').val(),
				Firstname: $('#Firstname').val(),
				Lastname: $('#Lastname').val(),
				Phoneno: $('#Phoneno').val(),
				username: $('#username').val(),
				address: $('#address').val(),
				password: $('#password').val(),

			}

			

			$.ajax({
				url: 'http://localhost:3003/v1/users',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(myFormData),

				success: function (result, status) {
					
					$('#message').html(result.message)


				
				},
				error: function (jqXHR, status) {
					console.log(jqXHR);
					
					$('#message').html(jqXHR.responseJSON.message)
				}
			})

		})


		$('#loginForm').submit(function (event) {
			event.preventDefault();
			var myFormData = {
				username: $('#username').val(),

				password: $('#password').val(),

			}
			console.log(myFormData);



			$.ajax({
				url: 'http://localhost:3003/v1/auth',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(myFormData),
				dataType: 'json',

				success: function (result, status) {
					console.log(result.token);
					window.localStorage.setItem('token',result.token);
					// $('#message').html(result.message)
					window.location.href = "admindashboard.html";
					//  console.log('I am here');

					$('#rform').hide();
					$('#lform').show();


				
				},
				error: function (jqXHR, status) {
					
					$('#message').html(jqXHR.responseJSON.message)
				}
			})

		})



		$(document).on('submit', '#addPic', function (event) {
			event.preventDefault();
			// first uploads register profile photo
			console.log($('#locationphoto')[0]);
			var userRegisterFormPhoto = $('#locationphoto')[0].files[0];
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
					console.log(result);
					console.log(status);
				
				},
				error: function (jqXHR, status) {
					
					console.log('upload failed');
				}
			});


		});













		$('#getUsers').click(function () {

			$.ajax({

				url: 'http://localhost:3003/v1/users',
				method: 'GET',
				contentType: 'application/json',
				dataType: 'json',

				success: function (result, status) {
					// console.log(result);
					// console.log(result);
					// console.log(status);
					for (key in result) {
						// console.log(key);
						console.log(result[key].username);
						$('#userData').append('<li class = "list-group-item">' + result[key].username + '</li><button type="button" class="btn btn-primary">Primary</button>')

					}

				},
				error: function (jqXHR, status) {

					// 	 console.log(jqXHR.responseJSON.message);
					// $('#message').html(jqXHR.responseJSON.message)
				}
			})

		})
		function logout(token){
			window.localStorage.removeItem("token");
			window.location.href = "index.html";
		}
	})




