// Función para obtener una lista paginada de héroes
export async function getHeros(size = 12, page = 1) {
    try {
        // Realiza la petición GET a la API con parámetros de paginación
        const response = await fetch(
            `https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/heroes?size=${size}&page=${page}`
        );

        // Verifica si la respuesta fue exitosa (status 200-299)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Convierte la respuesta a formato JSON
        const data = await response.json();
        return data;

    } catch (error) {
        // Manejo de errores para fallos en la petición
        console.error("There was a problem with the fetch operation:", error);
        // Nota: No se está retornando ningún valor en caso de error
    }
}

// Función para obtener los detalles de un héroe específico por ID
export async function getHero(id) {
    try {
        // Realiza la petición GET a la API con el ID del héroe
        const response = await fetch(
            `https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/hero?id=${id}`
        );

        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Convierte la respuesta a formato JSON
        const data = await response.json();
        return data;

    } catch (error) {
        // Manejo de errores para fallos en la petición
        console.error("There was a problem with the fetch operation:", error);
        // Nota: No se está retornando ningún valor en caso de error
    }
}