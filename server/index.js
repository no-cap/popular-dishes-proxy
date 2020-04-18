const express = require('express');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = 2000;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

const galleryProxy = createProxyMiddleware({target: 'http://http://54.193.120.194', changeOrigin: true});
app.use('/seeAllPhotos', galleryProxy);

const restaurantProxy = createProxyMiddleware({target: 'http://13.57.213.120', changeOrigin: true});
app.use('/currentRestaurant', restaurantProxy);
app.use('/restaurant', restaurantProxy);

const dishesProxy = createProxyMiddleware({target: 'http://54.176.124.249:3000', changeOrigin: true});
app.use('/popularDishes/**', dishesProxy);

const reviewsProxy = createProxyMiddleware({target: 'http://3.101.42.194:3003', changeOrigin: true});
app.use('/api/restaurants/**', reviewsProxy);
app.use('/api/restaurant/**', reviewsProxy);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});