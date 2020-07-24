# light-manager
Web page to manage Yeelight bulbs with own implementation of [Yeelight's protocol](https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf)

It uses ReactJS framework for the front

It uses Express framework as back office

## Docker

### Envs

| Variable name | Default | Description             |
| ------------- | ------- | ----------------------- |
| MANAGER_PORT  | 4000    | Port for express server |
|               |         |                         |
|               |         |                         |

### Bindings

You **must** bind MANAGER_PORT to your machine `-p 4000:8080`

You may bind log folder to host with `-v /path/on/host:/app/logs`
