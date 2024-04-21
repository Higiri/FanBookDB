// モーダルが表示されたときの処理
function handleModalShown() {
    // ページ上部に戻るボタンの要素を取得
    document.getElementById('page-top').classList.add('side-button-modal');
    document.getElementById('regist-page').classList.add('side-button-modal');
}

// モーダルが非表示になったときの処理
function handleModalHidden() {
    // ページ上部に戻るボタンの要素を取得
    document.getElementById('page-top').classList.remove('side-button-modal');
    document.getElementById('regist-page').classList.remove('side-button-modal');
}


// 'detailModal' で始まるすべてのモーダルに対してイベントリスナーを追加
document.addEventListener('shown.bs.modal', function (event) {
    if (event.target.id.startsWith('detailModal')) {
        handleModalShown();
    }
});

document.addEventListener('hidden.bs.modal', function (event) {
    if (event.target.id.startsWith('detailModal')) {
        handleModalHidden();
    }
});



function openFanBookDetailsModal(fanBookId) {
    if (fanBookId) {
        $.ajax({
            type: 'GET',
            url: '/getFanBookData/' + fanBookId,
            success: function (data) {
                var fanBookDetailsModal = bulildFanBookDetailsModal(data);
                $("#detailModalContent").html(fanBookDetailsModal);
                $('#detailModal').modal('show');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    }
}

function bulildFanBookDetailsModal(fanBook) {
    if (fanBook) {
        var fanBookDetailsModal = $('#detailModalContent');
        fanBookDetailsModal.empty();

        // header
        var header = $('<div class="modal-header">');
        header.append('<h1 class="modal-title fs-5" id="fanBookModalLabel">' + fanBook.title + '</h1>');
        header.append('<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>');
        fanBookDetailsModal.append(header);

        // body
        var body = $('<div class="modal-body">');
        var rowContainer = $('<div class="row container">');
        var imgCol = $('<div class="col-lg-6 p-2">');
        imgCol.append('<img src= ' + fanBook.picture.filepath + fanBook.picture.filename + ' class="card-img" alt="' + fanBook.title + '">');
        rowContainer.append(imgCol);

        var tableCol = $('<div class="col-lg-6 p-2">');
        var table = $('<table class="table th-nowrap">');
        var tbody = $('<tbody>');
        tbody.append('<tr><th scope="col">タイトル</th><td class="word-wrap">' + fanBook.title + '</td></tr>');
        tbody.append('<tr><th scope="col">作者</th><td class="word-wrap">' + fanBook.author + '</td></tr>');
        tbody.append('<tr><th scope="col">サークル名</th><td>' + fanBook.circle_name + '</td></tr>');
        tbody.append('<tr><th scope="col">日付</th><td>' + fanBook.date + '</td></tr>');
        tbody.append('<tr><th scope="col">カテゴリ</th><td>' + fanBook.category.name + '</td></tr>');
        tbody.append('<tr><th scope="col">元ネタ</th><td>' + fanBook.reference_work.name + '</td></tr>');
        tbody.append('<tr><th scope="col">R-18</th><td>' + (fanBook.is_adult ? 'Yes' : 'No') + '</td></tr>');
        tbody.append('<tr><th scope="col">ジャンル</th><td class="word-wrap">' + fanBook.genre + '</td></tr>');
        table.append(tbody);
        tableCol.append(table);
        rowContainer.append(tableCol);

        body.append(rowContainer);
        fanBookDetailsModal.append(body);

        // footer
        var footer = $('<div class="modal-footer">');
        footer.append('<button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="openFanBookUpdateModal(' + fanBook.id + ')">編集</button>');
        footer.append('<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>');
        fanBookDetailsModal.append(footer);

        return fanBookDetailsModal.html();
    }
}

function openFanBookUpdateModal(fanBookId) {
    if (fanBookId) {
        // fanBookDataとcategoriesを両方非同期で取得するPromiseを作成
        Promise.all([
            getFanBookData(fanBookId),
            getCategories(),
            getReferenceWorks()
        ]).then(function ([fanBookData, categories, referenceWorks]) {
            var fanBookDetailsModal = bulildFanBookUpdateModal(fanBookData, categories, referenceWorks);
            $("#updateModalContent").html(fanBookDetailsModal);
            $('#updateModal').modal('show');
        })
            .catch(function (error) {
                console.log('Error:', error);
            });
    }
}

function getFanBookData(fanBookId) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url: '/getFanBookData/' + fanBookId,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

function getCategories() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url: '/getCategories/',
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });
}

