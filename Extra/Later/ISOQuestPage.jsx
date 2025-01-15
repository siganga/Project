
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setResults  } from "../../redux/isoResultsSlice";
import { useSelector, useDispatch } from 'react-redux';



function ISOQuestPage() {

    // State to store user answers
  const dispatch = useDispatch();

//const [ans1, setAns1] = useState({ question: 1, answer: 'no' });
const [ans2, setAns2] = useState({ question: 2, answer: 'yes' });  
const [ans1, setAns1] = useState('');



 const navigate = useNavigate(); // Use useNavigate

 const [answers, setAnswers] = useState({
    
    ans3: { question: 3, answer: '' }, 
    ans4: { question: 4, answer: '' }, 
    ans5: { question: 5, answer: '' }, 
    ans6: { question: 6, answer: '' }, 
    ans7: { question: 7, answer: '' }, 
    ans8: { question: 8, answer: '' }, 
    ans9: { question: 9, answer: '' }, 
    ans10: { question: 10, answer: '' }, 
    ans11: { question: 11, answer: '' }, 
    ans12: { question: 12, answer: '' }, 
    ans13: { question: 13, answer: '' }, 
    ans14: { question: 14, answer: '' }, 
    ans15: { question: 15, answer: '' }, 
    ans16: { question: 16, answer: '' }, 
    ans17: { question: 17, answer: '' }, 
    ans18: { question: 18, answer: '' }, 
  });


const handleChange = (event) => {
    const { name, value } = event.target;
    setAnswers({ 
      ...answers, 
      [name]: { 
        question: parseInt(name.substring(3)), // Extract question number from name
        answer: value 
      } 
    });
  };



const handleSubmit = async (event) => {
    event.preventDefault();


    const quest = { question: 1, ans1 };

    //New {user && }
    //setIsLoading(true)
	 // setError(null)


    const response = await fetch('http://localhost:5000/api/isoRec/iso-recommendations',{
      method: 'POST',
      body: JSON.stringify({quest, ans2}),
      headers: {
        'Content-Type':'application/json'
      }
    })

    const json = await response.json()//auth

    if(!response.ok){
      //setIsLoading(false)
      //setError(json.error)
      
    }

    if(response.ok){

        if(json.error){
          //setError(json.error)
          console.log('Response from server:', json);       
          //setIsLoading(false)
         
        }
        
        if(!json.error){
         // dispatch(login(json));
          console.log('Response from server:', json);
          //localStorage.setItem('auth', JSON.stringify(json));
          //console.log(`User num: ${json.num}`);
          //console.log(`User rec: ${json.rec}`);
          //setIsLoading(false)
          //navigate('/');
          setAnswers('');
         //console.log(answers)
          //setCobitResult(json)
           dispatch(setResults(json));
          navigate('/ISOResults', { state: { data: json } });
        }

      }



    // Handle form submission here
    console.log(ans1)




  };



	return (
		<div className='flex-1 relative z-10 overflow-auto'>

			<h1> Section One: Regulatory Compliance  </h1>
            <p> 1. Does the organization have a clear understanding of the data protection laws and regulations applicable to its operations?(Yes/No)
                
            </p>
             <input
          type="text"
          name="ans1"
          value={ans1}
          onChange={(e) => setAns1(e.target.value)}
          
        />  
            <p> 2. Are there designated individuals responsible for monitoring regulatory changes andensuring compliance?(Yes/No) </p>
             <input
          type="text"
          name="ans2"
          value={ans2.answer || 'No'}
          onChange={handleChange}
          
        />  

		<h1> Section 1: Access Control Measures  </h1>
<p>1 Are there access controls in place to limit access to sensitive data based on roles and
responsibilities? (Yes/No)   </p>
<p> 2 Are access permissions to sensitive data assigned based on roles and responsibilities?
(Yes/No)  </p>
<p> 3 Are access rights regularly reviewed and updated for employees who have access to
sensitive data? (Yes/No)  </p>
<p> 4 Are strong authentication mechanisms like multi-factor authentication implemented for
accessing sensitive data?(Yes/No)
  </p>
<p> 
5 Is there a process in place to revoke access to sensitive data for employees who change
roles or leave the organization?(Yes/No)
  </p>
<p> 6 Are background checks conducted when hiring employees that will be entrusted with
sensitive data?(Yes/No)
   </p>




      		<h1> Section 2: Monitoring   </h1>

<p> 7 Is there an automated system in place to monitor access to sensitive data?(Yes/No)  </p>
<p> 8 Are access logs regularly reviewed for unauthorized access or suspicious
activities?(Yes/No)  </p>
<p>9 Is there an automated alert system in place for unusual data access patterns?(Yes/No)  </p>
<p> 10 Is there a process for investigating and reporting security incidents related to data
access?(Yes/No)  </p>



			<h1> Section 3: Physical Security  </h1>
<p>11 Are physical access controls such as security guards and video surveillance in place to
restrict access to areas where sensitive data is stored?(Yes/No)   </p>
<p> 12 Is sensitive data physically secured when not in use?(Yes/No)
  </p>
<p> 13 Are there measures in place to prevent unauthorized copying or removal of sensitive
data from premises?(Yes/No)  </p>
<p> 14 Is there a process for securely disposing of sensitive data when it is no longer
needed?(Yes/No)
  </p>
			<button onClick={handleSubmit} >Submit</button>
		</div>
	);
}
export default ISOQuestPage;
