# USSD Emulator

## Overview
The USSD Emulator is a React-based web application that allows developers to test and simulate USSD session flows by interacting with a backend API. It provides an interface for entering USSD codes, receiving responses, and navigating through menu options as users would on a mobile device.

### Demo
Try the live demo here: [USSD Emulator](https://jamesnjovu.github.io/ussd-emulator/)

## Features
- Simulates USSD requests and responses
- Sends requests to a specified API endpoint
- Supports session handling with session IDs
- Displays API responses in a user-friendly format
- Includes an API documentation section for easy reference
- Allows session continuation or termination based on API response
- Validates mobile numbers with country codes

## Installation
To run the emulator locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/ussd-emulator.git
   cd ussd-emulator
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm run dev
   ```
4. Open the browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage
### 1. Configuring the Emulator
- Enter the API URL where the emulator should send USSD requests.
- Provide a mobile number with country code for simulation (e.g., +260978921730).
- Click the **Start** button to proceed.

### 2. Interacting with USSD
- Use the on-screen numpad to enter a USSD code (e.g., `*123#`) and press **Send**.
- Navigate through the menu options by entering responses as prompted.
- If the session ends, click **End** to reset the emulator.

### 3. API Request Format
The emulator sends requests to the configured API endpoint using the following JSON payload:
```json
{
  "mobile_number": "string",
  "input": "string",
  "session_id": "string"
}
```

### 4. API Response Format
The API should return responses in the following format:
```json
{
  "message": "string",
  "session": "string"  // Use "CON" to continue, "END" to terminate
}
```

## Troubleshooting

### CORS Errors
If you encounter CORS errors like:
```
Access to fetch at 'https://your-api.com/ussd' from origin 'https://jamesnjovu.github.io' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This happens because your API server isn't configured to accept requests from the emulator's domain. To fix this:

#### Solution 1: Enable CORS on your API server
Configure your server to include the following headers in responses:
```
Access-Control-Allow-Origin: *  // Or specifically allow your domain
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

#### Solution 2: Use a CORS proxy
If you can't modify your server, use a CORS proxy like:
- https://cors-anywhere.herokuapp.com/
- https://corsproxy.io/

Example usage:
```
https://corsproxy.io/?https://your-api.com/ussd
```

#### Solution 3: Run the emulator locally
When running locally, you can use browser extensions to bypass CORS restrictions during development.

## Error Handling
If an error occurs during a request, the emulator will display an error message and terminate the session.

## Technologies Used
- React
- JavaScript (ES6+)
- Tailwind CSS (for styling)
- Fetch API (for HTTP requests)

## License
This project is licensed under the MIT License.