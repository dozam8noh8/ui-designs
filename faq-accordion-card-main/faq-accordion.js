let accordion = document.getElementsByClassName("accordion-list")[0];
for (let child of accordion.getElementsByTagName("li")){
    child.onclick = ((event) => {
        let paragraph = event.currentTarget.getElementsByTagName("p")[0];
        let pstyle = getComputedStyle(paragraph).getPropertyValue('display');
        let img = event.currentTarget.getElementsByTagName("img")[0];
        let question = event.currentTarget.getElementsByClassName("question-text")[0];
        if (paragraph.classList.contains("shrunk")) {
            paragraph.style.maxHeight = paragraph.scrollHeight + "px";
            paragraph.classList.remove("shrunk");
            paragraph.classList.add("expanded")
            img.classList.add("switch-arrow");
            question.classList.add("bold-text");


        } else {
            paragraph.classList.remove("expanded");
            paragraph.classList.add("shrunk")
            paragraph.style.maxHeight = 0 + "px";
            img.classList.remove("switch-arrow");
            question.classList.remove("bold-text");

        }
    });
}