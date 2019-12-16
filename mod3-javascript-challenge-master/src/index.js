document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  const imgUrl = "https://randopic.herokuapp.com/images/4131"
  const likeElement = document.getElementById('likes');
  const likeButton = document.getElementById('like_button');
  let imgData;

  function getImgData() {
    fetch(imgUrl)
    .then(response => response.json())
    .then(data=> {
      imgData = data
      displayImgData(imgData);
      displayImgLikes(imgData)
    })
  }

  function displayImgData(data){
    let image = document.querySelector('img');
    image.src = `${data.url}`
    let name = document.getElementById("name")
    name.innerText= `${data.name}`
  }

  function displayImgLikes(data){
    likeElement.innerText= data.like_count;
    likeButton.addEventListener("click", () => likeImg(data))
  }

  function likeImg(dataInput) {
    let oldCount = dataInput.like_count
    let newCount = oldCount + 1;
    likeElement.innerText = `${newCount}`
    let data = {
      image_id: 4131,
      like_count: newCount
    }
    let configObject = {
      method: 'post',
      body: JSON.stringify(data)
    };

    fetch('https://randopic.herokuapp.com/likes', configObject)
      .then(resp => resp.JSON())
      .then(respData => {
        console.log(respData)
      })
  }

  

  getImgData()
})
