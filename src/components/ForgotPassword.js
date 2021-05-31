
import React, { useRef,useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from 'react-router-dom'
function ForgotPassword()
{
  // Create Refs to access the dom node
  const emailRef = useRef();
  /* const passwordRef = useRef(); */
  /* const passwordConfirmRef = useRef(); */
  const { login, currentUser,resetpassword } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message,setMessage] = useState() 
 /*  const history = useHistory(); */
  async function handleSubmit(e)
  {
    e.preventDefault(); // prevent from refreshing the page
    //check if the two passwords match
    /* if (passwordRef.current.value !== passwordConfirmRef.current.value)
    {
      return setError('Password Do Not Match')
    } */
    
    try {
      setError('');
      setLoading(true)
      await resetpassword(emailRef.current.value);
      setMessage('Check Your Inbox for further instruction')
     /*  history.push('/') */

    }
    catch {
      setError('Failed To Reset Passwod')
    }
    setLoading(true)
   
  }
  return (
    <div>
      <Card className="bg-info">
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Password</h2>
          
           {error && <Alert variant="danger">{error}</Alert>}
           {message && <Alert variant="success">{message}</Alert>}
         
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Please Enter Your Email" ref={emailRef} required></Form.Control>
              <Form.Text className="text-muted">
                Your Data Will be Held Confidential
              </Form.Text>
            </Form.Group>
          
            
            <Button  type="submit" className="mt-4 bg-danger" disabled={loading}>Reset Password</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
           </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      Need An Account? Pls <Link to="/signup">Signup</Link>
      </div>
  
    </div>
  
  )
}
export default ForgotPassword;