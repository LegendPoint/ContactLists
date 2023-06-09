'use strict'
var mongoose = require('mongoose')
Contact = mongoose.model('Contacts')

exports.listAllContacts = function(req, res){
    var query = { sort: { contactid: 1 } }
    Contact.find({}, null, query, function(err, contact){
        if(err) throw err
        //console.log(contact)
        res.json(contact)
    })
}

exports.createAContact = function(req, res){
    var newContact = new Contact(req.body)
    console.log(req.body)
    newContact.save(function(err, contact){
        if(err) throw err
        res.json(contact)
    })
}

exports.readAContact = function(req, res){
    //console.log(req.params.contactId)
    Contact.findById(req.params.contactId, function(err, contact){
        if(err) throw err
        res.json(contact)
    })
}

exports.deleteAContact = function(req, res){
    //console.log(req.params.contactId)
    Contact.findByIdAndRemove(req.params.contactId, function(err, contact){
        if(err) throw err
        const response = {
            message: "Delete contact id: "+ req.params.contactId +" successfully",
            id: contact._id
        }
        res.json(response)
    })
}

exports.updateAContact = function(req, res){
    console.log(req.params.contactId)
    var newContact = {}
    newContact = req.body
    console.log(newContact)
    Contact.findByIdAndUpdate(req.params.contactId, newContact, {new: true}, function(err, contact){
        if(err) {
            console.log(err)
            throw err
        }
        console.log(contact)
        res.json(contact)
    })
}