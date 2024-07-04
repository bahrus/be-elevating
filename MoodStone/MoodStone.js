import '../SoulSearcher/SoulSearcher.js';
export class MoodStone extends HTMLElement {
    #isHappy = false;
    get isHappy() {
        return this.#isHappy;
    }
    set isHappy(nv) {
        console.log({ nv });
        this.#isHappy = nv;
        const strVal = nv === undefined ? '' : nv.toLocaleString();
        const div = this.shadowRoot?.querySelector('#isHappy');
        if (div !== null && div !== undefined)
            div.textContent = strVal;
    }
    #songLyricOfTheDay = '';
    get songLyricOfTheDay() {
        return this.#songLyricOfTheDay;
    }
    set songLyricOfTheDay(nv) {
        this.#songLyricOfTheDay = nv;
        const div = this.shadowRoot?.querySelector('#songLyricOfTheDay');
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
            <div  id=isHappy></div>
            <div  id=songLyricOfTheDay></div>
            <!-- <h3>Example 1a</h3>
            <input name=isHappy type=checkbox disabled be-elevating>
            <h3>Example 1b</h3>
            <input type=checkbox disabled be-elevating='to isHappy.'> -->
            <!-- <h3>Example 1c</h3>
            <input disabled
                data-msg='Hello darkness my old friend'  
                🛗='of :dataset:msg to songLyricOfTheDay.'
            > -->
            <!-- <h3>Example 1d</h3>
            <input disabled
                data-msg='Hello darkness my old friend'  
                🛗='of :dataset:msg to songLyricOfTheDay on change.'
            > -->
            <!-- <h3>Example 1e</h3>
            <input disabled
                🛗='to songLyricOfTheDay on change.'
            > -->
            <!-- <h3>Example 1f</h3>
            <button disabled
                value='Hello darkness my old friend'  
                🛗='to songLyricOfTheDay.'
            >Sounds of Silence</button> -->
            <h3>Example 2a</h3>
            
            <soul-searcher -second-thoughts></soul-searcher>
            ...
            <input be-elevating='to -second-thoughts.'>
            <!--<h3>Example 2b</h3>
            <my-peer-element -my-string-prop></my-peer-element>
            ...
            <input be-elevating='to -my-string-prop on change.'> -->
        </div>
        <be-hive></be-hive>
        `;
    }
}
customElements.define('mood-stone', MoodStone);
