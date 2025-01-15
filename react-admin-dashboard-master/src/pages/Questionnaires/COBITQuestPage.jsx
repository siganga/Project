
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setResults  } from "../../redux/cobitResultsSlice";
import { useSelector, useDispatch } from 'react-redux';



function COBITQuestPage() {

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


    const response = await fetch('http://localhost:5000/api/cobitRec/cobit-recommendations',{
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
          navigate('/COBITResults', { state: { data: json } });
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
			<p>3. Are there policies and procedures in place to address regulatory requirements related to data protection?(Yes/No) </p>
			<p>4. Are organization policies regularly reviewed and updated to align with changing regulations?(Yes/No) </p>
			<p>5. Does the organization monitor and track compliance with data protection laws?(Yes/No) </p>


			<h1> Section Two : Data Protection   </h1>
			<p>6. Is sensitive data classified based on its criticality and confidentiality?(Yes/No) </p>
			<p>7. Are access controls implemented to restrict access to sensitive data?(Yes/No) </p>
			<p>8. Are users of the system asked for consent before the system collects their private data?(Yes/No)      </p>
			<p>9. Are encryption and other security measures used to protect data in transit and at rest?(Yes/No)      </p>
			<p>10. Does the organization have policies governing data retention and disposal?(Yes/No)   </p>
			<p>11. Are the organization's data retention and disposal practices compliant with regulatory requirements?(Yes/No) </p>



      		<h1>Section Third: Training and Awareness    </h1>			
			<p> 12. Are employees provided with training on data protection laws, regulations, and bestpractices?(Yes/No)     </p>
			<p>13. Is there awareness training on cybersecurity risks and how to report incidents?(Yes/No)     </p>
			<p>14. Are data protection policies and procedures of the organization communicated to all employees?(Yes/No)      </p>
			<p>15. Are employees trained to recognize and respond to phishing attacks and other social engineering tactics?(Yes/No)     </p>
			


			<h1> Section Four: Incident Response   </h1>
			<p>16. Is there a documented incident response plan in place to address data breaches and regulatory violations?(Yes/No)     </p>
			<p>17. Is the incident response plan regularly tested and updated?(Yes/No)      </p>
			<p>18.Are there procedures for timely reporting of data breaches to relevant stakeholders such as governmental authorities and affected individuals?(Yes/No)</p>


			<button onClick={handleSubmit} >Submit</button>
		</div>
	);
}
export default COBITQuestPage;
