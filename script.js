let intial=localStorage.length;
const match = (key) => {
  for (let i = 0; i < localStorage.length; i++) {
    let arr = localStorage.key(i)
    if (key == arr) { return true }
  }
  return false
}

const note = async () => {

  for (let i = 0; i < localStorage.length; i++) {

    let a = document.getElementById('curr');
    let key = localStorage.key(i)
    let obj = await JSON.parse(localStorage.getItem(key))
    let x = `<div class="card mb-2 mt-2">
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h5 class="card-title fs-3 ">${obj.Title}</h5>
      <div class="fs-1 text-danger" onclick="del('${key}')">-</div>
    </div>
      <h6 class="card-subtitle mb-2 text-muted fs-6">${obj.Time}</h6>
      <p class="card-text fs-5">${obj.Notes}</p>
    </div>
  </div>`
    a.insertAdjacentHTML('beforeend', x);
  }
}

const refresh = () => {
  for (let i = 0; i <= intial; i++) { 
  document.getElementsByClassName('card')[i].remove(); 
}
note()
}

const noteSave = (key, value) => {
  key = key.trim()
  if (match(key)) {
    if (confirm(`Do you want to modify content of note title \"${key}\"`)) {
      localStorage.setItem(key, value);
      alert("Save sucessfull") ;
       intial++;
      location.reload();
    }
    else alert("Change title")
  }
  else{ localStorage.setItem(key, value) ; 
      location.reload();
       alert("Save sucessfull") ;intial++;}
}

const del = (key) => {
  if (confirm("Do you want to remove reminder " + key)) { localStorage.removeItem(key);
refresh() 
intial--}
  else return key
}

const date = () => {
  let a = new Date();
  return `${a.getDate()}-${(a.getMonth() + 1) / 10 < 1 ? '0' + (a.getMonth() + 1) : a.getMonth()}-${(a.getFullYear())} at ${a.getHours()}:${a.getMinutes()/10<1?'0'+a.getMinutes():a.getMinutes()}`
}

note()

document.getElementById('save').onclick =() => {
  let obj = {
    Title: document.getElementsByTagName('Textarea')[0].value,
    Time: date(),
    Notes: document.getElementsByTagName('Textarea')[1].value
  }
noteSave(obj.Title, JSON.stringify(obj))
  
}

//Clear notes;
document.getElementById('clear').onclick = () => {
  Array.from(document.getElementsByTagName('Textarea')).forEach((element) => {
    element.value = "";
  })
}