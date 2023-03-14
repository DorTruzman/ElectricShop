import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { createEntity, getEntities } from "../services/fetchService";

function ProductForm({ isOpen, setIsOpen }) {
  const [productTypes, setProductTypes] = useState([]);
  const [product, setProduct] = useState({
    productType: "",
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getEntities({ name: "productType" }).then((productTypeList) => {
      setProductTypes(productTypeList);
    });
  }, []);

  useEffect(() => {
    setIsReady(!!checkIfReady());
  }, [product]);

  const checkIfReady = () => {
    return !(Object.values(product).indexOf("") !== -1);
  };

  return (
    <Dialog fullWidth={true} open={isOpen}>
      <DialogTitle>יצירת מוצר חדש</DialogTitle>
      <DialogContent>
        <DialogContentText>אנא מלאו את כלל הפרטים הנדרשים. </DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel id="productTypeSelect">סוג</InputLabel>
            <Select
              labelId="productTypeSelect"
              label="סוג"
              value={product.productType}
              onChange={(e) =>
                setProduct({ ...product, productType: e.target.value })
              }
            >
              {productTypes &&
                productTypes.map((type, idx) => (
                  <MenuItem value={type._id} key={`newPrdMenuItem${idx}`}>
                    {type.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 1, minWidth: 120 }}>
            <TextField
              style={{ marginTop: 10, marginBottom: 10 }}
              label="שם המוצר"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <TextField
              style={{ marginTop: 10, marginBottom: 10 }}
              label="תיאור"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
            <TextField
              style={{ marginTop: 10, marginBottom: 10 }}
              label="מחיר בדולרים"
              type="number"
              inputProps={{
                min: 0,
              }}
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <TextField
              style={{ marginTop: 10, marginBottom: 10 }}
              label="לינק לתמונה"
              value={product.image}
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          disabled={!isReady}
          onClick={() => {
            createEntity({
              name: "product",
              entity: product,
            });
            setIsOpen && setIsOpen(false);
          }}
        >
          שמירה
        </Button>
        <Button
          color="error"
          onClick={() => {
            setIsOpen && setIsOpen(false);
          }}
        >
          ביטול
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductForm;
