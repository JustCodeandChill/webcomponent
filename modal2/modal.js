class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
      <style>
      :host([opened]) #backdrop, :host([opened]) #model {
        opacity: 1;
        pointer-events: all;
      }

        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.75);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }

        #modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          max-height: 30rem;
          border-radius: 3px;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);
          z-index:100;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-event: none;
        }

        header {
          padding: 1rem;
        }

        ::slotted(h1) {
          font-size: 1.25rem
        }

        #actions {
          border-top: 1px solid red;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        #actions button {
          margin: 0 0.25rem;
        }

        #main {
          padding: 1rem;
        }

      </style>
      <div id='backdrop'></div>
      <div id='modal'>
        <header>
          <slot name="title"></slot>
        </header>
        <section id='main'>
          <slot></slot>
        </section>
        <section id='actions'>
          <button id="cancel-btn">Cancel</button>
          <button id='confirm-btn'>Okay</button>
        </section>
      </div>
    `;

    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", () => {
      console.dir(slots[1].assignedNodes());
    });
    const cancelBtn = this.shadowRoot.getElementById("cancel-btn");
    const confirmBtn = this.shadowRoot.getElementById("confirm-btn");

    console.log(cancelBtn, confirmBtn);

    cancelBtn.addEventListener("click", this._cancel.bind(this));
    confirmBtn.addEventListener("click", this._confirm.bind(this));

    cancelBtn.addEventListener("cancel", (e) => {
      console.log("ehjadrtin cancel");
    });
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute("opened")) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  static get observedAttributes() {
    return ["opened"];
  }

  open() {
    console.log("adding open");
    this.setAttribute("opened", "");
    this.isOpen = true;
  }

  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
    this.isOpen = false;
  }

  _cancel(event) {
    this.hide();
    const cancelEvent = new Event("cancel");
    event.target.dispatchEvent(cancelEvent, { bubbles: true, composed: true });
  }

  _confirm() {
    this.hide();
    const confirmEvent = new Event("cancel");
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define("uc-modal", Modal);
