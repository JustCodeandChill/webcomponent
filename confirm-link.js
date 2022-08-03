class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    console.log("called contect");
    this.addEventListener("click", (event) => {
      if (!confirm("do you want to leave")) {
        event.preventDefault();
      }
    });
  }
}

customElements.define("at-confirmlink", ConfirmLink, {
  extends: "a",
});
