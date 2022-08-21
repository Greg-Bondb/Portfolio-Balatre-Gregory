// Menu Burger

let header = document.querySelector("header");
let burger2 = document.getElementsByClassName('burger-bar');
let name = document.getElementsByClassName('name');
let lang = document.getElementsByClassName('lang');
let categories = document.getElementsByClassName('categorie-name');

const burger = document.querySelector('.burger')
const body = document.querySelector('body');
burger.addEventListener('click', ()=>{
    burger.classList.toggle('active')
    body.classList.toggle('open')
})

window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",window.scrollY > 0);
    burger2[0].classList.toggle("sticky",window.scrollY > 0);
    name[0].classList.toggle("sticky",window.scrollY > 0);
    lang[0].classList.toggle("sticky",window.scrollY > 0);
    for (let i = 0; i < categories.length; i++) {
        categories[i].classList.toggle("sticky",window.scrollY > 0);
    }
})

//Typing
consoleText(['Bonjour', 'Hello World !', 'Console.log(Bonsoir)'], 'text',['tomato','rebeccapurple','cornflowerblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

// drop circle
const projects = document.querySelectorAll(".project");
const drop = document.querySelector(".drop");
const showcase = document.querySelector(".showcase");
const txt =  document.querySelector(".txt");
const container = document.querySelector(".container2");

let start,
  offsetY,
  offsetX,
  targetRect,
  target,
  dropped = false,
  expanded = false;

const stopped = () => {
  start = false;
  if (target) {
    showcase.classList.remove("is-dragging");
    target.classList.remove("is-selected");
    drop.classList.remove("is-active");
    drop.classList.remove("is-ready");
  }
  if (dropped) {
    showcase.classList.add("is-preview");
    target.classList.add("is-expanded");
    drop.classList.add("is-dropped");
    container.classList.add("open");
    drop.textContent = "CLOSE";
    expanded = true;
  } else {
    drop.classList.remove("is-dropped");
    showcase.classList.remove("is-preview");
    target.classList.remove("is-expanded");
    container.classList.remove("open");
    drop.textContent = "DROP HERE";
    expanded = false;
  }
};

const started = (e, type) => {
  start = true;
  target = e.target;
  if (type === "touch") {
    console.log(e.touches[0]);
    offsetY = target.offsetWidth / 2 + target.offsetTop;
    offsetX = target.offsetWidth / 2 + target.offsetLeft;
  } else {
    offsetY = e.offsetY + target.offsetTop;
    offsetX = e.offsetX + target.offsetLeft;
  }
  targetRect = target.getBoundingClientRect();
  target.classList.add("is-selected");
  showcase.classList.add("is-dragging");
  for(var i = 0; i < showcase.classList.length; i++) {
    if (showcase.classList[i] === "is-preview") {
      showcase.classList.remove("is-dragging");
    }
  }
};

projects.forEach(project => {
  project.addEventListener("mousedown", e => {
    started(e, "mouse");
  });
  project.addEventListener("touchstart", e => {
    started(e, "touch");
  });
});

const docUp = () => {
  if (!expanded && target) {
    stopped();
  }
};

document.addEventListener("mouseup", () => {
  docUp();
});
document.addEventListener("touchend", () => {
  docUp();
});

const docMove = (e, type) => {
  let clientX = 0,
    clientY = 0;

  if (type === "touch") {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  if (
    clientY + window.scrollY > drop.offsetTop &&
    clientY < drop.offsetTop + drop.offsetHeight - window.scrollY &&
    clientX > drop.offsetLeft &&
    clientX < drop.offsetLeft + drop.offsetWidth &&
    start &&
    !expanded
  ) {
    drop.classList.add("is-ready");
    dropped = true;
  } else {
    drop.classList.remove("is-ready");
    target.style.transform = `translateY(${0}px) translateX(${0}px)`;
    dropped = false;
  }

  if (start && !expanded) {
    console.log("clientY", clientY, "offsetY", offsetY, "window.scrollY", window.scrollY)
    target.style.transform = `translateY(${clientY - offsetY + window.scrollY }px) translateX(${clientX - offsetX + window.scrollX}px)`;
  }
};

document.addEventListener("mousemove", e => {
  docMove(e, "mouse");
});
document.addEventListener("touchmove", e => {
  docMove(e, "touch");
});

drop.addEventListener("click", () => {
  if (expanded) {
    dropped = false;
    target.style.transform = "none";
    stopped();
    Array.from(projects).forEach((item) => {
      item.classList.remove("is-expanded")
      item.classList.remove("is-selected")
  })
  }
});

// carousel circle
let img = document.getElementsByClassName('switch');
let active = document.getElementsByClassName('active');
let direction = document.getElementsByClassName('direction');
let y = 0;

Array.from(direction).forEach((item) => {
    item.addEventListener('click', function() {
        range(item.dataset.sens);
    })
})

function range(arg) {
    Array.from(active).forEach(function(item) {
        item.classList.remove('active');
    })
    if (arg === "next" && y !== img.length-1) {
        y += 1;
    } else if (arg ==="previous" && y !== 0){
        y -= 1;
    } else if (y === 0) {
        y = img.length-1;
    } else {
        y = 0;
    }
    img[y].classList.add('active');
    Array.from(radio).forEach(function(item) {
        item.classList.remove('hvr');
    })
    radio[y].classList.add('hvr')
}

// a propos

// var words = document.getElementsByClassName('word');
// var wordArray = [];
// var currentWord = 0;

// words[currentWord].style.opacity = 1;
// for (var i = 0; i < words.length; i++) {
//   splitLetters(words[i]);
// }

// function changeWord() {
//   var cw = wordArray[currentWord];
//   var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
//   for (var i = 0; i < cw.length; i++) {
//     animateLetterOut(cw, i);
//   }
  
//   for (var i = 0; i < nw.length; i++) {
//     nw[i].className = 'letter behind';
//     nw[0].parentElement.style.opacity = 1;
//     animateLetterIn(nw, i);
//   }
  
//   currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
// }

// function animateLetterOut(cw, i) {
//   setTimeout(function() {
// 		cw[i].className = 'letter out';
//   }, i*80);
// }

// function animateLetterIn(nw, i) {
//   setTimeout(function() {
// 		nw[i].className = 'letter in';
//   }, 340+(i*80));
// }

// function splitLetters(word) {
//   var content = word.innerHTML;
//   word.innerHTML = '';
//   var letters = [];
//   for (var i = 0; i < content.length; i++) {
//     var letter = document.createElement('span');
//     letter.className = 'letter';
//     letter.innerHTML = content.charAt(i);
//     word.appendChild(letter);
//     letters.push(letter);
//   }
  
//   wordArray.push(letters);
// }

// changeWord();
// setInterval(changeWord, 4000);

// voir plus
var hp = document.getElementsByClassName("block-effect");
var form = document.getElementsByClassName("app-form-button")
var control = document.getElementsByClassName("mail")

function isInViewport(element) {
  const rect = element[0].getBoundingClientRect();
  if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)) {
    return true
  } else {
    return false
  }
}

window.addEventListener("scroll",function(){
  if (isInViewport(hp)) {
    Array.from(hp).forEach((item) => {
      hp[0].classList.add("after")
  })
  } else {
    Array.from(hp).forEach((item) => {
      hp[0].classList.remove("after")
  })
  }
})

// send mail
function Mail() {
  Array.from(form).forEach((item) => {
    item.addEventListener('click', function() {
        SendMail(item.value);
    })
  })
}

function SendMail(value) {
  if (value == "cancel") {
    document.getElementById("mail").reset();
  } else {
    var url="mailto:gregory.balatre@ynov.com"
    +"?subject="+encodeURIComponent(document.getElementById("edSubject").value)
    +"&body="+encodeURIComponent(document.getElementById("edBody").value);
    document.location=url;
  }
}
