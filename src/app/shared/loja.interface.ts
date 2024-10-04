export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string; // Use string instead of URL
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
};

export type Categories = {
  electronics: 'Electronics',
  jewelery: 'Jewelery',
  men: "Men's Clothing",
  women: "Women's Clothing"
}

export interface Usuario {
  id?: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface PurchaseResponse {
  id: number;
  message: string;
}


export interface PurchaseItem {
  id: number;
  title: string;
  category: string;
  quantity: number;
  price: number;
}

export interface Purchase {
  id: string;
  date: string;
  userId: string;
  items: PurchaseItem[];
  total: number;
}


