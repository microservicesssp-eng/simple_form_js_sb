const userForm = document.getElementById("userForm");
const message = document.getElementById("message");

userForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = "Сохраняем...";
    message.className = "message";

    const formData = new FormData(userForm);
    const user = {
        name: formData.get("name").trim(),
        surname: formData.get("surname").trim()
    };

    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const details = await response.text();
            throw new Error(details || `HTTP ${response.status}`);
        }

        const savedUser = await response.json();
        message.textContent = `Сохранено! Запись №${savedUser.id}: ${savedUser.name} ${savedUser.surname}.`;
        message.className = "message success";
        userForm.reset();
    } catch (error) {
        console.error("Ошибка при сохранении:", error);
        message.textContent = "Не удалось сохранить данные. Проверьте, запущены ли приложение и MySQL.";
        message.className = "message error";
    }
});
