'use strict';

/* jshint esversion: 10 */
import html from "./modules/components/utils.js"
import Products from './modules/products/products.js'

class MyApp {

    //#region constructor
    //cosntru lasdfasdf wqer sadf asdfweq afasdf asdfasdf
    constructor(appID) {
        this.appContainerID = appID || "myApp";
        this.appData = new Map();
        this.appData.set("/", new Map());
    }


//#endregion

    AddRoute(parentRoute, routeName, data) {
        this.appData.get(parentRoute).set(routeName, data);
    }

    OnRoute(route) {
        console.log(`route = ${route}`)
        document.getElementById(this.appContainerID).innerHTML = this.appData.get("/").get(route)?.Render() || this.NotFound();
    }

    NotFound() {
        return html`<section><div>Not found :( 404</div></section>`
    };

}

class AboutUs {

    constructor(objData) {
        this.data = objData;

    }
    
    Render() {
        return html`
        <section id="section-about" >
            <h1> ${ this.data.title } </h1>
            <p> ${ this.data.description}</p>
            <address>
                <a href="mailto:${this.data.contacts.email}">${this.data.contacts.email}</a><br>
                <a href="tel:${this.data.contacts.phone}">${this.data.contacts.phone}</a>
            </address>

        </section>`
    }

}

class HomePage {
    constructor(objData) {
        this.data = objData;
    }

    Render() {
        
        return html`<main><h1>${this.data.title}</h1></main>`

    }
}

class News {  

    constructor(objData) {
        this.data = objData;
    }
    
    Article(dataObj) {
        console.log(dataObj);
        
        return html`
        <article class="news-article">
            <h2>${dataObj.title}</h2>
            <p>${dataObj.author}</p>
            <p>${dataObj.article}</p>
        </article>`;
    }

    Render() {
        let articlesRendered = "";

        // for (let index = 0; index < this.data.articles.length; index++) {
        //     articlesRendered+=this.Article(this.data.articles[index]);
        // }

        for (let article of this.data.articles) {
            articlesRendered+=this.Article(article);
        }

        return html`
        <section id="section-news">
            <h1>${ this.data.title} </h1>
            ${articlesRendered}
            </section>`
            }}

//creating app 
const myApp = new MyApp("myApp");

//About page
const aboutUsDataObj =
{
    "title": "Бидний тухай",
    "description": "asdf asdfas dfasdfwqe rqasdfadf qwer asdf23 werfa sdfasdf 32qrasdfwer3q rfsafasdf  asfwqer",
    "contacts": {
        phone: "+976-99001122",
        email: "info@myapp.com"
    }
};

const aboutUs = new AboutUs(aboutUsDataObj);

//#region Create news page

//News page data
const newsDataObj = {
    "title": "Шинэ мэдээ",
    articles: [
        {   title: "Title",
            author: "Author",
            article: "Aerqwer afasfawera sfqwr wer afasd"
        },
        {   title: "Title1",
            author: "Author1",
            article: "Baerqwer afasfawera sfqwr wer afasd"
        }
    ]
};
//#endregion

const news = new News(newsDataObj);

const homePage = new HomePage({ title: "Welcome" });

const product = new Products({
    title: "Бүтээгдэхүүнүүд",
    products: [
        { title: "Product1", id: 1, likes:"10", description: "product1 description... ... .. ... ." },
        { title: "Product2", id: 2, likes:"119", description: "product2 description... ... .. ... ." },
        { title: "Product3", id: 3, likes:"1", description: "product3 description... ... .. ... ." }
    ]
});
//Route list
myApp.AddRoute("/","/news", news);
myApp.AddRoute("/", "/aboutus", aboutUs);
myApp.AddRoute("/", "/", homePage);
myApp.AddRoute("/", "/products", product);

[...document.getElementsByClassName("menu-item-link")].forEach(element => {
    
    element.addEventListener("click", e => {
        e.preventDefault();
        history.pushState(null, "", e.target.href);
        //myApp.OnRoute(e.target.href);
    }
    )
});

window.addEventListener("popstate", e => {
    console.log("navigation occured");
    myApp.OnRoute(document.location.pathname);
});

history.pushState = function()
{
    History.prototype.pushState.apply(history, arguments);
    myApp.OnRoute(document.location.pathname);
}
//myApp.OnRoute(location.pathname);
//myApp.OnRoute("/aboutus");
//myApp.OnRoute("/products");