# Wonder Developers Payment Portal

Welcome to the **Wonder Developers Payment Portal**. This application allows users to securely manage their financial transactions, offering features such as account registration, login, and a transactions dashboard.

## Important Links

### Youtube Demonstration Video & Personal GitHub Repo Links
- POE P2 Video Link: https://www.youtube.com/watch?v=31US1CEk3FQ
- POE P3 Video Link: https://www.youtube.com/watch?v=XFOqP979B_c
- Personal GitHub Repo Link: https://github.com/ST10218221/APDS7311_POE.git

## Getting Started

Follow the steps below to set up and run the application.

### Installation

1. **Clone the Repository**

   Clone the repository to your local machine using Git:

   ```bash
   git clone https://github.com/IIEWFL/apds7311-poe-wonder-developers.git
   ```

2. **Install Dependencies**

   Navigate to the project folder and install the required dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Open your terminal.

2.1. Run the following commands to start the backend:

   ```bash
   npm run dev
   ```
2.2. Run the following commands to start the frontend:

   ```bash
   npm start
   ```

3. The application will open in your web browser, where you will see five main tabs:

   - **Home**
   - **Register**
   - **Login**
   - **Transactions**
   - **Protected**

***Please Note***:

The Transactions Page and Protected page can only be accessed after logging in. The Protected page is also only accessible by authorized users such as Super Admins. 

---
### Data Input 
The data that is to be inputed must follow certain criteria such as: 
- ID Number must be 13 numbers.
- Account number must be 10 numbers.
- Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.
For example, this is how the JSON data must be formatted and structured:

{
  "firstName": "Alice",
  "surname": "Smith",
  "username": "AS789",
  "IDNumber": "8901234567890",
  "accountNumber": "5678901234",
  "email": "alice.smith@example.com",
  "password": "Alice@2024!",
  "userRole": "Customer"
  }


## Application Pages

### Home Page

The homepage provides an overview of the bank, along with a button to create a new account. You must create an account to unlock access to the transactions page. Additionally, a panel on the right displays insightful banking-related content.

### Registration

To register for an account, fill in the required details:

- First Name
- Surname
- ID Number
- Account Number
- Username
- Email
- Password

A panel on the right will show relevant insights as you complete the form. All fields are mandatory.

### Login Page

Once registered, go to the login page and enter your:

- Username
- Account Number
- Password

During the login process, a panel on the right provides helpful financial insights.

### Transactions Page

After logging in, the transactions page allows you to manage your financial activities. You can:

- Create new transactions
- Track your existing transactions
- Edit transactions
- Delete transactions

This section provides a user-friendly interface to efficiently manage all your financial activities in one place.

### Protected Page

As a Super Admin, only you can access this page. 

This page allows the Super Admin to:
- Edit users and their roles 
- Delete users
- Create users

This section allows the Super Admin to have control over all users. 

---

## Testing

Ensure that the application is functioning as expected by running the continuous integration pipeline, which includes testing features to ensure the system’s reliability.

![WhatsApp Image 2024-10-08 at 19 10 41_606f4707](https://github.com/user-attachments/assets/3547fc5d-6cce-4228-8da2-c72402d9b819)

Figure 1: Proof of CI pipeline testing used in Part 2
![WhatsApp Image 2024-11-12 at 00 14 22_8eb2e662](https://github.com/user-attachments/assets/c44a81a7-cc2c-4ff2-8816-72524e1ee617)
Figure 2: Proof of Sonar Cube Testing


