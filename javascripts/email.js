(function () {
  var links = document.querySelectorAll("[data-email-first][data-email-last][data-email-host][data-email-zone]");

  for (var i = 0; i < links.length; i += 1) {
    var link = links[i];
    var email = [
      link.getAttribute("data-email-first"),
      ".",
      link.getAttribute("data-email-last"),
      "@",
      link.getAttribute("data-email-host"),
      ".",
      link.getAttribute("data-email-zone")
    ].join("");

    link.textContent = email;
    link.href = ["mai", "lto:", email].join("");
  }
}());
