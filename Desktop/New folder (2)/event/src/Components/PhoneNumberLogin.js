// PhoneNumberLogin.js

// import React, { useState } from 'react';
// import './PhoneNumberLogin.css';

// const PhoneNumberLogin = () => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [qrNumber, setQrNumber] = useState('');
  
//     const handleChange = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/saveData', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ phoneNumber, qrNumber }),
//         });
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
  
//         const data = await response.json();
//         console.log(data.message);  // Access the 'message' property
  
//         // Reset the form after handling the data (optional)
//         setPhoneNumber('');
//         setQrNumber('');
//       } catch (error) {
//         console.error('Error saving data:', error.message);
//       }
//     };
  

//   return (
//     <div className="ph_no">
//       <h1>Registration</h1>
//       <form>
//         <label htmlFor="phone_number_reg">Phone Number:</label>
//         <input
//           type="tel"
//           id="phone_number_reg"
//           name="phone_number"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           required
//         /><br />

//         <label htmlFor="qr_number_reg">QR Number:</label>
//         <input
//           type="number"
//           id="qr_number_reg"
//           name="qr_number"
//           value={qrNumber}
//           onChange={(e) => setQrNumber(e.target.value)}
//           required
//         /><br />

//         <button type="button" onClick={handleChange}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PhoneNumberLogin;


// import React, { useState } from 'react';
// import './PhoneNumberLogin.css';

// const PhoneNumberLogin = () => {
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [qrNumber, setQrNumber] = useState('');

//   const handleChange = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/saveData', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, phoneNumber, qrNumber }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data.message);  // Access the 'message' property

//       // Reset the form after handling the data (optional)
//       setName('');
//       setPhoneNumber('');
//       setQrNumber('');
//     } catch (error) {
//       console.error('Error saving data:', error.message);
//     }
//   };

//   return (
//     <div className="ph_no">
//       <h1>Registration</h1>
//       <form>
//         <label htmlFor="name_reg">Name:</label>
//         <input
//           type="text"
//           id="name_reg"
//           name="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         /><br />

//         <label htmlFor="phone_number_reg">Phone Number:</label>
//         <input
//           type="tel"
//           id="phone_number_reg"
//           name="phone_number"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           required
//         /><br />

//         <label htmlFor="qr_number_reg">QR Number:</label>
//         <input
//           type="number"
//           id="qr_number_reg"
//           name="qr_number"
//           value={qrNumber}
//           onChange={(e) => setQrNumber(e.target.value)}
//           required
//         /><br />

//         <button type="button" onClick={handleChange}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PhoneNumberLogin;

import React, { useState } from 'react';
import './PhoneNumberLogin.css';

const PhoneNumberLogin = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qrNumber, setQrNumber] = useState('');

  const handleChange = async () => {
    try {
      const response = await fetch('http://localhost:3001/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phoneNumber, qrNumber }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);  // Access the 'message' property

      // Reset the form after handling the data (optional)
      setName('');
      setPhoneNumber('');
      setQrNumber('');
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  const handleLinkClick = async (clickedQrNumber) => {
    try {
      const response = await fetch(`http://localhost:3001/getData/${clickedQrNumber}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Retrieved Data:', data);
      // Handle the retrieved data as needed (e.g., display in the UI)
    } catch (error) {
      console.error('Error retrieving data:', error.message);
    }
  };

  return (
    <div className="ph_no">
      <h1>Registration</h1>
      <form>
      <label htmlFor="name_reg">Name:</label>
        <input
          type="text"
          id="name_reg"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />

        <label htmlFor="phone_number_reg">Phone Number:</label>
        <input
          type="tel"
          id="phone_number_reg"
          name="phone_number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        /><br />

        <label htmlFor="qr_number_reg">QR Number:</label>
        <input
          type="number"
          id="qr_number_reg"
          name="qr_number"
          value={qrNumber}
          onChange={(e) => setQrNumber(e.target.value)}
          required
        /><br />

        <button type="button" onClick={handleChange}>
          Submit
        </button>
      </form>

      <div>
        {/* Links to retrieve data for specific QR numbers */}
        {[1, 2, 3, 4, 5].map((qrNumber) => (
          <button key={qrNumber} onClick={() => handleLinkClick(qrNumber)}>
            Retrieve Data for QR {qrNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhoneNumberLogin;
