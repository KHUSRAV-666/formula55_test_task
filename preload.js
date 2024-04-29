window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }

  //WEBVIEW-------------
  const webview = document.querySelector("webview");
  webview.addEventListener("dom-ready", () => {
    // webview.openDevTools()
    const btn = document.querySelector("#getData");
    const teamsBlock = document.querySelectorAll("#scoreboard");
    btn.onclick = function () {
      if (teamsBlock) teamsBlock.style.display = "block";
    };
    const target = document.querySelector("#webview");
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(
          `Зафиксировано изменение типа ${mutation.type}. Требуется наблюдение.`
        );
        // const team1 = target.document.querySelector('.column__t2--rn4_E');
        console.log(4444, target.contentWindow.document.body);
      });
    });

    observer.observe(target, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  });
});
