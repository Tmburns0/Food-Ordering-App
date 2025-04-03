import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/MyUserAPI";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { mutate: createUser } = useCreateMyUser(); 

  useEffect(() => {
    if (user?.sub && user?.email) {
      createUser(
        { auth0Id: user.sub, email: user.email },
        {
          onSuccess: () => {
          
            navigate("/");
          },
          onError: (error) => {
         
            console.error("User creation failed:", error);
          },
        }
      );
    }
  }, [createUser, user, navigate]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
