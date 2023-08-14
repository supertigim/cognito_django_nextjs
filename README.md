# Introduction #
This project shows how to integrate AWS Cognito (Hosted UI) into a NextJS and Django (DRF) project.

## How to run ##

Port **3005** for frontend and **8000** for backend are used. Therefore, other services that use these ports should be stopped before running the project.

To run the project, run the following command:

```bash
$ docker-compose up --build 

# To enter the backend container
$ docker-compose exec backend bash

# To enter the frontend container
$ docker-compose exec frontend sh
```

## Admin page ##

Default username and password for admin page is `admin` and `admin`.

- http://localhost:8000/admin


## How to use ##

- [http://localhost:3005](http://localhost:3005)

## References ##

- [jwt.io](https://jwt.io/)
- [Bootstrapping Django App with Cognito: Personal Experience](https://djangostars.com/blog/bootstrap-django-app-with-cognito/)
- [Code Snippets above blog](https://gist.github.com/glebpushkov/9bddda778d976cfbe89f6d795beb47d2)
- [django-cognito-jwt](https://github.com/labd/django-cognito-jwt)
- [AWS Cognito and JWT token](https://sarit-r.medium.com/aws-cognito-and-jwt-token-850dd252750f)
- [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/index.html)
- [Cognito Example using React vite and Node Express](https://github.com/naru200/cday-2022-cognito-example)
- [[보안/인증] Amazon Cognito를 이용한 백엔드 API 권한 관리 | 배진수, 당근마켓 ](https://www.youtube.com/watch?v=BqgCJzSOT2k)
- [djoser](https://djoser.readthedocs.io/en/latest/index.html)
- [Migrating from Vite to Next.js](https://www.inngest.com/blog/migrating-from-vite-to-nextjs)
