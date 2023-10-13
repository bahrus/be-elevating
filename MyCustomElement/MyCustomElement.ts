import '../MyPeerElement/MyPeerElement.js';
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

    #someStringProp: string = '';
    get someStringProp(){
        return this.#someStringProp;
    }
    set someStringProp(nv){
        this.#someStringProp = nv;
        const div = this.shadowRoot?.querySelector('#someStringPropVal');
        if(div !== null && div !== undefined) div.textContent = nv;
    }

    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.shadowRoot!.innerHTML = String.raw `
        <div itemscope>
            <div  id=someNumPropVal></div>
            <div  id=someStringPropVal></div>
            <h3>Example 1a</h3>
            <input type=number disabled be-elevating='to some num prop.'>
            <h3>Example 1b</h3>
            <input data-test='this text should appear on input.' disabled 
                    be-elevating='of dataset:test to some string prop.'>
            <h3>Example 1c</h3>
            <input data-test='this text should appear on input.' disabled 
                    be-elevating='of dataset:test to some string prop on change.'>
            <h3>Example 2a</h3>
            <my-peer-element -my-string-prop></my-peer-element>
            ...
            <input be-elevating='to -my-string-prop.'>
        </div>
        <be-hive></be-hive>
        `;
    }
}

customElements.define('my-custom-element', MyCustomElement);