export class MyPeerElement extends HTMLElement {
    #myStringProp = '';
    get myStringProp() {
        return this.#myStringProp;
    }
    set myStringProp(nv) {
        this.#myStringProp = nv;
        const div = this.shadowRoot?.querySelector('#myStringPropVal');
        if (div !== null && div !== undefined)
            div.textContent = nv;
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = String.raw `
        <div itemscope>
            <div  id=myStringPropVal></div>
        </div>
        `;
    }
}
customElements.define('my-peer-element', MyPeerElement);
