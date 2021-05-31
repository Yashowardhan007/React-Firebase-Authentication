
import React, { useRef,useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from 'react-router-dom'
function UpdateProfile()
{
  // Create Refs to access the dom node
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {  signup ,currentUser,updateEmail,updatePassword } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  function handleSubmit(e)
  {
    e.preventDefault(); // prevent from refreshing the page
    //check if the two passwords match
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
    {
      return setError('Password Do Not Match')
    }
    const promises = [];
    setLoading(true);
    setError('');
    if (emailRef.current.value !== currentUser.email)
    {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value)
    {
      promises.push(updatePassword(passwordRef.current.value))
    }
    Promise.all(promises).then(() => {
      history.push('/')
    }).catch(() => { setError('Failed To Update') }).finally(()=>{setLoading(false)})
   
   
  }
  return (
    <div>
      <Card className="bg-info">
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
           
           {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Please Enter Your Email" ref={emailRef} defaultValue={currentUser.email} required></Form.Control>
              <Form.Text className="text-muted">
                Your Data Will be Held Confidential
              </Form.Text>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Please Enter Your Password" ref={passwordRef} placeholder="Leave Blank to keep the Same" required></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" placeholder="Please Enter Your Password" ref={passwordConfirmRef}  placeholder="Leave Blank to keep the Same" required></Form.Control>
            </Form.Group>
            <Button  type="submit" className="mt-4 bg-danger" disabled={loading}>Please Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
       Already Have an Account ?  <Link to="/">Cancel</Link>
      </div>

    </div>
  
  )
}
export default UpdateProfile;