var options = {
    valueNames: ["default", "date", "title", "author", "category", "reference_work", "event"],

    page: getWindowSize() < 768 ? 24 : 96,
    pagination: {
        innerWindow: 1,
        outerWindow: 2,
        paginationClass: "pagination",
        item: '<li class="page-item"><a class="page page-link" " href="#""></a></li>',
    },
};

var fanbooks = new List("fanBookList", options);

//ソート切り替え時に1ページ目へ
fanbooks.on("sortStart", function (list) {
    list.i = 1;
});

// ウィンドウサイズが変更されたときの処理
window.addEventListener("resize", function () {
    var newPageSize = getWindowSize() < 768 ? 24 : 96;
    fanbooks.page = newPageSize;
    fanbooks.update();
});

// ウィンドウサイズを取得する関数
function getWindowSize() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

/*

const selectElement = document.getElementById("listSelector");
selectElement.addEventListener("change", applyFilters);

function applyFilters() {
    // 選択されたオプションの値を取得
    const selectedOptions = Array.from(selectElement.selectedOptions).map((option) => option.value);

    // フィルタを適用してリストを更新
    fanbooks.filter(function (item) {
        const itemGenres = item.values().genre;
        let filterMatched = false;
        if (selectedOptions.includes("any")) {
            filterMatched = true;
        } else if (selectedOptions.length === 0) {
            filterMatched = true;
        } else {
            filterMatched = selectedOptions.some((selectedOption) => itemGenres.includes(selectedOption));
        }
        return filterMatched;
    });
}

*/
