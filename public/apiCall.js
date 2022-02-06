
/******************** Selecting Elements **************************/
let div = document.querySelector('.container1');
let nameField = document.getElementById('nameField');
let rollField = document.getElementById('rollField');
let gradeField = document.getElementById('gradeField');
let submitBtn = document.getElementById('submitBtn');


/***************** Fetching Tthe students CRUD api ********************/
let xml = new XMLHttpRequest();

const PORT = 4000

xml.open('GET', `http://localhost:${PORT}/crud/all`, true);

xml.onload = function () {
    if (this.status === 200) {
        let data = JSON.parse(this.responseText);
        let mainData = data.data;
        console.log(mainData)
        let html = ``;
        for (let i = 0; i < mainData.length; i++) {
            html += `
                    <div class="col">
                        <div class="card  bg-dark">
                            <div class="card-body text-light">
                                <h4 class="card-title">Name : ${mainData[i].name}</h4>
                                <p class="card-text">Roll : ${mainData[i].roll}</p>
                                <p class="card-text">Grade : ${mainData[i].grade}</p>
                            </div>
                            <div class="btn-group">
                            <a href="/crud/delOne/${mainData[i]._id}" class="btn btn-primary in-active" aria-current="page">Delete This</a>
                            </div>
                            </div>
                            </div >`

        }
        div.innerHTML = html;
    } else {
        console.log('data is not found');
    }
}
xml.send();

// <a href='/crud/delOne/${mainData[i]._id}' class="mx-2 my-2 color-light">Delete This</a>





