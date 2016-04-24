
function loadFile(elementForm) {
    var preview = document.querySelector('#imageViewer'); //selects the query named img
    var file = document.querySelector('#imageFile').files[0]; //sames as here
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;

    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
        // Revalidate it
        elementForm.formValidation('revalidateField', "urlFile");
    } else {
        preview.src = "";
    }


}

function loadDefaultImage(image) {
//    $("#imageURL").focus();
//    $("#imageURL").keydown();
//    $("#imageURL").keypress();
//    $("#imageURL").keyup();
//    $("#imageURL").change();
    switch (image) {
        case 'car':
            $("#imageViewer").attr("src", "/images/carDefaultImage.jpg");
            break
        case 'profile':
            $("#imageViewer").attr("src", "/images/defaultImage.png");
            break
    }
}

