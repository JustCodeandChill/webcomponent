class Tooltip extends HTMLElement {
  constructor() {
    super();
    console.log("called");
  }
}

customElements.define("uc-tooltip", Tooltip);
