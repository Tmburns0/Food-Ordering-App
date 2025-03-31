import { useMutation } from "react-query";

export type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const createMyUserRequest = async (user: CreateUserRequest) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/my/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export const useCreateMyUser = () => {
  return useMutation(createMyUserRequest);
};
