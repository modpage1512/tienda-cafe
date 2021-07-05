const preloader = document.querySelector(".preloader");
const navBtn = document.querySelector(".navBtn");
const nav = document.querySelector(".nav");
const videoBtn = document.querySelector(".video__switch-btn");
const videoItem = document.querySelector(".video-item");
const drinkForm = document.querySelector(".drink-form");

let click = true;
let clickVideo = true;

class UI {
    
    hidePreloader(){
        preloader.style.display = "none";
    }

    showNav() {

        if(click){
            nav.style.width = "10rem";
            click = false;
        } else {
            nav.style.width = "0";
            click = true;
        }
    }

    videoButton() {
        if(clickVideo){
            videoBtn.style.left = "50%";
            videoItem.pause();
            clickVideo = false;
        } else {
            videoBtn.style.left = "0";
            videoItem.play();
            clickVideo = true;
        }
    }

    checkValue(name, lastName, email) {
        let boolean;

        if(name === "" || lastName === "" || email === ""){
            boolean = false;
        } else {
            boolean = true;
        }

        return boolean;
    }

    showFeedBack(text, type) {
        if(type === "success"){

            let feedBack = document.querySelector(".drink-form__feedback");
            feedBack.classList.add("success");
            feedBack.innerText = text;
            this.removeAlert(type);

        }else if(type === "error"){

            let feedBack = document.querySelector(".drink-form__feedback");
            feedBack.classList.add("error");
            feedBack.innerText = text;
            this.removeAlert(type);
        }
    }

    removeAlert(type){
        setTimeout(() => {
            document.querySelector(".drink-form__feedback").classList.remove(type);
        }, 3000)
    }

    newUser(usuario) {
        const images = [1, 2, 3, 4, 5];
        let random = Math.floor(Math.random() * images.length);
        const div = document.createElement("div");
        div.classList.add("person");
        div.innerHTML = '<img src="img/person-' + random + '.jpeg" alt="persona" class="person-thumbnail">'
        + '<h4 class="person__name">' + usuario.name + '</h4>'
         + '<h4 class="person__lastname">' + usuario.lastName + '</h4>';
        document.querySelector(".drink-card__list").appendChild(div);
    }

    clearFields() {
        document.querySelector(".input-name").value = "";
        document.querySelector(".input-lastname").value = "";
        document.querySelector(".input-email").value = "";
    }

    showEvent(event) {
        
        if(event.target.parentElement.classList.contains("work-item__icon")){
            let id = event.target.parentElement.dataset.id;

            const modal = document.querySelector(".work-modal");
            const modalItem = document.querySelector(".work-modal__item");
            const modalImage = "url(img/work-" + id + ".jpeg)"
            
            modal.classList.add("work-modal--show");
            modalItem.style.backgroundImage = modalImage;
            console.log(modalImage);
        }

    }

    closeEvent() {
        const modal = document.querySelector(".work-modal");
        modal.classList.remove("work-modal--show");
    }
}

class User {
    constructor(name, lastName, email) {
        this.name = name;
        this.lastName = lastName;
        this.email = email; 
    }
}



function eventListener() {

    const ui = new UI();

    window.addEventListener("load", () => ui.hidePreloader());

    navBtn.addEventListener("click", () => ui.showNav());

    videoBtn.addEventListener("click", () => ui.videoButton());

    drinkForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.querySelector(".input-name").value;
        const lastName = document.querySelector(".input-lastname").value;
        const email = document.querySelector(".input-email").value;

        let value = ui.checkValue(name, lastName, email);

        if(value === true){
            ui.showFeedBack("datos procesador exitosamente", "success");

            const usuario = new User(name, lastName, email);
            
            ui.newUser(usuario);

            ui.clearFields();

        }else {
            ui.showFeedBack("datos erroneos", "error");
        }

    })

    document.querySelectorAll(".work-item__icon").forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            ui.showEvent(event);
        });
    });

    document.querySelector(".work-modal__close").addEventListener("click", () => {
        ui.closeEvent();
    })
}
eventListener();