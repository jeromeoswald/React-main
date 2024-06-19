import Post from './Post'

function App() {

  return (
   <div>
     <section id="pricing">
      <h1>Price Card</h1>
      <div class="row">
      <Post name="Free" className="pricing-column col-lg-4 col-md-6" Listing= "No Listing" Pricing= "Free" Matches= "5 Per Day" Messages= "10 Per Day" AppUsage=  "Unlimited App Usage"></Post>
      <Post name="Plus" className="pricing-column col-lg-4 col-md-6" Listing= "No Listing" Pricing= "$49" Matches= "Unlimited Matches" Messages= "Unlimited Messages" AppUsage= "Unlimited App Usage"></Post>
      <Post name="Pro" className="pricing-column col-lg-4 col-md-4" Listing= "Pirority Listing" Pricing= "$99" Matches= "Unlimited Matches" Messages= "Unlimited Messages" AppUsage= "Unlimited App Usage"></Post>
      </div> 
     </section>
   </div>
  )
}

export default App