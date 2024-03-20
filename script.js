// Function to fetch products from API
let productsData=[]
async function fetchProducts() {
    try {
        const response = await fetch('https://n1.bizmate.pro/bizmate/apirequest/product/load', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                'categoryId': 3,
                'start': 0,
                'limit': 20
            })
        });
        const data = await response.json();
        productsData=data.data
        displayProducts(productsData);
    } catch (error) {
        console.log("Error in Fetching the Products1", error);
    }
}

function displayProducts(products) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Display product image, name, price, and brand
        productCard.innerHTML = `
            <img src="https://imagesm.plexussquare.in/BIZMATE/${product.imageSource}" alt="${product.name}" width="200px" height="200px"/>
            <h3>${product.name}</h3>
            <p>Price: ${product.productInfoList[0].mrp}</p>
            <p>Brand: ${product.brand}</p>
            <p>Color: ${product.productInfoList[0].color}</p>
        `;

        productContainer.appendChild(productCard);
    });
}

function filterByValues(key,value){
    if(key=="brand"){
        return productsData.filter(product=>product.brand == value);
    }
    else if(key=="color"){
        return productsData.filter(product=>product.productInfoList[0].color == value);
    }
}

// Function to filter products
function applyFilters() {
    const filterBy = document.getElementById('filterSelect').value;
    const filterValue = document.getElementById('filterValue').value;
    displayProducts(filterByValues(filterBy,filterValue));
}

async function clearFilters(){
    await fetchProducts();
}

document.getElementById('searchInput').addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const matchedProducts = searchProductsByName(searchTerm);
    displayProducts(matchedProducts);
});

function searchProductsByName(searchTerm) {
    return productsData.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
}

// Event listener for sort select
document.getElementById('sortSelect').addEventListener('change', function() {
    if(this.value == "nameAsc"){
        const sortedProducts = sortProductsByAscending("name");
        productsData = sortedProducts;
        displayProducts(sortedProducts);
    }
    else if(this.value =="nameDesc"){
        const sortedProducts = sortProductsByDescending("name");
        productsData = sortedProducts;
        displayProducts(sortedProducts);
    }
    else if(this.value =="priceAsc"){
        const sortedProducts = sortProductsByAscending("price");
        productsData = sortedProducts;
        displayProducts(sortedProducts);
    }
    else if(this.value =="priceDesc"){
        const sortedProducts = sortProductsByDescending("price");
        productsData = sortedProducts;
        displayProducts(sortedProducts);
    }
    console.log('Sort by:', this.value);
});

function sortProductsByAscending(filter) {
    return productsData.sort((a, b) => {
        let nameA="";
        let nameB="";
        if(filter=="name"){
            nameA = a.name.toUpperCase();
            nameB = b.name.toUpperCase();
        }
        else if(filter=="price"){
            nameA = a.productInfoList[0].mrp;
            nameB = b.productInfoList[0].mrp;
        }
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

function sortProductsByDescending(filter) {
    return productsData.sort((a, b) => {
        let nameA="";
        let nameB="";
        if(filter=="name"){
            nameA = a.name.toUpperCase();
            nameB = b.name.toUpperCase();
        }
        else if(filter=="price"){
            nameA = a.productInfoList[0].mrp;
            nameB = b.productInfoList[0].mrp;
        }
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    });
}

function fetchColours(){
    let result = new Set();
    productsData.forEach((product)=>{
        result.add(product.productInfoList[0].color);
    });
    return result;
}

function fetchBrands(){
    let result = new Set();
    productsData.forEach((product)=>{
        result.add(product.brand);
    });
    return result;
}


document.getElementById('filterSelect').addEventListener('change', function() {
    const filterValueSelect = document.getElementById('filterValue');
    filterValueSelect.innerHTML = ''; 
    if (this.value === 'color') {
        let colours = fetchColours();
        let createInnerHTML = ""
        colours.forEach((color)=>{
            createInnerHTML+=`<option value="${color}">${color}</option>`
        })
        filterValueSelect.innerHTML = createInnerHTML;
    } else if (this.value === 'brand') {
        let brands = fetchBrands();
        let createInnerHTML = ""
        brands.forEach((brand)=>{
            createInnerHTML+=`<option value="${brand}">${brand}</option>`
        })
        filterValueSelect.innerHTML = createInnerHTML;
    }
});


async function main(){
    await fetchProducts();
}

main();