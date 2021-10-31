let bookmarks;


$(document).ready(function() {
    $.ajaxSetup({
        async: false
    });

    $.getJSON('resources/bookmarks.json', function(data) {
        bookmarks = data;

        for (let bm of bookmarks)
        {
            var bm_div = document.createElement("div");

            var bm_key_sp = document.createElement("span");
            bm_key_sp.appendChild(document.createTextNode(bm["key"] + ' - '));
            bm_div.appendChild(bm_key_sp);

            var bm_name_sp = document.createElement("span");
            bm_name_sp.appendChild(document.createTextNode(bm["name"]));
            bm_div.appendChild(bm_name_sp);

            document.getElementById("bookmarks").appendChild(bm_div);
        }
    });
});


$(document).bind("paste", function(e){
    var pasted_url = e.originalEvent.clipboardData.getData('text');
    console.log(pasted_url);
    window.location.href = pasted_url;
} );


$(document).on("keypress", function (e) {
    document.getElementById("bookmarks").focus();
    let keypressed = String.fromCharCode(e.which);

    for (let bm of bookmarks) {
        if (keypressed == bm["key"]) {
            console.log(bm["name"]);
            window.location.href = bm["link"];
        }
    }
});