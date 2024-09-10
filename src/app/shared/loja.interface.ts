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
