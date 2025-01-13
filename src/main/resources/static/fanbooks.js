document.addEventListener("DOMContentLoaded", () => {
    // 'detailModal' で始まるすべてのモーダルに対してイベントリスナーを追加
    // document.addEventListener("shown.bs.modal", (event) => {
    //     if (event.target.id.startsWith("detailModal")) {
    //         document.getElementById("page-top").classList.add("side-button-modal");
    //         document.getElementById("regist-page").classList.add("side-button-modal");
    //     }
    // });
    // modal表示時の右側余白を維持（Chrome）
    Array.from(document.getElementsByClassName("detail-button")).forEach((btn) =>
        btn.addEventListener("click", () => {
            document.getElementById("page-top").classList.add("side-button-modal");
        })
    );

    // ページ上部に戻るボタンの要素を取得
    document.addEventListener("hidden.bs.modal", (event) => {
        if (event.target.id.startsWith("detailModal")) {
            document.getElementById("page-top").classList.remove("side-button-modal");
        }
    });

    // トップへスクロール
    document.getElementById("page-top").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ウィンドウサイズを取得する関数
    const getWindowSize = () => {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };

    const options = {
        valueNames: [
            "title",
            "author",
            "date",
            "category",
            "reference_work",
            "event",
            "rating",
            "official",
            "genre",
            { data: ["default"] },
            { data: ["title_kana"] },
            { data: ["author_kana"] },
        ],
        page:
            getWindowSize() < 768
                ? 12
                : getWindowSize() < 992
                ? 24
                : getWindowSize() < 1200
                ? 24
                : getWindowSize() < 1900
                ? 32
                : getWindowSize() < 1900
                ? 40
                : getWindowSize() < 2500
                ? 48
                : getWindowSize() < 3150
                ? 56
                : getWindowSize() < 3800
                ? 60
                : 60,
        pagination: {
            innerWindow: 2,
            outerWindow: 2,
            paginationClass: "pagination",
            item: `<li class="page-item"><button class="page page-link" type="button"></button></li>`,
        },
        searchColumns: ["title", "title_kana", "author", "author_kana", "event", "date", "category", "genre"],
    };

    const fanbooks = new List("fanBookList", options);

    //ソート切り替え時に1ページ目へ
    fanbooks.on("sortStart", (list) => {
        list.i = 1;
    });

    //ぼかしスイッチ切り替え時の処理
    const handleBlurrySwitch = () => {
        Array.from(document.getElementsByClassName("image-overlay")).forEach((imageOverlay) => {
            imageOverlay.style.display = document.getElementById("blurrySwitch").checked ? "block" : "none";
        });

        if (document.getElementById('blurrySwitch').checked) {
            document.getElementById('blur-icon').innerHTML = "blur_off";
        } else {
            document.getElementById('blur-icon').innerHTML = "blur_on";
        }
    };

    //更新時にぼかしスイッチの確認
    fanbooks.on("updated", () => {
        handleBlurrySwitch();
    });

    // ウィンドウサイズに応じたページサイズを返す関数
    const getPageSize = () => {
        const windowWidth = getWindowSize();
        if (windowWidth < 768) {
            return 12;
        } else if (windowWidth < 992) {
            return 24;
        } else if (windowWidth < 1200) {
            return 24;
        } else if (windowWidth < 1400) {
            return 32;
        } else if (windowWidth < 1900) {
            return 40;
        } else if (windowWidth < 2500) {
            return 48;
        } else if (windowWidth < 3150) {
            return 56;
        } else if (windowWidth < 3800) {
            return 60;
        }
        return 60;
    };

    const settingPagenation = () => {
        // ページネーションのサイズ
        const pagenation = document.getElementById('pagenation');
        if (getWindowSize() < 768) {
            pagenation.classList.add('pagination-sm');
        } else {
            pagenation.classList.remove('pagination-sm');
        }
    }

    // list.js
    // ウィンドウサイズが変更されたときの処理
    window.addEventListener("resize", () => {
        fanbooks.page = getPageSize();
        fanbooks.update();
        settingPagenation();
        if (getWindowSize() < 768) {
            document.getElementById('filter-area').classList.add('hidden-filter');
            document.getElementById('btn-filter').checked = false;
        }
    });

    settingPagenation();

    //ぼかしスイッチの切り替えを確認
    document.addEventListener("change", () => handleBlurrySwitch());

    // ページネーション押下時の処理
    document.querySelector(".pagination").addEventListener("click", (event) => {
        if ((event.target.tagName === "BUTTON") && !event.target.parentNode.disabled && !event.target.parentNode.classList.contains('active')) {
            window.scroll({
                top: 0,
                behavior: "smooth",
            });
        }
    });

    // フィルタ表示制御
    document.getElementById('btn-filter').addEventListener('click', () => {
        if (document.getElementById('btn-filter').checked) {
            document.getElementById('filter-area').classList.remove('hidden-filter');
            document.getElementById('filter-icon').innerHTML = "close";
        } else {
            document.getElementById('filter-area').classList.add('hidden-filter');
            document.getElementById('filter-icon').innerHTML = "tune";
        }
    });

    const updateNumberOfData = () => {
        document.getElementById("numberOfData").innerText = `${fanbooks.matchingItems.length}/${fanbooks.items.length}`;
    }
    //フィルター
    const applyFilters = () => {
        const categoryCheckboxes = Array.from(document.getElementById("categoryCheckboxes").getElementsByTagName("INPUT"))
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
        const ratingSelected = document.getElementById("ratingSelector").value;
        const officialSelected = document.getElementById("officialSelector").value;
        const referenceWorkSelected = document.getElementById("referenceWorkSelector").value;
        const eventSelected = document.getElementById("eventSelector").value;

        fanbooks.filter((item) => {
            return (
                categoryCheckboxes.length !== 0 &&
                categoryCheckboxes.includes(item.values().category) &&
                (ratingSelected === "all" || (ratingSelected === "without" && !item.values().rating) || (ratingSelected === "only" && item.values().rating)) &&
                (officialSelected === "all" || (officialSelected === "without" && !item.values().official) || (officialSelected === "only" && item.values().official)) &&
                (referenceWorkSelected === "any" || referenceWorkSelected.includes(item.values().reference_work)) &&
                (eventSelected === "any" || eventSelected.includes(item.values().event))
            );
        });
        handleBlurrySwitch();
        updateNumberOfData();
    };
    document.getElementById("categoryAll").addEventListener("change", () => applyFilters());
    Array.from(document.getElementById("categoryCheckboxes").getElementsByTagName("INPUT")).forEach((checkbox) => {
        checkbox.addEventListener("change", () => applyFilters());
    });
    document.getElementById("ratingSelector").addEventListener("change", () => applyFilters());
    document.getElementById("officialSelector").addEventListener("change", () => applyFilters());
    document.getElementById("referenceWorkSelector").addEventListener("change", () => applyFilters());
    document.getElementById("eventSelector").addEventListener("change", () => applyFilters());
    applyFilters();
    // 検索
    document.getElementById("searchInput").addEventListener("input", () => {
        const searchString = document.getElementById("searchInput").value;
        fanbooks.search(searchString);
        handleBlurrySwitch();
        updateNumberOfData();
    });

    // ソートボタン
    Array.from(document.getElementById("sortButtons").getElementsByTagName("INPUT")).forEach((btn) => {
        btn.addEventListener("click", () => {
            document.getElementById("sortTypeAsc").checked = true;
            const sortType = document.getElementById("sortTypeButtons").querySelector('input[type="radio"]:checked').dataset.sortType;
            fanbooks.sort(btn.dataset.sort, { order: sortType });
        });
    });
    // 昇順・降順ボタン
    Array.from(document.getElementById("sortTypeButtons").getElementsByTagName("INPUT")).forEach((btn) => {
        btn.addEventListener("click", () => {
            const sort = document.getElementById("sortButtons").querySelector('input[type="radio"]:checked').dataset.sort;
            fanbooks.sort(sort, { order: btn.dataset.sort_type });
        });
    });

    // チェックボックス
    document.getElementById("categoryAll").addEventListener("click", () => {
        Array.from(document.getElementById("categoryCheckboxes").getElementsByTagName("INPUT")).forEach((checkbox) => {
            checkbox.checked = document.getElementById("categoryAll").checked;
        });
    });
    Array.from(document.getElementById("categoryCheckboxes").getElementsByTagName("INPUT")).forEach((checkbox) => {
        checkbox.addEventListener("click", () => {
            document.getElementById("categoryAll").checked = Array.from(document.getElementById("categoryCheckboxes").getElementsByTagName("INPUT")).every(
                (checkbox) => checkbox.checked
            );
        });
    });

    // セレクトボックス
    const referenceworkTomSelect = new TomSelect("#referenceWorkSelector", {
        plugins: ["dropdown_input"],
        create: false,
        score: (search) => (item) => [item.value, item.kana].filter((field) => field).some((field) => field.toLowerCase().includes(search.toLowerCase())) ? 1 : 0,
    });
    const eventTomSelect = new TomSelect("#eventSelector", {
        plugins: ["dropdown_input"],
        create: false,
        render: {
            option: (data, escape) => {
                const html =
                    "<div>" +
                    escape(data.value) +
                    (data.date || data.venue ? '<div class="ms-4 d-flex flex-wrap gap-0 column-gap-2">' : "") +
                    (data.date ? '<span class="combo-subtext">' + escape(data.date) + "</span>" : "") +
                    (data.venue ? '<span class="combo-subtext">' + escape(data.venue) + "</span>" : "") +
                    (data.date || data.venue ? "</div>" : "") +
                    "</div>";
                return html;
            },
        },
        score: (search) => (item) =>
            [item.value, item.venue, item.date, item.location].filter((field) => field).some((field) => field.toLowerCase().includes(search.toLowerCase())) ? 1 : 0,
    });

    const loadWindow = document.getElementById("loadWindow");
    const spinner = document.querySelector("#loadWindow .spinner-grow");
    setTimeout(() => {
        if (!loadWindow.classList.contains("hidden")) {
            loadWindow.classList.add("hidden");
            spinner.classList.add("hidden");
            setTimeout(() => {
                loadWindow.style.display = "none";
                spinner.style.display = "none";
            }, 500);
        }
    }, 10000);

    // リセットボタン
    document.getElementById("filter-reset").addEventListener('click', () => {
        // カテゴリ
        document.getElementById("categoryAll").checked = true;
        Array.from(document.getElementById("categoryCheckboxes").getElementsByTagName("INPUT")).map((checkbox) => {
            checkbox.checked = true;
        });

        // 年齢制限
        document.getElementById("ratingSelector").value = "all";

        // 作者分類
        document.getElementById("officialSelector").value = "all";

        // 元ネタ
        referenceworkTomSelect.setValue("any");

        // イベント
        eventTomSelect.setValue("any");

        applyFilters();
    });
});

window.addEventListener("load", () => {
    const loadWindow = document.getElementById("loadWindow");
    const spinner = document.querySelector("#loadWindow .spinner-grow");
    setTimeout(() => {
        loadWindow.classList.add("hidden");
        spinner.classList.add("hidden");
        setTimeout(() => {
            loadWindow.style.display = "none";
            spinner.style.display = "none";
        }, 500);
    }, 500);
});
