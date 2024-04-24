/**
 * List.js用のオプション設定
 */
var options = {
    // 並び替え項目
    valueNames: ["default", "date", "title", "author"],

    page: getWindowSize() < 768 ? 24 : 96,
    // ページネーション
    pagination: {
        innerWindow: 1,
        outerWindow: 2,
        paginationClass: "pagination",
        item: '<li class="page-item"><a class="page page-link" " href="#""></a></li>',
    },
};

/**
 * List.jsのインスタンス生成
 */
var fanbooks = new List("fanBookList", options);

// ウィンドウサイズが変更されたときの処理
window.addEventListener("resize", function () {
    // ウィンドウサイズに応じてページサイズを変更
    var newPageSize = getWindowSize() < 768 ? 24 : 96;
    fanbooks.page = newPageSize;
    fanbooks.update();
});

// ウィンドウサイズを取得する関数
function getWindowSize() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
