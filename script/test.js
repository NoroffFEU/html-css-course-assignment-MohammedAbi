const loginUser = async (url, email, password) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Correct header name
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 200) {
            const responseData = await response.json();
            // console.log("UserDetails;", responseData); // Log the response data
            return responseData.token; // Return the token from the response
        } else {
            throw new Error("Login failed with status: " + response.status);
        }
    } catch (error) {
        throw new Error("Failed to login user: " + error.message);
    }
};

// Define a global variable named products
let products = [];

async function renderProducts() {
    try {
        const token = await loginUser(
            "https://v2.api.noroff.dev/auth/login",
            "mohammed.abi@stud.noroff.no",
            "Skuraane2024"
        );

        const response = await fetch("https://v2.api.noroff.dev/rainy-days", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            // Parse the response JSON
            const fetchedProducts = await response.json();
            // Assign the fetched products to the global variable named products
            products = fetchedProducts;
            // console.log("Products:", products); 
        } else {
            throw new Error(
                "Failed to fetch products with status: " + response.status
            );
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Call the renderProducts function
renderProducts();

// Export the products variable
export { products, renderProducts };
