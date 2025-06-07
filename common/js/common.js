/* ヘッダーの背景色変更 */
$(function() {
  $(window).on("scroll", function () {
    if ($('.fv').height() - $('.header').height() < $(this).scrollTop()) {
      $('.js-header').addClass('change-color');
    } else {
      $('.js-header').removeClass('change-color');
    }
  });
});

$(function() {
  $(".hamburger__menu").on("click",function () {
    $(this).toggleClass('active');
    $(".header__nav_top").toggleClass('active');
    $(".header__menu-sp").toggleClass('active');
    $(".header__menu-sp").slideToggle(500);
    $(".header__menu-sp").css("background-color","#000");
  });
});

/* スムーズスクロール（スクロール位置） */
/* 参考：https://125naroom.com/web/2899 */
$(function(){
  // #で始まるa要素をクリックした場合に処理（"#"←ダブルクォーテンションで囲むのを忘れずに。忘れるとjQueryのバージョンによっては動かない。。）
  $('a[href^="#"]').on("click",function(){
    // 移動先を100px調整する。100を30にすると30px下にずらすことができる。
    var pc_adjust = 96; // PC画面時のヘッダーの高さ
    var sp_adjust = 80; // SP画面時のヘッダーの高さ
    // スクロールの速度（ミリ秒）
    var speed = 400;
    // アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
    var href= $(this).attr("href");
    // 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
    var target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入

    if (window.matchMedia('(min-width: 1000px)').matches){
      var position = target.offset().top - pc_adjust;
    }
    else {
      var position = target.offset().top - sp_adjust;
    }
    // スムーススクロール linear（等速） or swing（変速）
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});

/* カーソルデザイン変更 */
/* 参考：https://note.spiqa.design/2222/ */
/* カーソル用のdivタグを取得してcursorに格納 */
$(function(){
  var cursor = document.getElementById('cursor'); 

  // カーソル用のdivタグをマウスに追従させる
  document.addEventListener('mousemove', function (e) {
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
  });

  // リンクにホバーした時にクラス追加、離れたらクラス削除
  var link = document.querySelectorAll('a');
  for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
      cursor.classList.add('cursor--hover');
    });
    link[i].addEventListener('mouseout', function (e) {
      cursor.classList.remove('cursor--hover');   
    });
  }
});