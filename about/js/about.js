$(document).ready(function() {
  // ページ読み込み時にハッシュがあれば対応するコンテンツを表示
  if (window.location.hash) {
    var targetId = window.location.hash;
    $('.pokerHands_content').hide(); // 全てのコンテンツを非表示にする
    $(targetId).show(); // ターゲットのコンテンツを表示する

    // アクティブなリンクのスタイルを適用する（オプション）
    $('a[href="' + targetId + '"]').addClass('active-link');
  }

  // アンカーリンクがクリックされたときの処理
  $('ol.pokerHands__list li a').on('click', function(e) {
    e.preventDefault(); // デフォルトのアンカー動作をキャンセル

    var targetId = $(this).attr('href'); // クリックされたリンクのハッシュを取得

    // ページ内にそのIDを持つ要素が存在するかチェック
    if ($(targetId).length) {
      $('.pokerHands_content').hide(); // 全てのコンテンツを非表示にする
      $(targetId).show(); // クリックされたリンクに対応するコンテンツを表示する

      // オプション：URLのハッシュを更新する（ブラウザの履歴にも残る）
      // 古いブラウザでhistory.pushStateがサポートされていない場合は、window.location.hash = targetId; でも良い
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        window.location.hash = targetId;
      }

      // オプション：アクティブなリンクのスタイルを切り替える
      $('ol.pokerHands__list li').removeClass('active-link'); // 全てのリンクのアクティブスタイルを削除
      $(this).closest('li').addClass('active-link'); // クリックされたaタグの親要素のliにアクティブスタイルを追加

    } else {
      console.warn('指定されたIDのコンテンツが見つかりません: ' + targetId);
    }
  });

  // オプション：ブラウザの戻る/進むボタンに対応
  $(window).on('popstate', function() {
    if (window.location.hash) {
      var targetId = window.location.hash;
      $('.pokerHands_content').hide();
      $(targetId).show();
      $('ol.pokerHands__list li a').removeClass('active-link');
      $('a[href="' + targetId + '"]').addClass('active-link');
    } else {
      // ハッシュがない場合は最初のコンテンツなどを表示するなどの処理
      // 例: $('.pokerHands_content').first().show();
      // 例: $('ol.pokerHands__list li a').first().addClass('active-link');
    }
  });
});