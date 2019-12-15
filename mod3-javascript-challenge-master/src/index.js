document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  const imgURL = "https://randopic.herokuapp.com/images/4131";
  const likeUrl = "https://randopic.herokuapp.com/likes";
  let imgData;
  let likeCount;
  function getImgData(imgURL) {
    fetch(imgURL)
    .then(response => response.json())
    .then(data => {
    //  imgData = data;
     passImageData(data);
     displayImageData(data);
     likeDisplay(data);
    })
  }
// Here we're passing the returned JSON to a global variable that can be accessed by the following functions
  function passImageData(img) {
    console.log(img)
    imgData= img;
  }

  function displayImageData(imgData){
    let imgElement = document.querySelector('img');
    let imgName = document.getElementById('name');
    imgName.innerText = `${imgData.name}`
    imgElement.src = `${imgData.url}`;

  }

  function likeDisplay(imgData) {
    let likeCount = imgData.like_count;
    console.log(imgData.like_count)
    let imgLikes = document.getElementById('likes');
    imgLikes.innerText = `${likeCount}`;
    let likeButton = document.getElementById('like_button');
    likeButton.addEventListener("click", () => likeImg(imgData.like_count));
  }

  const likeImg = likeCount => {
    let oldCount = parseInt(likeCount);
    console.log(oldCount)
    let newCount = oldCount + 1;
    let likeDisplay = document.getElementById('likes');
    likeDisplay.innerText = `${newCount}`;
    let imgId = parseInt(imgData.id)
    var postBody = {
      "image_id": imgId 
    }
    console.log(postBody)

    configObject = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
      body: JSON.stringify({postBody})
      
		};

    fetch( likeUrl, configObject) 
      .then(res => res.json())
     .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
}

   getImgData(imgURL);
   
  });
