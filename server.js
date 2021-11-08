const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// connection database
require("./server/config/mongoose.config");

//cargar las rutas
require("./server/routes/user.routes")(app);
require("./server/routes/project.routes")(app);
//

app.listen(port, ()=> {
    console.log(`Express API Server Online at port ${port}`)
})