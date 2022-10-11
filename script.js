const login = document.querySelector('#username')
const password = document.querySelector('#password')
const repeatPassword = document.querySelector('#password2')
const email = document.querySelector('#email')
const clearBtn = document.querySelector('.clear')
const sendBtn = document.querySelector('.send')
const popup = document.querySelector('.popup')
const wrapper = document.querySelector('.wrapper')

const showError = (input, msg) => {
	// argument INPUT przechowuje nasze inputy
	// argument msg przechowuje nasze placeholdery

	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')

	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Hasła do siebie nie pasują.')
	}
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków`)
	}
}

// argument INPUT z funkcji checkForm przechowuje tablice z naszymi INPUTAMI
// argument EL odnosi sie do kazdej zmiennej, ktora umiescilismy w tablicy

const checkMail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, `E-mail jest niepoprawny`)
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box')
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})
	if (errorCount === 0) {
		popup.classList.add('show-popup')
		wrapper.classList.add('wrapper-hide')
	}
	console.log(errorCount)
}

sendBtn.addEventListener('click', e => {
	e.preventDefault()

	checkForm([login, password, repeatPassword, email])
	checkLength(username, 3)
	checkLength(password, 8)
	checkPassword(password, repeatPassword)
	checkMail(email)
	checkErrors()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()
	;[login, password, repeatPassword, email].forEach(el => {
		el.value = ''
		clearError(el)
	})
})
