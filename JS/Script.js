document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Login tradicional
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[username] && users[username].password === password) {
            alert(`Bem-vindo, ${username}!`);
            window.location.href = "Index.html";
        } else {
            alert("Usuário ou senha inválidos.");
        }
    });

    // Login com Google
    window.handleCredentialResponse = (response) => {
        const data = jwt_decode(response.credential); // Decodifica o token JWT

        const email = data.email;
        const name = data.name;

        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[email]) {
            alert(`Bem-vindo de volta, ${name}!`);
        } else {
            // Registra usuário no sistema local
            users[email] = { name, googleAccount: true };
            localStorage.setItem("users", JSON.stringify(users));
            alert(`Conta criada com sucesso! Bem-vindo, ${name}!`);
        }

        window.location.href = "Index.html"; // Redireciona para a página inicial
    };
});

// Função para decodificar o JWT
function jwt_decode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
    return JSON.parse(jsonPayload);
}
