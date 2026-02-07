//Creates temple cards from a provided arr of temple info and displays them on the page

//temples info data arr
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple7.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/2-Rome-Temple-2190090.jpg",
  },
  {
    templeName: "Provo City Center",
    location: "Provo, Utah, United States",
    dedicated: "2016, March, 20",
    area: 85084,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/400x250/provo-city-center-temple-1572517-wallpaper.jpg",
  },
];

//basic temple card function
function createTempleCard(temple) {
  return `
    <div class="temple-card">
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
    </div>
  `;
}

//func that takes a provided arr of temples and displays their cards
function displayTemples(templeArray) {
  const container = document.getElementById("temple-cards");
  container.innerHTML = templeArray
    .map((temple) => createTempleCard(temple))
    .join("");
}

//gets the year from the date string in our temples arr and gets the year from it
function getYear(dedicatedDate) {
  return parseInt(dedicatedDate.split(",")[0]);
}

//filters to get temples to fit categories old, new, large, small and calls our displayTemples func
function filterOldTemples() {
  const oldTemples = temples.filter(
    (temple) => getYear(temple.dedicated) < 1900,
  );
  displayTemples(oldTemples);
}

function filterNewTemples() {
  const newTemples = temples.filter(
    (temple) => getYear(temple.dedicated) > 2000,
  );
  displayTemples(newTemples);
}

function filterLargeTemples() {
  const largeTemples = temples.filter((temple) => temple.area > 90000);
  displayTemples(largeTemples);
}

function filterSmallTemples() {
  const smallTemples = temples.filter((temple) => temple.area < 10000);
  displayTemples(smallTemples);
}

function showAllTemples() {
  displayTemples(temples);
}

//sets up event listeners for our nav buttons to get the right temples when clicked
function setupEventListeners() {
  document.getElementById("home").addEventListener("click", (e) => {
    e.preventDefault();
    showAllTemples();
  });

  document.getElementById("old").addEventListener("click", (e) => {
    e.preventDefault();
    filterOldTemples();
  });

  document.getElementById("new").addEventListener("click", (e) => {
    e.preventDefault();
    filterNewTemples();
  });

  document.getElementById("large").addEventListener("click", (e) => {
    e.preventDefault();
    filterLargeTemples();
  });

  document.getElementById("small").addEventListener("click", (e) => {
    e.preventDefault();
    filterSmallTemples();
  });
}

//sets footer info dynamically
function setFooterInfo() {
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastmodified").textContent = document.lastModified;
}

//listens for page load then calls showAllTemples for our initial display
//runs setupEventListeners to get our nav buttons working to filter temples by categories
//calls setFooterInfo to set footer info
document.addEventListener("DOMContentLoaded", () => {
  showAllTemples();
  setupEventListeners();
  setFooterInfo();
});
