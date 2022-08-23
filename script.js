async function populate() {
  // WP API Url
  const requestURL =
    "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json";
  // Fetching the data
  const request = new Request(requestURL);
  const response = await fetch(request);
  const blogPosts = await response.json();

  const main = document.getElementById("main");

  for (const post of blogPosts) {
    const date = new Date(post.date)

    const year = date.getUTCFullYear();
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' })
  
    const apparitionDate = [day, month, year].join(' ')

    const html = `
    <div class="col-4">
        <div class="p-card card-outline">
          <div class="u-sv1">CLOUD AND SERVER</div>
          <hr>
          <div class="p-card__content">
              <img class="p-card__image" alt="" src="${post.featured_media}">
              <div class="card-title"> 
                <h4 height: 300px>
                  <a href="${post.link}">${post.title["rendered"]}</a>
                </h4>
              </div>

              <div class="u-sv1">              
                <strong><i>
                  By <a href="${post._links.author[0].href}">${post._embedded.author[0].name}</a> on ${apparitionDate}
                </i></strong>
              </div>

              <hr>
              <p class="u-no-padding--bottom">Article</p>
          </div>
        </div>
    </div>`;
    main.insertAdjacentHTML("beforeend", html);
  }
}

populate();
