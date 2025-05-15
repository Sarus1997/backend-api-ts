### Insert

```
Mettod : post
API : http://localhost:8080/api/post_data
  {
    "image_url" : "www.แมวขาว.com" ,
    "product_name" :"cat",
    "price" : 45000,
    "brand" :"animal"
}
```

### Update
```
Mettod : put
API : http://localhost:8080/api/update_data
{
  "product_id": "bac8cb069bba9c3a23c28dffb91681c6688b084543747cd584b568b95619d278",
  "image_url": "eeee",
  "product_name": "New Product Name",
  "price": 1500
}

```

### Delete
``` 
Mettod : delete
API : http://localhost:8080/api/delete_data
{
  "product_id" : "eb6e1ca2ea0f2efa5745bef7362da2773677fba082eacd41557a8538b0a3bffc"
}
```