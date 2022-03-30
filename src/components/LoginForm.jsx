import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const authObject = { 'Project-ID' : "c66823c6-293f-48b3-9354-10bdb6fcebfa",
        'User-Name' : username,
        'User-Secret'  : password,
    };
    try{
        // username / password => checks inside chatengie and give message from chatengine if it exist --> logged in
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            //logged in and we have to store in our local storage
            localStorage.setItem('username' , username);
            localStorage.setItem('password' , password);

            //after logged in reload the entrie page
            window.location.reload();

        }catch(error){
            //error --> try with new username
            setError('Oobs, incorrect credentials.')
        }

    }
    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required/>
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        
        </div>
    )
}

export default LoginForm;