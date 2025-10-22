# 
I use `serve` for serving. Good tool   
I use `Nodemon`: For automatic server restarting during development        
I use `material UI and emotion`     
I use `prisma` For database visualization and management     
Docker Compose: For running PostgreSQL and pgAdmin    
I use `Jwt tokens`    


# postgress
- postgres is up on port 5050
- curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
- server connections: 
```
 server connection:
Name: CarRepair
Host: postgres (use this name because we're connecting from inside Docker)
Port: 5432
Username: postgres
Password: password
```
- This returns username and JWT token 
-
 