(function () {
  var root = document.documentElement;
  var btn = document.querySelector(".theme");
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function current() {
    var t = root.getAttribute("data-theme");
    if (t === "dark" || t === "light") return t;
    return systemDark.matches ? "dark" : "light";
  }
  function label() {
    if (btn) btn.textContent = current() === "dark" ? "Light" : "Dark";
  }
  if (btn) {
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      label();
    });
    systemDark.addEventListener("change", label);
    label();
  }
})();
