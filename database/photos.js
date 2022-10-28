const multer = require('multer');
const path = require('path');

router.get('/categories/:image', (req, res) => {
    res.sendFile(path.join(__dirname, '/categories/' + req.params.image));
});


//add multiple pictures
const storage = multer.diskStorage({
    destination: './services',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer ({
   storage: storage,
});

router.use('/services ', express.static('/serves'));

router.get('/services/:image', (req, res) => {
    res.sendFile(path.join(__dirname, '/services/' + req.params.image));
});

router.post("/upload", upload.array('services', 10), (req, res) =>{
    let files = []

    req.files.forEach(file => {
        files.push(`https://nearmeapi-equipe04.herokuapp.com/services/${file.filename}`)
    });

    res.json({
        success : true,
        profile_url: files
    })
});

function erHandler(err, res){
    if(err instanceof multer.MulterError){
        res.json ({
            success: false,
            message: err
        })
    }
}

router.use(erHandler);