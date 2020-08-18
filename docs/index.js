$.getJSON("/tms.json", function (tms) {
    var tms_id = document.getElementById("tms");
    var tms_text = "";
    var category_counter = 0;

    tms.categories.forEach(c => {
        category_counter++;
        tms_text += "<br/><h2>" + c.name + "</h2>";
        var topic_counter = 0;
        c.topics.forEach(t => {
            tms_text += "<br/><h3>" + category_counter + "." +
                String(++topic_counter) + " " + t.name + "</h3><hr/>";
            t.verses.forEach(v => {
                tms_text += v.text;
            });
        });
        tms_text += "<br/>";
    });
    tms_id.innerHTML = tms_text;
});
