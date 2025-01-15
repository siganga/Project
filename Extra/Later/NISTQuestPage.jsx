
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setResults  } from "../../redux/nistResultsSlice";
import { useSelector, useDispatch } from 'react-redux';



function NISTQuestPage() {

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


    const response = await fetch('http://localhost:5000/api/nistRec/nist-recommendations',{
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
          navigate('/NISTResults', { state: { data: json } });
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

		<h1> Section 1: Patching Frequency   </h1>

<p> 1 Are security patches applied on a regular basis?(Yes/No)   </p>
<p> 2 Is there a defined patch management schedule?(Yes/No)  </p>
<p>  3 Are critical patches prioritized and applied promptly?(Yes/No)  </p>




      		<h1> Section 2: Patch Management Process  </h1>
<p> 4 Does your organization have a formalized software patch management process in
place?(Yes/No)
  </p>
<p> 5 Does your organization regularly check for software updates and security
patches?(Yes/No)
  </p>
<p> 6 Do you maintain an inventory of all software requiring updates? (Yes/No)  </p>
<p> 7 Are patches tested in a controlled environment before deployment?(Yes/No)  </p>
<p> 8 Are appropriate approvals required for patch deployment?(Yes/No)  </p>
<p> 9 Are critical security patches promptly deployed after release?(Yes/No)  </p>
<p> 10 Is there a designated team or individual responsible for applying software updates to the
organization systems?(Yes/No)
   </p>



			<h1> Section 3: Monitoring and Compliance  </h1>
<p>11 Are systems regularly scanned for vulnerabilities?(Yes/No)   </p>
<p> 12 Are vulnerability scans prioritized based on risk?(Yes/No)   </p>
<p> 13 Does the organization have software systems in place capable of detecting
vulnerabilities to ensure timely patching? (Yes/No)
   </p>
<p> 14 Are there checks in place to ensure that the organization is compliant with relevant
regulations and standards regarding software patch management?(Yes/No)
  </p>
			<button onClick={handleSubmit} >Submit</button>
		</div>
	);
}
export default NISTQuestPage;
