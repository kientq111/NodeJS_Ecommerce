const products = [];

for (let i = 0; i <= 50; i++) {
    let product = {
        name: `Sản Phẩm Số ${i}`,
        image: `images/image${i}.png`,
        brand: i % 2 == 0 ? `Cocacola ${i}` : `KFC ${i}`,
        category: i % 2 == 0 ? 'Drink' : 'Food',
        description: 'That good :)))',
        rating: 5,
        numReviews: 5,
        price: 20000,
        countInStock: 50,
    }
    products.push(product);
}
console.log(products);

module.exports = products;