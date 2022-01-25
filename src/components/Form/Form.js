import { useEffect, useState } from 'react';
import { fetchData, postData } from '../../apiCalls';

const Form = (props) => {

  const [formData, setFormData] = useState(null);
  const [occupations, setOccupations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [occupationValue, setOccupationValue] = useState(null);
  const [locationValue, setLocationValue] = useState(null);

  useEffect(() => {
    fetchFormData();
  }, []);

  useEffect(() => {
    populateSelectField();
  }, [formData]);

  const populateSelectField = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const formObject = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      occupation: occupationValue,
      state: locationValue
    }
    postData(formObject)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={nameValue} 
        placeholder="Full Name"
        onChange={handleNameChange}
      >
      </input>
      <input 
        type="text"
        value={emailValue} 
        placeholder="Email"
        onChange={handleEmailChange}
      >
      </input>
      <input 
        type="password"
        value={passwordValue}  
        placeholder="Password"
        onChange={handlePasswordChange}
      >
      </input>
      <select 
        className="occupation-select" 
        onChange={handleOccupationChange} 
        name="occupation"
      >
        {occupationOptions}
      </select>
      <select 
        className="location-select"
        onChange={handleLocationChange}
        name="location"
      >
        {locationOptions}
      </select>
      <input
        type="submit"
        value="Submit"
      >
      </input>
    </form>
  );
}

export default Form;