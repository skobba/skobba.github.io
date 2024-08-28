# OAuth

## OAuth 2.1
Ref.: [https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-01](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-01)

### Latest Recomendations
* Use authorization code with PKCE
* Secure Redirect URIs - Only redirect to pre-registered URIs
* Access Tokens - stresses securely storing access tokens
* Refresh Tokens 
    * Use refresh tokens even with confidential clients
    * Rotate refresh tokens
    * Implement expiration and revocation mechanisms

### Key Difference from OAuth 2.0
OAuth 2.1 doesn't introduce any new features. It removes some features and roll into one clear document several key OAuth 2.0 RFCs that establish this new baseline for security and interoperability.

| Feature                       | OAuth 2.0                       | OAuth 2.1                                          |
|-------------------------------|---------------------------------|----------------------------------------------------|
| Implicit Grant                | Supported                       | Removed                                            |
| Resource Owner Password Grant | Supported                       | Removed                                            |
| PKCE                          | Optional for public clients     | Mandatory for all clients                          |
| Redirect URI Validation       | Less strict                     | Strict validation, no wildcards allowed            |
| Use of HTTPS                  | Recommended                     | Mandatory for all communications                   |
| Refresh Token Handling        | Basic guidelines                | Stronger emphasis on token rotation and revocation |
| Client Registration           | Flexible, potentially ambiguous | Simplified, more standardized                      |
| Error Handling                | Some ambiguities                | Clarified, more consistent error responses         |

### Core grants
| Grant type | Client type / Use case |
|---|---|
| Authorisation code | Intended for web, native and browser-based applications where the<br>client sends the user to the authorisation server to allow (or<br>deny) the request. The user authorisation is captured in a<br>code which the client can exchange for an access token<br>by calling the authorisation server again, this time directly. The<br>code grant requires a user agent, such as a web browser,<br>and thus enables authorisation servers to implement single sign-on<br>via browser session cookies. |
| Client credentials | For clients, such as web services, acting on their own behalf. |
| Refresh token | A special grant to let clients obtain a new access token without<br>having to send the user to the authorisation server for a new<br>authorisation code grant. |

### Authorization Code Grant
The recomended grant for web, native and browser-based clients.
```
+----------+
| Resource |
|   Owner  |
|          |
+----------+
     ^
     |
    (2)
+----|-----+          Client Identifier      +---------------+
|         -+----(1)-- & Redirect URI    ---->|               |
|  User-   |                                 | Authorization |
|  Agent  -+----(2)-- User authenticates --->|     Server    |
|          |                                 |               |
|         -+----(3)-- Authorization Code ---<|               |
+-|----|---+                                 +---------------+
  |    |                                         ^      v
 (1)  (3)                                        |      |
  |    |                                         |      |
  ^    v                                         |      |
+---------+                                      |      |
|         |>---(4)-- Authorization Code ---------'      |
|  Client |          & Redirect URI                     |
|         |                                             |
|         |<---(5)----- Access Token -------------------'
+---------+       (w/ Optional Refresh Token)

Note: The lines illustrating steps (1), (2), and (3) are broken into
two parts as they pass through the user-agent.
```
