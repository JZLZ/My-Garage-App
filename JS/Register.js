document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    // Registro tradicional
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("As senhas não coincidem. Tente novamente.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[username]) {
            alert("Usuário já registrado. Escolha outro nome.");
            return;
        }

        users[username] = { email, password };
        localStorage.setItem("users", JSON.stringify(users));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "Login.html";
    });

    // Google Sign-In Callback
    window.handleCredentialResponse = (response) => {
        const data = jwt_decode(response.credential);

        const email = data.email;
        const name = data.name;

        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[email]) {
            alert(`Bem-vindo de volta, ${name}!`);
        } else {
            users[email] = { email, name, googleAccount: true };
            localStorage.setItem("users", JSON.stringify(users));
            alert(`Registro concluído com sucesso! Bem-vindo, ${name}!`);
        }

        window.location.href = "Index.html"; // Redireciona após login
    };
});
