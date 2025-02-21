
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { setResults  } from "../../redux/questResultsSlice";
import { useSelector, useDispatch } from 'react-redux';



function NISTQuestPage() {


  const dispatch = useDispatch();





 const navigate = useNavigate(); // Use useNavigate

const [ans1, setAns1] = useState('');
const [ans2, setAns2] = useState('');
 const [ans3, setAns3] = useState('');
const [ans4, setAns4] = useState('');
const [ans5, setAns5] = useState('');
const [ans6, setAns6] = useState('');
const [ans7, setAns7] = useState('');
const [ans8, setAns8] = useState('');
const [ans9, setAns9] = useState('');
const [ans10, setAns10] = useState('');







const handleSubmit = async (event) => {
    event.preventDefault();


    const quest = { question: 1, ans1 };
    const quest2 = { question: 2, ans2 };
    const quest3 = { question: 3, ans3  };
    const quest4 = { question: 4, ans4 };
    const quest5 = { question: 5, ans5 };
    const quest6 = { question: 6 , ans6  };
    const quest7 = { question: 7, ans7 };
    const quest8 = { question: 8, ans8 };
    const quest9 = { question: 9, ans9 };
    const quest10 = { question: 10, ans10 };
    



    

    const response = await fetch('http://localhost:5000/api/nistRec/nist-recommendations',{
      method: 'POST',
      body: JSON.stringify({quest,  quest2, quest3, quest4, quest5, quest6, quest7, quest8, quest9, quest10 }),
      headers: {
        'Content-Type':'application/json'
      }
    })

    const json = await response.json()

    if(!response.ok){
      console.log('Response from server:', json); 
      
    }

    if(response.ok){

        if(json.error){
         
          console.log('Response from server:', json);       
        
         
        }
        
        if(!json.error){
        
          console.log('Response from server:', json);
          
           dispatch(setResults(json));
          navigate('/QUESTResults', { state: { data: json } });
        }

      }



    
    console.log(ans1)




  };






	return (

		<div className='relative z-10 overflow-auto mx-auto p-4'>
    <h2 className='text-3xl font-bold mb-4'> NIST Questionnaire</h2>
		

<p> 1 Are security patches applied on a regular basis?(Yes/No)   </p>
<input
          type="text"
          name="ans1"
          value={ans1}
          onChange={(e) => setAns1(e.target.value)}
          className='text-black'
          
        />  
<p> 2 Is there a defined patch management schedule?(Yes/No)  </p>
<input
          type="text"
          name="ans2"
          value={ans2}
          onChange={(e) => setAns2(e.target.value)}
          className='text-black'
          
        />  
<p>  3 Does your organization regularly check for software updates and security
patches?(Yes/No) </p>
<input
          type="text"
          name="ans3"
          value={ans3}
          onChange={(e) => setAns3(e.target.value)}
          className='text-black'
        />  



         
<p> 4 Are patches tested in a controlled environment before deployment?(Yes/No)
  </p>
  <input
          type="text"
          name="ans3"
          value={ans4}
          onChange={(e) => setAns4(e.target.value)}
          className='text-black'
        />  

<p> 5 Are appropriate approvals required for patch deployment?(Yes/No)
  </p>
         <input
          type="text"
          name="ans2"
          value={ans5}
          onChange={(e) => setAns5(e.target.value)}
          className='text-black'
          
        />  
<p> 6 Are systems regularly scanned for vulnerabilities?(Yes/No)  </p>
 <input
          type="text"
          name="ans2"
          value={ans6}
          onChange={(e) => setAns6(e.target.value)}
          className='text-black'
          
        />  
<p> 7  Are vulnerability scans prioritized based on risk?(Yes/No  </p>
 <input
          type="text"
          name="ans2"
          value={ans7}
          onChange={(e) => setAns7(e.target.value)}
          className='text-black'
          
        />  
<p> 8  Does the organization have software systems in place capable of detecting
vulnerabilities to ensure timely patching? (Yes/No)  </p>
<input
          type="text"
          name="ans2"
          value={ans8}
          onChange={(e) => setAns8(e.target.value)}
          className='text-black'
          
        />  
<p> 9 Is there a designated team or individual responsible for responding to security incidents related to software vulnerabilities? (Yes/No)  </p>
 <input
          type="text"
          name="ans2"
          value={ans9}
          onChange={(e) => setAns9(e.target.value)}
          className='text-black'
          
        />  
<p> 10 Are there ongoing training programs to raise awareness about cybersecurity risks associated with unpatched software? (Yes/No)
   </p>
 <input
          type="text"
          name="ans2"
          value={ans10}
          onChange={(e) => setAns10(e.target.value)}
          className='text-black'
          
        />  


      

      <div className='mt-4'>
      <button onClick={handleSubmit}  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
         </div>
		</div>
	);
}
export default NISTQuestPage;
