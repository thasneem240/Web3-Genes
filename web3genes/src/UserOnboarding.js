import React, { useState } from 'react';

const UserOnboarding = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  const [showSuccessToast, setShowSuccessToast] = useState(false);


  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setDob('');
    setGender('');
    setMobileNumber('');
    setEmail('');
  };

  const handleSave = async () => {

    // Validate input fields
    if (!firstName || !lastName || !dob || !gender || !mobileNumber || !email) {
      alert('Please fill in all fields');
      return;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate mobile number format
    const mobileRegex = /^\d{10}$/; // Assuming mobile number should be exactly 10 digits
    if (!mobileRegex.test(mobileNumber)) 
    {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    try 
    {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          dob,
          gender,
          mobileNumber,
          email,
          password: '' // Since password is not entered in the form, it should be empty
        }),
      });

      if (!response.ok) 
      {
        throw new Error('Failed to add user');
      }

      setShowSuccessToast(true);

      // Reset form fields
      setFirstName('');
      setLastName('');
      setDob('');
      setGender('');
      setMobileNumber('');
      setEmail('');

      // Hide the toast after 2 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 2000);

    } 
    catch (error) 
    {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again later.');
    }


  };

  
  return (
    <div className="onboarding-page">
      <h1 style={{marginTop:'20px'}} >User Onboarding</h1>
      <form>
        <div>
          <h2 style={{marginBottom: '25px', marginTop:'50px'}}>Basic Details</h2>
          <div className="input-group">
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field" />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" />
            <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} className="input-field" />
            <br />
            {/* <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} className="input-field" style={{ marginTop: '20px' }} /> */}
            <select value={gender} onChange={(e) => setGender(e.target.value )}  className="input-field" style={{ marginTop: '20px' }} >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div>
          <h2 style={{marginBottom: '25px'}}>Contact Details</h2>
          <div className="input-group">
            <input type="text" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="input-field" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
          </div>
        </div>
        <div className="button-group">
          <button type="button" onClick={handleClear} style={{ marginRight: '25px', color: 'blue', fontWeight: 'bold' }} className="buton-field" >Clear</button>
          <button type="button" onClick={handleSave} style={{color: 'blue', fontWeight: 'bold'}} className="buton-field" >Save</button>
        </div>
        { showSuccessToast && (<div className="toast-notification">User created successfully!</div>)}

      </form>
    </div>
  );
};

export default UserOnboarding;