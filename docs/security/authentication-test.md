# Authentication Tests

This document describes how to manually test the GameShelf authentication system, including user registration, email verification, login, JWT authentication, and password recovery.

The tests use HTTP requests to interact directly with the backend API and Mailpit to inspect emails sent during the authentication process.

## 1. Prerequisites

Before running the tests, make sure the following services are available:

- Java and the required project dependencies.
- PostgreSQL running with the GameShelf database configured.
- Mailpit running and configured as the backend SMTP server.
- Backend application running locally.
- Postman, Insomnia, or another HTTP client.

The required environment variables must also be configured:

| Variable | Purpose |
|---|---|
| `PASSWORD_PEPPER` | Secret used by the password encoder |
| `TOKEN_SECRET` | Secret used to sign JWTs |

The examples in this document assume the backend is running at:

`http://localhost:8080`

Mailpit's web interface is commonly available at:

`http://localhost:8025`

Make sure to use a development database. These tests create accounts, modify passwords, and generate temporary tokens.

## 2. Registration and Email Verification

### 2.1 Register a New User

Send the following request:

**Endpoint**

`POST /auth/register`

**Request body**

```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "TestPassword123"
}
```

**Expected result**

- The registration information is accepted.
- The password is encoded before being stored.
- A pending registration is created in the database.
- A verification email is sent to the supplied address.
- The verification token expires after 15 minutes.

At this stage, the account should exist in `pending_registrations`, not in `users`.

### 2.2 Verify the Email Address

Open Mailpit and locate the verification email sent during registration.

Retrieve the verification token from the link included in the email.

Send the following request:

**Endpoint**

`POST /auth/verify-email`

**Request body**

```json
{
  "token": "<verification-token>"
}
```

**Expected result**

- The verification token is accepted.
- A new user account is created in `users`.
- The pending registration is removed.
- The user can now log in.

### 2.3 Resend Verification Email

To test email resending, create another pending registration without completing verification.

Send the following request:

**Endpoint**

`POST /auth/resend-verification-email`

**Request body**

```json
{
  "email": "anotheruser@example.com"
}
```

**Expected result**

- A new verification token is generated.
- The pending registration is updated.
- A new verification email is sent.
- The previous verification token is no longer valid.

## 3. Login and JWT Authentication

### 3.1 Login with Valid Credentials

Use the account created and verified in the previous section.

**Endpoint**

`POST /auth/login`

**Request body**

```json
{
  "email": "testuser@example.com",
  "password": "TestPassword123"
}
```

**Expected result**

- The credentials are successfully authenticated.
- A signed JWT is generated.
- The response contains the authentication token.

Copy the JWT returned by the backend for the next test.

### 3.2 Login with Invalid Credentials

Send the login request again, but use an incorrect password.

**Request body**

```json
{
  "email": "testuser@example.com",
  "password": "WrongPassword123"
}
```

**Expected result**

- Authentication is rejected.
- No JWT is generated.
- The backend returns an authentication error.

### 3.3 Access a Protected Endpoint

Use a protected endpoint available in the application.

Include the JWT in the HTTP Authorization header:

```http
Authorization: Bearer <your-jwt>
```

**Expected result**

- A valid token allows access to the protected resource.
- A missing token is rejected.
- An invalid or expired token is rejected.

If testing without a token, remove the Authorization header entirely.

## 4. Password Recovery

### 4.1 Request a Password Reset

Send the following request:

**Endpoint**

`POST /auth/forgot-password`

**Request body**

```json
{
  "email": "testuser@example.com"
}
```

**Expected result**

- A new password reset token is generated.
- The token hash is stored in `password_reset_tokens`.
- The original token is sent to the user's email address.
- The token expires after 15 minutes.

The endpoint should return a generic response, regardless of whether the supplied email belongs to an existing account.

### 4.2 Reset the Password

Open Mailpit and locate the password recovery email.

Retrieve the reset token from the link included in the email.

Send the following request:

**Endpoint**

`POST /auth/reset-password`

**Request body**

```json
{
  "token": "<password-reset-token>",
  "newPassword": "NewTestPassword123"
}
```

**Expected result**

- The reset token is validated.
- The new password is encoded and saved.
- The user's modification timestamp is updated.
- The used reset token is deleted.

### 4.3 Verify the New Password

Attempt to log in using the new password.

**Request body**

```json
{
  "email": "testuser@example.com",
  "password": "NewTestPassword123"
}
```

**Expected result**

- Authentication succeeds with the new password.
- A new JWT is generated.

Then try logging in with the previous password.

**Expected result**

- Authentication is rejected.
- The previous password is no longer valid.

## 5. Additional Validation Tests

The following cases can be used to verify how the backend handles invalid or incomplete authentication operations.

| Test | Expected behavior |
|---|---|
| Register with an already registered email | Registration is rejected |
| Register with an already used username | Registration is rejected |
| Register with a password shorter than 8 characters | Validation error |
| Register with a password longer than 128 characters | Validation error |
| Verify with an invalid token | Verification is rejected |
| Verify with an expired token | Verification is rejected |
| Reset password with an invalid token | Password reset is rejected |
| Reset password with an expired token | Password reset is rejected |
| Access a protected endpoint without a JWT | Request is rejected |
| Access a protected endpoint with an invalid JWT | Request is rejected |
| Access a protected endpoint with an expired JWT | Request is rejected |

## 6. Test Completion

After completing the tests, verify the following:

- A verified account exists in the `users` table.
- Pending registrations are removed after successful email verification.
- Passwords are stored as encoded hashes.
- Verification and password reset tokens are stored as hashes.
- Successfully used password reset tokens are deleted.
- Login works with the current password.
- Protected endpoints require valid JWT authentication.

These checks help confirm that the main authentication flows are working as expected.