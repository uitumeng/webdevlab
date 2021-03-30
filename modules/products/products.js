import Component from "../components/component.js";

export default class Products extends Component {
   
    constructor(objData) {
        super();
        
        this.appData = objData;
    }

    Render() {
        return this.html`

        <h1>Products</h1>
        <section class="products">
            ${ this.RenderList(this.appData.products) }
        </section>
        `;
    }

    RenderList(listOfProducts) {
        let retVal = "";

        // for (let prod of listOfProducts) {
        //     retVal += this.html`
        //     <article class="product">
        //         <h2>${ prod.title }</h2>
        //         <img src="http://picsum.photos/300/200?random=${ prod.id }">
        //         <p>${ prod.description }</p>
        //     </article>`;
        // }


        for (let prod of listOfProducts) {
            retVal+=`<my-product likes='${prod.likes}' id=${prod.id}></my-product>`
        }

        

        return retVal;
    }

}
