const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
var parse = require('csv-parse');
const async = require('async');
const papa = require('papaparse');

app.get('/', async (req, res) => {
    // const csvFile = path.dirname('shopee_sale_order');

    res.json('ssssss');
});


const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/shopee', {
    useNewUrlParser: true
});

let db = mongoose.connection;

db.once('open', function () {
    console.log('Connected to MongoDB');
});

db.on('error', function (err) {
    console.log(err);
});

const orderModel = require('./models/importOrder')

app.get('/papa', (req, res) => {

    const file = fs.createReadStream('order.csv');
    papa.parse(file, {
        worker: true, // Don't bog down the main thread if its a big file
        dynamicTyping: true,
        header: false,
        complete: function (results) {
            const orders = results.data;
            const outputs = [];
            const order = {};
            let uploadedAt = new Date().toLocaleString('en', {
                timeZone:"Asia/Bangkok",
            });

            async.each(orders, (elm, callback) => {
                order.orderId = elm[0];
                order.status = elm[1];
                order.refund = elm[2];
                order.userName = elm[3];
                order.CreatedAt = elm[4];
                order.paymentAt = elm[5];
                order.paymentBy = elm[6];
                order.shippingOptions = elm[7];
                order.shippingMethod = elm[8];
                order.trackingCode = elm[9];
                order.receiveDate = elm[10];
                order.deliveryAt = elm[11];
                order.sku = elm[12];
                order.productName = elm[13];
                order.refSKU = elm[14];
                order.option = elm[15];
                order.originalPrice = elm[16];
                order.finalPrice = elm[17];
                order.qty = elm[18];
                order.price = elm[19];
                order.discount = elm[20];
                order.discountSeller = elm[21];
                order.discountShopee = elm[22];
                order.discountCode = elm[23];
                order.campaign = elm[24];
                order.bundle = elm[25];
                order.discountBundle = elm[26];
                order.discountCoin = elm[27];
                order.discountCredit = elm[28];
                order.commission = elm[29];
                order.commissionTransaction = elm[30];
                order.cost = elm[31];
                order.shippingCostSeller = elm[32];
                order.grandTotal = elm[33];
                order.shippingCostSeller = elm[34];
                order.shippingCost = elm[35];
                order.receiveName = elm[36];
                order.tel = elm[37];
                order.notice = elm[38];
                order.shippingAddress = elm[39];
                order.country = elm[40];
                order.state = elm[41];
                order.city = elm[42];
                order.postcode = elm[43];
                order.type = elm[44];
                order.commitDate = elm[45];
                order.note = elm[46];
                order.uploadedAt = uploadedAt
                console.log(order);

                
            }, (error) => {
                console.log(error);
            })
        }
    });
    res.send('sssss');
});


app.get('/update', (req, res)=>{

    const updatedAt = new Date().toLocaleString('en', {timeZone:"Asia/Bangkok",});
    orderModel.updateOne({orderId:'19070509364QXYC'}, {userName:'value4',updatedAt:updatedAt}, {upsert: true}, function(err,response){
        if(err){
            console.log(err);
        }else{
            console.log(response);
        }
    })



})
var multer  = require('multer');
var upload = multer({ dest: 'upload/'});
var type = upload.single('file');

app.get('/upload', (req,res)=>{
    console.log(type);
    var tmp_path = req.file;
    console.log(tmp_path);
    res.send('sssssss');
})

app.post('/upload', (req,res)=>{
    console.log(type);
    var tmp_path = req.file;
    console.log(tmp_path);
    res.send('sssssss');
})

app.listen(3000, () => {
    console.log('listen on 3000');
});