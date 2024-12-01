document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("category").addEventListener("change", (event) => {
        if (event.target.value === "new") {
            document.getElementById("newCategory").classList.remove("d-none");
        } else {
            document.getElementById("newCategory").classList.add("d-none");
            document.getElementById("newCategoryName").value = "";
        }
    });

    document.getElementById("event").addEventListener("change", (event) => {
        if (event.target.value === "new") {
            document.getElementById("newEvent").classList.remove("d-none");
        } else {
            document.getElementById("newEvent").classList.add("d-none");
            document.getElementById("newEventDate").value = "";
            document.getElementById("newEventName").value = "";
            document.getElementById("newEventVenue").value = "";
            document.getElementById("newEventLocation").value = "";
        }
    });

    document.getElementById("reference_work").addEventListener("change", (event) => {
        if (event.target.value === "new") {
            document.getElementById("newReferenceWork").classList.remove("d-none");
        } else {
            document.getElementById("newReferenceWork").classList.add("d-none");
            document.getElementById("newReferenceWorkName").value = "";
            document.getElementById("newReferenceWorkKana").value = "";
        }
    });

    const now = new Date();
    const now_JST = now - now.getTimezoneOffset() * (60 * 1000);
    document.getElementById("date").valueAsNumber = now - now.getTimezoneOffset() * (60 * 1000);
    document.getElementById("newEventDate").valueAsNumber = now_JST;

    new TomSelect("#event", {
        create: false,
    });
    new TomSelect("#category", {
        create: true,
    });
    new TomSelect("#reference_work", {
        create: false,
    });
});
