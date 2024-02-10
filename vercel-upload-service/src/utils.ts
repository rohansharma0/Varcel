const MAX_ID_LENGTH = 5;
export const generateID = (): string => {
    const letters: string = "1234567898qwertyuiopasdfghjklzxcvbnm";
    let id: string = "";
    for (let i = 0; i < MAX_ID_LENGTH; i++) {
        id += letters[Math.floor(Math.random() * letters.length)];
    }
    return id;
}