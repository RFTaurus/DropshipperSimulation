export const getDeliveryFormStructure = () => {
  const defaultStructture = {
    currentStep: 1,
    isDropshipper: false,
    orderId: "",
    form: {
      email: "",
      phone: "",
      deliveryAddress: "",
      dropshipperName: "",
      dropshipperPhone: "",
    },
    formValidation: {
      isValidEmail: false,
      isValidPhone: false,
      isValidAddress: false,
      isValidDropshipperName: false,
      isValidDropshipperPhone: false,
    },
    cost: {
      total: 500000,
      goods: 500000,
      dropshippingFee: 5900,
      shipment: 0,
    },
    shipmentTypes: {
      id: "",
      name: "",
      cost: 0,
      estimate: "",
    },
    paymentTypes: {
      id: "",
      name: "",
      isCurrency: false,
      unitText: "",
      balance: 0,
    },
  };

  return defaultStructture;
};
