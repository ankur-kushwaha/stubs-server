# Stubs Server

UI interface for creating and mocking API responses via json stubs.

## Setup

1. Create a folder 'stubs' which will contains all the json stubs files
2. Just run `npx stubs-server` and your stubs will hosted on port 9001.
3. Open `https://localhost:9001`, 
4. This will open the stubs-ui console where you can create or edit your stubs.
5. Create new stubs by clicking 'Create New Stub'.
6. Type the 'api name'(e.g "test") and enter valid json and Click 'Add API'.
7. Search for API, edit and save.
8. Test your mock api by going to browser "http://localhost:9001/test".
9. Your other routes will work as normal.

## UI Screenshot
![stubs-server](https://cloud.githubusercontent.com/assets/4962816/21962452/93464bac-db4c-11e6-82a9-65a73c9f9ce8.PNG)

![image](https://cloud.githubusercontent.com/assets/4962816/22116568/e5f187fc-de96-11e6-84c0-7452835960ae.png)

![image](https://cloud.githubusercontent.com/assets/4962816/22116652/2c460dd6-de97-11e6-8046-df4a5b40811e.png)