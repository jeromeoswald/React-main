import React, { useState } from 'react';
import ConditionalRendering from './Components/ConditionalRendering';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Footer from './Components/Footer';


const App = () => {
  const [status, setStatus] = useState(true)
  const[cartCount, setCartCount] = useState(0)
  
  let data =[
    
    {id:1, 
    name:"Kurthi",
    price:"$40",
    rating: false,
    Image: "https://i.pinimg.com/originals/9a/37/d0/9a37d084cc10348b20b301a5dfaf2edb.jpg"},
    
    {id:2, 
    name:"Westernwear", 
    price:"$50",
    rating: false,
    Image: "https://fashionarrow.com/wp-content/uploads/2017/09/western-wear-for-women-marie-claire-women-blue-floral-print-fit-u0026-flare-dress-fpftjfs-.jpg"},
    
    {id:3, 
    name:"Designer saree", 
    price:"$100",
    delprice:"$110-$200",
    rating: true,
    Image: "https://4.bp.blogspot.com/-O_BMNLgWPFI/Ul_YrfPqwnI/AAAAAAAABLQ/SQA1rZxwOeE/s1600/JKS7140.jpg"},
    {id:4, 
    name:"Silk saree", 
    price:"$60",
    rating: true,
    Image:"https://tse4.mm.bing.net/th?id=OIP.GajwQ1Lp0PmhkyaOqLnncAHaJQ&pid=Api&P=0&h=220"},
    
    {id:5,
    name:"Bottom Wear-Men", 
    price:"$30",
    delprice:"$40-$70",
    rating: true,
    Image:"https://secure.parvaty.com/wp-content/uploads/2020/01/11-Casual-Denim-Slim-Fit-Stretchy-Trousers-for-Men-600x600.jpg"},
    
    {id:6, 
    name:"Shirt", 
    price:"$40",
    rating: false,
    Image:"https://tse1.mm.bing.net/th?id=OIP.PMKpy-jl-4nCeEkC_NLLLAHaHa&pid=Api&P=0&h=220"},
    
    {id:7, 
    name:"T-Shirt", 
    price:"$30",
    delprice:"$40-$60",
    rating: false,
    Image:"https://tse4.mm.bing.net/th?id=OIP.0snAar0fF50Va43xJWVbQwAAAA&pid=Api&P=0&h=220"},
    
    {id:8, 
    name:"Couples Dress", 
    price:"$70",
    rating: true,
    Image:"https://tse4.mm.bing.net/th?id=OIP.auDobchjlij-4pwyJGbPWAHaJ3&pid=Api&P=0&h=220"}
  ]
  const [products, setProducts]=useState(data)
  
  return (
    <div>
    <Navbar cartCount={cartCount} setCartCount={setCartCount}/>
    <Header />
    {status? <ConditionalRendering setCartCount={setCartCount} cartCount={cartCount} setProducts={setProducts} products={products} />: ''} 
    <Footer />
    </div>
  );
};

export default App;