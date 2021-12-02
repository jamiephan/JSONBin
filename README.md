# JSONBin - A Paste Bin for JSON 👀

A Paste Bin-like service for **JSON** type only. All functionalities are managed via an API.


# API Documentation

## Authentication:
There are two main ways to authenticate the API routes:

 - API Key
   - Authenticated with the HTTP Header: `Authorization: Bearer {API Key}`
 - Email / Password
   - Authenticated with JSON body: `{"email": "email@example.com", "password": "mYP@ssw0rd"}`

## Content Type
Submitting `Content-Type` header in `POST` is optional and all data body will be evaluated as JSON. All responses will be in JSON format (`application/json`).

## API Routes

| Route | Authentication | Description |
|---|---|---|
| `GET /{name}` | `none` | Gets the JSONBin data. The `name` is the id for the JSONBin. |
| `DELETE /{name}` | API Key | Deletes a specific JSONBin owned by a user. Anonymous JSONBin are not able to be deleted. |
| `POST /api/bin`  | API Key (Optional) | Creates a JSONBin which will return the `name` of the JSONBin created. If API key was supplied, the owner can delete the JSONBin. |
| `POST /api/user` | Email / Password | Creates an Account in the Server. It will return a static API Key that can be used for other API Routes. |
| `POST /api/user/login` | Email / Password | Authenticated an Account in the Server.  It will return a static API Key that can be used for other API Routes. |
| `POST /api/user/renew` | Email / Password | Generates a new API Key. Previous API Keys will be invalid. |
| `GET /api/user/bins` | API Key | List all JSONBins created by a specific user using an API Key. |

