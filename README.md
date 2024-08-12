# Cloudflare Challenges Koa

## Introduction

This is a simple login example built with the Koa framework, integrated with Cloudflare Turnstile verification. The application verifies the user's Turnstile response to ensure authenticity before proceeding with the login operation.

## Features

-   Web server built with Koa
-   Integrated Cloudflare Turnstile verification

## Installation

Make sure you have Node.js and npm installed.

1. Clone the repository:
   git clone https://github.com/Danny-Web3/cloudflare-challenges-koa.git

2. Navigate into the project directory:
   cd cloudflare-challenges-koa

3. Install dependencies:
   npm install

4. Set up environment variables:
   Create a `.env` file and add your Cloudflare Turnstile secret key:
   SECRET_KEY=your_secret_key

## Usage

Start the application:
npm start

The application will run at `http://localhost:3000`.

### Sample Login Request

You can use the following example to make a POST request for login:
curl -X POST http://localhost:3000/login\
-H "Content-Type: application/json" \
-d '{
"username": "your_username",
"password": "your_password",
"cf-turnstile-response": "your_turnstile_response"
}'