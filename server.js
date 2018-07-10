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
        name: 'Beans',
        description: 'Magical Beans',
        img: 'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2',
        price: 1000,
        quantity: 100
      }, {
        name: 'Bones',
        description: 'Bag Of Bones',
        img: 'http://bluelips.com/prod_images_large/bones1.jpg',
        price: 50,
        quantity: 150
      }, {
        name: 'Bins',
        description: 'Stack Of Bins',
        img: 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
        price: 15,
        quantity: 200
      }, {
        name: 'Buttons',
        description: 'Box Of Buttons',
        img: 'http://quanonline.com/military/military_reference/american/wwi_uniforms/data/army_tunic_button_wwi.jpg',
        price: 3,
        quantity: 250
      } ,{
        name: 'Bubbles',
        description: 'Bubbles Blowing Bubbles',
        img: 'https://i.pinimg.com/originals/aa/21/cd/aa21cd3f11a5ad71681e35814a03a6b9.jpg',
        price: 7,
        quantity: 80
      } ,{
        name: 'Boa',
        description: 'Big Boa Constrictor',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Boa_constrictor_constrictor_guyana.JPG/220px-Boa_constrictor_constrictor_guyana.JPG',
        price: 500,
        quantity: 120
      } ,{
        name: 'Balls',
        description: 'Multi Color Balls',
        img: 'https://www.partybagsrus.co.uk/ekmps/shops/partybags1/images/bouncing-bouncy-ball-jet-party-bag-toys-fillers-27mm-1480-p.jpg',
        price: 4,
        quantity: 6000
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


// // Create Route
app.get('/bars/shop/new', (request, response) => {
response.render('new.ejs');
});




//Edit Route
app.get('/bars/:id/edit', (request, response) => {
  Bar.findById(request.params.id, (error, foundBar) => {
    response.render('edit.ejs', {
        bar: foundBar
    });
  });
});

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
app.post('/bars/shop/:id/buy', (request, response)=>{
  Bar.update({_id: request.params.id}, {$inc:{quantity: -1}}, (error, foundBar) => {
    response.redirect('/bars/shop/' + request.params.id)
  })
});

app.put('/bars/shop/:id/buy', (request, response) => {
  Bar.findByIdAndUpdate(request.params.id, request.body, {new:true}, (error, updateModel) => {
    response.redirect('/bars/shop/:id');
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
