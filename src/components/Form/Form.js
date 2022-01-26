import { useEffect, useState } from 'react';
import { fetchData, postData } from '../../apiCalls';
import './Form.scss';

const Form = (props) => {

  const [formData, setFormData] = useState(null);
  const [occupations, setOccupations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [occupationValue, setOccupationValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [incompleteError, setIncompleteError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    fetchFormData();
  }, []);

  useEffect(() => {
    populateSelectOptions();
  }, [formData]);

  const populateSelectOptions = () => {
    if (formData) {
      setOccupations(formData.occupations);
      setLocations(formData.states);
    }
  }

  const fetchFormData = () => {
    fetchData()
      .then(data => setFormData(data))
  }

  const occupationOptions = occupations && occupations.map((occupation, index) => {
    return (
      <option className="occupation-option" key={index} value={occupation}>{occupation}</option>
    )
  })

  const locationOptions = locations && locations.map((location, index) => {
    return (
      <option className="location-option" key={index} value={location.name}>{location.name}</option>
    )
  })  

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  }

  const handleOccupationChange = (event) => {
    setOccupationValue(event.target.value);
  } 

  const handleLocationChange = (event) => {
    setLocationValue(event.target.value);
  }

  const formObject = {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    occupation: occupationValue,
    state: locationValue
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let { name, email, password, occupation, state } = formObject;
    if ( name && email && password && occupation && state ) {
      postData(formObject)
        .catch(e => setSubmitMessage(e.message))
        .then(setTimeout(() => setSubmitMessage(''), 4000))
    }
    else {
      setIncompleteError("Please fill out all fields before submitting the form.")
      setTimeout(() => setIncompleteError(''), 4000)
    }
  }

  const evaluateOccupationSelection = () => {
    const occupationSelect = document.querySelector('.occupation-select')
    if (occupationValue) {

    }
  }

  const evaluateLocationSelection = () => {

  }

  return (
    <>
      
      <form
        className="main-form" 
        onSubmit={handleSubmit}
      >
        <h3 className="form-title">New User Signup</h3>
        <label>Full Name</label>
        <input 
          className="name-input"
          type="text"
          value={nameValue} 
          placeholder="Joseph Christ"
          onChange={handleNameChange}
        >
        </input>
        <label>Email</label>
        <input 
          className="email-input"
          type="text"
          value={emailValue} 
          placeholder="josephchrist@nazareth.com"
          onChange={handleEmailChange}
        >
        </input>
        <label>Password</label>
        <input 
          className="password-input"
          type="password"
          value={passwordValue}  
          placeholder="Password"
          onChange={handlePasswordChange}
        >
        </input>
        <label>Occupation</label>
        <select 
          className="occupation-select default" 
          onChange={handleOccupationChange} 
          name="occupation"
          value={occupationValue}
        >
          <option className="default-option" value="" disabled>Carpenter</option>
          {occupationOptions}
        </select>
        <label>Location</label>
        <select 
          className="location-select default"
          onChange={handleLocationChange}
          name="location"
          value={locationValue}
        >
          <option className="default-option" value="" disabled>Nazareth</option>
          {locationOptions}
        </select>
        <input
          className="submit-button"
          type="submit"
          value="Submit"
        >
        </input>
        {submitMessage && <p>{submitMessage}</p>}
        {incompleteError && <p>{incompleteError}</p>} 
      </form>
      
    </>
  );
}

export default Form;