const formData = require('form-data');
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const products = require("./products")
const timeFormat = require('./formatSeconds');
require('dotenv').config()
colors.enable();

const start = new Date()

const url = process.env.UPLOAD_URL || 'http://gsarbaj.ddns.net:1337/api/products'


const uploadFunction = (index) => {
    if(products.length - index > 0){
        console.log(colors.bgBlue.bold(' REMAIN '), colors.blue(products.length - index, 'products left to upload'))
        console.log(colors.bgBlue.bold(' PASSED ', timeFormat((new Date() - start)/1000)))
        console.log('')
    }

    if (index >= products.length) {
        const finish = new Date()
        console.log(colors.bgGreen.bold("  ", index, 'PRODUCTS SUCCESSFULLY UPLOADED', 'in', timeFormat((finish-start)/1000)))
        return
    }

    const {title, price, barcode, images} = products[index]
    const form = new formData();

    images.forEach(file => {
        const data = fs.readFileSync(path.join(__dirname, 'images', file))
        form.append('files.images', data, file)

        console.log(colors.bgYellow.bold(' READING '), colors.yellow('file', file))
    })

    form.append('data', JSON.stringify({title, price, barcode}))

    const postData = async () => {

        try {
            await axios.post(url, form, {headers: {...form.getHeaders()}})


            console.log(colors.bgGreen.bold(' SUCCESS '), colors.green('uploaded', barcode, title))
            console.log('')
        } catch (err) {
            console.error(err)
        }
    }

    postData().then(() => {
        uploadFunction.call(this, index + 1)
    })
}

uploadFunction.call(this, 0)