const showLoader=()=>{
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-conteiner").classList.add("hidden");

}
const removeLoader =()=>{
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-conteiner").classList.remove("hidden");
}
const loadcatagory = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => {
            diplayData(data.categories)

        })
}
const loadVideos = (input ="") => {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${input}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("btn-all").classList.add("active");
            videoapi(data.videos)
        })
    removeActive();
}
const removeActive = () => {
    const calssActive = document.getElementsByClassName("active");
    for (const btn of calssActive) {
        btn.classList.remove("active")
    }
}
const catagoriapi = (id) => {
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            videoapi(data.category)
            removeActive();
            const btnSelected = document.getElementById(`btn-${id}`);
            btnSelected.classList.add("active");

        })
    showLoader();
}
const showDetails=(videoId)=>{
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/video/${videoId}
    `;
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        displayDetails(data.video)
    })
}
const displayDetails = (video)=>{
    document.getElementById("videoDetails").showModal();
    const detailsConteiner = document.getElementById("showDetails");
    detailsConteiner.innerHTML = `
                    <div class="card bg-base-100 image-full shadow-sm">
                        <figure >
                            <img class=" object-cover w-[100%]" src="${video.thumbnail}"
                                alt="" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">${video.title}</h2>
                            <p>${video.description}</p>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn hover:bg-[#FF1F3D] hover:text-[#F9F9F9]">Close</button>
                                </form>
                            </div>
                        </div>

                    </div>
   `;
    
}
const videoapi = (allvideos) => {
    const videoSection = document.getElementById("video-conteiner");
    videoSection.innerHTML = "";
    if (allvideos.length === 0) {
        videoSection.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center py-20 text-center">
        <img src="/assests/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops! No Video Abailable!</h2>
    </div>
        `;
        removeLoader();
        return;
    }
    allvideos.forEach((video) => {
        const verified = video.authors[0].verified;
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
         <div class="card bg-base-10">
            <figure class="relative">
                <img class=" h-[160px] rounded-sm object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute  bottom-2 right-2 text-white bg-black px-2 text-sm rounded">3hrs 56min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}  ${verified === true ? `<img
                           class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ` `}</p>
                           <p class="text-sm text-gray-400">${video.others.views}</p>
                           
                </div>
            </div>
            <button onclick = showDetails('${video.video_id}') class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl hover:bg-[#FF1F3D] hover:text-[#F9F9F9]">Show Details</button>
        </div>
    `;
        videoSection.append(videoCard)
    });
    removeLoader();
}
const diplayData = (categorie) => {
    const catagoryContainer = document.getElementById("catagory-container");

    for (const cat of categorie) {
        const catagoryDiv = document.createElement("div");
        catagoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="catagoriapi(${cat.category_id});" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-[#F9F9F9]">${cat.category}</button>
        
        `;
        catagoryContainer.append(catagoryDiv)
    }
}
document.getElementById("search-input").addEventListener("keyup",(e)=>{
const input = e.target.value;
    loadVideos(input);
})
loadcatagory();