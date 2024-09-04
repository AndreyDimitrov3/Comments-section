function fetchCommentsData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.comments.forEach(comment => {
                let commentHTML = `
                <div class="commentsHolder comment commentsReply commentsHolderScore">
                    <div class='scoreHolder'>
                        <button class='buttonScore Plus' data-id="${comment.id}" data-type="comment"><img src="images/icon-plus.svg" alt="Plus" class="buttonImg"></button>
                        <p class="score" id="score-${comment.id}">${comment.score}</p>
                        <button class='buttonScore Minus' data-id="${comment.id}" data-type="comment"><img src="images/icon-minus.svg" alt="Minus" class="buttonImg"></button>
                    </div>
                    <div class="content">
                        <header class="header">
                            <div class="header-data">
                                <img src="${comment.user.image.png}" alt="${comment.user.username}'s avatar" class="avatar">
                                <h1 class="header-heading">${comment.user.username}</h1> 
                                <p class="date">${comment.createdAt}</p>
                            </div>
                            <div class="replyHolder">
                                <div class="replyButtonHolder">
                                    <img src="images/icon-reply.svg" alt="Reply" class="replyButton">
                                    <p class="replyText">Reply</p>
                                </div>
                                <div class="edit-delete editText hidden">
                                    <div class="edit-delete-holder delete-button" id="delete">
                                        <img src="images/icon-delete.svg" alt="delete" class="imagesReply">
                                        <p>Delete</p>
                                    </div>
                                    <div class="edit-delete-holder edit-button" id="edit-${comment.id}">
                                        <img src="images/icon-edit.svg" alt="Edit" class="imagesReply">
                                        <p>Edit</p>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <p class="commentText">${comment.content}</p>
                        <div class="editActiveHolder">
                            <textarea class="editTextarea textarea hidden"></textarea>
                            <button class="saveEdit send hidden">update</button>
                        </div>
                        <div class="deletePopupHolder hidden">
                            <div class="deletePopup">
                                <h1 class="delete-h1">Delete comment</h1>
                                <p class="delete-p">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                                <div class="deleteButtonsPopup">
                                    <button class="popUp-option cancel">No, Cancel</button>
                                    <button class="popUp-option agreeDelete">Yes, Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

                if (comment.replies) {
                    comment.replies.forEach(reply => {
                        let replyHTML = `
                        <div class="commentsRight comment commentsReply">
                            <div class="commentsHolder commentsHolderScore reply">
                                <div class='scoreHolder'>
                                    <button class='buttonScore Plus' data-id="${reply.id}" data-type="reply"><img src="images/icon-plus.svg" alt="Plus" class="buttonImg"></button>
                                    <p class="score" id="score-${reply.id}">${reply.score}</p>
                                    <button class='buttonScore Minus' data-id="${reply.id}" data-type="reply"><img src="images/icon-minus.svg" alt="Minus" class="buttonImg"></button>
                                </div>
                                <div class="content">
                                    <header class="header">
                                        <div class="header-data">
                                            <img src="${reply.user.image.png}" alt="${reply.user.username}'s avatar" class="avatar avatarReply">
                                            <h1 class="header-heading">${reply.user.username}</h1> 
                                            <div class="you ${reply.user.username === 'juliusomo' ? '' : 'hidden'}"><p>you</p></div>
                                            <p class="date">${reply.createdAt}</p>
                                        </div>
                                        <div class="replyHolder">
                                            <div class="replyButtonHolder ${reply.user.username === 'juliusomo' ? 'hidden' : ''}">
                                                <img src="images/icon-reply.svg" alt="Reply" class="replyButton">
                                                <p class="replyText">Reply</p>
                                            </div>
                                            <div class="edit-delete editText ${reply.user.username === 'juliusomo' ? '' : 'hidden'}">
                                                <div class="edit-delete-holder delete-button" id="delete">
                                                    <img src="images/icon-delete.svg" alt="delete" class="imagesReply">
                                                    <p>Delete</p>
                                                </div>
                                                <div class="edit-delete-holder edit-button" id="edit-${reply.id}">
                                                    <img src="images/icon-edit.svg" alt="Edit" class="imagesReply">
                                                    <p>Edit</p>
                                                </div>
                                            </div>
                                        </div>
                                    </header>
                                    <p class="commentText">${reply.content}</p>
                                    <div class="editActiveHolder">
                                        <textarea class="editTextarea textarea hidden"></textarea>
                                        <button class="saveEdit send hidden">update</button>
                                    </div>
                                    <div class="deletePopupHolder hidden">
                                        <div class="deletePopup">
                                            <h1 class="delete-h1">Delete comment</h1>
                                            <p class="delete-p">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                                            <div class="deleteButtonsPopup">
                                                <button class="popUp-option cancel">No, Cancel</button>
                                                <button class="popUp-option agreeDelete">Yes, Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                        commentHTML += replyHTML;
                    });
                }

                document.getElementById('comments-container').innerHTML += commentHTML;
            });

            bindReplyButtonEvents();
            bindEditDeleteEvents();
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
}

