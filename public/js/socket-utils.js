const params = (new URL(document.location)).searchParams;

const name = params.get('name');
const chatRoom = params.get('chatRoom');

let listUserElement = document.querySelector('ul#divUsuarios');

let divChatBoxElement = document.querySelector('#divChatbox');

function renderListUsers (users) {

    let listUsersHTML = '';

    listUsersHTML += `<li>
                        <a href="javascript:void(0)" class="active"> Chat de <span> ${chatRoom}</span></a>
                      </li>`;

    users.forEach(user => {

        listUsersHTML += `<li>
                            <a class="userLink" data-id="${user.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${user.name} <small class="text-success">online</small></span></a>
                          </li>`
    })

    listUserElement.innerHTML = listUsersHTML;

    //Listener
    const linkUsers = document.querySelectorAll('a.userLink');

    linkUsers.forEach(linkUser => {

        linkUser.addEventListener('click', (e) => {
            e.stopPropagation();

            if (e.target.dataset.id) {
                // click en el link
                console.log(e.target.dataset.id)
            } else if (e.target.parentNode.dataset.id) {
                //click en el span
                console.log(e.target.parentNode.dataset.id)
            } else {
                // click en el small
                console.log(e.target.parentNode.parentNode.dataset.id)
            }
            
        })
    })
    
}

function renderMessageSend(message) {

    let date = new Date(message.date);
    let hour = date.getHours() + ':' + date.getMinutes();

    let listUsersHTML = `<li class="reverse animated fadeIn">                           
                            <div class="chat-content">
                                <h5>${message.name}</h5>
                                <div class="box bg-light-inverse">${message.message}</div>
                            </div>
                             <div class="chat-img">
                                <img src="assets/images/users/1.jpg" alt="user" />
                                <div class="chat-time">${hour}</div>
                             </div>
                            
                        </li>`;
    
    divChatBoxElement.innerHTML += listUsersHTML;
    scrollBottom()
}

function renderMessageRecived(message) {

    let date = new Date(message.date);
    let hour = date.getHours() + ':' + date.getMinutes();

    let adminClass = (message.name == 'Admin')? 'danger' :'info';

    let listUsersHTML = `<li class="animated fadeIn">     
                            <div class="chat-img">
                                <img src="assets/images/users/1.jpg" alt="user" />
                                <div class="chat-time">${hour}</div>
                            </div>
                            <div class="chat-content">
                                <h5>${message.name}</h5>
                                <div class="box bg-light-${adminClass}">${message.message}</div>
                            </div>
                        </li>`;

    divChatBoxElement.innerHTML += listUsersHTML;
    scrollBottom();
}

function scrollBottom() {

    let scrollHeight = divChatBoxElement.scrollHeight;

    divChatBoxElement.scrollTop = scrollHeight;

}

