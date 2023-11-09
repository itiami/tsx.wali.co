const asJson = document.querySelector("#asJson");
const jsonTxt = {
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

asJson.innerHTML = JSON.stringify(jsonTxt, null, 2)



