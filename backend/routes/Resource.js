const express = require('express')
const router = express.Router()
const Resource = require('../models/resource')
const multer = require('multer');
const cloudinary = require("../middleware/cloudinary");
const uploader = require("../middleware/multer");
const requireLogin = require('../middleware/requireLogin')
const upload = multer({ dest: 'uploads/' });


router.post('/upload', upload.single('file'),requireLogin, async (req, res) => {
    const {title,skill,pdfLink} = req.body
    // console.log(pdfLink)

    if(pdfLink === ''){
      //  alert("Add files");
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'raw',
        folder: 'pdfs',
  // allowed_formats: ['pdf','doc','docx'],

      });
    
      const pdfUrl = result.secure_url;
      console.log(pdfUrl);
      // console.log(req.user)
      const pdf = await new Resource({
        title,
        skill,
        author:req.user,  
        name: req.file.originalname,
        url: pdfUrl,
  
        // link:pdfLink
      });
      // console.log(pdf);
      
      await pdf.save()
    
      
    }

    else{
      const pdfSave = await new Resource({
      title,
      skill,
      author:req.user,  
      // name: req.file.originalname,
      // url: pdfUrl,
      link:pdfLink
    });
    // console.log(pdfSave);
    
    await pdfSave.save()
   
    
    }


  });



//api to get all resource
//it will be used to display at the resources page
router.get('/getAllResource/:skill',requireLogin,(req,res)=>{
  var mySort = { date: -1 };
    Resource.find({skill:req.params.skill})
    .sort(mySort)
    .populate('author').select("-password")
    .then(posts=>{
      // console.log(posts)
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})








router.get('/myResource',requireLogin,async(req,res)=>{
  var mySort = { date: -1 };

   
  Resource.find({author:req.user._id})
  .sort(mySort)


  .populate('author').select("-password")

  .then(event=>{
      // console.log(event)
      res.json(event)
  })
  .catch(err=>{
      console.log(err)
  })


})


//update resource api
router.put('/updateResource/:id',async(req,res)=>{
    let result = await Resource.updateOne(
        {_id:req.params.id},
        
        {
            $set:req.body
            
        }
    )
    res.send(result)
  })

//delete resource
router.delete('/deleteResource/:eventId',async(req,res)=>{
    const result = await Resource.deleteOne({_id:req.params.eventId});
    res.send(result)
     
 })


 router.get('/search/:key', async (req,res)=>{
    let result = await Resource.find({
      "$or":[
        {title: {$regex:req.params.key}}
        
      ]
    })
    res.send(result);
    // console.log(result) 
  
  
  })

module.exports = router