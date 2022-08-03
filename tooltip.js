class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "Default text";
    this.attachShadow({ mode: "open" });
    //const template = document.querySelector("#tooltip-icon");
    //this.shadowRoot.appendChild(template.content.cloneNode(true));
    const defaultText = "This is defaultt extr";
    this.shadowRoot.innerHTML = `
    <style>
      div {
        background-color: black;
        color: white;
        border: 1px solid blue;
        position: absolute;
        z-index: 10;
      }
    </style>
    <slot>${defaultText}</slot>
    <span>(?) </span>
    `;
  }

  connectedCallback() {
    if (this.getAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }

    const sp = this.shadowRoot.querySelector("span");
    sp.addEventListener("mouseenter", this._showTooltip.bind(this));
    sp.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(sp);
    this.style.position = "relative";
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("uc-tooltip", Tooltip);
