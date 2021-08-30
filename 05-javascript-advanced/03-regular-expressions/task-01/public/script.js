const regExp = /(?:\.([^.]+))?$/
const fullMatchColors = /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^)]*\)/ig
const fullMatchUnits = /(.*( 0px)|.*( 0pt)|.*( 0em)|.*( 0rem)|.*( 0vh)|.*( 0vw))/ig
const dropzone = document.getElementById('dropzone')
const results = document.getElementById('results')
const dropzoneButton = document.getElementById('dropZoneButton')
let files = []
let isLoading = false
const generatePromise = () => new Promise(resolve => dropzoneButton.onclick = () => clickEvent(resolve))
let promise = generatePromise()

const clickEvent = (resolve) => {
    if (isLoading) {
        isLoading = false
    } else {
        isLoading = true
        resolve()
        dropzoneButton.onclick = () => false
        promise = generatePromise()
    }
}

const dropEvent = event => {
    clearPage()
    event.preventDefault()
    dropzone.classList.add('drop-zone--dropped')
    dropzone.classList.remove('drop-zone--over')
    const droppedFiles = Array.from(event.dataTransfer.files)
    checkImages(droppedFiles).length !== 0 ? droppedFiles.forEach(item => uploadEvent(item)) :
        checkCss(droppedFiles).length !== 0 ? droppedFiles.forEach(item => uploadEvent(item)) :
            alert('Wrong files parsed!')
}

const clearPage = () => {
    results.innerHTML = ''
    dropzone.innerHTML = ''
}

const checkImages = array => array.filter(item => regExp.exec(item.name)[1] === 'png' || regExp.exec(item.name)[1] === 'jpg')
const checkCss = array => array.filter(item => regExp.exec(item.name)[1] === 'css')

const uploadEvent = item => {
    let reader = new FileReader()
    if (item.type.includes("image")) {
        reader.readAsDataURL(item)
        reader.onloadend =  () => {
            const container = document.createElement("div")
            const img = document.createElement("img")
            const data = document.createElement("div")
            const nameFile = document.createElement("p")
            const sizeFile = document.createElement("p")
            img.src = `${reader.result}`
            nameFile.textContent = `Filename: ${item.name}`
            sizeFile.textContent = `Size: ${(item.size / 1024).toFixed(1)} kB`
            img.width = 100
            data.append(nameFile, sizeFile)
            container.append(img, data)
            dropzone.append(container)
        }
    }
    const lastElemIndex = files.length
    files.push(item)
    if (lastElemIndex === 0) {
        files[lastElemIndex] = upload(files[lastElemIndex])
    } else {
        const file = files[lastElemIndex]
        files[lastElemIndex] = waiterPreviousUpload(lastElemIndex, file)
    }
}

const waiterPreviousUpload = async (lastElemIndex, file) => {
    await files[lastElemIndex - 1]
    return upload(file)
}

const upload = file => {
    const promise = fileType => new Promise(resolve => uploadPromise(resolve, fileType, file))

    if (regExp.exec(file.name)[1] === 'jpg') {
        return promise('image/jpg')
    }

    if (regExp.exec(file.name)[1] === 'png') {
        return promise('image/png')
    }

    if (regExp.exec(file.name)[1] === 'css') {
        clearPage()
        return promise('css')
    }

    alert('Not appropriate files')
    dropzone.classList.remove('drop-zone--dropped')
    dropzone.classList.add('drop-zone--over')
}

const uploadPromise = (resolve, fileType, loadedFile) => {
    dropzone.removeEventListener('drop', dropEvent)
    const xhr = new XMLHttpRequest()
    let lastChunk = false
    const chunk = loadedFile.slice(0, CHUNK_SIZE, fileType)

    xhr.addEventListener('readystatechange', async () => {

        if (isLoading === false) {
            await promise
            responseFunc(resolve, fileType, loadedFile, lastChunk, xhr)
        } else {
            responseFunc(resolve, fileType, loadedFile, lastChunk, xhr)
        }
    })

    isLoading = true
    xhr.open('POST', ENDPOINT_URL)
    xhr.send(createFormData(loadedFile.name, 0, lastChunk, chunk))
}

const uploadProgress = (progress) => {
    const progressLine = document.getElementById("progress-bar")
    if (progress === 100) {
        progressLine.style.width = '0'
    } else {
        progressLine.style.width = progress + "%"
    }
}

const createFormData = (name, start, lastChunk, chunk) => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('start', start)
    formData.append('lastChunk', lastChunk)
    formData.append('chunk', chunk)

    return formData
}

const responseFunc = (resolve, fileType, loadedFile, lastChunk, xhr) => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.response)
        if (response.expectedStart) {
            const progressPercent = (response.expectedStart / loadedFile.size) * 100
            uploadProgress(progressPercent, loadedFile.name)

            const nextChunkInterval = response.expectedStart + CHUNK_SIZE
            if (nextChunkInterval > loadedFile.size) {
                lastChunk = true
            }

            const chunk = loadedFile.slice(response.expectedStart, nextChunkInterval, fileType)

            xhr.open('POST', ENDPOINT_URL)
            xhr.send(createFormData(loadedFile.name, response.expectedStart, lastChunk, chunk))
        } else {
            dropzone.classList.remove('drop-zone--dropped')
            dropzone.classList.remove('drop-zone--over')
            uploadProgress(100)
            dropzone.addEventListener('drop', dropEvent)
            isLoading = false
            if (fileType === 'css') {
                loadedFile.text()
                    .then(result => {
                        dropzone.innerHTML += '<p>' + result + '</p>'
                        const colors = result.match(fullMatchColors)

                        if (colors !== null) {
                            let uniqueChars = colors.filter((c, index) => {
                                return colors.indexOf(c) === index
                            })
                            results.innerHTML += `<h2>Unique colors</h2>`
                            uniqueChars.forEach(item => {
                                let pre = document.createElement("pre");
                                pre.textContent = `${item}`
                                results.appendChild(pre)
                            })
                        } else {
                            alert('No colors detected!')
                        }


                        const strings = result.match(fullMatchUnits)
                        if (strings !== null) {
                            let uniqueStrings = strings.filter((c, index) => strings.indexOf(c) === index)
                            results.innerHTML += `<h2> Unneeded units </h2>`
                            uniqueStrings.forEach(item => {
                                let pre = document.createElement("pre")
                                pre.textContent = `${item}`
                                results.appendChild(pre)
                            })
                        } else {
                            alert('No unneeded units detected!')
                        }
                    })
                    .then(() => resolve())
            } else {
                const link = document.createElement("a")
                const img = new Image()
                link.appendChild(img)
                link.href = response.fileUrl
                link.setAttribute('target','_blank')
                results.appendChild(link)
                img.src = response.fileUrl
                img.width = 200
                img.classList.add('results__elem')
                link.appendChild(img)
                resolve()
            }
        }

    } else if (xhr.readyState === 4 && xhr.status !== 200) {
        alert('error')
    }
}

dropzone.addEventListener('drop', dropEvent)
dropzone.addEventListener('dragover', event => {
    dropzone.classList.remove('drop-zone--dropped')
    dropzone.classList.add('drop-zone--over')
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
})



