function getReferenceWorks() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url: '/getReferenceWorks/',
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });
}

function bulildFanBookUpdateModal(fanBook, categories, referenceWorks) {
    if (fanBook) {
        var fanBookUpdateModal = $('#updateModalContent');
        fanBookUpdateModal.empty();

        // header
        var header = $('<div class="modal-header">');
        header.append('<h1 class="modal-title fs-5" id="updateModalLabel">' + fanBook.title + ' を編集</h1>');
        header.append('<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>');
        fanBookUpdateModal.append(header);

        // body
        var body = $('<div class="modal-body">');
        var form = $('<form action="/update" method="post" class="p-3">');

        // タイトル
        var titleGroup = $('<div class="form-group mb-3">');
        titleGroup.append('  <label class="form-label">タイトル</label>');
        titleGroup.append('  <input type="text" class="form-control" value="' + fanBook.title + '">');
        var titleGroupValidation = $('<div class="form-text">error?</div>');
        titleGroup.append(titleGroupValidation);
        form.append(titleGroup);

        // 作者
        var authorFormRowsValue = fanBook.author.includes(",") ? 5 : 1;
        var authorGroup = $('<div class="form-group mb-3">');
        authorGroup.append('  <label class="form-label">作者</label>');
        authorGroup.append('  <textarea id="form" class="form-control" rows="' + authorFormRowsValue + '">' + fanBook.author + '</textarea>');
        var authorGroupValidation = $('<div class="form-text">error?</div>');
        authorGroup.append(authorGroupValidation);
        form.append(authorGroup);

        // 日付
        var dateGroup = $('<div class="form-group mb-3">');
        dateGroup.append('  <label class="form-label">日付</label>');
        dateGroup.append('  <input type="date" class="form-control col-auto" value="' + fanBook.date + '">');
        var dateGroupValidation = $('<div class="form-text">error?</div>');
        dateGroup.append(dateGroupValidation);
        form.append(dateGroup);

        // カテゴリ
        var categoryGroup = $('<div class="form-group mb-3">');
        categoryGroup.append('  <label class="form-label">カテゴリ</label>');
        categoryGroupSelect = $('<select type="text" class="form-select" required>');
        categories.forEach(function (category) {
            var option = $('<option>');
            option.val(category.id);
            option.text(category.name);
            if (fanBook.category && fanBook.category.id === category.id) {
                option.attr('selected', true);
            }
            categoryGroupSelect.append(option);
        });

        var categoryGroupValidation = $('<div class="form-text">error?</div>');
        categoryGroup.append(categoryGroupSelect);
        categoryGroup.append(categoryGroupValidation);
        form.append(categoryGroup);

        // 元ネタ
        var referenceWorksGroup = $('<div class="form-group mb-3">');
        referenceWorksGroup.append('  <label class="form-label">元ネタ</label>');
        referenceWorksGroupSelect = $('<select type="text" class="form-select" required>');
        referenceWorks.forEach(function (reference_work) {
            var option = $('<option>');
            option.val(reference_work.id);
            option.text(reference_work.name);
            if (fanBook.reference_work && fanBook.reference_work.id === reference_work.id) {
                option.attr('selected', true);
            }
            referenceWorksGroupSelect.append(option);
        });

        var referenceWorksValidation = $('<div class="form-text">error?</div>');
        referenceWorksGroup.append(referenceWorksGroupSelect);
        referenceWorksGroup.append(referenceWorksValidation);
        form.append(referenceWorksGroup);


        body.append(form);
        fanBookUpdateModal.append(body);

        // footer
        var footer = $('<div class="modal-footer">');
        footer.append('<button type="button" class="btn btn-primary" data-bs-dismiss="modal">更新する</button>');
        footer.append('<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="openFanBookDetailsModal(' + fanBook.id + ')">戻る</button>');
        footer.append('<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>');
        fanBookUpdateModal.append(footer);

        return fanBookUpdateModal.html();
    }
}

function detaiModalUpdate() {
    if ($('#detailModal').hasClass('show')) {
        var modal = new bootstrap.Modal(document.getElementById('detailModal'), {
            backdrop: 'static'
        });

        // モーダルを閉じずに再計算
        modal.handleUpdate();
    }
}
