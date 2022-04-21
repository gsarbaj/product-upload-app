const products = []

for (let i = 0; i < 5; i++) {
    let obj = {};
    obj.id = 393957342 + i
    obj.product_id = 47563 + i
    obj.price_base = 1752.75 + i / 100
    obj.vat_pct = 21
    obj.title = `Ботинки мужские ${i + 1}`
    obj.fatness = 8
    obj.brand = {id: 1}
    obj.gender = {id: 1}
    obj.style = {id: 1}
    obj.type = {id: 1}
    obj.season = {id: 1}
    obj.color = {id: 1}
    obj.certificate = {id: 1}
    obj.fabric_top = {id: 1}
    obj.fabric_lining = {id: 1}
    obj.fabric_sole = {id: 1}
    obj.pics = [
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