import { useEffect, useState } from 'react';
import { fetchData } from '../../apiCalls';
// import Select from 'react-select';

const Form = (props) => {

  const [formData, setFormData] = useState(null);
  const [occupationValue, setOccupationValue] = useState(null)

  useEffect(() => {
    fetchOccupationLocationData()
  }, [])

  const fetchOccupationLocationData = () => {
    fetchData("https://frontend-take-home.fetchrewards.com/form")
      .then(data => setFormData(data))
  }

  const occupationOptions = formData ? formData.occupations.map((occupation, index) => {
    return (
      <option className="occupation-option" key={index} value={occupation}></option>
    )
  }) : null

  const handleChange = (event) => {
    setOccupationValue(event.target.value)
  } 

  return (
    <form>
      <input type="text" placeholder="Full Name"></input>
      <input type="text" placeholder="Email"></input>
      <input type="password" placeholder="Password"></input>
      <select className="occupation-select" onChange={handleChange} name="occupation">{formData && occupationOptions}</select>
    </form>
  );
}

export default Form;