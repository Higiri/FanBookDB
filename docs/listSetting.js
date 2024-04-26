var options = {
    valueNames: ["default", "date", "title", "author", "category", "reference_work", "event"],

    page: getWindowSize() < 768 ? 16 : getWindowSize() < 992 ? 36 : getWindowSize() < 1200 ? 64 : getWindowSize() < 1800 ? 96 : 120,
    pagination: {
        innerWindow: 1,
        outerWindow: 2,
        paginationClass: "pagination",
        item: '<li class="page-item"><a class="page page-link" " href="#""></a></li>',
    },
    searchColumns: ["title", "author", "event"],
};

var fanbooks = new List("fanBookList", options);

//ソート切り替え時に1ページ目へ
fanbooks.on("sortStart", function (list) {
    list.i = 1;
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
    var categorySelector = document.querySelector('[aria-label="categorySelector"]');
    var referenceWorkSelector = document.querySelector('[aria-label="referenceWorkSelector"]');

    function applyFilters() {
        var selectedCategory = categorySelector.options[categorySelector.selectedIndex].dataset.filter;
        var selectedReferenceWork = referenceWorkSelector.options[referenceWorkSelector.selectedIndex].dataset.filter;

        fanbooks.filter(function (item) {
            var categoryFilter = selectedCategory === "anyCategory" || item.values().category.indexOf(selectedCategory) !== -1;
            var referenceWorkFilter =
                selectedReferenceWork === "anyReferenceWorks" || item.values().reference_work.indexOf(selectedReferenceWork) !== -1;
            return categoryFilter && referenceWorkFilter;
        });
    }

    categorySelector.addEventListener("change", applyFilters);
    referenceWorkSelector.addEventListener("change", applyFilters);

    applyFilters();
});
