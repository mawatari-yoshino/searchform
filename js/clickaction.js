document.addEventListener('DOMContentLoaded', function () {
  const hum = document.querySelector('.spn-hum');
  const nav = document.querySelector('.spn-header-nav');
  const clearBtn = document.querySelector('.header-nav-clear');

  const closeMenu = () => {
    hum.classList.remove('active');
    nav.classList.remove('active');
    clearBtn.classList.remove('active');
    document.body.classList.remove('noscroll');
  };

  if (hum && nav && clearBtn) {
    hum.addEventListener('click', function () {
      const isActive = hum.classList.contains('active');

      // トグル処理
      hum.classList.toggle('active');
      nav.classList.toggle('active');
      clearBtn.classList.toggle('active');
      document.body.classList.toggle('noscroll');

      // すでにactiveなら解除の意味なので、以降の処理は不要
      if (isActive) return;
    });

    clearBtn.addEventListener('click', function () {
      if (clearBtn.classList.contains('active')) {
        closeMenu();
      }
    });

    // ▼ナビ内リンククリック時にメニューを閉じる（イベントデリゲーション）
    nav.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') || '';

      // #から始まる or 同一ページ内のハッシュ付きURLなら閉じる
      const isHashOnly = href.startsWith('#');
      const isSamePageHash =
        !isHashOnly &&
        link.origin === location.origin &&
        link.pathname === location.pathname &&
        href.includes('#');

      if (isHashOnly || isSamePageHash) {
        // スクロール遷移の邪魔をしないように preventDefault はしない
        closeMenu();
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  handleScrollIn();
});

const handleScrollIn = () => {
  const targets = document.querySelectorAll(".js-scrollIn");

  const options = {
    root: null, 
    rootMargin: "-20% 0px", 
    threshold: [0] 
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  targets.forEach((target) => {
    observer.observe(target);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const header = document.querySelector(".header-container");

  if (!header) {
    console.warn("ヘッダーが見つかりません");
    return;
  }

  window.addEventListener("scroll", function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
      // スクロールダウン → ヘッダーを隠す
      header.style.top = "-100px"; // 高さに応じて調整
    } else {
      // スクロールアップ → ヘッダーを表示
      header.style.top = "0";
    }

    lastScrollTop = st <= 0 ? 0 : st;
  });
});

