import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GlobalProductsContext } from "../providers/ProductsProvider";
import QuantityManager from "./QuantityManager";

const MAX_PRODUCTS = 99;
const Panel = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addProduct, selectedProduct } = useContext(GlobalProductsContext);

  const [total, setTotal] = useState(selectedProduct?.price);

  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) setTotal(selectedProduct.price * quantity);
  }, [selectedProduct, quantity]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedProduct]);
  if (!selectedProduct) return null;
  const handleMinus = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setTotal(newQuantity * selectedProduct.price);
      setQuantity(newQuantity);
    }
  };

  const handlePlus = (quantityToAdd: number) => {
    const newQuantity = quantity + quantityToAdd;
    if (newQuantity <= MAX_PRODUCTS) {
      setTotal(newQuantity * selectedProduct.price);
      setQuantity(newQuantity);
    } else if (quantity < 99) setQuantity(99);
  };

  const handleAddProduct = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      addProduct(selectedProduct, quantity);
      setLoading(false);
      onClose();
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    }, 100);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={toastVisible}
        onRequestClose={onClose}
      >
        {toastVisible && (
          <View style={{ ...styles.centeredView, opacity: 1 }}>
            <View style={styles.messageView}>
              <View
                style={{ ...styles.toastView, opacity: toastVisible ? 1 : 0 }}
              >
                <Text style={styles.toastText}>Product added succesfuly</Text>
              </View>
            </View>
          </View>
        )}
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        {!toastVisible && (
          <>
            <View style={styles.backgroundView}>
              <View
                style={[styles.backgroundView, { opacity: visible ? 0.5 : 0 }]}
              />
            </View>
            <TouchableWithoutFeedback>
              <View
                style={{ ...styles.centeredView, opacity: visible ? 1 : 0 }}
              >
                <View style={styles.modalView}>
                  <Text style={styles.productName}>
                    {selectedProduct.title}
                  </Text>
                  <QuantityManager
                    height={50}
                    quantity={quantity}
                    handleMinus={handleMinus}
                    handlePlus={handlePlus}
                  />
                  <View style={styles.customView}>
                    <TouchableOpacity onPress={() => handlePlus(6)}>
                      <View style={styles.roundedView}>
                        <Text style={styles.customText}>+ 6 un.</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePlus(12)}>
                      <View style={styles.roundedView}>
                        <Text style={styles.customText}>+ 12 un.</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePlus(15)}>
                      <View style={styles.roundedView}>
                        <Text style={styles.customText}>+ 15 un.</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      ...styles.addButton,
                      justifyContent: loading ? "center" : "space-between",
                    }}
                    onPress={handleAddProduct}
                  >
                    {loading ? (
                      <ActivityIndicator size="large" color="black" />
                    ) : (
                      <>
                        <Text style={styles.addText}>ADD ({quantity})</Text>
                        <Text style={styles.totalText}>
                          {total?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                  >
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    alignSelf: "flex-end",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  messageView: {
    width: "100%",
    alignSelf: "flex-end",
    backgroundColor: "white",
    paddingHorizontal: 35,
    paddingBottom: 0,
    alignItems: "center",
    elevation: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
  roundedView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  customText: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  addButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFC500",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  addText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  backgroundView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.3,
  },
  toastView: {
    position: "absolute",
    top: -130,
    width: "100%",
    height: 50,
    backgroundColor: "#1fd655",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  toastText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default Panel;
