$(document).on('change', '#uploadImage', function (e)
{
    console.log('hshsh')
    let shw = document.querySelector("#saveImage");
    shw.style.visibility = 'visible';

});

$(document).on('click', '#saveImage', function (e)
{
  e.preventDefault();
  console.log('start')
  let data = document.querySelector("#uploadImage");
  let image = data.files[0];
  console.log(image)
  profile_preloader.style.display = 'block';

  checkFormat(image.type, image.size);
  
  var form = new FormData();
  form.append("image", image);
  console.log(form)

  var settings = {
    "url": `${ baseUrl }api/user/image/upload`,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": `${token}`,
    },
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };

  $.ajax(settings).done(function (response)
  {

    profile_preloader.style.display = 'none';
    let data = JSON.parse(response);
    localStorage.setItem('h-user-data', JSON.stringify(data));
    location.replace(`profile.html`);
  }).fail(function (err)
  {
    console.log(err);
    if (err)
    {
        profile_preloader.style.display = 'none';
       if(err.status == 401) {
          dull=null;
          return reAuthenticate(dull);
       }
    }
  });
});

function checkFormat ($formatType, $formatSize)
{
  let formats = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!formats.includes($formatType))
  {
    profile_preloader.style.display = 'none';
    Swal.fire({
        title: `<b id="title">Image Upload Error</b>`,
        width: 600,
        padding: '3em',
        background: 'none',
        html: `<p style="color:tomato;" id="error_field" style="font-weight:bold;">(Please use only valid format [jpeg, png, jpg].)</p>
                <br>(Please use only valid format [jpeg, png, jpg].)<br>(Image format type not allowed!, Please use only[image/jpeg, image/png, image/jpg].)
                <br>`,
        backdrop: `
        rgba(0,0,0,0.5)
          `,
        confirmButtonText: `<span id="action"><i class="fa fa-thumbs-down"></i> Try Again</span>`
    })
    return false;
  }
  let totalSizeMB = $formatSize / Math.pow(1024, 2);
  if (totalSizeMB > 2)
  {
    profile_preloader.style.display = 'none';
    Swal.fire({
        title: `<b id="title">Image Upload Error</b>`,
        width: 600,
        padding: '3em',
        background: 'none',
        html: `<p style="color:tomato;" id="error_field" style="font-weight:bold;">(Image too large!, Please choose image size below 2MB.)</p>`,
        backdrop: `
        rgba(0,0,0,0.5)
          `,
        confirmButtonText: `<span id="action"><i class="fa fa-thumbs-down"></i> Try Again</span>`
    })
    return false;
  }
}