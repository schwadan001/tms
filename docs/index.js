// Remove leading tms path for local testing. This is needed for GitHub Pages
$.getJSON("/tms/tms.json", function (tms) {
    // populate page with TMS verses
    var tms_id = document.getElementById("tms");
    var tms_text = "";
    var category_counter = 0;

    tms.categories.forEach(c => {
        category_counter++;
        tms_text += '<button type="button" class="collapsible">' +
            '<h2><span class="collapse-char">+</span> ' + c.name +
            '</h2></button><div class="content">';
        var topic_counter = 0;
        c.topics.forEach(t => {
            tms_text += "<br/><h3>" + category_counter + "." +
                String(++topic_counter) + " " + t.name + "</h3><hr/>";
            t.verses.forEach(v => {
                tms_text += v.text;
            });
        });
        tms_text += "</div>";
    });
    tms_id.innerHTML = tms_text;

    // add event listeners for expanding and collapsing topics
    var e = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < e.length; i++) {
        e[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
                this.getElementsByClassName("collapse-char")[0].innerHTML = "+"
            } else {
                content.style.display = "block";
                this.getElementsByClassName("collapse-char")[0].innerHTML = "-"
            }
        });
    }
});
