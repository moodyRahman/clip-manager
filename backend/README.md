## API Instructions

<br>

### GET ```/resources/clips/get```
get all clips


##### sample return:


```bash
[
    {
        "id": 1,
        "s3url": "<url>",
        "title": "test clip 1",
        "description": "test description 1",
        "owner.username": "testuser1",
        "owner.cognitoID": "<cognitoID>"
    },
    {
        "id": 2,
        "s3url": "<url>",
        "title": "test clip 2",
        "description": "test description 2",
        "owner.username": "testuser2",
        "owner.cognitoID": "<cognitoID>"
    }
]
```
<br>


### GET ```/resources/clips/get/:id```
get clip by id


##### example:
```/resources/clips/get/1```


##### sample return:
```bash
{
    "id": 1,
    "s3url": "<url>",
    "title": "test clip 1",
    "description": "test description 1",
    "createdAt": "2023-04-22T21:52:47.000Z",
    "owner.username": "testuser1",
    "owner.cognitoID": "<cognitoID>"
}
```
<br>

### POST ```/resources/clips/upload```
upload clip

##### example:
```bash
fetch (`${BACKEND_URL}/resources/clips/upload`,
{method: "POST", body: formData,});
```
formData consist of the following:
```bash
{
    title: "test clip 1",
    description: "test description 1",
    file: <file>
    userID: "<user's cognitoID>"
}
```

<br>

### DELETE ```/resources/clips/delete/:clipid```
delete clip by id
##### example:
```/resources/clips/delete/1```

<br>

### GET ```/resources/clips/user/:id```
get user by id
##### example:
```/resources/clips/user/<cognitoID>```

##### sample return:
```bash
{
    "id": 1,
    "username": "test user 1",
    "bio": "test bio 1",
    "cognitoID": "<cognitoID>",
    "createdAt": "2023-04-22T20:32:58.000Z",
    "updatedAt": "2023-04-22T20:32:58.000Z"
}
```

<br>

### GET ```/resources/clips/user/:id/clips```
get all clips belong to the user
##### example:
```/resources/clips/user/<cognitoID>/clips```

##### sample return:
```bash
[
    {
        "id": 5,
        "title": "test clip 5",
        "description": "test description 5",
        "s3url": "<s3url>",
        "ownerID": "<cognitoID>",
        "createdAt": "2023-04-22T21:52:47.000Z",
        "updatedAt": "2023-04-22T21:52:47.000Z"
    },
    {
        "id": 7,
        "title": "test clip 7",
        "description": "test description 7",
        "s3url": "<s3url>",
        "ownerID": "<cognitoID>",
        "createdAt": "2023-04-22T21:52:47.000Z",
        "updatedAt": "2023-04-22T21:52:47.000Z"
    }
]
```
