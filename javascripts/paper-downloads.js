(function () {
  function cleanText(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function isResearchPdf(link) {
    var href = link.getAttribute("href") || "";
    return /^research\/.*\.pdf(?:[?#].*)?$/i.test(href);
  }

  function getPaperData(link) {
    var article = link.closest("article.paper");
    var section = link.closest(".paper-section");
    var title = article ? article.querySelector("h4") : null;
    var sectionTitle = section ? section.querySelector("h3") : null;
    var url = new URL(link.getAttribute("href"), window.location.href);
    var pathParts = url.pathname.split("/");

    return {
      paper_title: cleanText(title ? title.textContent : link.textContent),
      paper_file: pathParts[pathParts.length - 1],
      paper_section: cleanText(sectionTitle ? sectionTitle.textContent : ""),
      link_url: url.href,
      transport_type: "beacon"
    };
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest ? event.target.closest("a[href]") : null;

    if (!link || !isResearchPdf(link) || typeof window.gtag !== "function") {
      return;
    }

    var data = getPaperData(link);
    var modifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    var target = (link.getAttribute("target") || "").toLowerCase();

    if (modifiedClick || (target && target !== "_self")) {
      window.gtag("event", "paper_download", data);
      return;
    }

    event.preventDefault();

    var navigated = false;
    var navigate = function () {
      if (navigated) {
        return;
      }

      navigated = true;
      window.location.href = link.href;
    };

    data.event_callback = navigate;
    data.event_timeout = 750;

    window.gtag("event", "paper_download", data);
    window.setTimeout(navigate, 800);
  });
}());
