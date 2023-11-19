// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//     myInput.focus()
// })

function openFanBookDetailsModal(fanBookId) {
    if (fanBookId) {
        $.ajax({
            type: 'GET',
            url: '/getFanBookData/' + fanBookId,
            success: function (data) {
                var fanBookDetailsModal = bulildFanBookDetailsModal(data);
                $("#fanBookModalContent").html(fanBookDetailsModal);
                $('#fanBookModal').modal('show');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    }
}

function bulildFanBookDetailsModal(fanBook) {
    if (fanBook) {
        var fanBookDetailsModal = $('#fanBookModalContent');
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
        footer.append('<button type="button" class="btn btn-primary" onclick="openFanBookUpdateModal(' + fanBook.id + ')">編集</button>');
        footer.append('<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>');
        fanBookDetailsModal.append(footer);

        return fanBookDetailsModal.html();
    }
}

function openFanBookUpdateModal(fanBookId) {
    if (fanBookId) {
        $.ajax({
            type: 'GET',
            url: '/getFanBookData/' + fanBookId,
            success: function (data) {
                var fanBookDetailsModal = bulildFanBookUpdateModal(data);
                $("#fanBookModalContent").html(fanBookDetailsModal);
                $('#fanBookModal').modal('show');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    }
}

function bulildFanBookUpdateModal(fanBook) {
    if (fanBook) {
        var fanBookUpdateModal = $('#fanBookModalContent');
        fanBookUpdateModal.empty();

        // header
        var header = $('<div class="modal-header">');
        header.append('<h1 class="modal-title fs-5" id="fanBookModalLabel">' + fanBook.title + ' を編集</h1>');
        header.append('<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>');
        fanBookUpdateModal.append(header);

        // body
        var body = $('<div class="modal-body">');
        var rowContainer = $('<div class="row container">');
        var imgCol = $('<div class="col-lg-6 p-2">');
        imgCol.append('<img src= ' + fanBook.picture.filepath + fanBook.picture.filename + ' class="card-img" alt="' + fanBook.title + '">');
        rowContainer.append(imgCol);

        var formCol = $('<div class="col-lg-6 p-2">');
        var form = $('<form action="/update" method="post" class="p-3">');
        // タイトル
        var titleFormGroup = $('<div class="form-group mb-3">');
        titleFormGroup.append('  <label class="form-label">タイトル</label>');
        titleFormGroup.append('  <input type="text" id="title" name="title" class="form-control" />');
        titleFormGroup.append('</div>');

        form.append(titleFormGroup);

        formCol.append(form);
        rowContainer.append(formCol);
        rowContainer.append(formCol);
        body.append(rowContainer);
        fanBookUpdateModal.append(body);

        // footer
        var footer = $('<div class="modal-footer">');
        footer.append('<button type="button" class="btn btn-primary">更新する</button>');
        footer.append('<button type="button" class="btn btn-secondary" onclick="openFanBookDetailsModal(' + fanBook.id + ')">戻る</button>');
        fanBookUpdateModal.append(footer);

        return fanBookUpdateModal.html();
    }
}
