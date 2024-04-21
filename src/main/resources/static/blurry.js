document.addEventListener("DOMContentLoaded", function () {
    var toggleSwitch = document.getElementById("blurrySwitch");
    var imageOverlays = document.querySelectorAll(".image-overlay");

    toggleSwitch.addEventListener("change", function () {
        if (toggleSwitch.checked) {
            imageOverlays.forEach(function (imageOverlay) {
                imageOverlay.style.display = "block"; // トグルスイッチがオンの場合、オブジェクトを表示する
            });
        } else {
            imageOverlays.forEach(function (imageOverlay) {
                imageOverlay.style.display = "none"; // トグルスイッチがオフの場合、オブジェクトを非表示にする
            });
        }
    });
});
