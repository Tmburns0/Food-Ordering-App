import { useAuth0 } from "@auth0/auth0-react"; 
import { useMutation } from "react-query"; 


export type CreateUserRequest = {
  auth0Id: string; 
  email: string;   
  name?: string;   
};

export interface CreateUserResponse {
  userId: string;  
  message: string; 
}


export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0(); 

 
  return useMutation(async (user: CreateUserRequest) => {
    try {
     
      const token = await getAccessTokenSilently();

      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/my/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      // Return the parsed JSON response from the API
      return response.json();
    } catch (error) {
      console.error("Error during user creation:", error); 
      throw error; 
    }
  });
};
