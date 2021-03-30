import html from './utils.js';

class LikeButton extends HTMLElement {

    constructor() {
        super();
        this.hasLiked = false;
        this.innerRoot = this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {
        this.Render();
    }

    Render() {
        console.log("rendering...");
        this.innerRoot.innerHTML = html `
            <style>

                #a2{
                    display:none;
                }
        
                #aa2::before {
                    content:"❤";
                    color:gray;
                    cursor:pointer;
                }
        
                #a2:checked+#aa2::before{
                    color: tomato;
                }
        
                label{user-select: none;}
            
            </style>
    
            <input id="a2" type="checkbox">
            
            <label for="a2" id="aa2">${this.getAttribute("likes") || 0}</label>`;

        this.innerRoot.getElementById("aa2").addEventListener("click", this.Increment.bind(this));

    }

    set likes(value) {
        console.log(`set likes=${value}`);
        this.setAttribute("likes", value);
        this.innerRoot.getElementById("aa2").innerText = value;
    }

    get likes() {
        console.log("get likes");
        return this.getAttribute("likes");
    };

    static get observedAttributes() {
        return ["likes"]
    }

    attributeChangedCallback(att, oldValue, newValue) {
        console.log(`att has changed ${att}`);
        switch (att) {
            case "likes":
                console.log("likes has changed");
                break;
        
            default:
                break;
        }
    }

    Increment() {
        console.log(`likes=${this.likes}`)
       
        this.likes = (Number.parseInt(this.likes) || 0) + (this.hasLiked ? -1 : 1);
        this.innerRoot.getElementById("aa2").innerText = this.likes;
        this.hasLiked = !this.hasLiked;
        
    }

}

customElements.define("button-like", LikeButton);