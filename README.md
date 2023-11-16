# icosnettest
Enhanced Order Management System

### Prerequisites

- Node.js and npm installed on your machine.

### Deployment

1. Clone the repository:

    ```bash
    git clone https://github.com/benmeddah/icosnettest.git
    ```

2. Navigate to the project directory:

    ```bash
    cd icosnettest
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    - For production:

        ```bash
        npm start
        ```

    - For development (with hot module replacement):

        ```bash
        npm run dev
        ```

### Database Initialization

To initialize the database and create tables, run the following command:

```bash
npm run db:init
```
This command will create the necessary tables. If you want to reset the database, it will drop existing tables and create new ones.

## REST API for Orders
- Get All Orders `GET /order`
- Get a Specific Order `GET /order/:id`
- Create a New Order `POST /order`
- Update an Order `PUT  /order/:id`
- Delete an Order `DELETE /order/:id`

##### Searching Orders by Keyword
To search for orders by title, use the `keyword` query parameter:
```
GET /order?keyword=your-search-keyword
```
