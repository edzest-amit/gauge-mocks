# Authentication Test Checklist

## Login

- Login with valid credentials
- Login with wrong password
- Login with non-existing user

## Authorization

- Access protected endpoint without token → should fail
- Access protected endpoint with token → should succeed

## Roles

Super Admin
- create tenant
- create tenant admin

Tenant Admin
- create users
- assign roles

## Multi-tenant

- ensure users belong to correct tenant