fetchCommentsData();

document.getElementById('send').addEventListener('click', function() {
    const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    const newCommentHTML = `
        <div class="commentsHolder commentsHolderScore comment">
            <div class='scoreHolder'>
                <button class='buttonScore Plus' data-id="new-comment" data-type="comment"><img src="images/icon-plus.svg" alt="Plus" class="buttonImg"></button>
                <p class="score" id="score-new-comment">0</p>
                <button class='buttonScore Minus' data-id="new-comment" data-type="comment"><img src="images/icon-minus.svg" alt="Minus" class="buttonImg"></button>
            </div>
            <div class="content">
                <header class="header">
                    <div class="header-data">
                        <img src="images/avatars/image-juliusomo.png" alt="juliusomo's avatar" class="avatar">
                        <h1 class="header-heading">juliusomo</h1> 
                        <div class="you"><p>you</p></div>
                        <p class="date">${currentTime}</p>
                    </div>
                    <div class="replyHolder">
                        <div class="replyButtonHolder hidden">
                            <img src="images/icon-reply.svg" alt="Reply" class="replyButton">
                            <p class="replyText">Reply</p>
                        </div>
                        <div class="edit-delete editText">
                            <div class="edit-delete-holder delete-button" id="delete-new">
                                <img src="images/icon-delete.svg" alt="delete" class="imagesReply">
                                <p>Delete</p>
                            </div>
                            <div class="edit-delete-holder edit-button" id="edit-new">
                                <img src="images/icon-edit.svg" alt="Edit" class="imagesReply">
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>
                </header>
                <p class="commentText">${document.getElementById('textarea').value}</p>
                <div class="editActiveHolder">
                    <textarea class="editTextarea textarea hidden"></textarea>
                    <button class="saveEdit send hidden">update</button>
                </div>
                <div class="deletePopupHolder hidden">
                    <div class="deletePopup">
                        <h1 class="delete-h1">Delete comment</h1>
                        <p class="delete-p">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                        <div class="deleteButtonsPopup">
                            <button class="popUp-option cancel">No, Cancel</button>
                            <button class="popUp-option agreeDelete">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    document.getElementById('comments-container').innerHTML += newCommentHTML;

    document.getElementById('textarea').value = '';

    bindEditDeleteEvents();
    bindReplyButtonEvents();
});

function bindEditDeleteEvents() {
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            const contentEl = this.closest('.content');
            const commentText = contentEl.querySelector('.commentText');
            const editTextarea = contentEl.querySelector('.editTextarea');
            const saveButton = contentEl.querySelector('.saveEdit');

            editTextarea.value = commentText.innerText;

            commentText.classList.add('hidden');
            editTextarea.classList.remove('hidden');
            saveButton.classList.remove('hidden');

            saveButton.addEventListener('click', function() {
                commentText.innerText = editTextarea.value;

                commentText.classList.remove('hidden');
                editTextarea.classList.add('hidden');
                saveButton.classList.add('hidden');
            });
        });
    });

    document.getElementById('comments-container').addEventListener('click', function(event) {
        if (event.target.closest('.buttonScore')) {
            const button = event.target.closest('.buttonScore');
            const scoreElement = button.closest('.scoreHolder').querySelector('.score');
            let currentScore = parseInt(scoreElement.textContent);
    
            if (button.classList.contains('Plus')) {
                if (button.classList.contains('clicked')) {
                    currentScore -= 1;
                    button.classList.remove('clicked');
                } else {
                    currentScore += 1;
                    if (button.closest('.scoreHolder').querySelector('.Minus').classList.contains('clicked')) {
                        currentScore += 1;
                        button.closest('.scoreHolder').querySelector('.Minus').classList.remove('clicked');
                    }
                    button.classList.add('clicked');
                }
            } else if (button.classList.contains('Minus')) {
                if (button.classList.contains('clicked')) {
                    currentScore += 1;
                    button.classList.remove('clicked');
                } else {
                    currentScore -= 1;
                    if (button.closest('.scoreHolder').querySelector('.Plus').classList.contains('clicked')) {
                        currentScore -= 1;
                        button.closest('.scoreHolder').querySelector('.Plus').classList.remove('clicked');
                    }
                    button.classList.add('clicked');
                }
            }
    
            scoreElement.textContent = currentScore;
        }
    });
    
    
    
    
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const deletePopup = this.closest('.content').querySelector('.deletePopupHolder');
            deletePopup.classList.remove('hidden');

            this.closest('.content').querySelector('.cancel').addEventListener('click', function() {
                deletePopup.classList.add('hidden');
            });

            this.closest('.content').querySelector('.agreeDelete').addEventListener('click', function() {
                deletePopup.classList.add('hidden');
                this.closest('.commentsHolder').remove();
            });
        });
    });
}

function bindReplyButtonEvents() {
    document.querySelectorAll('.replyButtonHolder').forEach(function(buttonReply) {
        buttonReply.addEventListener('click', function() {
            const parentComment = this.closest('.commentsHolder');
            if (parentComment.nextElementSibling && parentComment.nextElementSibling.classList.contains('commentsReplyHolder')) {
                return; 
            }
            const replyContainer = document.createElement('div');
            replyContainer.className = 'commentsRight commentsReplyHolder';
            const username = parentComment.querySelector('.header-heading').innerText;
            replyContainer.innerHTML = `
                <div class="main-bottom commentsHolder commentsReply reply">
                    <img src="images/avatars/image-juliusomo.png" alt="avatar" class="avatar avatarCreate">
                    <textarea class="textareaReply textarea" placeholder="Add a reply...">@${username} </textarea>
                    <button class="send newreplyButton">Reply</button>
                </div>
            `;

            parentComment.insertAdjacentElement('afterend', replyContainer);

            replyContainer.querySelector('.newreplyButton').addEventListener('click', function() {
                const replyText = replyContainer.querySelector('.textareaReply').value;
                if (!replyText.trim()) return;

                const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                const newReplyHTML = `
                <div class="commentsRight comment commentsReply">
                    <div class="commentsHolder commentsHolderScore reply">
                        <div class='scoreHolder'>
                            <button class='buttonScore Plus' data-id="new-reply" data-type="reply"><img src="images/icon-plus.svg" alt="Plus" class="buttonImg"></button>
                            <p class="score" id="score-new-reply">0</p>
                            <button class='buttonScore Minus' data-id="new-reply" data-type="reply"><img src="images/icon-minus.svg" alt="Minus" class="buttonImg"></button>
                        </div>
                        <div class="content">
                            <header class="header">
                                <div class="header-data">
                                    <img src="images/avatars/image-juliusomo.png" alt="juliusomo's avatar" class="avatar avatarReply">
                                    <h1 class="header-heading">juliusomo</h1> 
                                    <div class="you"><p>you</p></div>
                                    <p class="date">${currentTime}</p>
                                </div>
                                <div class="replyHolder">
                                    <div class="edit-delete editText">
                                        <div class="edit-delete-holder delete-button" id="delete-new">
                                            <img src="images/icon-delete.svg" alt="delete" class="imagesReply">
                                            <p>Delete</p>
                                        </div>
                                        <div class="edit-delete-holder edit-button" id="edit-new">
                                            <img src="images/icon-edit.svg" alt="Edit" class="imagesReply">
                                            <p>Edit</p>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <p class="commentText">${replyText}</p> <!-- Corrected line to display reply -->
                            <div class="editActiveHolder">
                                <textarea class="editTextarea textarea hidden"></textarea>
                                <button class="saveEdit send hidden">update</button>
                            </div>
                            <div class="deletePopupHolder hidden">
                                <div class="deletePopup">
                                    <h1 class="delete-h1">Delete comment</h1>
                                    <p class="delete-p">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                                    <div class="deleteButtonsPopup">
                                        <button class="popUp-option cancel">No, Cancel</button>
                                        <button class="popUp-option agreeDelete">Yes, Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

                parentComment.insertAdjacentHTML('afterend', newReplyHTML);
                replyContainer.remove();

                bindEditDeleteEvents();
            });
        });
    });
}

bindReplyButtonEvents();