[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13051057&assignment_repo_type=AssignmentRepo)
# HTML & CSS Course Assignment

## Brief

You must deliver a properly functioning, responsive website for the assignment brief you chose in Design 1.

The site needs to have every page listed in the site architecture on your chosen brief. Certain functionality requiring JavaScript can be mimicked; for example, a login page could link across from the ‘Sign in’ button.

- The HTML should be semantic and neat.
- The CSS should follow the DRY principle and be easy to read.
- The website should be responsive and look good at every screen size with no horizontal scrollbars. Use Flexbox and CSS Grids where appropriate. Please do not use a CSS framework like Bootstrap; we want to see that you can build responsive sites without the help of a framework.
- The site should be WCAG compliant, and accessibility should be taken into account.
- Each page should have a unique <meta name="description">, <title>, and <h1>.
- You should not use copied code in your submission. All code submitted must be written by yourself. You may use external sources to show you how to achieve specific effects, which should be included in your report.

## Process

1. Look at your prototype and consider how the elements will move across the different devices. Which elements move where on different devices?
2. Write your HTML and CSS, ensuring your HTML is semantic and bug-free and your CSS follows DRY principles.
3. Use media queries, flex or grid to make your website responsive across screen sizes.
4. Test your website using your developer tools and also test on major browsers and various devices.
5. Validate your code using the Markup Validation Service
6. Use the WAVE Web Accessibility Evaluation Tools to test that your site matches best practices for accessibility
7. When your site is ready, post it on the Teams peer review channel.
8. Look at the work of your peers and write a review for them.
9. Make adjustments based on the feedback you gather from peers and teachers.
10. Submit here on Teams.

## Delivery

- Please include a link to your live site, deployed on Netlify or GitHub Pages in your submission.
- Please include a link to your public GitHub repo containing your code in your submission.
- There is no reflection for this CA.

# JavaScript 1 - Course Assignment

## Brief

This project involves using JavaScript to create an interactive online store that displays products from an API endpoint. You can choose from one of the provided API URLs to fetch and display products in HTML, allowing users to add items to their basket and proceed through the checkout process. Styling is optional but recommended, as it enhances the user experience.

### User Stories

- **View Product List:** Users can view a list of products on the homepage.
- **Filter Products:** Users can filter products by category, gender, or genre.
- **Product Details:** Users can view detailed information about a specific product on its individual page.
- **Add to Basket:** Users can add products to their basket.
- **Remove from Basket:** Users can remove products from their basket.
- **View Cart Summary:** Users can view a summary of their cart on the checkout page.
- **Order Confirmation:** Users receive a thank you message on the confirmation page after checking out.

### Required Pages

- **Home Page:** `/index.html`
- **Product Page:** `/product/index.html`
- **Checkout Page:** `/checkout/index.html`
- **Confirmation Page:** `/checkout/confirmation/index.html`

### Optional Pages

- **Category Pages**
- **Terms and Conditions Page**
- **Privacy Policy Page**
- **My Profile Page**

## Process

1. **Project Setup:** Decide whether to use an existing project or start a fresh one.
2. **API Selection:** Choose one of the provided endpoints and review its documentation.
3. **Development:** Work through the requirements step by step, implementing JavaScript functionalities.
4. **Testing:** Thoroughly test your work and seek peer review for feedback.
5. **Review:** Offer feedback on two other students' projects.
6. **Final Adjustments:** Make any final changes based on feedback and ensure code cleanliness.
7. **Submission:** Submit your project on GitHub along with a written reflection on the process.

## Resources

- **API Endpoints:**
  - Rainy Days API: [Documentation](https://docs.noroff.dev/docs/v1/e-commerce/rainy-days)
  - GameHub API: [Documentation](https://docs.noroff.dev/docs/v1/e-commerce/gamehub)
  - Square Eyes: [Documentation](https://docs.noroff.dev/docs/v1/e-commerce/square-eyes)

## Important Features

- Error Handling: Notify users of errors, such as failed API calls.
- Loading Indicator: Display a loading indicator during asynchronous actions.
- Dynamic Data: Avoid hardcoding product data in the final submission.
- Accessibility: Ensure the site is accessible and usable for all users.
- Asynchronous Actions: Use `async` instead of `then` syntax for asynchronous actions.
- Console Logs: Remove all `console.log` statements before submission.

## Delivery

- GitHub Repository: Submit JavaScript code in the default (main/master) branch.
- Written Reflection: Provide a reflection on the assignment process.
