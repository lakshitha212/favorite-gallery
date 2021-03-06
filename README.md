## Usage
![Alt Text](./usage.gif)


## Installation
with docker

1. Clone the repo
   ```sh
   git clone https://github.com/lakshitha212/favorite-gallery.git
   ```
2. ``` cd favorite-gallery ```
3. ``` docker image prune -f  ```
4. ``` docker-compose up --force-recreate --build -d  ```


## Front End Info

- Exposed port 3000
 </br> URL : http://localhost:3000/

## Back End Service Info

- Exposed port 8082
  </br> URL : http://localhost:8082/
  </br> Image list path: ./back-end/server/misc/constant
  </br> Used Clean Architecture of Uncle Bob

## mongoDB Info

- Exposed port 27017

## redis Info

- Exposed port 6379
</br> This is for cache operations


## Swagger API Doc Info

- Exposed port 8083
</br> URL : http://localhost:8083/

## UI Framework
- Semantic UI React
