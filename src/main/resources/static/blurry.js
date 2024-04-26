document.addEventListener("DOMContentLoaded", function () {
    var blurrySwitch = document.getElementById("blurrySwitch");

    document.addEventListener("change", function (event) {
        if (event.target && event.target.id === "blurrySwitch") {
            var imageOverlays = document.querySelectorAll(".image-overlay");

            if (blurrySwitch.checked) {
                imageOverlays.forEach(function (imageOverlay) {
                    imageOverlay.style.display = "block";
                });
            } else {
                imageOverlays.forEach(function (imageOverlay) {
                    imageOverlay.style.display = "none";
                });
            }
        }
    });
});
