import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import {useSelector} from 'react-redux';
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare, FaBath, FaBed,FaChair,FaMapMarkedAlt,FaMapMarkerAlt,FaParking, FaCoffee, FaMale, FaFemale, } from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user);
  const [copied,setCopied] = useState(false);
  const [contact,setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
             className="text-slate-600"
             onClick={() => {
               navigator.clipboard.writeText(window.location.href);
               setCopied(true);
               setTimeout(() => {
                 setCopied(false);
               }, 2000);
               
             }}
             />
          </div>
         
          {copied &&(
            <p className="fixed top-[21%] right-[5%] z-10 border rounded-md p-2 bg-slate-200">Link Copied!</p>
          )}
        
        <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
  <h2 className="text-2xl font-semibold">
    {listing.name} - LKR {listing.regular ? listing.sharingPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
    {listing.type === 'rent' && ' / month'}
  </h2>
  <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
    <FaMapMarkerAlt className="text-green-700" />
    {listing.address}
  </p>
  <div className="flex gap-4">
    <button className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
      {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
    </button>
    <button className="bg-green-700 w-full max-w-[200px] text-white text-center p-1 rounded-md">
      {listing.accotype === 'hostel' ? 'Hostel' : listing.accotype === 'room' ? 'Room' : 'House'}
    </button>
    {listing.sharing && (
      <button className="bg-blue-600 w-full max-w-[200px] text-white text-center p-1 rounded-md">
        LKR {+listing.sharingPrice} For One Person
      </button>
    )}
  </div>
  <p className="text-slate-700">
    <span className="font-semibold text-black">Description - </span>
    {listing.description}
  </p>
  <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
    <li className="flex items-center gap-1 whitespace-nowrap">
      <FaBed className="text-lg" />
      {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
    </li>
    <li className="flex items-center gap-1 whitespace-nowrap">
      <FaBath className="text-lg" />
      {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
    </li>
    {listing.parking && (
      <li className="flex items-center gap-1 whitespace-nowrap">
        <FaParking className="text-lg" />
        Parking
      </li>
    )}
    {listing.kitchen && (
      <li className="flex items-center gap-1 whitespace-nowrap">
        <FaCoffee className="text-lg" />
        Kitchen
      </li>
    )}
    <li className="flex items-center gap-1 whitespace-nowrap">
      <FaChair className="text-lg" />
      {listing.furnished ? 'Furnished' : 'Unfurnished'}
    </li>
    <li className="flex items-center gap-1 whitespace-nowrap">
      {listing.for === 'male' && (
        <>
          <FaMale className="text-lg" />
          <span>Male</span>
        </>
      )}
      {listing.for === 'female' && (
        <>
          <FaFemale className="text-lg" />
          <span>Female</span>
        </>
      )}
    </li>
  </ul>
  {currentUser && listing.userRef !== currentUser._id && !contact && (
    <button
    onClick={() => setContact(true)}
    className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 mt-3 p-3'
  >
    Contact Owner
  </button>
    
  )}
   {contact && <Contact listing={listing}/>}           
           
           
</div>      
        </div>
      )}
    </main>
  );
}
