# User Location Map

An application to visualize and search users based on their locations using React, Node.js, and PostgreSQL with full-text search capabilities.

## Getting Started

### Prerequisites

You will need to have Node.js and npm/yarn installed on your machine.

### Installation

1. Clone the repository to your local machine:

   git clone https://github.com/yourusername/user-location-map.git

2. Navigate to the backend folder and install the dependencies:

   cd backend
   npm install
   # or
   yarn install

3. Create a .env file in the backend folder with the following content:

   DATABASE_URL=postgres://ddhqadpexjmyqj:bbe5a9eb12e1a76f74e3d730824cb66dc098ad1906337a1057b067eec2bac8d6@ec2-34-226-11-94.compute-1.amazonaws.com:5432/d81p02thcdnsa

4. Navigate to the client folder and install the dependencies:

   cd ../client
   npm install
   # or
   yarn install

5. Create a .env file in the client folder with the following content:

   REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyCW3hwbbDFw3ccn2vpdun5z0T-urE0IB-w

### Run

1. To run the backend server, navigate to the backend folder and run:

   npm run dev
   # or
   yarn dev

2. To run the client application, navigate to the client folder and run:

   npm start
   # or
   yarn start

