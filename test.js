let product = {
    "_id": "624c48feb6bb625c4aa32944",
    "user": "624c48feb6bb625c4aa3293d",
    "name": "đùi gà thơm ngon lắm neeee",
    "image": "images/image0.png",
    "brand": "Cocacola 0",
    "category": "Drink",
    "description": "That good :)))",
    "rating": 5,
    "numReviews": 1,
    "price": 40000,
    "countInStock": 50,
    "reviews": [{
            "name": "Nguyen van A",
            "rating": 5,
            "comment": "Good product",
            "user": "624c48feb6bb625c4aa3293e",
            "_id": "625258eca0ea33729fe27cd6",
            "createdAt": "2022-04-10T04:11:24.798Z",
            "updatedAt": "2022-04-10T04:11:24.798Z"
        },
        {
            "name": "Nguyen van A",
            "rating": 7,
            "comment": "Good product",
            "user": "624c48feb6bb625c4aa3293e",
            "_id": "625258eca0ea33729fe27cd6",
            "createdAt": "2022-04-10T04:11:24.798Z",
            "updatedAt": "2022-04-10T04:11:24.798Z"
        },
        {
            "name": "Nguyen van C",
            "rating": 5,
            "comment": "Good product",
            "user": "624c48feb6bb625c4aa3293e",
            "_id": "625258eca0ea33729fe27cd6",
            "createdAt": "2022-04-10T04:11:24.798Z",
            "updatedAt": "2022-04-10T04:11:24.798Z"
        }
    ]
}

let rev = product.reviews;



let sum = rev.reduce(function(total, currentValue, index, { length }) {
    return total + currentValue.rating / length;
}, 0);

console.log(sum);