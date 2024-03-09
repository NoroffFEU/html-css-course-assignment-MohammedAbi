// Function to login a user
export const loginUser = async (url, email, password) => {
  try {
    const requestBody = {
      email: email,
      password: password,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 200) {
      console.log("User logged in successfully:");
      const data = await response.json();
      console.log("User Data:", data);
    } else {
      throw new Error("Login failed with status: " + response.status);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
};

// Call the loginUser function with the specified URL, email, and password
loginUser(
  "https://v2.api.noroff.dev/auth/login",
  "mohammed.abi@stud.noroff.no",
  "Skuraane2024"
);
