import html from "./utils.js";
import './button-like.js';

class MyProduct extends HTMLElement {
    constructor() {
        super();
        this.myShadowRoot = this.attachShadow({ mode: "open" });
        this.myShadowRoot.innerHTML = html`
        <style>
        .product{

            display:inline-block;
            width:min-content;
            margin-bottom:2vw;
            padding:1vw;
            border-radius: var(--default-border-radius);
            background-color: #f0f0f0;
            
        }

        .product img {
            box-shadow: 0.5vw 0.5vw 2vw #888;
            width:96vw;
            border-radius: var(--default-border-radius);
        }

 .product h2 { position:relative; left:0; top:0;
    text-shadow: 0.25vw 0.25vw 0.25vw #999;}

        @keyframes anim-opacity {
            from {opacity:0;}
            to {opacity:1;}
        }
        </style>

       <article class="product">
            <h2>Product</h2>
            <img src="http://picsum.photos/400/200?random=${ this.getAttribute("id") }">
            <p> description </p>
            
            
            <button-like likes=${ this.getAttribute("likes") || 0}></button-like>
        
        </article>`
    }

}

customElements.define("my-product", MyProduct);