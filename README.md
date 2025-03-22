<div align="center">
  <h1>BUKABEM RESTAPI</h1>
</div>
<br />
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
RESTful API for post management. It is a robust API using
NestJS, applying modular architecture and SOLID principles to create scalable and maintainable endpoints.

## why?
* Simplicity and Efficiency in Managing Blog Posts: This API was developed to provide a simple and efficient way to create, view, edit, and delete blog posts. Its RESTful structure makes it easy to integrate with any frontend, enabling a seamless experience for both developers and end-users.

* Built to Scale: The modular structure of NestJS allows new modules and features to be easily added, ensuring that the API can grow alongside the blog without compromising performance or stability.

## Features
* Complete Posts CRUD(POST|GET|PUT|DELETE) Endpoints for posts management.
* Email Sending.
* File Uploads.
* Rate Limiting Http Call.
* JsonWebToken Authentication.
* Docker Containerization.

### Built With
* TYPESCRIPT
* NESTJS
* TYPEORM
* MYSQL
* JWT
* DOCKER
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
Ensure your have installed on your machine: Vscode, node, npm(or preferencial), nestjs-cli, mysql.


### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/marionorberto/postable.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create the Mysql Database: 'postable'.

4. Change your local .env variable(see exemple file: .env.example).

5. ensure that "sychronize: true" datasource object key is set.

6. run start script.
 ```sh
   npm run start:dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage
Use a HTTP Client to make your request: (postman/bruno/curl/insomnia or whatever)

* base endpoint -> http://localhost:3000/api/v1/postable
EX: (Get All particular user Posts): http://localhost:3000/api/v1/postable/posts/all


<img src="poster-readme.png">

OBS: EXPLORE SOME OF OTHER ENDPOINTS :

1.get     -> `posts/post/:id`                          [token_required] <br>
2.post    -> `posts/create/post`                       [token_required] <br>
3.put     -> `posts/update/post/:id`                   [token_required] <br>
4.delete  -> `posts/delete/post/like`                  [token_required] <br>
4.delete  -> `posts/delete/post/:id`                   [token_required] <br>
5.post    -> `posts/post/save`                         [token_required] <br>
6.get     -> `posts/task/:taskId`                      [token_required] <br>
7.post    -> `posts/create/task`                       [token_required] <br>
8.post    -> `posts/post/like`                         [token_required] <br>
9.post    -> `posts/post/coment`                       [token_required] <br>
10.delete -> `posts/delete/comment/:id`                [token_required] <br>


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License
Distributed under the MIT License.


## Contact
Mário Norberto - [@linkedin.com/in/marionorberto](https://linkedin.com/in/marionorberto) - marionorberto2018@gmail.com

Project Link: [https://github.com/marionorberto/postable](https://github.com/marionorberto/tasker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>