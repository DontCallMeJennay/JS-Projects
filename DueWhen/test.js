    function TEST_checkInput() {
        console.log("Test for String expects false, returns " + checkInput("apple"));
        console.log("Test for +Number expects true, returns " + checkInput(7));
        console.log("Test for -Number expects false, returns " + checkInput(-5));
        console.log("Test for Array expects false, returns " + checkInput(['x', 'y', 'z', 1, 2, 3]));
        console.log("Test for Object expects false, returns " + checkInput({ key1: "red", key2: "orange", key3: "yellow" }));
        console.log("Test for empty string expects false, returns " + checkInput(''));

    }

    