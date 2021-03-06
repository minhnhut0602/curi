import { prepareRoutes } from "@curi/router";

import api from "./api";

import Home from "./components/Home.html";
import Products from "./components/Products.html";
import Category from "./components/Category.html";
import Product from "./components/Product.html";
import NotFound from "./components/NotFound.html";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    response: () => {
      return {
        body: Home,
        redirectTo: {
          name: "Products"
        }
      };
    }
  },
  {
    name: "Products",
    path: "products",
    response: () => {
      return {
        body: Products,
        data: api.categories()
      };
    },
    children: [
      {
        name: "Category",
        path: ":category",
        response: ({ match }) => {
          const { params } = match;
          const modifiers = {
            body: Category
          };
          const products = api.category(params.category);
          if (products == null) {
            modifiers.error = "Category does not exist";
          }
          {
            modifiers.data = products;
          }
          return modifiers;
        },
        extra: {
          title: params => `${params.category || "Category"}`
        },
        children: [
          {
            name: "Product",
            path: ":productID",
            response({ match }) {
              const { params } = match;
              const modifiers = {
                body: Product
              };
              const product = api.product(params.productID);
              if (!product) {
                modifiers.error = "Product does not exist";
              } else {
                modifiers.data = product;
              }
              return modifiers;
            },
            extra: {
              title: params => `${params.name || "Product"}`
            }
          }
        ]
      }
    ]
  },
  {
    name: "Not Found",
    path: "(.*)",
    response: () => {
      return {
        body: NotFound
      };
    }
  }
]);
