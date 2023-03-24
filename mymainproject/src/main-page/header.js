import logo from './myhome.jpg';
import './mainpage.css'
import { useNavigate } from 'react-router';


const Header= ({subtitle}) => {
    const history = useNavigate();
    const Home=()=>{
        history(``);
    }
    return(
 <header className="row">
     <div className="col-md-5">
         <img src={logo} className='logo' alt='logohere' onClick={Home}/>
     </div>
     <div className="col-md-7 subtitle">
        {subtitle} 
         </div>
 </header>

)};

export default Header