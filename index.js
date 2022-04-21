"use strict";

const formData = require('form-data');
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const products = require("./products")
const timeFormat = require('./formatSeconds');
require('dotenv').config()
colors.enable();

const start = new Date();

const url = process.env.POST_URL || 'http://localhost:1337/api/products';
const uploadUrl = process.env.UPLOAD_URL || 'http://localhost:1337/api/upload';


const uploadFunction = (index) => {
    if (products.length - index > 0) {
        console.clear()
        console.log(colors.bgBlue.bold(' REMAIN '), colors.blue(products.length - index, 'products left to upload'))
        console.log(colors.bgBlue.bold(' PASSED ', timeFormat((new Date() - start) / 1000)))
        console.log('')
    }

    if (index >= products.length) {
        const finish = new Date()
        console.log(colors.bgGreen.bold("  ", index, 'PRODUCTS SUCCESSFULLY UPLOADED', 'in', timeFormat((finish - start) / 1000)))
        return
    }

    const {
        id,
        product_id,
        price_base,
        vat_pct,
        title,
        fatness,
        brand,
        gender,
        style,
        type,
        season,
        color,
        certificate,
        fabric_top,
        fabric_lining,
        fabric_sole,
        pics
    } = products[index]

    const form = new formData();


    form.append('data', JSON.stringify({
        id,
        product_id,
        price_base,
        vat_pct,
        title,
        fatness,
        brand,
        gender,
        style,
        type,
        season,
        color,
        certificate,
        fabric_top,
        fabric_lining,
        fabric_sole
    }))

    const postData = async () => {

        let id_log;
        let res_status;

        try {
            await axios.post(url, form, {headers: {...form.getHeaders()}})
                .then(res => {
                    console.log(colors.bgGreen.bold(` SUCCESS `), colors.green(' created ', id, title))
                    id_log = res.data.data.id
                    res_status = res.status
                })
                .then(() => {
                    const readFile = async (i) => {

                        const formFiles = new formData()

                        if (pics.length - 1 < i) {
                            console.log(colors.bgGreen.bold(` FILES UPLOADED  `), colors.green(' product ', id, title))
                            console.log(' ')
                            console.log(' ')
                            if (res_status === 200) {
                                uploadFunction.call(this, index + 1)
                            }
                            return
                        }

                        const dataFiles = fs.readFileSync(path.join(__dirname, 'images', pics[i]))
                        formFiles.append('files', dataFiles, pics[i])
                        formFiles.append('ref', 'api::product.product')
                        formFiles.append('refId', id_log)
                        formFiles.append('field', 'pictures')


                        try {
                            await axios.post(uploadUrl, formFiles, {headers: {...formFiles.getHeaders()}})
                                .then((res) => {
                                    if (res.status === 200) {

                                        console.log(colors.bgYellow.bold(' READING '), colors.yellow('file', pics[i]))

                                        readFile.call(this, i + 1)

                                    }
                                })

                        } catch (err) {
                            console.log(colors.bgRed.bold(' ERROR FILE '), colors.red(err.message))
                            process.exit();

                        }

                    }

                    readFile.call(this, 0)

                })

        } catch (err) {
            console.log(colors.bgRed.bold(' ERROR '), colors.red(err.message))
            process.exit();

        }
    }

    postData().then(() => {
    })
}

uploadFunction.call(this, 0)