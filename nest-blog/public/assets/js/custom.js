jQuery(function($) {
    $('#frmCreateOwner').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method : "POST",
            async : true,
            url : nestConfigs.API_OWNER_CREATE_URL,
            data : $(this).serialize()
        }).done((data) => {
            console.log(data);
        }).fail((req) => {
            console.log(req.responseJSON);
        });
    })
})