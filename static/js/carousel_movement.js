let currentSlideIndex = 0;

function moveSlide(direction) {
    console.log("button pressed!")
    const slides = document.querySelector('.carousel-slides');
    const totalSlides = slides.children.length;


    currentSlideIndex += direction;


    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    } else if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    }


    const slideWidth = slides.children[0].clientWidth;
    slides.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
}


function addSlide(imageUrl, caption = '', text='') {
    const slides = document.querySelector('.carousel-slides');

    const slide = document.createElement('div');
    slide.innerHTML = `
        <img src="${imageUrl}" alt="Slide">
        <p>${caption}</p>
        <p>${text}</p>
    `;
    slides.appendChild(slide);
}

function upload_picture_preview(){
    const input=document.querySelector('.file-input');
    const preview=document.querySelector('.image-preview');
    const file=input.files[0];
    console.log("This step here");
    if(file){
        const reader=new FileReader();
        reader.onload=function(e){
            preview.src=e.target.result;
            console.log("This step here");
            preview.style.dysplay='block';
        }
        reader.readAsDataURL(file);
    }
    else{
        preview.src='';
        preview.style.dysplay='none';
    }
    
}