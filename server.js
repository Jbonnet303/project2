// console.log('Hello');
const express = require('express');
const app = express();
const Bar = require('./models/bars.js');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;


const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';


// Middleware Body-Parser
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


app.get('/bars/shop/seed', (request, response) => {
  Bar.create (
    [
      {
        name: 'Steel Bar Shaker',
        description: 'Featuring a durable stainless steel construction, this bar shaker helps keep your cold cocktails chilled until served!',
        img: 'https://cdnimg.webstaurantstore.com/images/products/extra_large/31015/413339.jpg',
        price: 5,
        quantity: 100
      }, {
        name: 'Cocktail Bar Strainer',
        description: 'Serving as the perfect bar accessory, this four-pronged stainless steel strainer allows you to drain cocktails and other assorted beverages through a glass or shaker of ice.',
        img: 'https://cdnimg.webstaurantstore.com/images/products/extra_large/49370/828059.jpg',
        price: 3,
        quantity: 150
      }, {
        name: 'Cocktail Kit',
        description: 'It includes 13 separate pieces, and each piece serves a unique function to help make the drink mixing process faster and easier.',
        img: 'https://cdnimg.webstaurantstore.com/images/products/large/446658/1646130.jpg',
        price: 15,
        quantity: 200
      }, {
        name: 'Lime/Lemon Squeezer',
        description: 'This squeezer is perfect for juicing your limes and lemons by hand for all your classic cocktails, mixed drinks, and fruit juices!',
        img: 'https://cdnimg.webstaurantstore.com/images/products/extra_large/11066/1383638.jpg',
        price: 3,
        quantity: 250
      } ,{
        name: 'Flair Bottles',
        description: 'Practicing new tricks with glass bottles can be dangerous and expensive. Instead, use this durable practice bottle for a safe way to try new moves behind the bar.',
        img: 'https://cdnimg.webstaurantstore.com/images/products/large/30536/371649.jpg',
        price: 7,
        quantity: 80
      } ,{
        name: 'Flat Bottle Opener',
        description: 'Speed up your bottle service with this black flat bottle opener!',
        img: 'https://cdnimg.webstaurantstore.com/images/products/extra_large/95321/515301.jpg',
        price: 2,
        quantity: 120
      } ,{
        name: 'Bar Caddies',
        description: 'Keep your straws, stirrers, and sugar packets separated for easy selection with this antique copper bar caddy.',
        img: 'https://cdnimg.webstaurantstore.com/images/products/extra_large/447494/1669799.jpg',
        price: 8,
        quantity: 600
      }
  ],
    (error, data) => {
      response.redirect('/bars/shop');
      }
    )
  });




app.get('/', (request, response) => {
  response.send('this works');
});


// Index Route Home Page
app.get('/bars', (request, response) => {
Bar.find({}, (error, allBars) => {
response.render('index.ejs', {
  bars: allBars
    });
  });
});


// Route Shop Page
app.get('/bars/shop', (request, response) => {
  Bar.find({}, (error, allBars) => {
  response.render('shop.ejs', {
  bars: allBars
    });
  });
});


// Route Specialtiy Drink Page
app.get('/bars/drink', (request, response) => {
  Bar.find({}, (error, allBars) => {
  response.render('drink.ejs', {
  bars: allBars
    });
  });
});


// Route Locations Page
app.get('/bars/location', (request, response) => {
  Bar.find({}, (error, allBars) => {
  response.render('location.ejs', {
  bars: allBars
    });
  });
});


// Create Route
app.get('/bars/shop/new', (request, response) => {
response.render('new.ejs');
});

//Post New Product Route
app.post('/bars/shop', (request, response) => {
  Bar.create(request.body, (error, createdBar) => {
    response.redirect('/bars/shop');
  })
});




//Edit Route
app.get('/bars/:id/edit', (request, response) => {
  Bar.findById(request.params.id, (error, foundBar) => {
    response.render('edit.ejs', {
        bar: foundBar
    });
  });
});

//New edited Information Route
app.put('/bars/shop/:id', (request, response) => {
  Bar.findByIdAndUpdate(request.params.id, request.body, {new:true}, (error, updateModel) => {
    response.redirect('/bars/shop');
  });
});



// Show Route
app.get('/bars/shop/:id', (request, response) => {
  Bar.findById(request.params.id, (error, foundBar) => {
  response.render('show.ejs', {
    bar: foundBar
  });
  })
});


// Buy
app.put('/bars/shop/:id/buy', (request, response) => {
Bar.findByIdAndUpdate(request.params.id, {$inc:{quantity: -1}}, (error) => {
  if (error) {
    response.send(error.message)
  } else {
    response.redirect('back')
  }
});
});


// Delete Route
app.delete('/bars/:id', (request, response) => {
  Bar.findByIdAndRemove(request.params.id, (error, deletedBar) => {
    response.redirect('/bars/shop');
  })
});


app.listen(PORT, () => {
  console.log('listening...');
});


mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('open', () => {
  console.log('connected to mongoose!!!!!!!');
})
