let bookmarks;
let key_arr = "qwertyuiopasdfghjklzxcvbnm";


$(document).ready(function() {
    $.ajaxSetup({
        async: false
    });

    $.getJSON('resources/bookmarks.json', function(data) {
        bookmarks = data;
    });

    $("#keyboard").append($("<div></div>").attr("id", "row1"));
    $("#keyboard").append($("<div></div>").attr("id", "row2"));
    $("#keyboard").append($("<div></div>").attr("id", "row3"));

    for (let i = 0; i < 26; i++)
    {
        let key = key_arr[i];
        let cur_bm;
        for (let bm of bookmarks)
        {
            if (key == bm["key"])
            {
                cur_bm = bm;
                break;
            }
        }

        let key_text = key_arr[i];
        if (cur_bm != null)
        {
            key_text = cur_bm["name"];
        }
        
        if (i < 10) {
            $("#row1").append($("<div>" + key_text +  "</div>")
                .addClass("key tc")
                .attr("id", key_arr[i]));
        }
        else if (i < 19) {
            $("#row2").append($("<div>" + key_text +  "</div>")
                .addClass("key tc")
                .attr("id", key_arr[i]));
        }
        else {
            $("#row3").append($("<div>" + key_text +  "</div>")
                .addClass("key tc")
                .attr("id", key_arr[i]));
        }
    }

    
});


$(document).bind("paste", function(e){
    var pasted_url = e.originalEvent.clipboardData.getData('text');
    console.log(pasted_url);
    window.location.href = pasted_url;
} );


$(document).on("keypress", function (e) {
    let keypressed = String.fromCharCode(e.which);

    for (let bm of bookmarks) {
        if (keypressed == bm["key"]) {
            console.log(bm["name"]);
            window.location.href = bm["link"];
        }
    }
});