//import '../MyPeerElement/MyPeerElement.js';
export class MyCustomElement extends HTMLElement{
    #someNumProp: number = 23;
    get someNumProp(){
        return this.#someNumProp;
    }
    set someNumProp(nv){
        console.log({nv});
        this.#someNumProp = nv;
        const strVal = nv === undefined ? '' : nv.toLocaleString();
        const div = this.shadowRoot?.querySelector('#someNumPropVal');
        if(div !== null && div !== undefined) div.textContent = strVal;
    }

    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.shadowRoot!.innerHTML = String.raw `
        <div itemscope>
            <div  id=someNumPropVal></div>
            <h3>Example 1a</h3>
            <input type=number disabled be-elevating='to some num prop.'>
            
        </div>
        <be-hive></be-hive>
        `;
    }
}

customElements.define('my-custom-element', MyCustomElement);