document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  const imgUrl = "https://randopic.herokuapp.com/images/4131"
  const likeElement = document.getElementById('likes');
  const likeButton = document.getElementById('like_button');
  const addComment = document.getElementById("comment_form");
  let imgId = 4131;

  fetch(imgUrl).then(res => res.json()).then(res => displayImg(res))

  function displayImg(res) {
    let img = document.getElementById("image")
    let title = document.getElementById("name")
    let com = document.getElementById("comments")

    img.src = res.url
    title.innerText = res.name
    likeElement.innerText = res.like_count

    res.comments.forEach(coment => {
      let comm = document.createElement("li")
      comm.innerText = coment.content
      com.appendChild(comm)
    })
  }
  likeButton.addEventListener("click", (event) => {
    event.preventDefault()
    let like = parseInt(likeElement.innerText) + 1
    likeElement.innerText = like
    
    fetch(`https://randopic.herokuapp.com/likes/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({like_count: like, image_id: imgId}) })

  })

  addComment.addEventListener("submit", (event) => {
    event.preventDefault()
    let comment = document.querySelector("input[name=comment]").value;
    let comm = document.createElement("li")
    let com = document.getElementById("comments")
    comm.innerText = comment
    com.appendChild(comm)

    fetch(`https://randopic.herokuapp.com/comments/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({content: comment, image_id: imgId}) })
  })

})
