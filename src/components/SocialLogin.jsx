import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // console.log(result.user);
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          // console.log(res.data);
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
      });
  };

  return (
    <div>
      <div>
        <div className="divider w-5/6 ml-8"></div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-neutral w-5/6 ml-8 mb-4"
        >
          <FaGoogle className="mr-2"></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
