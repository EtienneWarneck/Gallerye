const express = require("express");

var db = require("../models");

module.exports = function (app) {
  // Get all artwork
  app.get("/api/allArtwork", function (req, res) {
    db.Products.findAll({
      // subQuery : false, //added this!
      order: [["createdAt", "ASC"]],
      where: {sold : false}
    }).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });

  // Get all artwork alphabetically by artist
  app.get("/api/allArtwork/alphaArtist", function (req, res) {
    db.Products.findAll({
      order: [["artist", "ASC"]],
      where: {sold : false}

    }).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });

  // Get all artwork in ascending price order
  app.get("/api/allArtwork/priceLowtoHigh", function (req, res) {
    db.Products.findAll({
      order: [["price", "ASC"]],
      where: {sold : false}
    }).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });

  // Get all artwork in descending price order
  app.get("/api/allArtwork/priceHightoLow", function (req, res) {
    db.Products.findAll({
      order: [["price", "DESC"]],
      where: {sold : false}
    }).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });

  // Get all artwork in descending year order
  app.get("/api/allArtwork/yearNewesttoOldest", function (req, res) {
    db.Products.findAll({
      order: [["year", "DESC"]],
      where: {sold : false}
    }).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });

  // Get all artwork in ascending year order
  app.get("/api/allArtwork/yearOldesttoNewest", function (req, res) {
    db.Products.findAll({
      order: [["year", "ASC"]],
      where: {sold : false}
    }).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });
  
  // Get artwork by Artist
  app.get("/api/allArtwork/:artist", function (req, res) {
    db.Products.findAll({
      where: {
        artist: req.params.artist
      },
    }).then(function (dbProducts) {
      console.log(req.params.artist)
      res.json(dbProducts);
    });
  });

  //Get all by Title
  app.get("/api/byTitle", function (req, res) {
    db.Products.findAll({
      order: [["product_name", "ASC"]]
    }).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });

  //Get one by Title
  app.get("/api/product/:id", function (req, res) {
    db.Products.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });

  // Get all customer data
  app.get("/api/allCustomers", function (req, res) {
    db.Customers.findAll({}).then(function (dbCustomers) {
      res.json(dbCustomers);
    });
  });

  // Create a new customer
  app.post("/api/customer", function (req, res, err) {
    db.Customers.create(req.body).then(function (dbCustomers) {
      res.json(dbCustomers);
    })
    .catch(function(err){
      res.json({"Error":true, "message": "email or password does not meet requirement"})
    });
  });

  app.put("/api/products", function (req, res) {
    db.Products.update({
      sold: req.body.sold
    },
      {where: {
          id: req.body.id
        }
      }).then(function(dbProducts) {
        res.json(dbProducts);
      })
        .catch(function(err) {
          res.json(err);
        });
  });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};

