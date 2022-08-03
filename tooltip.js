class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "Default text";
    this._isVisible = false;
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

      :host {
        position: relative;
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
    this._render();
  }

  _render() {
    let container = this.shadowRoot.querySelector("div");
    console.log(this._isVisible, container);
    if (this._isVisible) {
      container = document.createElement("div");
      container.textContent = this._tooltipText;
      this.shadowRoot.appendChild(container);
    } else {
      if (container) this.shadowRoot.removeChild(container);
    }
  }

  _showTooltip() {
    this._isVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._isVisible = false;
    this._render();
  }
}

customElements.define("uc-tooltip", Tooltip);
