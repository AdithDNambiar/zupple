# Zupple Credential System
**Author:** Adith D Nambiar  
**Email:** adiadithdnambiar@gmail.com  
**Contact:** +91-8281205745  
This project implements a **microservices-based credential issuance and verification system** using Node.js with TypeScript for the backend and React with TypeScript for the frontend. It demonstrates **Dockerized deployments** and **Kubernetes-ready manifests**.  
## Overview
The system consists of **two microservices**: 1. **Issuance Service (`/issuance-service`)** – Issues credentials in JSON format, checks for duplicates, and returns a **worker ID** indicating which pod handled the request (simulated as `worker-n`). 2. **Verification Service (`/verification-service`)** – Verifies credentials, returns whether a credential exists, and includes **worker ID** and **timestamp** if valid.  
The **frontend** has two React pages: 1. **Issuance Page** – Sends credential JSON to the issuance API and displays the response. 2. **Verification Page** – Sends credential JSON to the verification API and displays the verification result.  
## Architecture
Frontend (React) → Issuance Service (Node+TS) → Verification Service (Node+TS)  
- Each service maintains its own JSON-based persistence layer.  
- Microservices are **independently scalable** in Kubernetes.  
- Docker Compose allows local end-to-end testing.  
## Folder Structure
zupple/  
├── docker-compose.yml  
├── issuance-service/  
│   ├── Dockerfile  
│   ├── package.json  
│   ├── tsconfig.json  
│   ├── src/server.ts  
│   └── dist/server.js  
├── verification-service/  
│   ├── Dockerfile  
│   ├── package.json  
│   ├── tsconfig.json  
│   ├── src/server.ts  
│   └── dist/server.js  
├── frontend/  
│   ├── package.json  
│   ├── tsconfig.json  
│   └── src/...  
├── k8s/  
│   ├── issuance-deployment.yaml  
│   └── verification-deployment.yaml  
└── README.md  
## Setup Instructions
### Backend (Docker Compose)
1. Build and run services: `docker compose up --build`  
2. Access services: Issuance Service: `http://localhost:4000`, Verification Service: `http://localhost:5000`  
**Note:** Make sure ports 4000 and 5000 are free.  
### Frontend (React)
1. Navigate to frontend: `cd frontend`  
2. Install dependencies: `npm install`  
3. Start development server: `npm start`  
The React app will connect to the respective APIs.  
### Kubernetes Deployment
1. Apply deployments and services: `kubectl apply -f k8s/issuance-deployment.yaml` and `kubectl apply -f k8s/verification-deployment.yaml`  
2. Scale services independently: `kubectl scale deployment issuance-service --replicas=3` and `kubectl scale deployment verification-service --replicas=2`  
## Features
- Credential Issuance: Accepts JSON credentials, checks duplicates, assigns worker ID, returns issuance response.  
- Credential Verification: Accepts JSON credentials, returns verification result with worker ID and timestamp.  
- Independent scalability of backend services.  
- Dockerized backend and frontend for easy deployment.  
- Kubernetes manifests for cloud deployment.  
- Clear error handling and UI feedback on frontend.  
## Assumptions
- Each service persists data in a local JSON file.  
- Worker ID is simulated as `worker-n` where n is a random number.  
- Frontend is assumed to run on localhost in development.  
- Kubernetes cluster is assumed to be available for deployment.  
## Testing
- Backend unit tests cover issuance and verification endpoints.  
- Frontend can be tested by issuing a credential and verifying it.  
- Docker Compose allows local end-to-end testing.  
## Submission
- All source code, configuration files, and manifests are included.  
- Screenshots or recordings of issuance and verification flows should be included.  
- Frontend and backend can optionally be deployed on a free-tier cloud service.  
End of README
