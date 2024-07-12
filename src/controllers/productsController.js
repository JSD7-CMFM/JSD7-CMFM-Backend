import productServices from "../services/productsServices.js";

const productsController = {

  // searchProducts: async (req, res, next) => {
  //   try {
  //     const data = await productServices.searchProducts(req, res);
  //     return res.status(200).json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  getProducts: async (req, res, next) => {
    try {
      const data = await productServices.getAllProducts(req, res);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  getProductId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productServices.getProductById(id);
      if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },

  postProduct: async (req, res, next) => {
    try {
      const data = req.body;
      const product = await productServices.createProduct(data);
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },

  updateProducts: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(req.body); // ตรวจสอบข้อมูลที่ได้รับ
      const data = req.body;
      const updatedProduct = await productServices.updateProduct(id, data);
      if (!updatedProduct) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json({ message: "Update successful", updatedProduct });
    } catch (error) {
      next(error);
    }
  },

  deleteProducts: async (req, res, next) => {
    try {
      const { id } = req.params;
      await productServices.deleteProduct(id);
      return res.status(200).json({ message: "Delete successful" });
    } catch (error) {
      next(error);
    }
  },
};

export default productsController;
