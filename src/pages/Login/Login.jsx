import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import bgImg from '../../assets/others/authentication2.png'
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin';

const Login = () => {

    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                Swal.fire({
                    title: "Logged in",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
                navigate(from, { replace: true });
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
            alert("Captcha not valid. Please try again.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Hotel Management | Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col md:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <img src={bgImg} alt="" />
                    </div>
                    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl py-4">
                        <form onSubmit={handleLogin} className="card-body py-0">
                            <h1 className="text-5xl font-bold text-center">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input type="password" placeholder="Password" name="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate></LoadCanvasTemplate>
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" placeholder="Type the text above" name="captcha" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} type="submit" value="Login" className="btn bg-[#D1A054] text-white"></input>
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <p className='text-[#D1A054] text-center'>New here? <Link to="/signup"><span className='font-semibold'>Create a New Account</span></Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;