import express from 'express';

import providersRouter from './routes/providersRouter';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use('/providers', providersRouter);


app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});

//===================================================================

// import express from "express";
// import ClientController from "../controllers/client.controller.js";

// const router = express.Router();

// router.post("/", ClientController.createClient);
// router.get("/", ClientController.getClients);
// router.get("/:id", ClientController.getClient);
// router.delete("/:id", ClientController.deleteClient);
// router.put("/", ClientController.updateClient);

// export default router;
// //




// import express from "express";
// import cors from "cors";
// import winston from "winston";
// import clientsRouter from "./routes/client.route.js";
// import productsRouter from "./routes/product.route.js";
// import suppliersRouter from "./routes/supplier.route.js";
// import salesRouter from "./routes/sale.route.js";

// const app = express();
// app.use(express.json());
// app.use("/client", clientsRouter);
// app.use("/product", productsRouter);
// app.use("/supplier", suppliersRouter);
// app.use("/sale", salesRouter);
// app.use((err, req, res, next) => {
//     logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
//     res.status(400).send({ error: err.message });
// });

// app.listen(3000, () => console.log("API STARTED!"));


