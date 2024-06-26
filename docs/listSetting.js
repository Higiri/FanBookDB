var options = {
    valueNames: ["default", "date", "title", "author", "category", "reference_work", "event", "rating", "official"],

    page: getWindowSize() < 768 ? 16 : getWindowSize() < 992 ? 36 : getWindowSize() < 1200 ? 64 : getWindowSize() < 1800 ? 96 : 120,
    pagination: {
        innerWindow: 1,
        outerWindow: 2,
        paginationClass: "pagination",
        item: '<li class="page-item"><a class="page page-link" href="javascript:"></a></li>',
    },
    searchColumns: ["title", "author", "event"],
};

var fanbooks = new List("fanBookList", options);

//ソート切り替え時に1ページ目へ
fanbooks.on("sortStart", function (list) {
    list.i = 1;
});

//更新時にぼかしスイッチの確認
fanbooks.on("updated", function () {
    handleBlurrySwitch();
});

// ウィンドウサイズが変更されたときの処理
window.addEventListener("resize", function () {
    fanbooks.page = getPageSize();
    fanbooks.update();
});

// ウィンドウサイズに応じたページサイズを返す関数
function getPageSize() {
    var windowWidth = getWindowSize();
    if (windowWidth < 768) {
        return 16;
    } else if (windowWidth < 992) {
        return 36;
    } else if (windowWidth < 1200) {
        return 64;
    } else if (windowWidth < 1800) {
        return 96;
    } else {
        return 120;
    }
}

// ウィンドウサイズを取得する関数
function getWindowSize() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

document.addEventListener("DOMContentLoaded", function () {
    const categorySelector = document.getElementById("categorySelector");
    const referenceWorkSelector = document.getElementById("referenceWorkSelector");
    const ratingSelector = document.getElementById("ratingSelector");
    const eventSelector = document.getElementById("eventSelector");
    const officialSelector = document.getElementById("officialSelector");

    function applyFilters() {
        const selectedCategory = categorySelector.options[categorySelector.selectedIndex].dataset.filter;
        const selectedReferenceWork = referenceWorkSelector.options[referenceWorkSelector.selectedIndex].dataset.filter;
        const selectedEvent = eventSelector.options[eventSelector.selectedIndex].dataset.filter;
        const selectedRating = ratingSelector.options[ratingSelector.selectedIndex].dataset.filter;
        const selectedOfficial = officialSelector.options[officialSelector.selectedIndex].dataset.filter;

        fanbooks.filter(function (item) {
            const categoryFilter = selectedCategory === "any" || item.values().category.indexOf(selectedCategory) !== -1;
            const referenceWorkFilter =
                selectedReferenceWork === "any" || item.values().reference_work.indexOf(selectedReferenceWork) !== -1;
            const eventFilter = selectedEvent === "any" || item.values().event.indexOf(selectedEvent) !== -1;
            const ratingFilter =
                selectedRating === "any" ||
                (selectedRating === "only" && item.values().rating.length !== 0) ||
                (selectedRating === "without" && item.values().rating.length === 0);
            const officialFilter =
                selectedOfficial === "any" ||
                (selectedOfficial === "only" && item.values().official.length !== 0) ||
                (selectedOfficial === "without" && item.values().official.length === 0);
            return categoryFilter && referenceWorkFilter && eventFilter && ratingFilter && officialFilter;
        });

        alertSetting();
    }

    categorySelector.addEventListener("change", applyFilters);
    referenceWorkSelector.addEventListener("change", applyFilters);
    eventSelector.addEventListener("change", applyFilters);
    ratingSelector.addEventListener("change", applyFilters);
    officialSelector.addEventListener("change", applyFilters);

    applyFilters();
});

document.getElementById("searchInput").addEventListener("input", function () {
    const searchString = this.value;
    fanbooks.search(searchString);
    alertSetting();
    handleBlurrySwitch();
});

function alertSetting() {
    const element = getAlertElement();

    if (fanbooks.matchingItems.length > 0) {
        element.className = "alert alert-success";
        element.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>' + fanbooks.matchingItems.length + " 件登録されています。";
    } else {
        element.className = "alert alert-danger";
        element.innerHTML = '<i class="bi bi-x-circle-fill me-2"></i>' + "指定の本は登録されていません。";
    }
}

function getAlertElement() {
    if (!document.getElementById("matchingItemsAlert")) {
        const fanBookListArea = document.getElementById("fanBookList");
        element = fanBookListArea.insertBefore(document.createElement("div"), fanBookListArea.firstChild);
        element.id = "matchingItemsAlert";
        element.className = "alert";
        return element;
    } else {
        return document.getElementById("matchingItemsAlert");
    }
}

//ぼかしスイッチの切り替えを確認
document.addEventListener("DOMContentLoaded", function () {
    var blurrySwitch = document.getElementById("blurrySwitch");

    document.addEventListener("change", function (event) {
        if (event.target && event.target.id === "blurrySwitch") {
            handleBlurrySwitch();
        }
    });
});

//ぼかしスイッチ切り替え時の処理
function handleBlurrySwitch() {
    var blurrySwitch = document.getElementById("blurrySwitch");
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
