const mongoose = require("mongoose");

//mongoose.connect(url,object)

mongoose.connect("mongodb://localhost/project_manager",{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => console.log(`Database Connection established`))
.catch(err => console.log(`error : ${err}`))