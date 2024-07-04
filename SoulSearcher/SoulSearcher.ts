export class SoulSearcher extends HTMLElement{
    #secondThoughts: string = '';
    get secondThoughts(){
        return this.#secondThoughts;
    }
    set secondThoughts(nv){
        this.#secondThoughts = nv;
        const div = this.shadowRoot?.querySelector('#secondThoughts');
        if(div !== null && div !== undefined) div.textContent = nv;
    }

    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.shadowRoot!.innerHTML = String.raw `
        <div itemscope>
            <div  id=secondThoughts></div>
        </div>
        `;
    }
}
customElements.define('soul-searcher', SoulSearcher);