const products = []

for (let i = 0; i < 8000; i++) {
    let obj = {};
    obj.title = `Product ${i + 1}`
    obj.price = 12.75 + i / 100
    obj.barcode = 78127 + i
    obj.images = [
        '4774636253_0.jpeg',
        '4774636253_1.jpeg',
        '4774636253_2.jpeg',
        '4774636253_3.jpeg',
        '4774636253_4.jpeg',
        '4774636253_5.jpeg',
    ]

    products.push(obj)

}

module.exports = products