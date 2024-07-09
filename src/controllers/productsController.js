import productServices from "../services/productsServices.js";

const productsController = {
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
      const data = req.body;
      await productServices.updateProduct(id, data);
      return res.status(200).json({ message: "Update successful" });
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
