export async function fetchPets() {
    try {
        const response = await fetch('./pets.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch pets. ${error.message}`);
    }
}

let petsData = null;

export async function getPets() {
    if (!petsData) {
        petsData = await fetchPets();
    }
    return petsData;
}