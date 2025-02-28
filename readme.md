# DevOps Project: Todo App with Monitoring

## Project Overview
This project showcases DevOps skills by containerizing a full-stack Todo application and integrating monitoring with Prometheus and Grafana. The app consists of a React frontend and a Node.js/Express backend, with MongoDB as the database.

---

## Deployment

This project is deployed on the following server:
- **IP Address**: [130.185.72.67](http://130.185.72.67)

**Note**: MongoDB version 4.4 is used, which affects proper monitoring of MongoDB, so some monitoring features might not work as expected.

---

## Installation

Follow these steps to set up and run the project on your server:

### 1. Clone the Project
```bash
cd /path/to/your/directory
git clone https://github.com/Mahdimehraz/devops_project.git
```

### 2. Install Ansible
Ensure Ansible is installed to automate Docker installation:
```bash
sudo apt update
sudo apt install ansible -y
```

Run the Ansible playbook to set up Docker:
```bash
cd devops_project
ansible-playbook setup.yml
```

### 3. Start the Todo App
Navigate to the `sass_project` directory and start the containers:
```bash
cd sass_project
docker compose up -d
```
The frontend will be available at: `http://server_ip:3000`

### 4. Set Up Monitoring

#### Grafana
```bash
cd ../monitoring/grafana
docker compose up -d
```

#### Prometheus
```bash
cd ../prometheus
docker compose up -d
```

Visit Prometheus at: `http://server_ip:9090`

### 5. Connect Prometheus to Grafana
1. Open Grafana at: `http://server_ip:3030`
2. Log in (default user: `admin`, password: `djsafieuarw2342`)
3. Go to **Configuration -> Data Sources -> Add data source**
4. Select **Prometheus**
5. Set the URL to: `http://prometheus:9090`
6. Click **Save & Test**

You can now use the dashboards to monitor your app!

---

## API Routes and CURL Tests

### Auth Routes

#### Signup
```bash
curl -X POST http://server_ip:4000/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123"}'
```

#### Login
```bash
curl -X POST http://server_ip:4000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123"}'
```

#### Verify Token
```bash
curl -X POST http://server_ip:4000/auth/verifyToken \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_jwt_token_here"
```

### Todo Routes (Require Authentication)

#### Create Todo
```bash
curl -X POST http://server_ip:4000/todos \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_jwt_token_here" \
     -d '{"title": "New Todo"}'
```

#### Get All Todos
```bash
curl -X GET http://server_ip:4000/todos \
     -H "Authorization: Bearer your_jwt_token_here"
```

#### Update Todo
```bash
curl -X PUT http://server_ip:4000/todos/{todo_id} \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_jwt_token_here" \
     -d '{"title": "Updated Todo"}'
```

#### Delete Todo
```bash
curl -X DELETE http://server_ip:4000/todos/{todo_id} \
     -H "Authorization: Bearer your_jwt_token_here"
```

### Health Check

Ensure the backend is running properly with this health check API:
```bash
curl -X GET http://server_ip:4000/health
```

---

## Notes
- **Frontend**: Available at `http://server_ip:3000`
- **Prometheus**: Available at `http://server_ip:9090`
- **Grafana**: Available at `http://server_ip:3030`
- Error handling is minimal and needs improvement 🚧

Feel free to customize and expand this setup as needed!

