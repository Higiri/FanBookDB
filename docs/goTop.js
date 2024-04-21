// スクロールのイベントを監視
// window.addEventListener('scroll', function () {
//     // スクロール量が100以上の場合はボタンを表示
//     if (window.scrollY > 100) {
//         document.getElementById('page-top').style.display = 'block';
//     } else {
//         document.getElementById('page-top').style.display = 'none';
//     }
// });

const pagetopBtn = document.querySelector('#page-top');
pagetopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
