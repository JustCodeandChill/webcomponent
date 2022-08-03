class ShowBox extends HTMLElement {
  constructor() {
    super();
    console.log("calling show box");
    this._button;
    this._paragraph;
    this._isHidden = true;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
       ::slotted(.h) {
        background-color: blue;
      }

      :host {
        border: var(--border-style);
        background-color: var(--white, #ccc);
      }

      :host-context(p) {
        background-color: black
      }

    </style>
      <slot name="f"></slot>
      <span>Ha ha you</span>
      <slot name="l"></slot>
    `;
  }

  connectedCallback() {
    this._button = document.createElement("button");
    this._button.textContent = "Show";
    //this._button.classList.add("h");
    this._button.addEventListener("click", this._buttonClick.bind(this));
    this.shadowRoot.appendChild(this._button);

    this._paragraph = document.createElement("p");
    this._paragraph.textContent = this.getAttribute("text") || "More infos";
    this._checkHidden();
    this.shadowRoot.appendChild(this._paragraph);
  }

  disconnectedCallback() {
    console.log("clear elistener");
    this._button.removeEventListener("click", this._buttonClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);

    if (oldValue === newValue) {
      return;
    }

    if (name === "text") {
      if (this._paragraph) {
        this._paragraph.textContent = newValue;
      }
    }
  }

  static get observedAttributes() {
    return ["text"];
  }

  _checkHidden() {
    if (this._isHidden) {
      this._paragraph.style.display = "none";
    } else {
      this._paragraph.style.display = "block";
    }
  }

  _buttonClick(event) {
    this._isHidden = !this._isHidden;
    if (this._button.textContent.toLowerCase() === "show") {
      this._button.textContent = "Hide";
    } else {
      this._button.textContent = "Show";
    }
    this._checkHidden();
  }
}

customElements.define("at-show-box", ShowBox);
