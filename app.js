const music = new Audio('music/2.mp3');

const songs = [
    {
        id: '1',
        songName: `Tại Vì Sao?
        <div class="subtitle"> MCK </div>`,
        poster: "img/1.jpg",
    },
    {
        id: '2',
        songName: `Sắp Nổi Tiếng
        <div class="subtitle"> HieuThuHai </div>`,
        poster: "img/2.jpg",
    },
    {
        id: '3',
        songName: `Tò Te Tí
        <div class="subtitle"> Wren Evans </div>`,
        poster: "img/3.jpg",
    },
    {
        id: '4',
        songName: `Nhắn Nhũ
        <div class="subtitle"> RonBoogz </div>`,
        poster: "img/4.jpg",
    },
    {
        id: '5',
        songName: `Buồn Hay Vui
        <div class="subtitle"> RonBoogz </div>`,
        poster: "img/5.jpg",
    },
    {
        id: '6',
        songName: `Chưa Xong
        <div class="subtitle"> Obito </div>`,
        poster: "img/6.jpg",
    },
    {
        id: '7',
        songName: `Nếu Lúc Đó
        <div class="subtitle"> Tlinh </div>`,
        poster: "img/7.jpg",
    },
    {
        id: '8',
        songName: `Sắp Nổi Tiếng
        <div class="subtitle"> HieuThuHai </div>`,
        poster: "img/8.jpg",
    },
    {
        id: '9',
        songName: `Buồn Hay Vui
        <br>
        <div class="subtitle">RonBoogz </div>`,
        poster: "img/9.jpg",
    },
    {
        id: '10',
        songName: `Tại Vì Sao
        <br>
        <div class="subtitle">MCK</div>`,
        poster: "img/10.jpg",
    },
    {
        id: '11',
        songName: `Khó Fine
        <br>
        <div class="subtitle"> RonBoogz </div>`,
        poster: "img/11.jpg",
    },
    {
        id: '12',
        songName: `Từng Quen
        <br>
        <div class="subtitle"> Wren Evans </div>`,
        poster: "img/12.jpg",
    },
    {
        id: '13',
        songName: `Con Kể Ba Nghe
        <br>
        <div class="subtitle"> Obito</div>`,
        poster: "img/13.jpg",
    },
    {
        id: '14',
        songName: `Đánh Đổi
        <br>
        <div class="subtitle"> Obito ft MCK </div>`,
        poster: "img/14.jpg",
    },
    {
        id: '15',
        songName: `Họp Lớp
        <br>
        <div class="subtitle"> HieuThuHai </div>`,
        poster: "img/15.jpg",
    },
    {
        id: '16',
        songName: `Bad Trip
        <br>
        <div class="subtitle"> MCK </div>`,
        poster: "img/16.jpg",
    },
    {
        id: '17',
        songName: `Xuất Phát Diểm
        <br>
        <div class="subtitle"> Obito ft Lăng LD </div>`,
        poster: "img/17.jpg",
    },
];

Array.from(document.getElementsByClassName('songitem')).forEach((element, i) => {
    if (i < songs.length) {  // Kiểm tra để đảm bảo không vượt quá phạm vi của mảng
        element.getElementsByTagName('img')[0].src = songs[i].poster;
        element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
    }
});

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];
masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-circle');
        masterPlay.classList.add('bi-pause-circle');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-circle');
        masterPlay.classList.remove('bi-pause-circle');
        wave.classList.remove('active2');
    }
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.add('bi-play-circle');
        element.classList.remove('bi-pause-circle');
    });
};

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songitem')).forEach((element) => {
       element.style.background = "rgb(105, 105, 170, 0)";
    });
};

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
let subtitle = document.getElementById('subtitle');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle');
        e.target.classList.add('bi-pause-circle');
        music.src = `music/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let {songName} = ele;
            title.innerHTML =  songName;
        })
        masterPlay.classList.remove('bi-play-circle');
        masterPlay.classList.add('bi-pause-circle');
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
         masterPlay.classList.add('bi-play-circle');
         masterPlay.classList.remove('bi-pause-circle');
         wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songitem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    
    });
});

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }

    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }

    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar =  parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`
    dot.style.left = `${seekbar}%`
})


seek.addEventListener('change',()=>{
    music.currentTime = seek.value * music.duration/100;
})


music.addEventListener('ended',()=>{
    masterPlay.classList.add('bi-play-circle');
    masterPlay.classList.remove('bi-pause-circle');
    wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change',()=>{
    if (vol.value == 0){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0){
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;

    music.volume = vol_a/100;
})


let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index--; // Giảm index xuống 1 khi nhấn nút back
    if (index < 1) {
        index = songs.length; // Đặt index thành bài hát cuối cùng nếu index nhỏ hơn 1
    }
    music.src = `music/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();

    let song_title = songs.filter((ele) => {
        return ele.id == index;
    });

    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    });

    makeAllPlays();
    document.getElementById(`${index}`).classList.remove('bi-play-circle');
    document.getElementById(`${index}`).classList.add('bi-pause-circle');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songitem'))[index - 1].style.background = "rgb(105, 105, 170, .1)";
});

next.addEventListener('click', () => {
    index++; // Tăng index lên 1 khi nhấn nút next
    if (index > songs.length) {
        index = 1; // Đặt index thành bài hát đầu tiên nếu index vượt quá độ dài của danh sách
    }
    music.src = `music/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();

    let song_title = songs.filter((ele) => {
        return ele.id == index;
    });

    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    });
    makeAllPlays();
    document.getElementById(`${index}`).classList.remove('bi-play-circle');
    document.getElementById(`${index}`).classList.add('bi-pause-circle');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songitem'))[index - 1].style.background = "rgb(105, 105, 170, .1)";
});
