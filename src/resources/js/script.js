(function createProduct() {
    const obj = {
        "filter": {
            "fname": "{{ruser_me_fname}}",
            "lname": "{{ruser_me_lname}}",
            "dob": "{{ruser_me_dob}}",
            "contact": "{{$randomPhoneNumber}}",
            "addressType": "Resident",
            "isBillingAddress": "true",
            "isDeliveryAddress": "true",
            "address": {
                "streetNameNum": "{{$randomStreetAddress}}",
                "city": "{{$randomCity}}",
                "coutry": "{{$randomCountry}}"
            },
            "profileImg": "{{ruser_me_img}}",
            "userId": "65481481ce3122f494bf8aa2",
            "order": ["65481481ce3122f494bf8aa2"]
        }
    }

    document.querySelector("#createProduct").innerHTML = JSON.stringify(obj, null, 2)
})();


(function findInCatAndCreateProd() {
    const obj = {
        "catTbl": {
            "mainCat": "Food",
            "subCat": "Breakfast",
            "childCat_1": "Honey"
        },
        "productTbl": {
            "title": "asdfasdf",
            "detail": "asdfasdf",
            "price": "105",
            "imageUrl": "https://....."
        }
    }

    document.querySelector("#findInCatAndCreateProd").innerHTML = JSON.stringify(obj, null, 2)
})();



