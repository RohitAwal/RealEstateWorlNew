
$(document).ready(function () {
	var uid;
		$(document).ready(
		function () {
	
			var uid;

	$('#editBook').on('click', '#delete', function () {

		console.log('delete pressed');
		console.log($(this)[0].attributes.uid.nodeValue);
		console.log($(this));
		// uid = $(this)[0].attributes.vid.nodeValue;
		var uid = $(this).attr('uid');
		console.log(uid);
		var isDelete = confirm("Are your sure you want to delete? ");

		if (isDelete == true) {
			$.ajax({

				url: 'http://localhost:3003/v1/book/' + uid,
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
})
	

	$.ajax({


		url: 'http://localhost:3003/v1/book',
		method: 'GET',
		dataType: 'json',
		// headers: { authorization: window.localStorage.getItem('token') },
		success: function (result, status) {
			console.log(result);

			for (key in result) {

				


				$('#editBook').append('<tr> ]\
				<td>' + result[key].id + '</td> \
					<td><img src="file:///home/rohit/TravelBookingApp/t2-backend-api-RohitAwal/resources/photo/locationphoto/'+ result[key].Image +'" height="100px" width="100dp"></td> \
					<td>' + result[key].NameOfPlace + '</td> \
					<td>' + result[key].Price + '</td> \
					<td>' + result[key].Description + '</td> \
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
	// var formdata = new FormData();
		var myFormData = {
			
				id: $('#id').val(),
				Image: name,
				NameOfPlace: $('#NameOfPlace').val(),
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