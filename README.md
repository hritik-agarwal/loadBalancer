# loadBalancer

It is visualization for a load balancer made using Nginx.

## Application Servers
Here, we have 2 application servers 
1. server1-port-8001
2. server2-port-8002

For the purpose of project, these 2 servers are running on different ports but they could be entirely different machines.

## Redis Caching

- The servers are fetching data from an Image API https://jsonplaceholder.typicode.com/photos
- The data is cached in the redis and whenever the same query is requested, the cached data is send instead of fetching it again.

## Nginx Server
- The Nginx Server is running on port 8080
- In the nginx configuration file, we set the upstream to server url of these 2 servers.
- Then, all the requests which are coming to port 8080 are transferred to either server1 or server2.

## Load Balancing Logic
- Here, we are using a weighted load balancing algorithm.
- The power of server1 to server2 is 1 : 2 i.e. server2 can handle twice the number of requests than server1
- The process runs in a round robin fashion.

## Demo of the App

Here, is a simple visualization of 6 requests.

| Request Number | Requested PORT | Redirected PORT |
|--------|---------|----------|
|   1    | Port 8080 | Port 8001 : Server 1|
|   2    | Port 8080 | Port 8002 : Server 2|
|   3    | Port 8080 | Port 8002 : Server 2|
|   4    | Port 8080 | Port 8001 : Server 1|
|   5    | Port 8080 | Port 8002 : Server 2|
|   6    | Port 8080 | Port 8002 : Server 2|


## Run the application
```bash
<!-- Clone the Repository -->
git clone https://github.com/hritik-agarwal/loadBalancer.git

<!-- Install the Dependencies -->
npm install

<!-- Star server 1 in terminal 1 -->
PORT=8001 node server.js

<!-- Star server 2 in terminal 2 -->
PORT=8002 node server.js

<!-- Start the nginx with given configuration -->
nginx
```
* Open browser and visit http://localhost:8080
* Refresh the window, to see which server the response is coming from
