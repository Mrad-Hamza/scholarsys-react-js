
const express = require('express')
const route = express.Router()
const noteController = require ('../controllers/noteController')
route.post('/createNote', noteController.create);
route.get('/note', noteController.aff) ;  

route.patch('/note/:id',noteController.modifier);
route.delete('/note/:id',noteController.supprimer);
route.get('/moyenne', noteController.Moyenne) ;
route.get('/moyennes', noteController.MoyenneParam) ; // don't touch
route.get('/statMoy', noteController.statMoy) ; //jawha behy taatik tableau fih kol etudiant m9ablou moy mteeou  
//route.get('/bonneMoy', noteController.bonneMoy) ;
route.get('/bonneMoy', noteController.BstatMoy) ; // kadesh aandek men moy fouk l10
route.get('/mauvaiseMoy', noteController.MstatMoy) ; // aaks


module.exports=route
