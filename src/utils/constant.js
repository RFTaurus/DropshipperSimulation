export const PSEUDOLOCAL_DATABASE_PATH = {
  dropshipData: "dropshipData",
};

export const INPUT_REGEX = {
  phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const SHIPMENT_TYPES = [
  {
    id: "GO-SEND",
    name: "GO-SEND",
    cost: 15000,
    estimate: "today",
  },
  {
    id: "JNE",
    name: "JNE",
    cost: 9000,
    estimate: "2 days",
  },
  {
    id: "PersonalCourier",
    name: "Personal Courier",
    cost: 29000,
    estimate: "1 day",
  },
];

export const PAYMENT_TYPES = [
  {
    id: "ewallet",
    name: "e-Wallet",
    isCurrency: true,
    unitText: "left",
    balance: 1500000,
  },
  {
    id: "bankTransfer",
    name: "Bank Transfer",
    isCurrency: false,
    unitText: "",
    balance: 0,
  },
  {
    id: "virtualAccount",
    name: "Virtual Account",
    isCurrency: false,
    unitText: "",
    balance: 0,
  },
];
