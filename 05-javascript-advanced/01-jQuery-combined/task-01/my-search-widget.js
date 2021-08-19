let options = {
    limit: 10
}

const checkVisitedLink = (str) => str.lastIndexOf('[READ]', 0) === 0

const checkSearchType = searchType => {
    return (searchType === 'wikipedia' || searchType === 'google-books') ? true :
        alert('Wrong attribute is set to a div element!')
}

const checkInputEmptiness = inputValue => {
    return (inputValue.match(/^\s+$/) === null && inputValue !== '') ? true :
        alert('Empty search field!')
}

const checkLimit = arr => {
    return (!isNaN(parseInt(Number(arr[1]))) && arr[1] >= 1 && arr[1] <= 30 || arr[1] === undefined) ? true :
        alert('Wrong limit!')
}

const validateFields = (currentNode, options) => {
    let paramsObject = {}
    const searchType = currentNode.parent().attr("data-search-type")
    const inputValue = currentNode.siblings('input').val().toString()
    const valueArr = inputValue.split(',')
    const checks = [checkSearchType(searchType, paramsObject), checkInputEmptiness(inputValue), checkLimit(valueArr)]

    if(!checks.includes(undefined)) {
        paramsObject.type = searchType
        paramsObject.limit = (valueArr[1] !== undefined) ? +valueArr[1] : options.limit;
        paramsObject.keyWords = valueArr[0];
        return paramsObject;
    }
}

Array.from(document.querySelectorAll('.msw-search')).forEach(item => {
    item.addEventListener('keypress', event => {
        if (event.keyCode === 13) {
            item.nextElementSibling.click()
        }
    })
})

Array.from(document.querySelectorAll('.msw-results')).forEach(item => {
    item.addEventListener('click', ({target}) => {
        if (target.tagName === 'A') {
            if (!checkVisitedLink(target.textContent))
                target.textContent = '[READ]' + target.textContent
            target.style.backgroundColor = 'mediumseagreen'
        }
    })
})

const callAPI = ({target}) => {
    const paramsObject = validateFields($(target), options);
    if (paramsObject !== undefined) {
        const linksField = $(target).siblings('div');
        if (paramsObject.type === 'wikipedia') {
            get_wiki_info(paramsObject.keyWords, paramsObject.limit, linksField);
        } else {
            get_google_books(paramsObject.keyWords, paramsObject.limit, linksField);
        }
    }
}

const get_wiki_info = (keyWords, limit, linkField) => {
    $.ajax({
        url: 'https://wikipedia.org/w/api.php?origin=*',
        data: {
            action: 'query',
            list: 'search',
            srsearch: keyWords,
            srlimit: limit + '',
            format: 'json'
        },
        dataType: 'jsonp',
        success: function (data) {
            const array = Array.from(data.query.search);
            linkField.html('<ul class="wiki-links"></ul>');
            array.forEach(function (page) {
                get_wiki_links(page.title, linkField);
            });

        },
        fail: function (data) {
            alert('fail');
        }
    });
}

const get_wiki_links = (searchFor, linkField) => {
    $.ajax({
        url: 'https://wikipedia.org/w/api.php?origin=*',
        data: {
            action: 'query',
            format: 'json',
            titles: searchFor,
            prop: 'info',
            inprop: 'url|talkid'
        },
        dataType: 'jsonp',
        success: function (data) {
            let array = Array.from(Object.values(data.query.pages));
            const linkInfo = {
                title: searchFor,
                link: array[0].fullurl
            }
            linkField.children().append(`<li class="wiki-link"><a href=${linkInfo.link} target=”_blank” >${linkInfo.title}</a></li>`);
        },
        fail: function (data) {
            alert('fail')
        }
    });
}

const get_google_books = (bookName, limit, linkField) => {
    const googleAPI = `https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=${limit}`;
    $.getJSON(googleAPI, function (response) {
        const arr = Array.from(Object.values(response))
        linkField.html('<ul class="google-books-links"></ul>');
        const bookInfo = {
            title: '',
            link: ''
        }
        arr[2].forEach((book) => {
            bookInfo.title = book.volumeInfo.title;
            bookInfo.link = book.volumeInfo.previewLink;
            linkField.children().append(`<li class="google-books-link"><a href=${bookInfo.link} target=”_blank” >${bookInfo.title}</a></li>`);
        })

    });
}

(function ($) {
    $.fn.mySearchWidget = (optional) => {
        options = Object.assign(options, optional)
        $(".msw-button").on('click', callAPI);
    }
})(jQuery);


