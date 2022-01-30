import { useEffect, useState } from 'react';
import { fetchData, postData } from '../../apiCalls';
import './Form.scss';

const Form = () => {

  const [formData, setFormData] = useState(null);
  const [occupations, setOccupations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [inputValues, setInputValues] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    occupation: '', 
    state: '' 
  });
  const [error, setError] = useState('');
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
      .catch(error => setError(error.message))
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues(prevState => ({...prevState, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let { name, email, password, occupation, state } = inputValues;
    if ( name && email && password && occupation && state ) {
      postFormData();
    }
    else {
      setError("Please fill out all fields before submitting the form.")
      setTimeout(() => setError(''), 4000)
    }
  }

  const postFormData = () => {
    postData(inputValues)
    .then((response) => {
      if (response.ok) {
        setSubmitMessage("Successfully signed up. Welcome to Fetch Rewards!")
      } else {
        throw new Error ("Something went wrong. Please try submitting the form again.")
      }
    })
    .catch(error => setError(error.message))
  }

  const occupationSelect = document.querySelector('.occupation-select');
  if (inputValues.occupation) {
    occupationSelect.classList.remove('default');
  }

  const locationSelect = document.querySelector('.location-select');
  if (inputValues.state) {
    locationSelect.classList.remove('default');
  }

  return (
    <form
      className="main-form" 
      onSubmit={handleSubmit}
    >
      <h3 className="form-title">New User Signup</h3>
      <label className="name-label">Full Name</label>
      <input 
        className="name-input"
        name="name"
        type="text"
        value={inputValues.name} 
        placeholder="Joseph Christ"
        onChange={handleChange}
      >
      </input>
      <label className="email-label">Email</label>
      <input 
        className="email-input"
        name="email"
        type="text"
        value={inputValues.email} 
        placeholder="josephchrist@nazareth.com"
        onChange={handleChange}
      >
      </input>
      <label className="password-label">Password</label>
      <input 
        className="password-input"
        name="password"
        type="password"
        value={inputValues.password}  
        placeholder="Password"
        onChange={handleChange}
      >
      </input>
      <label className="occupation-label">Occupation</label>
      <select 
        className="occupation-select default" 
        name="occupation"
        value={inputValues.occupation}
        onChange={handleChange} 
      >
        <option className="default-option" value="" disabled>Carpenter</option>
        {occupationOptions}
      </select>
      <label className="location-label">Location</label>
      <select 
        className="location-select default"
        name="state"
        value={inputValues.state}
        onChange={handleChange}
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
      {submitMessage && <p className="notification">{submitMessage}</p>}
      {error && <p className="notification">{error}</p>} 
    </form>
  );
}

export default Form;