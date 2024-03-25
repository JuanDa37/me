//toggle icon navbar

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

//scroll sections
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');
window.onscroll = () => {

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 300;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            //active navbar links
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+ id + ']').classList.add('active');
            })
            
            //active sections on animations on  the scroll
            sec.classList.add('show-animate')
            
        }

        //if you usea want repeat animate on scroll may
        else{
            sec.classList.remove('show-animate')
        }


    })

    //sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100); 

    //remove toggle icons and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    //animation footer on scroll

    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);

}

/*window.addEventListener('load', function() {
    window.addEventListener('scroll', function() {
        console.log('Se activó el evento de desplazamiento');
        var textAnimate = document.querySelector('.text-animate');
        textAnimate.classList.remove('cursor-reset-animation');
        void textAnimate.offsetWidth; // Truco para reiniciar la animación sin problemas
        textAnimate.classList.add('cursor-reset-animation');
    });
});*/

const form = document.querySelector('form');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const mess = document.getElementById('message');

function sendEmail(){
    const BodyMessage = `Full name: ${fullName.value} <br> Email: ${email.value} <br> Phone Number: ${phone.value} <br> Message: ${mess.value}`;
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "juandavidpinvilla@gmail.com",
        Password : "5E60C930FDAC33765E193D2CA13414934104",
        To : 'juandavidpinvilla@gmail.com',
        From : "juandavidpinvilla@gmail.com",
        Subject : subject.value,
        Body : BodyMessage
    }).then(
      message => {
        if(message == "OK"){
            Swal.fire({
                title: "Success",
                text: "You clicked the button!",
                icon: "success"
              });
        }
      }
    );
}

function checkInputs(){
    const items = document.querySelectorAll('item');
    for(const item of items){
        if(item.value == ""){
            item.classList.add("error");
            item.parentElement.classList.add('error'); 
        }

        if(items[1].value !=  ""){
            checkEmail();
        }

        items[1].addEventListener("keyup",() =>{
            checkEmail();
        })

        item.addEventListener("keyup", ()=>{
            if(item.value != ""){
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }else{
                item.classList.add("error");
                item.parentElement.classList.remove("error");
            }
        })
    }
}

function checkEmail(){
    const EmailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt .email");    
    
    if(!email.value.match(EmailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value != ""){
            errorTxtEmail.innerText = "Enter a valid email address";
        }else{
            errorTextEmail.innerText = "Email address can't be blank";
        }

    }else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }

}

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    checkInputs();

    if(!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")){
        sendEmail();

        form.reset();
        return false;

    }

})