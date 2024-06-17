import requests

headers_list = [
    {
        "name": "ham and cheese toasties",
        "ingredients": "2 slices of bread, 3 slices of ham, 1 slice of cheese"
        
    },
    {
        "name": "grilled cheese",
        "ingredients": "2 slices of bread, 3 slices of cheese"
    }
]

for header in headers_list:

    requests.post("http://localhost:8080/recipes", json=header)